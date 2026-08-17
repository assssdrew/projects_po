// KreditkaPlanCore — матрица погашений/снятий Т-Банк Платинум.
// Плитка: дата × Снятие / Погаш. / Долг. Тап → полная матрица + флаги.
const MARKER = "KREDITKA_PLAN_WIDGET_V1";
const CORE_VERSION = "1.3";

const SETTINGS_NAME = "kreditka-plan-settings.json";
const RATE_PER_DAY = 0.00164; // ≈ 59,9% / 365

const DEFAULT_FLAGS = {
  extraWithdraw: true, // снятие/перевод +10 000 до 25.08
  skipBike: false, // отложить велик → +6к к погашению 05.09
  microBuffer: false, // погашение 25.08 = 13к вместо 15к
  honestFood: true, // еда 7,5к (10.09) и 17,5к (25.09)
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
  if (n == null || n === 0) return "·";
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
  if (n == null || n === 0) return "—";
  const x = Math.round(Number(n) || 0);
  return x.toLocaleString("ru-RU") + " ₽";
}

function accrue(debt, days) {
  if (days <= 0 || debt <= 0) return { debt: debt, interest: 0 };
  const interest = debt * RATE_PER_DAY * days;
  return { debt: debt + interest, interest: interest };
}

/**
 * Матрица по датам.
 * Каждая строка: date, income, cashOut, withdraw, pay, interest, debt
 * withdraw = снятие с кредитки; pay = погашение на кредитку.
 */
function buildMatrix(flags) {
  const f = Object.assign({}, DEFAULT_FLAGS, flags || {});

  const withdraw10 = f.extraWithdraw ? 10000 : 0;
  const baseDebt = 100000;
  const startDebt = baseDebt + withdraw10;

  const pay2508 = f.microBuffer ? 13000 : 15000;
  const bike = f.skipBike ? 0 : 6000;
  const food10 = f.honestFood ? 7500 : 0;
  const food25 = f.honestFood ? 17500 : 10000;
  const pay0509 = 30000 + (f.skipBike ? 6000 : 0);
  const pay1009 = Math.max(0, 83000 - 69000 - food10);
  const pay2509 = Math.max(0, 63000 - food25);

  const rows = [];
  let debt = baseDebt;
  let interestTotal = 0;

  // старт (уже есть долг ~100к на 16.08)
  rows.push({
    date: "16.08",
    note: "факт",
    income: 0,
    cashOut: 0,
    withdraw: 0,
    pay: 0,
    interest: 0,
    debt: debt,
  });

  // опциональное снятие +10к
  if (withdraw10) {
    debt += withdraw10;
    rows.push({
      date: "до25",
      note: "+10к",
      income: 0,
      cashOut: 0,
      withdraw: withdraw10,
      pay: 0,
      interest: 0,
      debt: debt,
    });
  } else {
    rows.push({
      date: "до25",
      note: "без +10к",
      income: 0,
      cashOut: 0,
      withdraw: 0,
      pay: 0,
      interest: 0,
      debt: debt,
    });
  }

  // 25.08 — зарплата + погашение
  const cash2508 = 20000 + 15000 + bike + 7000; // еда + школа + велик + ЖКУ резерв
  debt = Math.max(0, debt - pay2508);
  rows.push({
    date: "25.08",
    note: "ЗП",
    income: 63000,
    cashOut: cash2508,
    withdraw: 0,
    pay: pay2508,
    interest: 0,
    debt: debt,
  });

  // 29.08 — дата платежа, грейс сорван, % дальше
  rows.push({
    date: "29.08",
    note: "грейс↓",
    income: 0,
    cashOut: 0,
    withdraw: 0,
    pay: 0,
    interest: 0,
    debt: debt,
  });

  // 01.09 — школа + велик из резерва (не с кредитки)
  rows.push({
    date: "01.09",
    note: "школа",
    income: 0,
    cashOut: 15000 + bike,
    withdraw: 0,
    pay: 0,
    interest: 0,
    debt: debt,
  });

  // 03.09 — ЖКУ
  rows.push({
    date: "03.09",
    note: "ЖКУ",
    income: 0,
    cashOut: 7000,
    withdraw: 0,
    pay: 0,
    interest: 0,
    debt: debt,
  });

  // % 29.08 → 05.09 (7 дней)
  let step = accrue(debt, 7);
  debt = step.debt;
  interestTotal += step.interest;
  const int0509 = step.interest;

  // 05.09
  debt = Math.max(0, debt - pay0509);
  rows.push({
    date: "05.09",
    note: "приход",
    income: 40000,
    cashOut: 10000, // еда неделя
    withdraw: 0,
    pay: pay0509,
    interest: int0509,
    debt: debt,
  });

  // % 05.09 → 10.09 (5 дней)
  step = accrue(debt, 5);
  debt = step.debt;
  interestTotal += step.interest;
  const int1009 = step.interest;

  // 10.09 — критическая касса
  debt = Math.max(0, debt - pay1009);
  rows.push({
    date: "10.09",
    note: "крит.",
    income: 83000,
    cashOut: 69000 + food10, // резерв квартиры + еда
    withdraw: 0,
    pay: pay1009,
    interest: int1009,
    debt: debt,
  });

  // 13.09 — квартира наличными (резерв уже учтён 10.09 как cashOut)
  rows.push({
    date: "13.09",
    note: "квартира",
    income: 0,
    cashOut: 0, // уже зарезервировано 10.09
    withdraw: 0,
    pay: 0,
    interest: 0,
    debt: debt,
  });

  // % 10.09 → 25.09 (15 дней)
  step = accrue(debt, 15);
  debt = step.debt;
  interestTotal += step.interest;
  const int2509 = step.interest;

  // 25.09
  debt = Math.max(0, debt - pay2509);
  rows.push({
    date: "25.09",
    note: "ЗП",
    income: 63000,
    cashOut: food25,
    withdraw: 0,
    pay: pay2509,
    interest: int2509,
    debt: debt,
  });

  // % 25.09 → 29.09 (4 дня)
  step = accrue(debt, 4);
  debt = step.debt;
  interestTotal += step.interest;
  const int2909 = step.interest;

  rows.push({
    date: "29.09",
    note: "хвост",
    income: 0,
    cashOut: 0,
    withdraw: 0,
    pay: 0,
    interest: int2909,
    debt: Math.max(0, debt),
  });

  const minPay = Math.max(600, Math.round(startDebt * 0.08));
  const paySum = rows.reduce((s, r) => s + (r.pay || 0), 0);
  const withdrawSum = rows.reduce((s, r) => s + (r.withdraw || 0), 0);

  return {
    flags: f,
    rows: rows,
    startDebt: startDebt,
    tail: Math.max(0, debt),
    interestTotal: interestTotal,
    paySum: paySum,
    withdrawSum: withdrawSum,
    minPay: minPay,
    minCovered: pay2508 >= minPay,
    pay2508: pay2508,
  };
}

