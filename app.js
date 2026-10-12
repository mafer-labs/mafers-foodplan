const STORAGE = {
  lang: 'mafer_lang',
  activeDay: 'mafer_active_day',
  checks: 'mafer_checks',
  water: 'mafer_water',
  logs: 'mafer_logs',
  swaps: 'mafer_swaps',
  pwaDismissed: 'mafer_pwa_dismissed', kitchen: 'mafer_kitchen', unit: 'mafer_unit', state: 'mafer_state'
};

function readStorage(key) {
  try {
    const snapshot=localStorage.getItem(STORAGE.state);
    if(snapshot){const values=JSON.parse(snapshot);if(Object.hasOwn(values,key))return values[key];}
    return localStorage.getItem(key);
  }
  catch { return null; }
}

function writeStorage(key, value) {
  try {
    const snapshot=localStorage.getItem(STORAGE.state);
    if(snapshot){const values=JSON.parse(snapshot);values[key]=value;localStorage.setItem(STORAGE.state,JSON.stringify(values));}
    else localStorage.setItem(key,value);
    return true;
  }
  catch { showToast(ui('saveFailed')); return false; }
}

function removeStorage(key) {
  try {
    const snapshot=localStorage.getItem(STORAGE.state);
    if(snapshot){const values=JSON.parse(snapshot);values[key]=null;localStorage.setItem(STORAGE.state,JSON.stringify(values));}
    else localStorage.removeItem(key);
  }
  catch { /* Ignore unavailable storage. */ }
}

function readJSON(key, fallback) {
  const raw = readStorage(key);
  if (!raw) return fallback;
  try { return JSON.parse(raw); }
  catch { return fallback; }
}

function saveJSON(key, value) {
  return writeStorage(key, JSON.stringify(value));
}

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>'"]/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[char]);
}

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const storedLang = readStorage(STORAGE.lang);
let lang = storedLang && T[storedLang] ? storedLang : 'es';

const storedDay = Number.parseInt(readStorage(STORAGE.activeDay), 10);
let activeDay = Number.isInteger(storedDay) && storedDay >= 1 && storedDay <= 10 ? storedDay : 1;

const storedChecks = readJSON(STORAGE.checks, {});
let mealChecks = storedChecks && typeof storedChecks === 'object' && !Array.isArray(storedChecks)
  ? storedChecks : {};

const storedWater = readJSON(STORAGE.water, { date: '', count: 0 });
let waterData = {
  date: typeof storedWater?.date === 'string' ? storedWater.date : '',
  count: Math.min(8, Math.max(0, Number.parseInt(storedWater?.count, 10) || 0))
};

const storedLogs = readJSON(STORAGE.logs, []);
let healthLogs = Array.isArray(storedLogs)
  ? storedLogs.filter(log => log && typeof log === 'object').map(log => ({
      timestamp: typeof log.timestamp === 'string' ? log.timestamp : '',
      date: typeof log.date === 'string' ? log.date : '',
      gluc: typeof log.gluc === 'string' || typeof log.gluc === 'number' ? String(log.gluc) : '',
      symp: typeof log.symp === 'string' ? log.symp : '',
      note: typeof log.note === 'string' ? log.note : ''
    }))
  : [];

const storedSwaps = readJSON(STORAGE.swaps, {});
let swapOverrides = storedSwaps && typeof storedSwaps === 'object' && !Array.isArray(storedSwaps)
  ? storedSwaps : {};

let currentSuggestion = null;

const TOTAL_CHECKABLE = 50; // 10 days × 5 meals (b, sa, l, sp, d)

/* ============================================================
   INIT
   ============================================================ */
function init() {
  applyLang();
  renderDayScroller();
  renderPlan();
  checkWaterReset();
  renderWater();
  renderSparkline();
  renderLogs();
  updateProgress();
  renderKitchen();
}

/* ============================================================
   LANGUAGE
   ============================================================ */
