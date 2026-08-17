// KreditkaPlanCore — компактная таблица плана погашения Т-Банк Платинум.
// Плитка Home Screen + тап → флаги (снятие +10к, велик, буфер, еда) с пересчётом.
const MARKER = "KREDITKA_PLAN_WIDGET_V1";
const CORE_VERSION = "1.0";

const SETTINGS_NAME = "kreditka-plan-settings.json";
const RATE_PER_DAY = 0.00164; // ≈ 59,9% / 365

const DEFAULT_FLAGS = {
  extraWithdraw: true, // снятие/перевод +10 000 к старту
  skipBike: false, // отложить велик 6к → +6к на карту 05.09
  microBuffer: false, // взнос 25.08 = 13к вместо 15к
  honestFood: true, // закрыть дыру еды 10.09 и 25.09
};

function fm() {
  return FileManager.local();
}

function settingsPath() {
  return fm().joinPath(fm().documentsDirectory(), SETTINGS_NAME);
}

function loadJson(path, fallback) {
  try {
    if (!fm().fileExists(path)) return fallback;
    return JSON.parse(fm().readString(path));
  } catch (e) {
    return fallback;
  }
}

function saveJson(path, data) {
  try {
    fm().writeString(path, JSON.stringify(data));
  } catch (e) {}
}

function loadFlags() {
  const raw = loadJson(settingsPath(), {});
  return Object.assign({}, DEFAULT_FLAGS, raw.flags || raw);
}

function saveFlags(flags) {
  saveJson(settingsPath(), {
    flags: flags,
    savedAt: new Date().toISOString(),
    version: CORE_VERSION,
  });
}

function rub(n) {
  const x = Math.round(Number(n) || 0);
  const sign = x < 0 ? "−" : "";
  const abs = Math.abs(x);
  if (abs >= 1000) {
    const k = abs / 1000;
    const s =
      k >= 10 || Math.abs(k - Math.round(k)) < 0.05
        ? String(Math.round(k))
        : k.toFixed(1).replace(".0", "");
    return sign + s + "к";
  }
  return sign + String(abs);
}

function rubFull(n) {
  const x = Math.round(Number(n) || 0);
  return x.toLocaleString("ru-RU") + " ₽";
}

function accrue(debt, days) {
  if (days <= 0 || debt <= 0) return { debt: debt, interest: 0 };
  const interest = debt * RATE_PER_DAY * days;
  return { debt: debt + interest, interest: interest };
}

/** Полный пересчёт плана по флагам. */
function compute(flags) {
  const f = Object.assign({}, DEFAULT_FLAGS, flags || {});

  const startDebt = 100000 + (f.extraWithdraw ? 10000 : 0);
  const pay2508 = f.microBuffer ? 13000 : 15000;
  const food10 = f.honestFood ? 7500 : 0;
  const food25 = f.honestFood ? 17500 : 10000;
  const pay0509 = 30000 + (f.skipBike ? 6000 : 0);
  const pay1009 = Math.max(0, 83000 - 69000 - food10);
  const pay2509 = Math.max(0, 63000 - food25);

  const reserve2508 = 20000 + 15000 + (f.skipBike ? 0 : 6000) + 7000;
  const cashLeft2508 = 63000 - reserve2508 - pay2508;

  let interestTotal = 0;
  let debt = startDebt - pay2508;
  const after2508 = debt;

  let step = accrue(debt, 7); // 29.08 → 05.09
  debt = step.debt;
  interestTotal += step.interest;
  const before0509 = debt;

  debt = Math.max(0, debt - pay0509);
  const after0509 = debt;

  step = accrue(debt, 5); // 05.09 → 10.09
  debt = step.debt;
  interestTotal += step.interest;
  const before1009 = debt;

  debt = Math.max(0, debt - pay1009);
  const after1009 = debt;

  step = accrue(debt, 15); // 10.09 → 25.09
  debt = step.debt;
  interestTotal += step.interest;
  const before2509 = debt;

  debt = Math.max(0, debt - pay2509);
  const after2509 = debt;

  step = accrue(debt, 4); // 25.09 → 29.09
  debt = step.debt;
  interestTotal += step.interest;
  const tail = Math.max(0, debt);

  const minPay = Math.max(600, Math.round(startDebt * 0.08));
  const minCovered = pay2508 >= minPay;

  return {
    flags: f,
    startDebt,
    pay2508,
    pay0509,
    pay1009,
    pay2509,
    food10,
    food25,
    reserve2508,
    cashLeft2508,
    after2508,
    before0509,
    after0509,
    before1009,
    after1009,
    before2509,
    after2509,
    tail,
    interestTotal,
    minPay,
    minCovered,
  };
}

