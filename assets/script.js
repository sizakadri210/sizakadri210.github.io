/* ─── THEME ─── */
const themeBtn = document.getElementById("themeBtn");

function setTheme(mode) {
  if (mode === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  localStorage.setItem("theme", mode);
}

setTheme(localStorage.getItem("theme") === "dark" ? "dark" : "light");

themeBtn?.addEventListener("click", () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  setTheme(isDark ? "light" : "dark");
});

/* ─── PROJECTS DATA ─── */
const projects = [
  {
    title: "E-Commerce Sales & Customer Analytics",
    date: "Jan 2024 – Apr 2024",
    pill: "DATA ANALYTICS",
    desc: "Modeled 100K+ orders across 8 PostgreSQL tables using 20+ SQL queries with CTEs and joins. Built a star-schema Power BI model with 15+ DAX measures for RFM segmentation and MoM growth tracking. The 6-page dashboard uncovered the top 8% of sellers driving 43% of revenue and flagged $340K in churn risk.",
    tags: ["POSTGRESQL", "POWER BI", "DAX", "POWER QUERY", "SQL", "RFM SEGMENTATION"],
    shotClass: "shot--ecommerce",
    preview: { type: "placeholder", label: "E-COM" },
    github: "https://github.com/sizakadri",
  },
  {
    title: "JobBuddy 1.0 — Job Application Tracker",
    date: "Sep 2025 – Oct 2025",
    pill: "DATA PIPELINE",
    desc: "Built a Gmail API + PostgreSQL pipeline that centralizes 100+ job emails into one structured source. Cleaned and normalized records with Pandas, then deployed on GCP with OAuth-based Google Sign-in for secure multi-user access. A 3-view Streamlit dashboard cut daily tracking time from 30 minutes to under 5.",
    tags: ["PYTHON", "GMAIL API", "POSTGRESQL", "STREAMLIT", "GCP", "PANDAS"],
    shotClass: "shot--jobbuddy",
    preview: { type: "placeholder", label: "BUDDY" },
    github: "https://github.com/sizakadri",
  },
  {
    title: "Labour Attendance & Salary Dashboard",
    date: "Jun 2025 – Aug 2025",
    pill: "BI DASHBOARD",
    desc: "Built an automated attendance and payroll dashboard connecting Google Forms, Sheets, and Power BI. A Power Automate pipeline syncs daily attendance in real time, while DAX measures calculate salary, borrowings, and net pay — reducing manual payroll calculations by 90%.",
    tags: ["POWER BI", "DAX", "POWER AUTOMATE", "GOOGLE FORMS", "SHEETS"],
    shotClass: "shot--labour",
    preview: { type: "placeholder", label: "PAY" },
    github: "https://github.com/sizakadri",
  },
  {
    title: "Field Incident Reporting Pipeline",
    date: "Nov 2025 – Jan 2026",
    pill: "DATA ENGINEERING",
    desc: "Automated the reporting pipeline for 30+ field technicians, cutting incident reporting lag from 3 days to 15 minutes. Centralized 500+ monthly submissions from paper and email into a single PostgreSQL database. Analysis identified 3 high-risk sites driving 47% of incidents, reducing repeat failures by 35% in 6 weeks.",
    tags: ["GOOGLE FORMS", "POWER AUTOMATE", "POSTGRESQL", "POWER BI", "ETL"],
    shotClass: "shot--incident",
    preview: { type: "placeholder", label: "FIELD" },
    github: "https://github.com/sizakadri",
  },
];

/* ─── RENDER PROJECT CARDS ─── */
const projectList = document.getElementById("projectList");