function setLang(l) {
  if (!T[l]) return;
  lang = l;
  writeStorage(STORAGE.lang, l);
  document.documentElement.lang = l;
  document.querySelectorAll('.lang-btn').forEach(button => {
    const isActive = button.dataset.lang === l;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
  applyLang();
  renderDayScroller();
  renderPlan();
  renderWater();
  renderSparkline();
  renderLogs();
  renderSuggestion();
  renderKitchen();
  applyExtraLanguage();
  if (swapContext) openSwap(swapContext.mealType, swapContext.day);
}

function t(key) { return T[lang][key] || T['es'][key] || ''; }

function applyLang() {
  document.documentElement.lang = lang;
  // header
  document.getElementById('appTag').textContent        = t('appTag');
  document.getElementById('progressLabel').textContent = t('progressLabel');
  document.getElementById('resetBtn').textContent      = t('resetBtn');
  // ideas
  document.getElementById('ideaHeading').textContent   = t('ideaHeading');
  document.getElementById('ideaSub').textContent       = t('ideaSub');
  document.getElementById('btnLunch').textContent      = t('btnLunch');
  document.getElementById('btnDinner').textContent     = t('btnDinner');
  document.getElementById('resultTitle').textContent   = t('resultTitle');
  document.getElementById('resultNote').textContent    = t('resultNote');
  document.getElementById('remTitle').textContent      = t('remTitle');
  document.getElementById('rem1').textContent          = t('rem1');
  document.getElementById('rem2').textContent          = t('rem2');
  document.getElementById('rem3').textContent          = t('rem3');
  document.getElementById('rem4').textContent          = t('rem4');
  document.getElementById('rem5').textContent          = t('rem5');
  // health
  document.getElementById('healthHeading').textContent = t('healthHeading');
  document.getElementById('healthSub').textContent     = t('healthSub');
  document.getElementById('waterTitle').textContent    = t('waterTitle');
  document.getElementById('sparkTitle').textContent    = t('sparkTitle');
  document.getElementById('formTitle').textContent     = t('formTitle');
  document.getElementById('lblGluc').textContent       = t('lblGluc');
  document.getElementById('lblSymp').textContent       = t('lblSymp');
  document.getElementById('lblNote').textContent       = t('lblNote');
  document.getElementById('saveBtn').textContent       = t('saveBtn');
  document.getElementById('histTitle').textContent     = t('histTitle');
  document.getElementById('clearBtn').textContent      = t('clearBtn');
  // nav
  document.querySelectorAll('.nav-label').forEach(el => {
    el.textContent = t(el.dataset.key);
  });
  // water count label
  renderWaterCount();

  // Apple Health
  const ahStrings = {
    es: { title: '🍎 Importar desde Apple Health', sub: 'Exporta desde la app Salud → tu foto → Exportar datos → sube el XML aquí', btn: '📂 Seleccionar archivo XML' },
    en: { title: '🍎 Import from Apple Health', sub: 'Export from Health app → your photo → Export All → upload the XML here', btn: '📂 Select XML file' },
    no: { title: '🍎 Importer fra Apple Health', sub: 'Eksporter fra Helse-app → ditt bilde → Eksporter data → last opp XML her', btn: '📂 Velg XML-fil' }
  };
  const ahCopy = ahStrings[lang] || ahStrings.es;
  document.getElementById('ahTitle').textContent = ahCopy.title;
  document.getElementById('ahSub').textContent = ahCopy.sub;
  document.getElementById('ahBtnLabel').textContent = ahCopy.btn;
  // PWA banner
  const pwaStr = {
    es: { text: '📲 Instalar Plan Mafer en tu teléfono', action: 'Instalar', close: 'Cerrar' },
    en: { text: '📲 Install Plan Mafer on your phone', action: 'Install', close: 'Close' },
    no: { text: '📲 Installer Plan Mafer på telefonen', action: 'Installer', close: 'Lukk' }
  };
  const pwaCopy = pwaStr[lang] || pwaStr.es;
  document.getElementById('pwaBannerText').textContent = pwaCopy.text;
  document.getElementById('pwaInstallBtn').textContent = pwaCopy.action;
  document.querySelector('.pwa-dismiss').setAttribute('aria-label', pwaCopy.close);
}


/* ============================================================
   PROGRESS BAR
   ============================================================ */
function updateProgress() {
  let checked = 0;
  for (let day = 1; day <= 10; day++) {
    ['b', 'sa', 'l', 'sp', 'd'].forEach(meal => {
      if (mealChecks[`d${day}_${meal}`] === true) checked++;
    });
  }
  const pct = Math.round((checked / TOTAL_CHECKABLE) * 100);
  const progressFill = document.getElementById('progressFill');
  progressFill.style.width = pct + '%';
  progressFill.setAttribute('aria-valuenow', String(pct));
  document.getElementById('progressPct').textContent  = pct + '%';
}

/* ============================================================
   DAY SCROLLER
   ============================================================ */
function renderDayScroller() {
  const scroller = document.getElementById('dayScroller');
  scroller.innerHTML = '';
  for (let d = 1; d <= 10; d++) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'day-btn' +
      (d === activeDay ? ' active' : '') +
      (isDayDone(d)    ? ' done'   : '');
    btn.textContent = t('day') + ' ' + d;
    if (d === activeDay) btn.setAttribute('aria-current', 'true');
    btn.onclick = () => goToDay(d);
    scroller.appendChild(btn);
  }
}

function goToDay(d) {
  if (!Number.isInteger(d) || d < 1 || d > 10) return;
  activeDay = d;
  writeStorage(STORAGE.activeDay, String(d));
  renderDayScroller();
  renderPlan();
}

function isDayDone(d) {
  return ['b','sa','l','sp','d'].every(m => mealChecks[`d${d}_${m}`]);
}

/* ============================================================
   PLAN RENDERER
   ============================================================ */
function renderPlan() {
  const d   = activeDay;
  const m   = MENU[d][lang];

  const meals = [
    { key: `d${d}_b`,  label: t('mealB'),  body: m.b,          checkable: true,  cls: 'meal-b'  },
    { key: `d${d}_sa`, label: t('mealSa'), body: t('snackAm'), checkable: true,  cls: 'meal-sa' },
    { key: `d${d}_l`,  label: t('mealL'),  body: m.l,          checkable: true,  cls: 'meal-l'  },
    { key: `d${d}_sp`, label: t('mealSp'), body: t('snackPm'), checkable: true,  cls: 'meal-sp' },
    { key: `d${d}_d`,  label: t('mealD'),  body: m.d,          checkable: true,  cls: 'meal-d'  },
  ];

  document.getElementById('planContent').innerHTML = meals.map(meal => {
    const done = !!mealChecks[meal.key];
    const baseType = meal.key.replace(/d\d+_/, '');
    const canSwap = ['b','l','d'].includes(baseType);
    const swapIdx = Number.parseInt(swapOverrides[meal.key], 10);
    const swapOptions = SWAPS[baseType]?.[lang] || SWAPS[baseType]?.['es'];
    const hasValidSwap = canSwap && Number.isInteger(swapIdx) && swapOptions?.[swapIdx];
    const bodyText = canSwap ? mealText(d,baseType) : meal.body;

    return `
      <div class="card ${meal.cls}${done ? ' checked' : ''}" id="card-${meal.key}">
        <div class="meal-title">${escapeHTML(meal.label)}</div>
        <div class="meal-body">${escapeHTML(bodyText)}</div>
        ${canSwap ? `<button type="button" class="swap-hint" onclick="openSwap('${meal.key}', ${d})">${escapeHTML(t('swapHint'))}</button>` : ''}
        <button type="button" class="check-btn" onclick="toggleMeal('${meal.key}', ${d})" aria-label="${escapeHTML(t('toggleMeal'))}" aria-pressed="${done}"></button>
      </div>`;
  }).join('');
}

/* ============================================================
   MEAL TOGGLE
   ============================================================ */
function toggleMeal(key, day) {
  if (!/^d(?:10|[1-9])_(?:b|sa|l|sp|d)$/.test(key)) return;
  const previous = {...mealChecks};
  if (mealChecks[key]) {
    delete mealChecks[key];
  } else {
    mealChecks[key] = true;
  }
  if (!saveJSON(STORAGE.checks, mealChecks)) { mealChecks=previous; return; }
  // Update only the tapped card for snappy UX
  const card = document.getElementById('card-' + key);
  if (card) {
    card.classList.toggle('checked', !!mealChecks[key]);
    card.querySelector('.check-btn')?.setAttribute('aria-pressed', String(!!mealChecks[key]));
  }
  // Refresh scroller badge + progress
  renderDayScroller();
  updateProgress();
}

/* ============================================================
   RESET CYCLE
   ============================================================ */
function resetCycle() { document.getElementById('resetDialog').showModal(); }
function performReset() {
  const restore=document.getElementById('restoreMeals').checked;
  const values={[STORAGE.checks]:{},[STORAGE.activeDay]:'1'};
  if(restore) {values[STORAGE.swaps]={};values[STORAGE.kitchen]={...kitchen,checked:{}};}
  if(!storeTransaction(values)) return;
  mealChecks={}; activeDay=1;
  if(restore) {swapOverrides={};kitchen={...kitchen,checked:{}};}
  document.getElementById('resetDialog').close();
  renderDayScroller();renderPlan();updateProgress();renderKitchen();showToast(t('toastReset'));
}

/* ============================================================
   RANDOM MEAL GENERATOR
   ============================================================ */
function generateMeal(type) {
  if (!['lunch', 'dinner'].includes(type)) return;
  const c = COMBOS[lang];
  const pickIndex = arr => Math.floor(Math.random() * arr.length);
  currentSuggestion = {
    type,
    prot: pickIndex(c.prot),
    carb: pickIndex(c.carb),
    veg: pickIndex(c.veg),
    fat: pickIndex(c.fat)
  };
  renderSuggestion();
}

function renderSuggestion() {
  if (!currentSuggestion) return;
  const c = COMBOS[lang];
  const { type, prot, carb, veg, fat } = currentSuggestion;

  const rows = type === 'lunch'
    ? [{cat: t('catProt'), val: c.prot[prot]}, {cat: t('catCarb'), val: c.carb[carb]}, {cat: t('catVeg'), val: c.veg[veg]}, {cat: t('catFat'), val: c.fat[fat]}]
    : [{cat: t('catProt'), val: c.prot[prot]}, {cat: t('catCarb'), val: c.carb[carb]}, {cat: t('catVeg'), val: c.veg[veg]}];

  document.getElementById('resultRows').innerHTML = rows.map(r =>
    `<div class="result-row"><span class="cat">${escapeHTML(r.cat)}</span><span>${escapeHTML(r.val)}</span></div>`
  ).join('');

  const card = document.getElementById('resultCard');
  card.classList.add('visible');
}

/* ============================================================
   WATER TRACKER
   ============================================================ */
function checkWaterReset() {
  const today = localDateKey();
  if (waterData.date !== today) {
    waterData = { date: today, count: 0 };
    saveJSON(STORAGE.water, waterData);
  }
}

function renderWater() {
  const wrap = document.getElementById('waterGlasses');
  wrap.innerHTML = '';
  for (let i = 1; i <= 8; i++) {
    const btn = document.createElement('button');
    btn.type        = 'button';
    btn.className   = 'glass-btn ' + (i <= waterData.count ? 'filled' : 'empty');
    btn.innerHTML   = `<span class="glass-icon">💧</span>`;
    btn.onclick     = () => setWater(i);
    btn.setAttribute('aria-label', `${t('glass')} ${i}`);
    btn.setAttribute('aria-pressed', String(i <= waterData.count));
    wrap.appendChild(btn);
  }
  renderWaterCount();
}

function renderWaterCount() {
  document.getElementById('waterCount').textContent =
    `${waterData.count} / 8 ${t('waterOf')}`;
}

function setWater(n) {
  checkWaterReset();
  const previous={...waterData};
  // Toggle: click filled = unfill from that glass
  waterData.count = (waterData.count === n) ? n - 1 : n;
  if(!saveJSON(STORAGE.water, waterData)) waterData=previous;
  renderWater();
}

/* ============================================================
   GLUCOSE SPARKLINE
   ============================================================ */
function renderSparkline() {
  const wrap = document.getElementById('sparklineWrap');
  const glucoseEntries = healthLogs
    .filter(l => l.gluc && Number.isFinite(Number(l.gluc)))
    .slice(0, 7)
    .reverse();

  if (glucoseEntries.length < 2) {
    wrap.innerHTML = `<div class="sparkline-empty">${t('sparkEmpty')}</div>`;
    return;
  }

  const vals = glucoseEntries.map(l => displayGlucose(l.gluc));
  const minV  = Math.min(...vals);
  const maxV  = Math.max(...vals);
  const range = maxV - minV || 10;
  const W     = 320;
  const H     = 76;
  const pad   = 20;

  const pts = vals.map((v, i) => {
    const x = pad + (i / (vals.length - 1)) * (W - pad * 2);
    const y = H - pad - ((v - minV) / range) * (H - pad * 2);
    return `${x},${y}`;
  });

  // Display readings without assigning a universal clinical target.

  wrap.innerHTML = `
    <svg width="100%" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">
      <polyline fill="none" stroke="#74C69D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="${pts.join(' ')}"/>
      ${vals.map((v, i) => {
        const [x, y] = pts[i].split(',');
        const color = '#2D6A4F';
        return `<circle cx="${x}" cy="${y}" r="3.5" fill="${color}" stroke="white" stroke-width="1.5"/>
                <text x="${x}" y="${parseFloat(y) - 7}" text-anchor="middle" font-size="9" fill="${color}" font-weight="700" font-family="Nunito,sans-serif">${(glucoseUnit === 'mmol/L' ? v.toFixed(1) : Math.round(v))}</text>`;
      }).join('')}
    ${glucoseEntries.map((l,i)=>`<text x="${pts[i].split(',')[0]}" y="${H-2}" text-anchor="middle" font-size="8">${escapeHTML(new Date(l.timestamp || l.date).toLocaleDateString({es:'es',en:'en',no:'nb'}[lang],{month:'numeric',day:'numeric'}))}</text>`).join('')}
    </svg>`;
}

/* ============================================================
   HEALTH LOG
   ============================================================ */
function saveLog() {
  const field=document.getElementById('inputGluc');
  let gluc;
  try { gluc=PlanCore.glucose(field.value.trim(),glucoseUnit); }
  catch { document.getElementById('logError').textContent=ui('invalidGlucose');field.setAttribute('aria-invalid','true');field.focus();return; }
  const symp=document.getElementById('inputSymp').value.trim();
  const note=document.getElementById('inputNote').value.trim();
  if(!gluc&&!symp&&!note) return;
  const time=document.getElementById('logTime').value;
  const now=time ? new Date(time) : new Date();
  if(!Number.isFinite(now.getTime()) || now>new Date()) {document.getElementById('logError').textContent=ui('invalidDate');return;}
  const entry={timestamp:now.toISOString(),date:now.toLocaleString(),gluc,symp,note};
  const next=healthLogs.slice();
  if(editLogIndex !== null) next.splice(editLogIndex,1);
  next.push(entry);
  const sorted=PlanCore.mergeLogs(next,[]);
  if(!saveJSON(STORAGE.logs,sorted)) return;
  healthLogs=sorted;
  cancelLogEdit();renderLogs();renderSparkline();showToast(t('toastSaved'));
}

function formatLogDate(log) {
  if (!log.timestamp) return log.date;
  const parsed = new Date(log.timestamp);
  if (Number.isNaN(parsed.getTime())) return log.date;
  const locale = { es: 'es', en: 'en', no: 'nb' }[lang] || 'es';
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(parsed);
}

function renderLogs() {
  const container = document.getElementById('logHistory');
  if (!healthLogs.length) {
    container.innerHTML = `<div style="text-align:center;color:var(--text-muted);font-size:0.85rem;font-weight:600;padding:20px 0;">&mdash;</div>`;
    return;
  }
  container.innerHTML = healthLogs.map((log,index) => `
    <div class="log-entry">
      <div class="log-date">${escapeHTML(formatLogDate(log))}</div><div class="actions"><button type="button" onclick="editLog(${index})">${ui('edit')}</button><button type="button" onclick="deleteLog(${index})">${ui('delete')}</button></div>
      ${log.gluc ? `<div class="log-row">🩸 ${escapeHTML(t('glucoseLabel'))}: <strong>${escapeHTML(formatGlucose(log.gluc))}</strong></div>` : ''}
      ${log.symp ? `<div class="log-row">⚠️ ${escapeHTML(t('sympLabel'))}: ${escapeHTML(log.symp)}</div>` : ''}
      ${log.note ? `<div class="log-note">📝 ${escapeHTML(log.note)}</div>` : ''}
    </div>`).join('');
}

function clearLogs() {
  if (!confirm(t('confirmClear'))) return;
  if(!saveJSON(STORAGE.logs,[])) return;
  healthLogs = [];
  cancelLogEdit();
  renderLogs();
  renderSparkline();
}

/* ============================================================
   TAB SWITCHER
   ============================================================ */
function switchTab(tab, btn) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById('section-' + tab).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.remove('active');
    b.removeAttribute('aria-current');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-current', 'page');
}

