/* =========================================================
   main.js — glue: boot sequence, language switching, content
   rendering, the 5s intro-video popup, and wiring the vision
   module to the UI.
========================================================= */
(function(){
  const STORAGE_KEY = "smcv_lang";
  const browserDefault = (navigator.language || "en").toLowerCase().startsWith("fa") ? "fa" : "en";
  let lang = localStorage.getItem(STORAGE_KEY) || browserDefault;

  /* ---------------- i18n ---------------- */
  function applyLang(l){
    lang = l;
    localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l;
    document.documentElement.dir = l === "fa" ? "rtl" : "ltr";
    document.documentElement.dataset.lang = l;
    document.getElementById('lang-toggle-label').textContent = l === "fa" ? "EN" : "فا";

    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      const val = I18N[l][key];
      if(val !== undefined) el.innerHTML = val;
    });
    document.querySelectorAll('.glitch[data-i18n]').forEach(el=>{
      el.setAttribute('data-text', el.textContent);
    });
    renderContent(l);
    const yearEl = document.getElementById('year');
    if(yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ---------------- dynamic sections ---------------- */
  function renderContent(l){
    const c = CONTENT[l];

    const skillsGrid = document.getElementById('skills-grid');
    skillsGrid.innerHTML = c.skills.map(s => `
      <div class="skill-card">
        <div class="sk-icon mono">${s.icon}</div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
        <div class="sk-tags">${s.tags.map(t=>`<span>${t}</span>`).join('')}</div>
      </div>`).join('');

    const timeline = document.getElementById('timeline');
    timeline.innerHTML = c.experience.map(e => `
      <div class="tl-item">
        <span class="tl-date mono">${e.date}</span>
        <h3>${e.role}</h3>
        <span class="tl-org mono">${e.org}</span>
        <p>${e.body}</p>
      </div>`).join('');

    const researchGrid = document.getElementById('research-grid');
    researchGrid.innerHTML = c.research.map(r => `
      <div class="rs-card">
        <span class="rs-severity mono">${r.sev}</span>
        <h3>${r.title}</h3>
        <p>${r.body}</p>
      </div>`).join('');

    const contactLinks = document.getElementById('contact-links');
    contactLinks.innerHTML = c.contact.map(x => `
      <a href="${x.href}"><span class="mono">${x.label}</span><span>${x.value}</span></a>`).join('');
  }

  /* ---------------- boot sequence ---------------- */
  function runBoot(){
    const bootScreen = document.getElementById('boot-screen');
    const log = document.getElementById('boot-log');
    const fill = document.querySelector('.boot-bar-fill');
    const lines = BOOT_LINES[lang];
    let i = 0;
    let printed = "";
    const timer = setInterval(()=>{
      if(i < lines.length){
        printed += lines[i] + "\n";
        log.textContent = printed;
        fill.style.width = `${Math.round(((i+1)/lines.length)*100)}%`;
        i++;
      } else {
        clearInterval(timer);
        setTimeout(()=>{
          bootScreen.classList.add('hidden');
          document.body.style.overflow = '';
        }, 350);
      }
    }, 220);
  }

  /* ---------------- popup (5s after load, with video) ---------------- */
  function initPopup(){
    const popup = document.getElementById('video-popup');
    const video = document.getElementById('popup-video');
    const fallback = document.getElementById('popup-video-fallback');
    const closeBtn = document.getElementById('popup-close');
    const dismissBtn = document.getElementById('popup-dismiss');

    // Detect whether a real video file is present; if not, show the fallback note.
    video.addEventListener('error', ()=>{ video.style.display='none'; fallback.style.display='flex'; });
    fetch('assets/video/intro.mp4', { method:'HEAD' }).then(r=>{
      if(!r.ok){ video.style.display='none'; fallback.style.display='flex'; }
    }).catch(()=>{ video.style.display='none'; fallback.style.display='flex'; });

    function open(){
      if(!popup.hidden) return; // already open, don't restart the show animation
      popup.hidden = false;
      requestAnimationFrame(()=>popup.classList.add('show'));
      video.play?.().catch(()=>{});
    }
    function close(){
      popup.classList.remove('show');
      video.pause?.();
      setTimeout(()=>{ popup.hidden = true; }, 350);
    }
    setTimeout(open, 5000);
    closeBtn.addEventListener('click', close);
    dismissBtn.addEventListener('click', close);
    popup.addEventListener('click', (e)=>{ if(e.target === popup) close(); });
    document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && !popup.hidden) close(); });
  }

  /* ---------------- toast ---------------- */
  function toast(msg, ms=6000){
    const el = document.getElementById('cam-toast');
    const msgEl = document.getElementById('cam-toast-msg');
    msgEl.textContent = msg;
    el.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(()=>{ el.hidden = true; }, ms);
  }
  document.getElementById('cam-toast-close').addEventListener('click', ()=>{
    document.getElementById('cam-toast').hidden = true;
  });

  /* ---------------- resume downloads ---------------- */
  function initResume(){
    const links = { en: document.getElementById('resume-en'), fa: document.getElementById('resume-fa') };
    const note = document.getElementById('resume-note');
    let anyMissing = false;

    Object.values(links).forEach(a=>{
      fetch(a.getAttribute('href'), { method:'HEAD' }).then(r=>{
        if(!r.ok) markMissing(a);
      }).catch(()=>markMissing(a));
    });

    function markMissing(a){
      a.classList.add('is-missing');
      a.setAttribute('aria-disabled', 'true');
      a.addEventListener('click', (e)=>e.preventDefault());
      if(!anyMissing){ anyMissing = true; note.hidden = false; }
    }
  }

  /* ---------------- gesture how-to guide ---------------- */
  function initGuide(){
    const guide = document.getElementById('gesture-guide');
    const closeBtn = document.getElementById('guide-close');
    const dismissBtn = document.getElementById('guide-dismiss');
    const hintBtn = document.getElementById('gesture-hint-btn');
    const helpBtn = document.getElementById('vision-help');

    function open(){
      guide.hidden = false;
      requestAnimationFrame(()=>guide.classList.add('show'));
    }
    function close(){
      guide.classList.remove('show');
      setTimeout(()=>{ guide.hidden = true; }, 350);
    }
    hintBtn.addEventListener('click', open);
    helpBtn.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    dismissBtn.addEventListener('click', close);
    guide.addEventListener('click', (e)=>{ if(e.target === guide) close(); });
    document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && !guide.hidden) close(); });

    return {
      openOnFirstActivation(){
        if(localStorage.getItem('smcv_guide_seen')) return;
        localStorage.setItem('smcv_guide_seen', '1');
        open();
      }
    };
  }

  /* ---------------- vision toggle ---------------- */
  function initVision(guide){
    const toggle = document.getElementById('vision-toggle');
    const heroBtn = document.getElementById('hero-vision-btn');
    const hud = document.getElementById('vision-hud');
    const closeBtn = document.getElementById('vision-close');
    const video = document.getElementById('webcam');
    const hudCanvas = document.getElementById('hud-canvas');
    let active = false;

    function setActive(v){
      active = v;
      toggle.setAttribute('aria-pressed', String(v));
      toggle.querySelector('span[data-i18n]')?.setAttribute('data-i18n', v ? 'ctrl.vision.on':'ctrl.vision');
      toggle.querySelector('span:last-child').textContent = I18N[lang][v ? 'ctrl.vision.on':'ctrl.vision'];
      hud.hidden = !v;
    }

    async function enable(){
      if(!navigator.mediaDevices?.getUserMedia || !window.THREE){
        toast(I18N[lang]['toast.unsupported']);
        return;
      }
      if(!window.__vision){ toast(I18N[lang]['toast.unsupported']); return; }
      toast(I18N[lang]['toast.loading'], 9000);
      window.__vision.start({
        video, hudCanvas,
        onProgress:(msg)=>{ document.getElementById('vs-status').textContent = msg; },
        onReady:()=>{ setActive(true); guide?.openOnFirstActivation(); },
        onError:(err)=>{
          console.error('[vision] camera control failed:', err);
          let msg = I18N[lang]['toast.denied'];
          if(err && err.name === 'NotFoundError'){
            msg = lang === 'fa' ? "دوربینی پیدا نشد." : "No camera was found on this device.";
          } else if(err && err.name === 'NotReadableError'){
            msg = lang === 'fa' ? "دوربین در حال استفاده توسط برنامه دیگری است." : "Camera is already in use by another app or tab.";
          } else if(location.protocol !== 'https:' && !['localhost','127.0.0.1'].includes(location.hostname)){
            msg = lang === 'fa' ? "کنترل دوربین به HTTPS نیاز دارد (یا اجرا روی localhost)." : "Camera control needs HTTPS (or localhost) — this page is served over plain HTTP.";
          } else if(err && err.name !== 'NotAllowedError' && err.name !== 'PermissionDeniedError'){
            msg = lang === 'fa' ? "بارگذاری مدل‌های بینایی ناموفق بود. کنسول را برای جزئیات بررسی کنید." : "Vision models failed to load. Check the browser console for details.";
          }
          toast(msg, 8000);
          setActive(false);
        }
      });
    }
    function disable(){
      window.__vision?.stop();
      setActive(false);
    }

    toggle.addEventListener('click', ()=> active ? disable() : enable());
    heroBtn.addEventListener('click', ()=> active ? disable() : enable());
    closeBtn.addEventListener('click', disable);
  }

  /* ---------------- mobile nav + lang toggle ---------------- */
  function initChrome(){
    const menuBtn = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    menuBtn.addEventListener('click', ()=>{
      const open = mobileNav.hidden;
      mobileNav.hidden = !open;
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>{ mobileNav.hidden = true; }));

    document.getElementById('lang-toggle').addEventListener('click', ()=>{
      applyLang(lang === 'fa' ? 'en' : 'fa');
    });
  }

  /* ---------------- boot ---------------- */
  document.body.style.overflow = 'hidden';
  // Failsafe: the boot screen fully covers the page and blocks every click
  // while active. If anything above throws before runBoot() finishes, this
  // guarantees the page still becomes usable instead of staying stuck.
  setTimeout(()=>{
    document.getElementById('boot-screen')?.classList.add('hidden');
    document.body.style.overflow = '';
  }, 4000);

  function safely(name, fn){
    try{ fn(); } catch(err){ console.error(`[main] ${name} failed:`, err); }
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    safely('applyLang', ()=>applyLang(lang));
    safely('runBoot', runBoot);
    safely('initPopup', initPopup);
    safely('initResume', initResume);
    let guide;
    safely('initGuide', ()=>{ guide = initGuide(); });
    safely('initVision', ()=>initVision(guide));
    safely('initChrome', initChrome);
  });
})();