function flagChips(flags) {
  return [
    (flags.extraWithdraw ? "●" : "○") + "+10к",
    (flags.skipBike ? "●" : "○") + "велик↓",
    (flags.microBuffer ? "●" : "○") + "буфер",
    (flags.honestFood ? "●" : "○") + "еда",
  ].join("  ");
}

function rowData(plan) {
  return [
    { key: "Старт долга", value: rub(plan.startDebt), emphasize: true },
    { key: "Взнос 25.08", value: rub(plan.pay2508) },
    { key: "После 25.08", value: rub(plan.after2508) },
    { key: "Взнос 05.09", value: rub(plan.pay0509) },
    { key: "Взнос 10.09", value: rub(plan.pay1009) },
    { key: "Взнос 25.09", value: rub(plan.pay2509) },
    { key: "Хвост 29.09", value: rub(plan.tail), emphasize: true },
    { key: "% за путь", value: rub(plan.interestTotal) },
  ];
}

function color(hex, alpha) {
  const c = new Color(hex);
  if (alpha != null) c.alpha = alpha;
  return c;
}

function addRow(widget, label, value, opts) {
  opts = opts || {};
  const h = widget.addStack();
  h.layoutHorizontally();
  h.centerAlignContent();
  const left = h.addText(label);
  left.font = Font.mediumSystemFont(opts.small ? 11 : 12);
  left.textColor = color(opts.emphasize ? "#E8F1F2" : "#9BB0B5");
  left.lineLimit = 1;
  h.addSpacer();
  const right = h.addText(value);
  right.font = opts.emphasize ? Font.boldSystemFont(13) : Font.semiboldSystemFont(12);
  right.textColor = color(opts.emphasize ? "#5EEAD4" : "#F3F7F8");
  right.lineLimit = 1;
  right.rightAlignText();
  if (!opts.noGap) widget.addSpacer(3);
}

