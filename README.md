# Sobhan Mahmoudi — living résumé

A bilingual (EN/FA) personal résumé site with a dark, Mr. Robot–leaning
aesthetic, an on-device computer-vision layer (real face + hand tracking,
nothing leaves the browser), and a WebGL particle backdrop.

## Run it

There's no build step. Any static server works — camera access requires
either `localhost` or HTTPS, it will not work from a plain `file://` path.

```
cd sobhan-cv
python3 -m http.server 8000
# open http://localhost:8000
```

To publish it on GitHub Pages: push this folder to a repo, then
Settings → Pages → Source: your branch / root. GitHub Pages serves over
HTTPS, so the camera will work there too.

## What's real vs. what to plug in

- **Camera control is real.** Click "enable camera control" (top bar or
  hero button). It uses Google's MediaPipe Tasks Vision, loaded from a
  CDN and run entirely in-browser via WebGL/WASM — no video frame is
  ever uploaded anywhere:
  - `FaceLandmarker` tracks your head position and steers the particle
    field toward it.
  - `HandLandmarker` tracks one hand: **pinch = click**, **pinch + drag
    vertically = scroll**, and an accessible **dwell-to-click** fallback
    fires if you hover an item with an open hand for ~0.75s without
    pinching.
  - Everything still works with mouse/keyboard/touch if the camera is
    denied, unsupported, or simply off — camera control is progressive
    enhancement, never a requirement.
- **The 5-second popup** looks for `assets/video/intro.mp4`. Drop your
  own clip there (see `assets/video/README.txt`) and it plays
  automatically; until then it shows a small fallback note instead of a
  broken player.
- **All text lives in one file:** `js/content.js`. Edit the `I18N`
  object for UI strings and the `CONTENT` object for skills, experience,
  research entries and contact links — in both `en` and `fa`. Nothing
  else needs to change to update your bio, timeline or links.

## Structure

```
index.html          markup for every section, both languages share it
css/style.css        all styling — palette, layout, motion, RTL rules
js/content.js         every string + editable content (EN/FA) — edit this
js/vision.js           on-device face + hand tracking → js/particles.js & clicks
js/particles.js        Three.js WebGL particle field
js/main.js              boot sequence, language switch, popup, wiring
assets/img/             favicon, popup poster
assets/video/           put intro.mp4 here for the popup
```

## Browser support

Camera control needs WebGL2 + `getUserMedia` (any recent Chrome, Edge,
Firefox or Safari on desktop or Android; iOS Safari works but is slower).
Everywhere else — and on any browser without those — the site is a
normal, fully readable, keyboard- and touch-friendly résumé; the camera
button simply won't do anything until conditions are met, and a toast
explains why.

## Making it yours

1. Swap the placeholder skills/experience/research/contact entries in
   `js/content.js` for your real ones (both `en` and `fa` blocks).
2. Drop a résumé PDF into `assets/` and link it from the contact section
   if you want a download link.
3. Drop `intro.mp4` into `assets/video/` for the popup.
4. Tune the palette in the `:root` block at the top of `css/style.css`
   if you want more/less red, a different green, etc.