/** Совместимость со старым API. */
function compute(flags) {
  return buildMatrix(flags);
}

function flagChips(flags) {
  return [
    (flags.extraWithdraw ? "●" : "○") + "+10к",
    (flags.skipBike ? "●" : "○") + "велик↓",
    (flags.microBuffer ? "●" : "○") + "буфер",
    (flags.honestFood ? "●" : "○") + "еда",
  ].join("  ");
}

function color(hex, alpha) {
  const c = new Color(hex);
  if (alpha != null) c.alpha = alpha;
  return c;
}

/** Строка матрицы на всю ширину: 4 равные колонки. */
function addMatrixRow(parent, cells, opts) {
  opts = opts || {};
  const line = parent.addStack();
  line.layoutHorizontally();
  line.centerAlignContent();
  for (let i = 0; i < cells.length; i++) {
    const col = line.addStack();
    col.layoutHorizontally();
    col.centerAlignContent();
    if (i > 0) col.addSpacer();
    const t = col.addText(cells[i]);
    const fs = opts.header ? 8 : 10;
    t.font =
      opts.header || (opts.bold && (i === 3 || opts.tail))
        ? Font.boldSystemFont(fs)
        : Font.mediumSystemFont(fs);
    t.textColor = color(opts.colors && opts.colors[i] ? opts.colors[i] : "#D5E2E6");
    t.lineLimit = 1;
    t.minimumScaleFactor = 0.55;
    if (i === 0) col.addSpacer();
  }
  return line;
}

/** Ключевые строки для плитки — без «пустых» дат, чтобы влезло без обрезки. */
function widgetRows(plan, family) {
  const key = plan.rows.filter(function (r) {
    return (
      r.withdraw ||
      r.pay ||
      r.date === "16.08" ||
      r.date === "29.08" ||
      r.date === "29.09" ||
      r.date === "до25"
    );
  });
  if (family === "small") {
    return key
      .filter(function (r) {
        return r.withdraw || r.pay || r.date === "29.09";
      })
      .slice(0, 5);
  }
  // medium/large: одна и та же компактная матрица (влезает на плитку)
  return key.slice(0, 8);
}