async function buildWidget(plan, family) {
  const w = new ListWidget();
  w.backgroundColor = color("#152028");
  w.setPadding(12, 14, 12, 14);
  w.refreshAfterDate = new Date(Date.now() + 60 * 60 * 1000);

  const title = w.addText("Кредитка · план");
  title.font = Font.boldSystemFont(11);
  title.textColor = color("#5EEAD4");
  w.addSpacer(2);

  const chips = w.addText(flagChips(plan.flags));
  chips.font = Font.mediumSystemFont(9);
  chips.textColor = color("#7A9298");
  chips.lineLimit = 1;
  w.addSpacer(8);

  const rows = rowData(plan);
  const limit = family === "large" ? rows.length : family === "small" ? 4 : 6;
  for (let i = 0; i < Math.min(limit, rows.length); i++) {
    const r = rows[i];
    addRow(w, r.key, r.value, {
      emphasize: r.emphasize,
      small: family === "small",
      noGap: i === limit - 1,
    });
  }

  if (!plan.minCovered) {
    w.addSpacer(6);
    const warn = w.addText("! минималка не закрыта");
    warn.font = Font.boldSystemFont(10);
    warn.textColor = color("#F59E0B");
  }

  return w;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function tableHtml(initialFlags) {
  const boot = JSON.stringify(Object.assign({}, DEFAULT_FLAGS, initialFlags || {}));
  return `<!DOCTYPE html>
<html><head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1"/>
<style>
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
body{margin:0;font:15px -apple-system,system-ui;background:#0F171C;color:#E8F1F2;padding:16px;padding-bottom:28px}
h1{font-size:18px;margin:0 0 4px;color:#5EEAD4}
.sub{color:#7A9298;font-size:12px;margin-bottom:14px}
.flags{display:flex;flex-direction:column;gap:8px;margin-bottom:16px}
.flag{display:flex;gap:10px;align-items:flex-start;background:#1A2830;border-radius:12px;padding:12px;border:1px solid #24343E}
.flag input{width:20px;height:20px;margin-top:2px}
.flag b{display:block;font-size:14px}
.flag small{display:block;color:#8AA0A8;font-size:11px;margin-top:2px;line-height:1.35}
.tail{margin:4px 0 14px;padding:14px;border-radius:14px;background:#134E4A;border:1px solid #2A6A64}
.tail .l{font-size:12px;color:#9BB0B5}
.tail .v{font-size:28px;font-weight:800;color:#5EEAD4;margin-top:2px}
table{width:100%;border-collapse:collapse}
td{padding:8px 0;border-bottom:1px solid #223038;font-size:13px}
td.num{text-align:right;font-variant-numeric:tabular-nums;font-weight:600}
tr.strong td{color:#5EEAD4;font-weight:700;font-size:14px}
.hint{margin-top:14px;color:#7A9298;font-size:11px;line-height:1.4}
</style></head><body>
<h1>Кредитка · план</h1>
<div class="sub">Включи/выключи флаг — таблица пересчитается · v${CORE_VERSION}</div>
<div class="flags">
  <label class="flag"><input type="checkbox" id="extraWithdraw"/><span><b>Снятие +10 000</b><small>Доп. долг к старту (100к → 110к). Выключи, если не снимаешь.</small></span></label>
  <label class="flag"><input type="checkbox" id="skipBike"/><span><b>Отложить велик 6 000</b><small>Не платить 01.09 → +6к к взносу 05.09.</small></span></label>
  <label class="flag"><input type="checkbox" id="microBuffer"/><span><b>Микробуфер 25.08</b><small>Взнос 13к вместо 15к, оставить ~2к наличные.</small></span></label>
  <label class="flag"><input type="checkbox" id="honestFood"/><span><b>Честная еда</b><small>Еда 7,5к на 10.09 и 17,5к на 25.09 (дыра из анализа).</small></span></label>
</div>
<div class="tail"><div class="l">Хвост ≈ 29.09</div><div class="v" id="tail">—</div></div>
<table id="tbl"></table>
<p class="hint">Закрой экран (Done/Close) — флаги сохранятся и обновят виджет. Сброс: выключи все лишние флаги вручную.</p>
<script>
window.__flags = ${boot};
const RATE = ${RATE_PER_DAY};
function rubFull(n){
  const x = Math.round(Number(n)||0);
  return x.toLocaleString('ru-RU') + ' ₽';
}
function accrue(debt, days){
  if (days <= 0 || debt <= 0) return {debt, interest:0};
  const interest = debt * RATE * days;
  return {debt: debt + interest, interest};
}
function compute(f){
  const startDebt = 100000 + (f.extraWithdraw ? 10000 : 0);
  const pay2508 = f.microBuffer ? 13000 : 15000;
  const food10 = f.honestFood ? 7500 : 0;
  const food25 = f.honestFood ? 17500 : 10000;
  const pay0509 = 30000 + (f.skipBike ? 6000 : 0);
  const pay1009 = Math.max(0, 83000 - 69000 - food10);
  const pay2509 = Math.max(0, 63000 - food25);
  const reserve2508 = 20000 + 15000 + (f.skipBike ? 0 : 6000) + 7000;
  const cashLeft2508 = 63000 - reserve2508 - pay2508;
  let interestTotal = 0;
  let debt = startDebt - pay2508;
  const after2508 = debt;
  let step = accrue(debt, 7); debt = step.debt; interestTotal += step.interest;
  const before0509 = debt;
  debt = Math.max(0, debt - pay0509); const after0509 = debt;
  step = accrue(debt, 5); debt = step.debt; interestTotal += step.interest;
  const before1009 = debt;
  debt = Math.max(0, debt - pay1009); const after1009 = debt;
  step = accrue(debt, 15); debt = step.debt; interestTotal += step.interest;
  const before2509 = debt;
  debt = Math.max(0, debt - pay2509); const after2509 = debt;
  step = accrue(debt, 4); debt = step.debt; interestTotal += step.interest;
  const tail = Math.max(0, debt);
  const minPay = Math.max(600, Math.round(startDebt * 0.08));
  return {startDebt,pay2508,pay0509,pay1009,pay2509,food10,food25,reserve2508,cashLeft2508,after2508,before0509,after0509,before1009,after1009,before2509,after2509,tail,interestTotal,minPay,minCovered: pay2508 >= minPay};
}
function readFlags(){
  return {
    extraWithdraw: document.getElementById('extraWithdraw').checked,
    skipBike: document.getElementById('skipBike').checked,
    microBuffer: document.getElementById('microBuffer').checked,
    honestFood: document.getElementById('honestFood').checked
  };
}
function render(){
  window.__flags = readFlags();
  const p = compute(window.__flags);
  document.getElementById('tail').textContent = rubFull(p.tail);
  const rows = [
    ['Старт долга', rubFull(p.startDebt), true],
    ['Взнос 25.08', rubFull(p.pay2508), false],
    ['Резерв 25.08', rubFull(p.reserve2508), false],
    ['Кэш после 25.08', rubFull(p.cashLeft2508), false],
    ['Долг после 25.08', rubFull(p.after2508), false],
    ['Перед 05.09 (+%)', rubFull(p.before0509), false],
    ['Взнос 05.09', rubFull(p.pay0509), false],
    ['Долг после 05.09', rubFull(p.after0509), false],
    ['Взнос 10.09', rubFull(p.pay1009), false],
    ['Еда 10.09', rubFull(p.food10), false],
    ['Долг после 10.09', rubFull(p.after1009), false],
    ['Перед 25.09 (+%)', rubFull(p.before2509), false],
    ['Еда 25.09', rubFull(p.food25), false],
    ['Взнос 25.09', rubFull(p.pay2509), false],
    ['Хвост ≈ 29.09', rubFull(p.tail), true],
    ['Переплата %', rubFull(p.interestTotal), false],
    ['Минималка 29.08', rubFull(p.minPay) + (p.minCovered ? ' ✓' : ' ✗'), false]
  ];
  document.getElementById('tbl').innerHTML = rows.map(function(r){
    return '<tr class="'+(r[2]?'strong':'')+'"><td>'+r[0]+'</td><td class="num">'+r[1]+'</td></tr>';
  }).join('');
}
['extraWithdraw','skipBike','microBuffer','honestFood'].forEach(function(id){
  document.getElementById(id).checked = !!window.__flags[id];
  document.getElementById(id).addEventListener('change', render);
});
render();
</script>
</body></html>`;
}

async function presentEditor(initialFlags) {
  const wv = new WebView();
  await wv.loadHTML(tableHtml(initialFlags));
  await wv.present(true);
  try {
    const stateJson = await wv.evaluateJavaScript(
      "JSON.stringify(window.__flags || {})"
    );
    const parsed = JSON.parse(stateJson);
    if (parsed && typeof parsed === "object") {
      const flags = Object.assign({}, DEFAULT_FLAGS, {
        extraWithdraw: !!parsed.extraWithdraw,
        skipBike: !!parsed.skipBike,
        microBuffer: !!parsed.microBuffer,
        honestFood: !!parsed.honestFood,
      });
      saveFlags(flags);
      return flags;
    }
  } catch (e) {}
  return loadFlags();
}

async function presentMenu(plan) {
  const a = new Alert();
  a.title = "Кредитка · план · v" + CORE_VERSION;
  a.message =
    "Хвост 29.09: " +
    rubFull(plan.tail) +
    "\nСтарт: " +
    rubFull(plan.startDebt) +
    " · % ≈ " +
    rubFull(plan.interestTotal);
  a.addAction("Таблица + флаги");
  a.addAction("+10к: " + (plan.flags.extraWithdraw ? "ВКЛ → выкл" : "выкл → ВКЛ"));
  a.addAction("Велик↓: " + (plan.flags.skipBike ? "ВКЛ → выкл" : "выкл → ВКЛ"));
  a.addAction("Буфер: " + (plan.flags.microBuffer ? "ВКЛ → выкл" : "выкл → ВКЛ"));
  a.addAction("Еда: " + (plan.flags.honestFood ? "ВКЛ → выкл" : "выкл → ВКЛ"));
  a.addCancelAction("Закрыть");
  const i = await a.presentAlert();
  if (i === -1) return plan.flags;
  const f = Object.assign({}, plan.flags);
  if (i === 0) return await presentEditor(f);
  if (i === 1) f.extraWithdraw = !f.extraWithdraw;
  if (i === 2) f.skipBike = !f.skipBike;
  if (i === 3) f.microBuffer = !f.microBuffer;
  if (i === 4) f.honestFood = !f.honestFood;
  saveFlags(f);
  return f;
}

async function main() {
  let flags = loadFlags();
  let plan = compute(flags);

  if (config.runsInWidget) {
    const family = config.widgetFamily || "medium";
    const w = await buildWidget(plan, family);
    Script.setWidget(w);
    Script.complete();
    return;
  }

  flags = await presentMenu(plan);
  plan = compute(flags);
  const w = await buildWidget(plan, "medium");
  Script.setWidget(w);
  Script.complete();
}

module.exports = {
  MARKER,
  CORE_VERSION,
  main,
  compute,
  loadFlags,
  saveFlags,
  buildWidget,
};