function buildCard(p) {
  const tags = p.tags.map(t => `<span class="tag">${t}</span>`).join("");

  let shotHTML;
  if (p.preview.type === "video") {
    shotHTML = `<video class="projectShot__video" src="${p.preview.src}"
      autoplay muted loop playsinline preload="metadata"></video>`;
  } else {
    shotHTML = `<div class="projectShot__placeholder">
      <span class="shotBigText">${p.preview.label || ""}</span>
      <span class="shotSmallText">Preview</span>
    </div>`;
  }

  const liveBtn  = p.live   ? `<a class="btn btn--fill" href="${p.live}"   target="_blank" rel="noreferrer">Live ↗</a>` : "";
  const ghBtn    = p.github ? `<a class="btn"           href="${p.github}" target="_blank" rel="noreferrer">GitHub ↗</a>` : "";
  const linksRow = (liveBtn || ghBtn) ? `<div class="projectLinks">${liveBtn}${ghBtn}</div>` : "";

  return `
    <article class="projectCard">
      <div class="projectMain">
        <div class="projectTop">
          <h3 class="projectTitle">${p.title}</h3>
          <span class="pill">${p.pill}</span>
        </div>
        <p class="projectMeta">${p.date}</p>
        <p class="projectDesc">${p.desc}</p>
        <div class="tags">${tags}</div>
        ${linksRow}
      </div>
      <div class="projectShot ${p.shotClass}${p.preview.type === "video" ? " projectShot--media" : ""}"
           aria-hidden="true">${shotHTML}</div>
    </article>`;
}

if (projectList) {
  projectList.innerHTML = projects.map(buildCard).join("");

  document.querySelectorAll(".projectCard").forEach((card) => {
    const url = card.dataset.url;

    /* click to open github */
    if (url) {
      card.setAttribute("role", "link");
      card.setAttribute("tabindex", "0");
      card.addEventListener("click", (e) => {
        if (e.target.closest("a")) return; // let real links handle themselves
        window.open(url, "_blank", "noopener,noreferrer");
      });
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          window.open(url, "_blank", "noopener,noreferrer");
        }
      });
    }

    /* zoom on hover */
    card.addEventListener("mouseenter", () => {
      card.style.transition = "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.2s ease, z-index 0s";
      card.style.transform  = "scale(1.04)";
      card.style.zIndex     = "10";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.22s ease";
      card.style.transform  = "";
      card.style.zIndex     = "";
    });
  });

  /* play video only when card is on screen */
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting) {
        video.play();
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll(".projectShot__video").forEach((video) => {
    video.removeAttribute("autoplay");
    videoObserver.observe(video);
  });
}

/* ─── CUSTOM CURSOR ─── */
const cursor = document.getElementById("cursor");
let mx = 0, my = 0, cx = 0, cy = 0;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor?.classList.add("cursor--visible");
});
document.addEventListener("mouseleave", () => cursor?.classList.remove("cursor--visible"));

document.addEventListener("mouseover", (e) => {
  const over = e.target.closest("a, button, .projectCard, input, textarea, [role='link']");
  cursor?.classList.toggle("cursor--hover", !!over);
});

(function animateCursor() {
  cx += (mx - cx) * 0.12;
  cy += (my - cy) * 0.12;
  if (cursor) cursor.style.transform = `translate(${cx}px, ${cy}px)`;
  requestAnimationFrame(animateCursor);
})();

/* ─── SCROLL PROGRESS + NAV STATE ─── */
const nav       = document.getElementById("nav");
const scrollBar = document.getElementById("scrollBar");

window.addEventListener("scroll", () => {
  nav?.classList.toggle("nav--scrolled", window.scrollY > 12);

  const scrolled  = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollBar) scrollBar.style.width = `${(scrolled / maxScroll) * 100}%`;
}, { passive: true });

/* ─── SCROLL REVEAL (IntersectionObserver) ─── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el    = entry.target;
    const delay = parseInt(el.dataset.delay || "0", 10);
    setTimeout(() => el.classList.add("is-visible"), delay);
    revealObserver.unobserve(el);
  });
}, { threshold: 0.12, rootMargin: "0px 0px -32px 0px" });

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ─── ACTIVE NAV HIGHLIGHTING ─── */
const sectionIds  = ["home", "about", "project", "contact"];
const navLinks    = document.querySelectorAll("[data-section]");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach((link) =>
        link.classList.toggle("menu__link--active", link.dataset.section === id)
      );
    }
  });
}, { threshold: 0.35 });