/** Плитка: матрица Дата | Снятие | Погаш | Долг — всё на одном экране плитки */
async function buildWidget(plan, family) {
  const w = new ListWidget();
  w.backgroundColor = color("#152028");
  w.setPadding(12, 10, 12, 10);
  w.refreshAfterDate = new Date(Date.now() + 60 * 60 * 1000);

  const chips = w.addText(flagChips(plan.flags));
  chips.font = Font.mediumSystemFont(8);
  chips.textColor = color("#7A9298");
  chips.lineLimit = 1;
  w.addSpacer(4);

  addMatrixRow(w, ["Дата", "Снятие", "Погаш", "Долг"], {
    header: true,
    colors: ["#5EEAD4", "#5EEAD4", "#5EEAD4", "#5EEAD4"],
  });
  w.addSpacer(2);

  const rows = widgetRows(plan, family);
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    const isTail = r.date === "29.09";
    addMatrixRow(
      w,
      [
        r.date,
        r.withdraw ? rub(r.withdraw) : "·",
        r.pay ? rub(r.pay) : "·",
        rub(r.debt),
      ],
      {
        tail: isTail,
        bold: true,
        colors: [
          isTail ? "#5EEAD4" : "#D5E2E6",
          r.withdraw ? "#F59E0B" : "#8AA0A8",
          r.pay ? "#5EEAD4" : "#8AA0A8",
          isTail ? "#5EEAD4" : "#F3F7F8",
        ],
      }
    );
    if (i < rows.length - 1) w.addSpacer(1);
  }

  w.addSpacer(4);
  const foot = w.addText(
    "Σ " +
      rub(plan.paySum) +
      " погаш · " +
      rub(plan.withdrawSum) +
      " снят · % " +
      rub(plan.interestTotal) +
      " · хвост " +
      rub(plan.tail)
  );
  foot.font = Font.mediumSystemFont(8);
  foot.textColor = color("#8AA0A8");
  foot.lineLimit = 1;
  foot.minimumScaleFactor = 0.65;

  if (!plan.minCovered) {
    w.addSpacer(2);
    const warn = w.addText("! минималка к 29.08 не закрыта");
    warn.font = Font.boldSystemFont(8);
    warn.textColor = color("#F59E0B");
  }

  return w;
}

