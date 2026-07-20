/* =========================================================
   vision.js — real, on-device computer vision.
   Uses Google's MediaPipe Tasks Vision (WASM/GPU, loaded from CDN,
   runs entirely in-browser — no frame ever leaves the device) for:
     - FaceLandmarker  → head position, used to steer the particle field
     - HandLandmarker  → pinch / point / open-palm gestures, used to
                          click links and scroll the page
   Everything here is optional progressive enhancement: if the camera,
   WebGL or the models are unavailable, the toast in main.js explains
   why and the site remains fully usable with mouse/keyboard/touch.
========================================================= */

import {
  FilesetResolver,
  FaceLandmarker,
  HandLandmarker,
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/vision_bundle.mjs";

const state = {
  running: false,
  faceLandmarker: null,
  handLandmarker: null,
  video: null,
  hudCanvas: null,
  hudCtx: null,
  raf: null,
  lastPinch: false,
  pinchStartY: null,
  lastVideoTime: -1,
};

window.__gesture = { face: { active:false, x:0, y:0 }, hand: { active:false, x:0, y:0 } };

async function loadModels(onProgress){
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );
  onProgress && onProgress("wasm runtime ready");

  const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
      delegate: "GPU",
    },
    runningMode: "VIDEO",
    numFaces: 1,
    outputFaceBlendshapes: false,
  });
  onProgress && onProgress("face model ready");

  const handLandmarker = await HandLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
      delegate: "GPU",
    },
    runningMode: "VIDEO",
    numHands: 1,
  });
  onProgress && onProgress("hand model ready");

  return { faceLandmarker, handLandmarker };
}

function dist(a,b){
  return Math.hypot(a.x-b.x, a.y-b.y);
}

function drawHud(hands, faces){
  const ctx = state.hudCtx;
  if(!ctx) return;
  const w = state.hudCanvas.width, h = state.hudCanvas.height;
  ctx.clearRect(0,0,w,h);
  ctx.strokeStyle = "rgba(224,41,63,0.9)";
  ctx.fillStyle = "rgba(57,214,126,0.9)";
  ctx.lineWidth = 1.5;

  if(faces && faces.faceLandmarks && faces.faceLandmarks[0]){
    const pts = faces.faceLandmarks[0];
    const box = pts.reduce((b,p)=>({
      minX:Math.min(b.minX,p.x), maxX:Math.max(b.maxX,p.x),
      minY:Math.min(b.minY,p.y), maxY:Math.max(b.maxY,p.y)
    }), {minX:1,maxX:0,minY:1,maxY:0});
    ctx.strokeRect(box.minX*w, box.minY*h, (box.maxX-box.minX)*w, (box.maxY-box.minY)*h);
  }

  if(hands && hands.landmarks && hands.landmarks[0]){
    const lm = hands.landmarks[0];
    lm.forEach(p=>{
      ctx.beginPath();
      ctx.arc(p.x*w, p.y*h, 2, 0, Math.PI*2);
      ctx.fill();
    });
  }
}

function updateGestureUI(text, gestureText, faceText){
  const s = document.getElementById('vs-status');
  const g = document.getElementById('vs-gesture');
  const f = document.getElementById('vs-face');
  if(s) s.textContent = text;
  if(g) g.textContent = gestureText;
  if(f) f.textContent = faceText;
}