/* ============================================================
   TOAST
   ============================================================ */
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}
/* ============================================================
   MEAL SWAP UI
   ============================================================ */
let swapContext = null;
let swapTrigger = null;

function openSwap(mealType, day) {
  const baseType = mealType.replace(/d\d+_/, ''); // e.g. 'd3_l' → 'l'
  const swapList = SWAPS[baseType];
  if (!swapList) return;

  swapContext = { mealType, day };
  const options = swapList[lang] || swapList['es'];

  document.getElementById('swapTitle').textContent =
    lang === 'es' ? 'Opciones de sustitución' :
    lang === 'en' ? 'Meal swap options' : 'Alternativer';

  document.getElementById('swapOptions').innerHTML = options.map((opt, i) =>
    `<button type="button" class="swap-option" onclick="applySwap(${i})">${escapeHTML(opt)}</button>`
  ).join('');

  document.getElementById('swapCloseBtn').textContent =
    lang === 'es' ? 'Cerrar' : lang === 'en' ? 'Close' : 'Lukk';

  const panel = document.getElementById('swapPanel');
  if(!panel.open) swapTrigger=document.activeElement;
  panel.showModal();
  panel.classList.add('open');
  panel.setAttribute('aria-hidden', 'false');
  document.getElementById('swapOverlay').classList.add('open');
  panel.querySelector('.swap-option')?.focus();
}