function tableHtml(initialFlags) {
  const boot = JSON.stringify(Object.assign({}, DEFAULT_FLAGS, initialFlags || {}));
  return `<!DOCTYPE html>
<html><head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,viewport-fit=cover"/>
<style>
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html,body{height:100%;margin:0;overflow:hidden}
body{font:12px -apple-system,system-ui;background:#0F171C;color:#E8F1F2;
  display:flex;flex-direction:column;padding:8px;padding-bottom:max(8px,env(safe-area-inset-bottom))}
.top{flex:0 0 auto}
.flags{display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-bottom:6px}
.flag{display:flex;gap:6px;align-items:center;background:#1A2830;border-radius:8px;padding:6px 8px;border:1px solid #24343E}
.flag input{width:16px;height:16px;flex:0 0 auto}
.flag b{font-size:11px;font-weight:600}
.sums{display:flex;gap:6px;margin-bottom:6px;font-size:10px;color:#8AA0A8}
.sums b{color:#5EEAD4;font-size:12px}
.wrap{flex:1 1 auto;min-height:0;overflow:hidden;border:1px solid #24343E;border-radius:10px}
table{border-collapse:collapse;width:100%;height:100%;font-size:11px;table-layout:fixed}
th,td{padding:3px 4px;border-bottom:1px solid #223038;white-space:nowrap}
th{background:#152028;color:#5EEAD4;font-size:9px;text-align:right}
th:first-child,td:first-child{text-align:left;font-weight:700}
td{text-align:right;font-variant-numeric:tabular-nums}
td.pay{color:#5EEAD4;font-weight:700}
td.wd{color:#F59E0B;font-weight:700}
td.debt{font-weight:700}
tr.tail td{color:#5EEAD4;background:#134E4A}
.hint{flex:0 0 auto;margin-top:4px;color:#5A7078;font-size:9px}
</style></head><body>
<div class="top">
<div class="flags">
  <label class="flag"><input type="checkbox" id="extraWithdraw"/><b>+10к снятие</b></label>
  <label class="flag"><input type="checkbox" id="skipBike"/><b>Велик↓ +6к</b></label>
  <label class="flag"><input type="checkbox" id="microBuffer"/><b>Буфер 13к</b></label>
  <label class="flag"><input type="checkbox" id="honestFood"/><b>Честная еда</b></label>
</div>
<div class="sums">
  <span>погаш <b id="sPay">—</b></span>
  <span>снят <b id="sWd">—</b></span>
  <span>% <b id="sInt">—</b></span>
  <span>хвост <b id="sTail">—</b></span>
</div>
</div>
<div class="wrap"><table>
<thead><tr>
<th>Дата</th><th>Снятие</th><th>Погаш</th><th>Долг</th>
</tr></thead>
<tbody id="tb"></tbody>
</table></div>
<p class="hint">Done — сохранить · v${CORE_VERSION}</p>
<script>
window.__flags = ${boot};
const RATE = ${RATE_PER_DAY};
function rubK(n){
  if(!n) return '·';
  const x=Math.round(n);
  if(Math.abs(x)>=1000){
    const k=x/1000;
    return (k>=10||Math.abs(k-Math.round(k))<0.05?Math.round(k):k.toFixed(1).replace('.0',''))+'к';
  }
  return String(x);
}
function rubFull(n){
  if(!n) return '—';
  return Math.round(n).toLocaleString('ru-RU')+' ₽';
}
function accrue(debt, days){
  if(days<=0||debt<=0) return {debt:debt,interest:0};
  const interest = debt*RATE*days;
  return {debt:debt+interest,interest:interest};
}
function buildMatrix(f){
  const withdraw10 = f.extraWithdraw ? 10000 : 0;
  const baseDebt = 100000;
  const bike = f.skipBike ? 0 : 6000;
  const pay2508 = f.microBuffer ? 13000 : 15000;
  const food10 = f.honestFood ? 7500 : 0;
  const food25 = f.honestFood ? 17500 : 10000;
  const pay0509 = 30000 + (f.skipBike ? 6000 : 0);
  const pay1009 = Math.max(0, 83000 - 69000 - food10);
  const pay2509 = Math.max(0, 63000 - food25);
  const rows = [];
  let debt = baseDebt;
  let interestTotal = 0;
  rows.push({date:'16.08',withdraw:0,pay:0,debt:debt});
  if(withdraw10){ debt+=withdraw10; rows.push({date:'до25',withdraw:withdraw10,pay:0,debt:debt}); }
  else { rows.push({date:'до25',withdraw:0,pay:0,debt:debt}); }
  debt=Math.max(0,debt-pay2508);
  rows.push({date:'25.08',withdraw:0,pay:pay2508,debt:debt});
  rows.push({date:'29.08',withdraw:0,pay:0,debt:debt});
  let step=accrue(debt,7); debt=step.debt; interestTotal+=step.interest;
  debt=Math.max(0,debt-pay0509);
  rows.push({date:'05.09',withdraw:0,pay:pay0509,debt:debt});
  step=accrue(debt,5); debt=step.debt; interestTotal+=step.interest;
  debt=Math.max(0,debt-pay1009);
  rows.push({date:'10.09',withdraw:0,pay:pay1009,debt:debt});
  step=accrue(debt,15); debt=step.debt; interestTotal+=step.interest;
  debt=Math.max(0,debt-pay2509);
  rows.push({date:'25.09',withdraw:0,pay:pay2509,debt:debt});
  step=accrue(debt,4); debt=step.debt; interestTotal+=step.interest;
  rows.push({date:'29.09',withdraw:0,pay:0,debt:Math.max(0,debt)});
  const paySum=rows.reduce((s,r)=>s+(r.pay||0),0);
  const withdrawSum=rows.reduce((s,r)=>s+(r.withdraw||0),0);
  return {rows,tail:Math.max(0,debt),interestTotal,paySum,withdrawSum};
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
  const m = buildMatrix(window.__flags);
  document.getElementById('sPay').textContent = rubFull(m.paySum);
  document.getElementById('sWd').textContent = rubFull(m.withdrawSum);
  document.getElementById('sInt').textContent = rubFull(m.interestTotal);
  document.getElementById('sTail').textContent = rubFull(m.tail);
  document.getElementById('tb').innerHTML = m.rows.map(function(r){
    const cls = r.date==='29.09' ? ' class="tail"' : '';
    return '<tr'+cls+'>'+
      '<td>'+r.date+'</td>'+
      '<td class="wd">'+rubK(r.withdraw)+'</td>'+
      '<td class="pay">'+rubK(r.pay)+'</td>'+
      '<td class="debt">'+rubK(r.debt)+'</td>'+
      '</tr>';
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
  a.title = "Кредитка · матрица · v" + CORE_VERSION;
  a.message =
    "Хвост 29.09: " +
    rubFull(plan.tail) +
    "\nΣ погаш " +
    rubFull(plan.paySum) +
    " · Σ снят " +
    rubFull(plan.withdrawSum) +
    " · % " +
    rubFull(plan.interestTotal);
  a.addAction("Матрица + флаги");
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
  let plan = buildMatrix(flags);

  if (config.runsInWidget) {
    const family = config.widgetFamily || "medium";
    const w = await buildWidget(plan, family);
    Script.setWidget(w);
    Script.complete();
    return;
  }

  flags = await presentMenu(plan);
  plan = buildMatrix(flags);
  const w = await buildWidget(plan, "medium");
  Script.setWidget(w);
  Script.complete();
}

module.exports = {
  MARKER,
  CORE_VERSION,
  main,
  compute,
  buildMatrix,
  loadFlags,
  saveFlags,
  buildWidget,
};
