/* =========================================================
   content.js — every string + editable content, in one place.
   Edit this file to make the site yours. No other file needs touching
   to change text, skills, experience or research entries.
========================================================= */

const I18N = {
  en: {
    brand: "S. MAHMOODI",
    "nav.about": "whoami", "nav.skills": "skills", "nav.experience": "log",
    "nav.research": "research", "nav.resume": "resume", "nav.contact": "connect",
    "ctrl.vision": "enable camera control",
    "ctrl.vision.on": "camera control active",
    "hud.status": "status", "hud.gesture": "gesture", "hud.face": "face_lock",
    "hero.eyebrow": "// identity verified",
    "hero.name": "SOBHAN MAHMOODI",
    "hero.role": "Cybersecurity Researcher & Offensive Security Engineer",
    "hero.desc": "Sometimes growth starts with rm -rf , not mkdir — raise a hand, it's listening.",
    "hero.cta1": "activate live control",
    "hero.cta2": "scroll — or wave",
    "hero.meta1": "",
    "hero.meta2": "available for consulting & research",
    "hero.hint": "pinch to select · open palm to scroll",
    "about.tag": "01 // whoami",
    "about.title": "A shorter way to say “I look for what shouldn’t be there.”",
    "about.body": "Hi, I'm Sobhan Mahmoudi, a cybersecurity researcher focused on offensive security, web application security, and applied threat intelligence. I’m passionate about understanding how systems break, discovering hidden vulnerabilities, and analyzing the techniques attackers use to compromise trusted environments.My work focuses on penetration testing, vulnerability research, reconnaissance, malware analysis, and security automation. I have hands-on experience with security assessment methodologies, web security testing, network analysis, SOC concepts, and threat investigation. I enjoy exploring attack surfaces, identifying security weaknesses, and building practical approaches to make security assessments more efficient and effective.Beyond finding vulnerabilities, I’m interested in understanding the full lifecycle of attacks — from initial reconnaissance and exploitation to detection and response. My goal is to continuously improve my skills across offensive security and defensive technologies while contributing to a moresecure digital ecosystem.This website reflects the same mindset I bring to security research: trust should be earned through verification, not assumptions. Every camera frame is processed locally on-device, nothing is uploaded, and every interaction is designed around privacy, transparency, and security by design.",
    "about.f1k": "focus", "about.f1v": "offensive security · threat intel",
    "about.f2k": "based", "about.f2v": "Iran",
    "about.f3k": "languages", "about.f3v": "Persian · English",
    "about.f4k": "status", "about.f4v": "open to select engagements",
    "skills.tag": "02 // capabilities", "skills.title": "Toolset",
    "exp.tag": "03 // system log", "exp.title": "Experience",
    "research.tag": "04 // case files", "research.title": "Research & Writeups",
    "resume.tag": "05 // export", "resume.title": "Download the resume",
    "resume.body": "The same resume is available in both English and Persian. Choose whichever version is more convenient for you.",
    "resume.en": "English (PDF)", "resume.fa": "فارسی (PDF)",
    "resume.note": "Add your files at <code>assets/resume/sobhan-mahmoudi-en.pdf</code> and <code>assets/resume/sobhan-mahmoudi-fa.pdf</code> — these buttons pick them up automatically.",
    "contact.tag": "06 // handshake", "contact.title": "Open a channel",
    "contact.body": "For collaboration, disclosure coordination, or a proper conversation — reach out on an encrypted channel below. PGP key available on request.",
    "footer.line": "© <span id=\"year\"></span> Sobhan Mahmoudi — built with WebGL, on-device computer vision, and healthy paranoia.",
    "popup.eyebrow": "// incoming transmission",
    "popup.title": "A quick word before you dig in",
    "popup.fallback": "Drop your clip at <code>assets/video/intro.mp4</code> and it plays here automatically.",
    "popup.dismiss": "got it",
    "toast.denied": "Camera access denied. Enable it in your browser's site settings to use gesture control.",
    "toast.unsupported": "Camera control needs a modern browser with WebGL — the rest of the site works fine without it.",
    "toast.loading": "Loading vision models — first run downloads them once, then they're cached.",
    "guide.title": "How to drive this page with your hand",
    "guide.intro": "Once the camera is on, keep one hand loosely in frame. Nothing is recorded or uploaded — all tracking runs locally in your browser.",
    "guide.g1t": "Move your hand", "guide.g1d": "The red ring on screen follows your index fingertip — that's your cursor.",
    "guide.g2t": "Pinch to click", "guide.g2d": "Touch thumb and index finger together over a button or link to click it. The ring turns green.",
    "guide.g3t": "Pinch and drag up/down", "guide.g3d": "While pinched, move your hand up or down to scroll the page.",
    "guide.g4t": "No pinch? Just hover", "guide.g4d": "Hold an open hand over a button for about a second and it clicks on its own — a fallback if pinching is awkward on your camera.",
    "guide.g5t": "Move your head", "guide.g5d": "The particle field behind the text drifts toward your face — no action needed, it just reacts.",
    "guide.dismiss": "got it, let me try",
    "guide.reopen": "gesture guide",
  },
  fa: {
    brand: "س.محمودی",
    "nav.about": "درباره من", "nav.skills": "مهارت‌ها", "nav.experience": "سابقه",
    "nav.research": "پژوهش", "nav.resume": "رزومه", "nav.contact": "ارتباط",
    "ctrl.vision": "فعال‌سازی کنترل با دوربین",
    "ctrl.vision.on": "کنترل دوربین فعال است",
    "hud.status": "وضعیت", "hud.gesture": "حرکت دست", "hud.face": "قفل چهره",
    "hero.eyebrow": "// هویت تأیید شد",
    "hero.name": "سبحان محمودی",
    "hero.role": "پژوهشگر امنیت سایبری و مهندس تست نفوذ",
    "hero.desc": "گاهی اوقات رشد با rm -rf شروع می‌شود، نه mkdir — برای لایو کنترل کلیک کنید",
    "hero.cta1": "فعال‌سازی کنترل زنده",
    "hero.cta2": "اسکرول کنید — یا دست تکان دهید",
    "hero.meta1": "",
    "hero.meta2": "آماده همکاری مشاوره‌ای و پژوهشی",
    "hero.hint": "برای انتخاب، انگشت اشاره و شست خود را به هم نزدیک کنید · با کف دست باز اسکرول کنید",
    "about.tag": "۰۱ // درباره من",
    "about.title": "به‌طور خلاصه: «دنبال چیزی می‌گردم که نباید آنجا باشد.»",
    "about.body": "سلام، من سبحان محمودی هستم؛ پژوهشگر امنیت سایبری با تمرکز بر امنیت تهاجمی، امنیت برنامه‌های تحت وب و اطلاعات تهدید (Threat Intelligence). علاقه‌ی اصلی من درک نحوه‌ی شکست سیستم‌ها، کشف آسیب‌پذیری‌های پنهان و تحلیل تکنیک‌هایی است که مهاجمان برای نفوذ به محیط‌های مورد اعتماد از آن‌ها استفاده می‌کنند. حوزه فعالیت من شامل تست نفوذ، تحقیق و تحلیل آسیب‌پذیری‌ها، شناسایی و جمع‌آوری اطلاعات (Reconnaissance)، تحلیل بدافزار و خودکارسازی فرآیندهای امنیتی است. تجربه‌ی عملی در ارزیابی امنیت، آزمون امنیت برنامه‌های تحت وب، تحلیل شبکه، مفاهیم SOC و بررسی تهدیدات دارم و همواره به دنبال شناسایی سطح حمله، کشف نقاط ضعف امنیتی و ارائه راهکارهای عملی برای افزایش دقت و سرعت ارزیابی‌های امنیتی هستم. علاقه‌ی من تنها به کشف آسیب‌پذیری‌ها محدود نمی‌شود؛ بلکه تلاش می‌کنم چرخه‌ی کامل یک حمله را، از شناسایی اولیه و بهره‌برداری گرفته تا تشخیص و پاسخ‌گویی، به‌خوبی درک کنم. هدفم توسعه‌ی مستمر مهارت‌ها در حوزه‌های امنیت تهاجمی و فناوری‌های دفاعی و همچنین مشارکت در ساخت اکوسیستم دیجیتالی امن‌تر است. این وب‌سایت نیز بازتاب همین نگرش است؛ اینکه اعتماد نباید بر پایه‌ی فرضیات شکل بگیرد، بلکه باید با شواهد و راستی‌آزمایی به دست آید. تمام فریم‌های دوربین به‌صورت محلی روی دستگاه پردازش می‌شوند، هیچ اطلاعاتی بارگذاری یا ذخیره نمی‌شود و تمامی بخش‌های این وب‌سایت با تمرکز بر حفظ حریم خصوصی، شفافیت و امنیت از همان مرحله‌ی طراحی توسعه یافته‌اند.",
    "about.f1k": "تمرکز", "about.f1v": "امنیت تهاجمی · اطلاعات تهدید",
    "about.f2k": "محل", "about.f2v": " ایران",
    "about.f3k": "زبان‌ها", "about.f3v": "فارسی · انگلیسی",
    "about.f4k": "وضعیت", "about.f4v": "آماده همکاری",
    "skills.tag": "۰۲ // توانمندی‌ها", "skills.title": "ابزارها",
    "exp.tag": "۰۳ // گزارش سیستم", "exp.title": "سوابق",
    "research.tag": "۰۴ // پرونده‌ها", "research.title": "پژوهش و یادداشت‌ها",
    "resume.tag": "۰۵ // خروجی", "resume.title": "دانلود رزومه",
    "resume.body":" رزومه به دو زبان انگلیسی و فارسی موجود است. هر نسخه‌ای را که برای شما راحت‌تر است انتخاب کنید.",
    "resume.en": "انگلیسی (PDF)", "resume.fa": "فارسی (PDF)",
    "resume.note": "فایل‌های خود را در <code>assets/resume/sobhan-mahmoudi-en.pdf</code> و <code>assets/resume/sobhan-mahmoudi-fa.pdf</code> قرار دهید — این دکمه‌ها خودکار آن‌ها را شناسایی می‌کنند.",
    "contact.tag": "۰۶ // کانال", "contact.title": "راه های ارتباطی ",
    "contact.body": "برای همکاری، هماهنگی افشای آسیب‌پذیری یا یک گفتگوی درست — از کانال‌های رمزنگاری‌شده زیر در تماس باشید. کلید PGP در صورت درخواست ارائه می‌شود.",
    "footer.line": "© <span id=\"year\"></span> سبحان محمودی — ساخته‌شده با WebGL، بینایی ماشین .",
    "popup.eyebrow": "// یک پیام دریافتی",
    "popup.title": "قبل از شروع، یک نکته کوتاه",
    "popup.fallback": "کلیپ خود را در <code>assets/video/intro.mp4</code> قرار دهید تا اینجا خودکار پخش شود.",
    "popup.dismiss": "متوجه شدم",
    "toast.denied": "دسترسی به دوربین رد شد. برای استفاده از کنترل با حرکت دست، آن را در تنظیمات سایت مرورگر فعال کنید.",
    "toast.unsupported": "کنترل با دوربین به مرورگری مدرن با WebGL نیاز دارد — بقیه سایت بدون آن هم به‌خوبی کار می‌کند.",
    "toast.loading": "در حال بارگذاری مدل‌های بینایی — بار اول دانلود می‌شوند، بعد در کش می‌مانند.",
    "guide.title": "چطور با دست این صفحه را کنترل کنیم",
    "guide.intro": "وقتی دوربین روشن است، یک دست را در قاب نگه دارید. هیچ‌چیز ضبط یا آپلود نمی‌شود — تمام ردیابی روی همان مرورگر شما انجام می‌شود.",
    "guide.g1t": "دست خود را حرکت دهید", "guide.g1d": "حلقه قرمز روی صفحه نوک انگشت اشاره شما را دنبال می‌کند — این نشانگر شماست.",
    "guide.g2t": "برای کلیک، پینچ کنید", "guide.g2d": "برای کلیک روی دکمه یا لینک، انگشت شست و اشاره را به هم نزدیک کنید. حلقه سبز می‌شود.",
    "guide.g3t": "پینچ کنید و بالا/پایین بکشید", "guide.g3d": "در حالت پینچ، دست را بالا یا پایین ببرید تا صفحه اسکرول شود.",
    "guide.g4t": "پینچ سخت است؟ فقط نگه دارید", "guide.g4d": "کف دست باز را حدود یک ثانیه روی دکمه نگه دارید تا خودش کلیک شود — جایگزینی برای وقتی پینچ برای دوربین شما سخت تشخیص داده می‌شود.",
    "guide.g5t": "سر خود را حرکت دهید", "guide.g5d": "میدان ذرات پشت متن به‌سمت چهره شما می‌آید — نیازی به کاری نیست، فقط واکنش نشان می‌دهد.",
    "guide.dismiss": "متوجه شدم، امتحان می‌کنم",
    "guide.reopen": "راهنمای حرکت دست",
  }
};

