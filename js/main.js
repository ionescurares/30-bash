/* ============== BOOT SEQUENCE ============== */
const bootLines = [
  { id: 'bootLine0', delay: 200 },
  { id: 'bootLine1', delay: 400 },
  { id: 'bootLine2', delay: 380 },
  { id: 'bootLine3', delay: 600 },
  { id: 'bootLine4', delay: 500 },
  { id: 'bootLine5', delay: 700 },
];

function runBoot() {
  let cumulative = 100;
  bootLines.forEach((l, i) => {
    cumulative += l.delay;
    setTimeout(() => {
      const el = document.getElementById(l.id);
      if (el) el.classList.add('show');
    }, cumulative);
  });

  /* Total boot duration */
  const totalDuration = cumulative + 600;
  setTimeout(endBoot, totalDuration);
}

function endBoot() {
  const boot = document.getElementById('boot');
  if (!boot) return;
  boot.classList.add('hidden');
  document.getElementById('mainContent').classList.add('revealed');
  /* Slam in the classified stamp */
  setTimeout(() => {
    document.getElementById('classifiedStamp').classList.add('slammed');
  }, 200);
  /* Start title glitch loop */
  setTimeout(startTitleGlitchLoop, 1500);
  /* Start lightning loop */
  setTimeout(startLightningLoop, 4000);
  /* Start feed glitch loop */
  setTimeout(startFeedGlitchLoop, 3000);
}

/* skip button */
document.getElementById('bootSkip').addEventListener('click', () => {
  /* show all lines instantly then end */
  bootLines.forEach(l => {
    const el = document.getElementById(l.id);
    if (el) el.classList.add('show');
  });
  setTimeout(endBoot, 200);
});

runBoot();

/* ============== SPOTLIGHT CURSOR ============== */
const sl = document.getElementById('spotlight');
document.addEventListener('mousemove', (e) => {
  sl.style.setProperty('--mx', e.clientX + 'px');
  sl.style.setProperty('--my', e.clientY + 'px');
});

/* ============== LIGHTNING ============== */
const lit = document.getElementById('lightning');
function startLightningLoop() {
  function fire() {
    lit.classList.add('flash');
    setTimeout(() => lit.classList.remove('flash'), 500);
    const next = 8000 + Math.random() * 14000;
    setTimeout(fire, next);
  }
  setTimeout(fire, 5000 + Math.random() * 6000);
}

/* ============== TITLE GLITCH ============== */
const opTitle = document.getElementById('opTitle');
function startTitleGlitchLoop() {
  function fire() {
    opTitle.classList.add('glitch');
    setTimeout(() => opTitle.classList.remove('glitch'), 200 + Math.random() * 200);
    const next = 3000 + Math.random() * 5000;
    setTimeout(fire, next);
  }
  setTimeout(fire, 2000);
}

/* ============== FEED GLITCH ============== */
const fg = document.getElementById('feedGlitch');
function startFeedGlitchLoop() {
  function fire() {
    fg.classList.add('fire');
    setTimeout(() => fg.classList.remove('fire'), 400);
    const next = 2500 + Math.random() * 3500;
    setTimeout(fire, next);
  }
  fire();
}

/* ============== LIVE TIME (top strip) ============== */
function tickTime() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  const lt = document.getElementById('liveTime');
  if (lt) lt.textContent = `${h}:${m}:${s}`;
}
tickTime();
setInterval(tickTime, 1000);

/* ============== FEED BPM JITTER ============== */
function jitterBpm() {
  const el = document.getElementById('feedBpm');
  if (!el) return;
  const base = 128;
  const j = Math.floor(Math.random() * 7) - 3;
  el.textContent = (base + j);
}
setInterval(jitterBpm, 500);

/* ============== FEED TIMESTAMP TICK ============== */
function feedTimeTick() {
  const el = document.getElementById('feedTime');
  if (!el) return;
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  el.textContent = `${h}:${m}:${s}`;
}
feedTimeTick();
setInterval(feedTimeTick, 1000);

/* ============== COUNTDOWN ============== */
const target = new Date('2026-05-23T21:00:00+03:00').getTime();
function tick() {
  const now = Date.now();
  let diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000); diff -= days * 86400000;
  const hrs  = Math.floor(diff / 3600000);  diff -= hrs * 3600000;
  const mins = Math.floor(diff / 60000);    diff -= mins * 60000;
  const secs = Math.floor(diff / 1000);
  document.getElementById('cdDays').textContent = String(days).padStart(2, '0');
  document.getElementById('cdHrs').textContent  = String(hrs).padStart(2, '0');
  document.getElementById('cdMin').textContent  = String(mins).padStart(2, '0');
  document.getElementById('cdSec').textContent  = String(secs).padStart(2, '0');
  document.getElementById('tMinus').textContent = String(days).padStart(3, '0');
}
tick();
setInterval(tick, 1000);

/* ============== BARCODE ============== */
const bc = document.getElementById('barcode');
if (bc) {
  let html = '';
  for (let i = 0; i < 38; i++) {
    const h = 8 + Math.floor(Math.random() * 6);
    const w = (Math.random() > 0.6) ? 3 : (Math.random() > 0.5 ? 2 : 1);
    html += `<i style="height:${h}px; width:${w}px;"></i>`;
  }
  bc.innerHTML = html;
}

/* ============== RSVP ============== */
document.getElementById('rsvpBtn').addEventListener('click', (e) => {
  e.preventDefault();
  const btn = e.currentTarget;
  btn.innerHTML = 'CONFIRMED <span>✓</span>';
  btn.style.background = 'var(--rust)';
  btn.style.color = 'var(--ink)';

  /* fire ACCESS GRANTED stamp */
  const stamp = document.getElementById('accessStamp');
  stamp.classList.remove('firing');
  void stamp.offsetWidth;
  stamp.classList.add('firing');

  setTimeout(() => {
    btn.innerHTML = 'RSVP <span>→</span>';
    btn.style.background = '';
    btn.style.color = '';
  }, 2200);
});

/* ============== ASSET CLICK ============== */
document.querySelectorAll('.asset').forEach(el => {
  el.addEventListener('click', () => {
    const name = el.querySelector('.ast-name');
    name.style.color = 'var(--acid)';
    setTimeout(() => name.style.color = '', 500);
  });
});

/* ============== FILE TABS ============== */
document.querySelectorAll('.file-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.file-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

/* ============== CLASSIFIED STAMP CLICK = wobble ============== */
document.getElementById('classifiedStamp').addEventListener('click', (e) => {
  const s = e.currentTarget;
  s.style.animation = 'none';
  void s.offsetWidth;
  s.style.animation = 'stampWobble 0.4s ease-in-out';
});