function applySwap(optionIndex) {
  if (!swapContext) return;
  const { mealType } = swapContext;
  const baseType = mealType.replace(/d\d+_/, '');
  const options = SWAPS[baseType]?.[lang] || SWAPS[baseType]?.['es'];
  if (!options || !Number.isInteger(optionIndex) || !options[optionIndex]) return;

  // Store swap override
  const next={...swapOverrides,[mealType]:optionIndex};
  const nextKitchen={...kitchen,checked:{}};
  if(!storeTransaction({[STORAGE.swaps]:next,[STORAGE.kitchen]:nextKitchen})) return;
  swapOverrides=next;kitchen=nextKitchen;

  closeSwap();
  renderPlan();
  renderKitchen();
  showToast(lang === 'es' ? '↔ Comida sustituida ✓' : lang === 'en' ? '↔ Meal swapped ✓' : '↔ Byttet ✓');
}

function closeSwap() {
  const panel = document.getElementById('swapPanel');
  panel.classList.remove('open');
  panel.setAttribute('aria-hidden', 'true');
  document.getElementById('swapOverlay').classList.remove('open');
  swapContext = null;
  panel.close();
  swapTrigger?.focus();
}

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && swapContext) closeSwap();
});

/* ============================================================
   APPLE HEALTH XML IMPORT
   ============================================================ */