function moveCursorRing(nx, ny, active, grabbing){
  const ring = document.getElementById('cursor-ring');
  if(!ring) return;
  const x = (1-nx) * window.innerWidth;   // mirrored, since video is mirrored
  const y = ny * window.innerHeight;
  ring.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%) ${grabbing ? 'scale(.6)':'scale(1)'}`;
  ring.classList.toggle('active', active);
  ring.classList.toggle('grab', !!grabbing);
  return { x, y };
}

function elementUnderRing(x, y){
  const el = document.elementFromPoint(x, y);
  if(!el) return null;
  return el.closest('a, button, .btn, .pill-btn, .icon-btn, .skill-card, .rs-card');
}

let hoverTarget = null;
let hoverStart = 0;
const DWELL_MS = 750;

function processFrame(){
  if(!state.running) return;
  const video = state.video;
  if(video.readyState >= 2 && video.currentTime !== state.lastVideoTime){
    state.lastVideoTime = video.currentTime;
    const now = performance.now();

    const faceResult = state.faceLandmarker.detectForVideo(video, now);
    const handResult = state.handLandmarker.detectForVideo(video, now);

    drawHud(handResult, faceResult);

    // ---- face → background steering ----
    if(faceResult.faceLandmarks && faceResult.faceLandmarks[0]){
      const nose = faceResult.faceLandmarks[0][1];
      window.__gesture.face = {
        active:true,
        x:(nose.x - 0.5) * -2, // mirror + normalize -1..1
        y:(nose.y - 0.5) * -2,
      };
    } else {
      window.__gesture.face.active = false;
    }

    // ---- hand → cursor + gestures ----
    if(handResult.landmarks && handResult.landmarks[0]){
      const lm = handResult.landmarks[0];
      const wrist = lm[0];
      const thumbTip = lm[4];
      const indexTip = lm[8];
      const indexBase = lm[5];
      const pinchDist = dist(thumbTip, indexTip);
      const handSpan = dist(wrist, indexBase) || 0.001;
      const pinchRatio = pinchDist / handSpan;
      const isPinch = pinchRatio < 0.55;

      window.__gesture.hand = { active:true, x:(indexTip.x-0.5)*-2, y:(indexTip.y-0.5)*-2 };

      const pos = moveCursorRing(indexTip.x, indexTip.y, true, isPinch);

      if(isPinch && !state.lastPinch){
        // pinch just started: click
        const el = elementUnderRing(pos.x, pos.y);
        if(el){ el.click(); el.classList.add('gesture-flash'); setTimeout(()=>el.classList.remove('gesture-flash'), 250); }
        state.pinchStartY = indexTip.y;
      } else if(isPinch && state.pinchStartY !== null){
        const dy = (indexTip.y - state.pinchStartY);
        if(Math.abs(dy) > 0.02){
          window.scrollBy(0, dy * 40);
          state.pinchStartY = indexTip.y;
        }
      } else if(!isPinch){
        state.pinchStartY = null;
        // open-hand hover-dwell as a no-pinch alternative (accessible fallback)
        const el = elementUnderRing(pos.x, pos.y);
        if(el && el === hoverTarget){
          if(now - hoverStart > DWELL_MS){ el.click(); hoverTarget = null; }
        } else {
          hoverTarget = el; hoverStart = now;
        }
      }
      state.lastPinch = isPinch;
      updateGestureUI("tracking", isPinch ? "pinch (click/drag)" : "open hand (point)", window.__gesture.face.active ? "locked" : "searching");
    } else {
      window.__gesture.hand.active = false;
      document.getElementById('cursor-ring')?.classList.remove('active');
      updateGestureUI("tracking", "—", window.__gesture.face.active ? "locked" : "searching");
    }
  }
  state.raf = requestAnimationFrame(processFrame);
}

async function start({ video, hudCanvas, onProgress, onReady, onError }){
  try{
    state.video = video;
    state.hudCanvas = hudCanvas;
    state.hudCtx = hudCanvas.getContext('2d');

    const stream = await navigator.mediaDevices.getUserMedia({ video:{ width:320, height:240 }, audio:false });
    video.srcObject = stream;
    await video.play();

    hudCanvas.width = 220; hudCanvas.height = 150;

    onProgress && onProgress("booting vision runtime…");
    const models = await loadModels(onProgress);
    state.faceLandmarker = models.faceLandmarker;
    state.handLandmarker = models.handLandmarker;

    state.running = true;
    onReady && onReady();
    processFrame();
  } catch(err){
    onError && onError(err);
    stop();
  }
}

function stop(){
  state.running = false;
  if(state.raf) cancelAnimationFrame(state.raf);
  if(state.video && state.video.srcObject){
    state.video.srcObject.getTracks().forEach(t=>t.stop());
    state.video.srcObject = null;
  }
  window.__gesture = { face:{active:false,x:0,y:0}, hand:{active:false,x:0,y:0} };
  document.getElementById('cursor-ring')?.classList.remove('active');
}

window.__vision = { start, stop };