/* ---- structured content (skills / experience / research / contact) ---- */
const CONTENT = {
  en: {
    skills: [
      { icon:"[01]", title:"Offensive Security", desc:"Red-teaming, penetration testing and adversary emulation across web, network and internal infrastructure.", tags:["OSCP-style","AD attacks","C2"] },
      { icon:"[02]", title:"Vulnerability Research", desc:"Finding and reproducing memory-safety and logic bugs, then writing them up so a fix actually lands.", tags:["fuzzing","reverse eng.","CVE"] },
      { icon:"[03]", title:"Threat Intelligence", desc:"Tracking adversary infrastructure and TTPs, mapping activity to MITRE ATT&CK for defenders who need it fast.", tags:["OSINT","ATT&CK","IOC"] },
      { icon:"[04]", title:"Malware Analysis", desc:"Static and dynamic analysis of samples in isolated environments — behavior first, attribution second.", tags:["sandboxing","YARA","triage"] },
      { icon:"[05]", title:"Applied Cryptography", desc:"Reviewing protocol and implementation choices for the gap between “looks secure” and “is secure.”", tags:["TLS","key mgmt","audits"] },
      { icon:"[06]", title:"Security Tooling", desc:"Building internal tools that turn a week of manual review into an afternoon.", tags:["Python","automation","CLI"] },
      { icon:"[07]", title:"Web Security", desc:"Focused on web application security, vulnerability discovery, penetration testing methodologies, and analyzing how applications can be exploited and secured..", tags:["OWASP Top 10","Web Application Security","Bug Bounty"] },
      { icon:"[08]", title:"OSINT", desc:"Open-source intelligence gathering, digital footprint analysis, reconnaissance, and attack surface discovery.", tags:["Metadata Analysis","Active Reconnaissance","Threat Intelligence"] },
    ],
    experience: [
      { date:"2025 — present", role:"SOC Analyst", org:"Security Operations", body:"Focused on prioritizing security tasks, resolving pending investigations, and moving toward proactive threat hunting to identify potential risks before they become incidents." },
      { date:"2023 — 2024", role:"Penetration Tester", org:"Security Team", body:"Ran black-box and grey-box engagements across web applications and internal networks; delivered findings developers actually acted on." },
      { date:"2021 — 2022", role:"Bug Bounty Hunting ", org:"Vulnerability discovery", body:"Independent security research focused on bug bounty hunting, web vulnerability discovery, reconnaissance, and manual security testing." },
      { date:"2020 — 2021", role:"Web Developer ", org:"programmer", body:"Developed and maintained modern websites with a focus on performance, usability, and security. Worked on custom website development, WordPress customization, WooCommerce solutions, responsive design, and integrating web technologies to deliver reliable digital experiences." },
    ],
    research: [
      { sev:"critical", title:"Hikvision IP Camera - Backdoor", body:"Analyzed and validated an unauthenticated command injection vulnerability affecting Hikvision devices, focusing on exploitation flow, impact assessment, and security mitigation. #https://vulners.com/exploitdb/EDB-ID:50827" },
      { sev:"medium", title:"WordPress Plugin Weblizar 8.9 - Backdoor", body:"Investigated a backdoor vulnerability in a WordPress plugin, analyzing the weakness, exploitation risks, and security impact within a controlled environment. #https://www.exploit-db.com/exploits/50969" },
      { sev:"writeup", title:"View all of my write-ups on Medium.", body:"#https://medium.com/@sobhanmahmoody97" },
    ],
    contact: [
      { label:"email", value:"sobhanmahmoody97@gmail.com", href:"mailto:sobhanmahmoody97@gmail.com" },
      { label:"github", value:"github.com/sobhan2237", href:"https://github.com/sobhan2237" },
      { label:"linkedin", value:"in/sobhan-mahmoody/", href:"https://www.linkedin.com/in/sobhan-mahmoody/" },
      { label:"pgp fingerprint request via email", value:"request via email", href:"mailto:sobhanmahmoody97@gmail.com" },
    ]
  },
  fa: {
    skills: [
      { icon:"[۰۱]", title:"امنیت تهاجمی", desc:"ردتیمینگ، تست نفوذ و شبیه‌سازی مهاجم روی وب، شبکه و زیرساخت داخلی.", tags:["حملات AD","C2","تست نفوذ"] },
      { icon:"[۰۲]", title:"پژوهش آسیب‌پذیری", desc:"یافتن و بازتولید باگ‌های حافظه و منطق، سپس مستندسازی برای اصلاح واقعی.", tags:["فازینگ","مهندسی معکوس","CVE"] },
      { icon:"[۰۳]", title:"اطلاعات تهدید", desc:"ردیابی زیرساخت و تاکتیک مهاجمان و تطبیق فعالیت با MITRE ATT&CK برای تیم‌های دفاعی.", tags:["OSINT","ATT&CK","IOC"] },
      { icon:"[۰۴]", title:"تحلیل بدافزار", desc:"تحلیل ایستا و پویای نمونه‌ها در محیط ایزوله — رفتار در اولویت، انتساب بعد از آن.", tags:["ساندباکس","YARA","تریاژ"] },
      { icon:"[۰۵]", title:"رمزنگاری کاربردی", desc:"بازبینی پروتکل و پیاده‌سازی برای فاصله میان «امن به‌نظر رسیدن» و «امن بودن».", tags:["TLS","مدیریت کلید","ممیزی"] },
      { icon:"[۰۶]", title:"ابزارسازی امنیتی", desc:"ساخت ابزارهای داخلی که یک هفته بازبینی دستی را به یک بعدازظهر تبدیل می‌کنند.", tags:["پایتون","اتوماسیون","CLI"] },
      { icon:"[۰۷]", title:" امنیت وب", desc:"تمرکز بر امنیت برنامه‌های تحت وب، شناسایی و تحلیل آسیب‌پذیری‌ها، به‌کارگیری روش‌های تست نفوذ و بررسی نحوه بهره‌برداری از ضعف‌های امنیتی و راهکارهای ایمن‌سازی آن‌ها.", tags:["امنیت برنامه‌های تحت وب","OWASP Top 10"] },
      { icon:"[۰۸]", title:"اوسینت", desc:"جمع‌آوری اطلاعات متن‌باز، تحلیل ردپای دیجیتال، شناسایی و کشف سطح حمله.", tags:["تحلیل ردپای دیجیتال","اوسینت"] },

    ],
    experience: [
      { date:"۲۰۲۵ — اکنون", role:" SOC Analyst ", org:"مقابله با تهدیدات  ", body:"تمرکز بر اولویت‌بندی وظایف امنیتی، حل و فصل تحقیقات در حال انجام و حرکت به سمت شکار تهدید پیشگیرانه برای شناسایی خطرات احتمالی قبل از تبدیل شدن به حوادث." },
      { date:"۲۰۲۳ — ۲۰۲۴", role:"Security Engineer ", org:"تیم امنیت", body:"اجرای پروژه‌های black-box و grey-box روی اپلیکیشن‌های وب و شبکه داخلی؛ ارائه یافته‌هایی که توسعه‌دهندگان واقعاً روی آن‌ها عمل کردند." },
      { date:"۲۰۲۱ — ۲۰۲۲", role:" باگ بانتی  ", org:"کشف اسیب پذیری ", body:"تحقیقات امنیتی مستقل بر شکار باگ، کشف آسیب‌پذیری وب، شناسایی و آزمایش امنیتی دستی متمرکز بود." },
      { date:"۲۰۲۰ — ۲۰۲۱", role:" برنامه نویس و طراح سایت ", org:"  برنامه نویس  ", body:"توسعه و نگهداری وب‌سایت‌های مدرن با تمرکز بر عملکرد، قابلیت استفاده و امنیت. روی توسعه وب‌سایت‌های سفارشی، سفارشی‌سازی وردپرس، راهکارهای ووکامرس، طراحی واکنش‌گرا و ادغام فناوری‌های وب برای ارائه تجربیات دیجیتال قابل اعتماد کار کرده‌ام." },
    ],
    research: [
      { sev:"بحرانی", title:"Hikvision IP Camera - Backdoor", body:"یک آسیب‌پذیری تزریق دستور غیرمجاز که دستگاه‌های هایک‌ویژن را تحت تأثیر قرار می‌دهد، با تمرکز بر جریان بهره‌برداری، ارزیابی تأثیر و کاهش امنیت، تجزیه و تحلیل و اعتبارسنجی شد. #https://vulners.com/exploitdb/EDB-ID:50827" },
      { sev:"متوسط", title:"WordPress Plugin Weblizar 8.9 - Backdoor ", body:"بررسی یک آسیب‌پذیری درب پشتی در یک افزونه وردپرس، تجزیه و تحلیل ضعف، خطرات بهره‌برداری و تأثیر امنیتی در یک محیط کنترل‌شده. #https://www.exploit-db.com/exploits/50969" },
      { sev:"یادداشت", title:"تمام نوشته‌های من را در Medium ببینید.", body:"#https://medium.com/@sobhanmahmoody97" },
    ],
    contact: [
      { label:"ایمیل", value:"sobhanmahmoody97@gmail.com", href:"mailto:sobhanmahmoody97@gmail.com" },
      { label:"گیت‌هاب", value:"github.com/sobhan2237", href:"https://github.com/sobhan2237" },
      { label:"لینکدین", value:"in/sobhan-mahmoody/", href:"https://www.linkedin.com/in/sobhan-mahmoody/" },
      { label:"اثر انگشت PGP", value:"از طریق ایمیل درخواست دهید", href:"mailto:sobhanmahmoody97@gmail.com" },
    ]
  }
};

const BOOT_LINES = {
  en: [
    "$ whoami", "sobhan_mahmoodi", "$ initiating secure session...",
    "[ok] verifying local vision models", "[ok] mounting webgl context",
    "[ok] loading bilingual profile (en / fa)", "$ launching interface_"
  ],
  fa: [
    "$ whoami", "sobhan_mahmoodi", "$ در حال آغاز نشست امن...",
    "[ok] بررسی مدل‌های بینایی محلی", "[ok] راه‌اندازی webgl",
    "[ok] بارگذاری پروفایل دوزبانه", "$ اجرای رابط کاربری_"
  ]
};

window.I18N = I18N;
window.CONTENT = CONTENT;
window.BOOT_LINES = BOOT_LINES;