sectionIds.forEach((id) => {
  const el = document.getElementById(id);
  if (el) sectionObserver.observe(el);
});

/* ─── HERO PARALLAX (ambient layer moves with mouse) ─── */
const heroBg  = document.querySelector(".hero__bg");
const heroEl  = document.getElementById("home");

document.addEventListener("mousemove", (e) => {
  if (!heroBg || !heroEl) return;
  if (e.clientY > heroEl.offsetHeight) return; // only active in hero viewport

  const x = (e.clientX / window.innerWidth  - 0.5) * 22;
  const y = (e.clientY / window.innerHeight - 0.5) * 14;
  heroBg.style.transform = `translate(${x}px, ${y}px)`;
});

/* ─── WATER RIPPLE ─── */
(function initWater() {
  const hero = document.getElementById("home");
  if (!hero) return;

  const canvas = document.createElement("canvas");
  canvas.id = "waterCanvas";
  canvas.setAttribute("aria-hidden", "true");
  // Insert after hero__bg so it sits above the gradient but below content
  const bg = hero.querySelector(".hero__bg");
  bg ? hero.insertBefore(canvas, bg.nextSibling) : hero.prepend(canvas);

  const ctx = canvas.getContext("2d");
  const SCALE = 2;          // simulate at half resolution — fast + smooth
  const DAMP  = 0.965;      // wave persistence (0.9 = fast decay, 0.98 = long ripples)
  let simW = 0, simH = 0;
  let buf0, buf1;

  function resize() {
    const r  = hero.getBoundingClientRect();
    simW     = Math.floor(r.width  / SCALE);
    simH     = Math.floor(r.height / SCALE);
    canvas.width  = simW;
    canvas.height = simH;
    buf0 = new Float32Array(simW * simH);
    buf1 = new Float32Array(simW * simH);
  }
  resize();
  window.addEventListener("resize", resize, { passive: true });

  function disturb(px, py, radius, strength) {
    const x  = Math.floor(px / SCALE);
    const y  = Math.floor(py / SCALE);
    const r2 = radius * radius;
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        if (dx * dx + dy * dy > r2) continue;
        const nx = x + dx, ny = y + dy;
        if (nx < 1 || nx >= simW - 1 || ny < 1 || ny >= simH - 1) continue;
        buf1[ny * simW + nx] += strength;
      }
    }
  }

  // Mouse — throttled to ~40fps drops so it feels responsive but not overwhelming
  let lastDrop = 0;
  hero.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - lastDrop < 24) return;
    lastDrop = now;
    const r = hero.getBoundingClientRect();
    disturb(e.clientX - r.left, e.clientY - r.top, 5, 260);
  });

  // Touch support
  hero.addEventListener("touchmove", (e) => {
    const r = hero.getBoundingClientRect();
    const t = e.touches[0];
    disturb(t.clientX - r.left, t.clientY - r.top, 6, 300);
  }, { passive: true });

  // Simulation: each cell = average of 4 neighbours from previous frame - current
  function step() {
    for (let y = 1; y < simH - 1; y++) {
      for (let x = 1; x < simW - 1; x++) {
        const i  = y * simW + x;
        buf0[i]  = (buf1[i - 1] + buf1[i + 1] + buf1[i - simW] + buf1[i + simW]) * 0.5 - buf0[i];
        buf0[i] *= DAMP;
      }
    }
    const tmp = buf0; buf0 = buf1; buf1 = tmp;
  }

  // Render: caustic brightness = magnitude of height gradient
  // White pixels + mix-blend-mode:screen = natural brightening of whatever's behind
  function render() {
    const img = ctx.createImageData(simW, simH);
    const pix = img.data;
    for (let y = 1; y < simH - 1; y++) {
      for (let x = 1; x < simW - 1; x++) {
        const i      = y * simW + x;
        const gx     = buf1[i + 1]    - buf1[i - 1];
        const gy     = buf1[i + simW] - buf1[i - simW];
        const bright = Math.min(255, (Math.abs(gx) + Math.abs(gy)) * 1.5) | 0;
        const idx    = i * 4;
        pix[idx]     = 255;
        pix[idx + 1] = 255;
        pix[idx + 2] = 255;
        pix[idx + 3] = bright;
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  // Pause simulation when hero is off-screen (saves CPU while scrolling)
  let heroVisible = true;
  new IntersectionObserver(
    (entries) => { heroVisible = entries[0].isIntersecting; },
    { threshold: 0 }
  ).observe(hero);

  (function loop() {
    if (heroVisible) { step(); render(); }
    requestAnimationFrame(loop);
  })();
})();

/* ─── CONTACT FORM ─── */
const contactForm   = document.getElementById("contactForm");
const formStatusEl  = document.getElementById("formStatus");
const formSubmitBtn = document.getElementById("formSubmitBtn");

function setFormStatus(msg, type) {
  if (!formStatusEl) return;
  formStatusEl.textContent = msg;
  formStatusEl.className   = `formStatus formStatus--${type}`;
}

contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const name    = document.getElementById("cf-name")?.value.trim();
  const email   = document.getElementById("cf-email")?.value.trim();
  const message = document.getElementById("cf-message")?.value.trim();

  if (!name || !email || !message) {
    setFormStatus("Please fill in all fields.", "error");
    return;
  }

  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  window.open(`mailto:sizakadri210@gmail.com?subject=${subject}&body=${body}`);

  setFormStatus("✓ Opening your email client…", "success");
  contactForm.reset();

  if (formSubmitBtn) {
    formSubmitBtn.disabled = true;
    setTimeout(() => {
      formSubmitBtn.disabled = false;
      setFormStatus("", "");
    }, 4000);
  }
});

