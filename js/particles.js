/* =========================================================
   particles.js — WebGL particle field (Three.js)
   Loaded as a native ES module (three.min.js / three.js global
   builds are removed as of three.js r161 — this uses the
   supported three.module.js build instead) and reacts to mouse
   position, scroll, and — when camera control is on — to the
   tracked face position published by js/vision.js on
   window.__gesture.face
========================================================= */
import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

// main.js feature-detects camera control via window.THREE — keep that working.
window.THREE = THREE;

(function(){
  const canvas = document.getElementById('scene');
  if(!canvas){ return; }

  const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 100);
  camera.position.z = 22;

  const COUNT = window.innerWidth < 700 ? 2600 : 6200;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(COUNT * 3);
  const basePositions = new Float32Array(COUNT * 3);
  const seeds = new Float32Array(COUNT);

  for(let i=0;i<COUNT;i++){
    const r = 16 * Math.cbrt(Math.random());
    const theta = Math.random()*Math.PI*2;
    const phi = Math.acos(2*Math.random()-1);
    const x = r*Math.sin(phi)*Math.cos(theta);
    const y = r*Math.sin(phi)*Math.sin(theta)*0.55;
    const z = r*Math.cos(phi)*0.6 - 6;
    positions[i*3]=x; positions[i*3+1]=y; positions[i*3+2]=z;
    basePositions[i*3]=x; basePositions[i*3+1]=y; basePositions[i*3+2]=z;
    seeds[i]=Math.random()*Math.PI*2;
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions,3));
  geometry.setAttribute('seed', new THREE.BufferAttribute(seeds,1));

  const vertexShader = `
    attribute float seed;
    uniform float uTime;
    uniform vec2 uTarget;
    uniform float uFocus;
    varying float vAlpha;
    void main(){
      vec3 p = position;
      p.x += sin(uTime*0.15 + seed*6.2831) * 0.35;
      p.y += cos(uTime*0.18 + seed*4.0) * 0.35;
      float d = distance(p.xy, uTarget);
      float pull = smoothstep(9.0, 0.0, d) * uFocus;
      p.xy += (uTarget - p.xy) * pull * 0.12;
      vec4 mv = modelViewMatrix * vec4(p,1.0);
      gl_Position = projectionMatrix * mv;
      float dist = -mv.z;
      gl_PointSize = (2.2 + pull*2.4) * (60.0 / dist);
      vAlpha = 0.35 + pull*0.5 + 0.15*sin(uTime*0.6+seed*10.0);
    }
  `;
  const fragmentShader = `
    precision mediump float;
    varying float vAlpha;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    void main(){
      vec2 uv = gl_PointCoord - vec2(0.5);
      float d = length(uv);
      if(d > 0.5) discard;
      float glow = smoothstep(0.5, 0.0, d);
      vec3 col = mix(uColorA, uColorB, smoothstep(0.0,1.0, vAlpha));
      gl_FragColor = vec4(col, glow * vAlpha);
    }
  `;

  const material = new THREE.ShaderMaterial({
    vertexShader, fragmentShader,
    uniforms:{
      uTime:{ value:0 },
      uTarget:{ value:new THREE.Vector2(999,999) },
      uFocus:{ value:0 },
      uColorA:{ value:new THREE.Color(0x39d67e) },
      uColorB:{ value:new THREE.Color(0xe0293f) },
    },
    transparent:true, depthWrite:false, blending:THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  let targetFocus = 0;
  let mouse = { x:9999, y:9999 };
  let usingFace = false;

  window.addEventListener('pointermove', (e)=>{
    if(usingFace) return;
    const nx = (e.clientX/window.innerWidth - 0.5) * 26;
    const ny = -(e.clientY/window.innerHeight - 0.5) * 16;
    mouse.x = nx; mouse.y = ny;
    targetFocus = 1;
  }, { passive:true });
  window.addEventListener('pointerleave', ()=>{ if(!usingFace) targetFocus = 0; });

  function readFaceTarget(){
    const g = window.__gesture;
    if(g && g.face && g.face.active){
      usingFace = true;
      mouse.x = g.face.x * 26;
      mouse.y = g.face.y * 16;
      targetFocus = 1;
    } else if(g && g.hand && g.hand.active){
      usingFace = true;
      mouse.x = g.hand.x * 26;
      mouse.y = g.hand.y * 16;
      targetFocus = 1;
    } else {
      usingFace = false;
    }
  }

  window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const clock = new THREE.Clock();
  function animate(){
    requestAnimationFrame(animate);
    readFaceTarget();
    const t = clock.getElapsedTime();
    material.uniforms.uTime.value = t;
    material.uniforms.uTarget.value.lerp(new THREE.Vector2(mouse.x, mouse.y), 0.08);
    material.uniforms.uFocus.value += (targetFocus - material.uniforms.uFocus.value) * 0.06;
    points.rotation.y = t * 0.02;
    renderer.render(scene, camera);
  }
  animate();

  window.__particles = { setBoost(v){ targetFocus = v; } };
})();