function importAppleHealth(input) {
  const file = input.files[0];
  if (!file) return;
  if(file.size>25*1024*1024) {showToast(ui('largeFile'));input.value='';return;}

  const status = document.getElementById('ahStatus');
  status.style.color = '#FF9F0A';
  status.textContent = lang === 'es' ? 'Leyendo archivo...' : lang === 'en' ? 'Reading file...' : 'Leser fil...';

  const processXML = (xmlText) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xmlText, 'text/xml');
      if (doc.querySelector('parsererror')) throw new Error('Invalid XML');

      // Apple Health glucose identifiers
      const glucoseTypes = [
        'HKQuantityTypeIdentifierBloodGlucose'
      ];

      let records = [];
      glucoseTypes.forEach(type => {
        const nodes = doc.querySelectorAll(`Record[type="${type}"]`);
        nodes.forEach(node => {
          const val = Number(node.getAttribute('value'));
          const unit = node.getAttribute('unit') || 'mg/dL';
          const dateStr = node.getAttribute('startDate') || node.getAttribute('endDate') || '';

          // Convert mmol/L to mg/dL if needed
          if(!['mg/dL','mmol/L'].includes(unit)) return;
          let mgdl;
          try {mgdl=Number(PlanCore.glucose(val,unit));} catch {return;}

          if (!isNaN(mgdl) && mgdl > 0 && dateStr) {
            const d = new Date(dateStr);
            if (Number.isNaN(d.getTime())) return;
            records.push({
              timestamp: d.toISOString(),
              date: d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}),
              gluc: String(mgdl),
              symp: '',
              note: '📱 Apple Health'
            });
          }
        });
      });

      if (records.length === 0) {
        status.style.color = '#FF6B6B';
        status.textContent = lang === 'es' ? '⚠️ No se encontraron datos de glucosa' :
                             lang === 'en' ? '⚠️ No glucose data found' : '⚠️ Ingen glukosedata funnet';
        return;
      }

      // Sort newest first and deduplicate using the locale-independent timestamp.
      records.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
      const seenKeys = new Set(healthLogs.map(l => `${l.timestamp || l.date}|${l.gluc}`));
      const newRecords = records.filter(record => {
        const key = `${record.timestamp}|${record.gluc}`;
        if (seenKeys.has(key)) return false;
        seenKeys.add(key);
        return true;
      });

      const merged=PlanCore.mergeLogs(healthLogs,newRecords);
      if(!saveJSON(STORAGE.logs,merged)) return;
      healthLogs=merged;
      cancelLogEdit();
      renderLogs();
      renderSparkline();

      status.style.color = '#30D158';
      status.textContent = lang === 'es' ? `✅ ${newRecords.length} lecturas importadas` :
                           lang === 'en' ? `✅ ${newRecords.length} readings imported` :
                           `✅ ${newRecords.length} målinger importert`;

      input.value = '';
    } catch (e) {
      status.style.color = '#FF6B6B';
      status.textContent = lang === 'es' ? '❌ Error al leer el archivo' :
                           lang === 'en' ? '❌ Could not read file' : '❌ Kunne ikke lese filen';
    }
  };

  if (file.name.toLowerCase().endsWith('.xml')) {
    const reader = new FileReader();
    reader.onload = e => processXML(e.target.result);
    reader.onerror = () => {
      status.style.color = '#FF6B6B';
      status.textContent = lang === 'es' ? '❌ Error al leer el archivo' :
                           lang === 'en' ? '❌ Could not read file' : '❌ Kunne ikke lese filen';
    };
    reader.readAsText(file);
  } else {
    status.style.color = '#FF6B6B';
    status.textContent = lang === 'es' ? '⚠️ Selecciona el archivo export.xml' :
                         lang === 'en' ? '⚠️ Select the export.xml file' :
                         '⚠️ Velg export.xml-filen';
  }
}

/* ============================================================
   PWA — Service Worker + Install Prompt
   ============================================================ */
let pwaPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  pwaPrompt = e;
  const dismissed = readStorage(STORAGE.pwaDismissed);
  if (!dismissed) {
    document.getElementById('pwaBanner').classList.add('show');
  }
});

function installPWA() {
  if (!pwaPrompt) return;
  pwaPrompt.prompt();
  pwaPrompt.userChoice.then(result => {
    if (result.outcome === 'accepted') {
      document.getElementById('pwaBanner').classList.remove('show');
      writeStorage(STORAGE.pwaDismissed, '1');
    }
  });
}

function dismissPWA() {
  document.getElementById('pwaBanner').classList.remove('show');
  writeStorage(STORAGE.pwaDismissed, '1');
}

window.addEventListener('appinstalled', () => {
  document.getElementById('pwaBanner').classList.remove('show');
});

/* Service Worker registration */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

/* ============================================================
   BOOT
   ============================================================ */
// Restore lang button state from saved preference
document.querySelectorAll('.lang-btn').forEach(button => {
  const isActive = button.dataset.lang === lang;
  button.classList.toggle('active', isActive);
  button.setAttribute('aria-pressed', String(isActive));
});