/* ─── PAGE CURTAIN ─── */
const pageCurtain = document.getElementById("pageCurtain");
pageCurtain?.addEventListener("animationend", () => pageCurtain.remove(), { once: true });

/* ─── TEXT SCRAMBLE on hero name ─── */
(function initScramble() {
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  function scrambleNode(node, duration) {
    const original    = node.textContent;
    const totalFrames = Math.round(duration / 16);
    let frame = 0;

    const tick = setInterval(() => {
      const revealed = Math.floor((frame / totalFrames) * original.length);
      let out = "";
      for (let i = 0; i < original.length; i++) {
        out += i < revealed || original[i] === " "
          ? original[i]
          : CHARS[Math.random() * CHARS.length | 0];
      }
      node.textContent = out;
      if (++frame > totalFrames) {
        clearInterval(tick);
        node.textContent = original;
      }
    }, 16);
  }

  // Fire after each name's reveal transition completes (delay + 650ms transition)
  document.querySelectorAll(".hero__name").forEach((span) => {
    const startAt = parseInt(span.dataset.delay || "0") + 680;
    // Use only the direct text node so .hero__period span is untouched
    const textNode = Array.from(span.childNodes).find((n) => n.nodeType === Node.TEXT_NODE);
    if (textNode) setTimeout(() => scrambleNode(textNode, 850), startAt);
  });
})();

/* ─── HOLOGRAPHIC GLARE on project cards ─── */
document.querySelectorAll(".projectCard").forEach((card) => {
  const glare = document.createElement("div");
  glare.className = "card-glare";
  glare.setAttribute("aria-hidden", "true");
  card.appendChild(glare);

  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    glare.style.setProperty("--gx", `${((e.clientX - r.left) / r.width  * 100).toFixed(1)}%`);
    glare.style.setProperty("--gy", `${((e.clientY - r.top)  / r.height * 100).toFixed(1)}%`);
  });
});

/* ─── MAGNETIC BUTTONS ─── */
document.querySelectorAll(".heroBtn").forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    btn.style.transition = "transform 0.15s ease";
  });
  btn.addEventListener("mousemove", (e) => {
    const r  = btn.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width  / 2);
    const dy = e.clientY - (r.top  + r.height / 2);
    btn.style.transform = `translate(${dx * 0.28}px, ${dy * 0.38}px)`;
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transition = "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)";
    btn.style.transform  = "";
  });
});
