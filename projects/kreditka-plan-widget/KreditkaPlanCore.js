// KreditkaPlanCore — матрица погашений/снятий Т-Банк Платинум.
// Плитка: дата × Снятие / Погаш. / Долг. Тап → полная матрица + флаги.
const MARKER = "KREDITKA_PLAN_WIDGET_V1";
const CORE_VERSION = "1.1";

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

function addCell(stack, text, opts) {
  opts = opts || {};
  const t = stack.addText(text);
  t.font = opts.bold ? Font.boldSystemFont(opts.size || 10) : Font.mediumSystemFont(opts.size || 10);
  t.textColor = color(opts.color || "#C5D4D8");
  t.lineLimit = 1;
  if (opts.width) {
    t.minimumScaleFactor = 0.7;
  }
  return t;
}

/** Плитка: матрица Дата | Снятие | Погаш | Долг */
async function buildWidget(plan, family) {
  const w = new ListWidget();
  w.backgroundColor = color("#152028");
  const pad = family === "small" ? 8 : 10;
  w.setPadding(pad, pad, pad, pad);
  w.refreshAfterDate = new Date(Date.now() + 60 * 60 * 1000);

  const head = w.addStack();
  head.layoutHorizontally();
  head.centerAlignContent();
  const title = head.addText("Кредитка · матрица");
  title.font = Font.boldSystemFont(10);
  title.textColor = color("#5EEAD4");
  head.addSpacer();
  const ver = head.addText("v" + CORE_VERSION);
  ver.font = Font.mediumSystemFont(9);
  ver.textColor = color("#5A7078");
  w.addSpacer(2);

  const chips = w.addText(flagChips(plan.flags));
  chips.font = Font.mediumSystemFont(8);
  chips.textColor = color("#7A9298");
  chips.lineLimit = 1;
  w.addSpacer(6);

  // header
  const hdr = w.addStack();
  hdr.layoutHorizontally();
  const colW = family === "large" ? [52, 44, 44, 50] : [46, 40, 40, 46];
  const headers = ["Дата", "Снятие", "Погаш", "Долг"];
  for (let i = 0; i < 4; i++) {
    const c = hdr.addStack();
    c.size = new Size(colW[i], 12);
    const t = c.addText(headers[i]);
    t.font = Font.boldSystemFont(8);
    t.textColor = color("#5EEAD4");
    if (i > 0) t.rightAlignText();
  }
  w.addSpacer(3);

  // Какие строки показывать
  let rows = plan.rows.filter(function (r) {
    // на плитке: все даты с движением по карте или ключевые точки
    return (
      r.withdraw ||
      r.pay ||
      r.date === "16.08" ||
      r.date === "29.08" ||
      r.date === "29.09" ||
      r.date === "до25"
    );
  });
  if (family === "large") {
    rows = plan.rows; // вся матрица
  } else if (family === "small") {
    rows = rows.filter(function (r) {
      return r.withdraw || r.pay || r.date === "29.09";
    });
  }

  const maxRows = family === "large" ? 12 : family === "small" ? 5 : 8;
  rows = rows.slice(0, maxRows);

  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    const line = w.addStack();
    line.layoutHorizontally();
    line.centerAlignContent();

    const isTail = r.date === "29.09";
    const vals = [
      r.date,
      r.withdraw ? rub(r.withdraw) : "·",
      r.pay ? rub(r.pay) : "·",
      rub(r.debt),
    ];
    for (let c = 0; c < 4; c++) {
      const cell = line.addStack();
      cell.size = new Size(colW[c], 13);
      const t = cell.addText(vals[c]);
      t.font = isTail || c === 3 ? Font.boldSystemFont(9) : Font.mediumSystemFont(9);
      t.textColor = color(
        r.withdraw && c === 1
          ? "#F59E0B"
          : r.pay && c === 2
            ? "#5EEAD4"
            : isTail
              ? "#5EEAD4"
              : "#D5E2E6"
      );
      t.lineLimit = 1;
      t.minimumScaleFactor = 0.65;
      if (c > 0) t.rightAlignText();
    }
    if (i < rows.length - 1) w.addSpacer(2);
  }

  w.addSpacer(5);
  const foot = w.addText(
    "Σ погаш " +
      rub(plan.paySum) +
      " · Σ снят " +
      rub(plan.withdrawSum) +
      " · % " +
      rub(plan.interestTotal) +
      " · хвост " +
      rub(plan.tail)
  );
  foot.font = Font.mediumSystemFont(8);
  foot.textColor = color("#8AA0A8");
  foot.lineLimit = 1;
  foot.minimumScaleFactor = 0.7;

  if (!plan.minCovered) {
    w.addSpacer(3);
    const warn = w.addText("! минималка к 29.08 не закрыта");
    warn.font = Font.boldSystemFont(9);
    warn.textColor = color("#F59E0B");
  }

  return w;
}

function tableHtml(initialFlags) {
  const boot = JSON.stringify(Object.assign({}, DEFAULT_FLAGS, initialFlags || {}));
  return `<!DOCTYPE html>
<html><head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1"/>
<style>
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
body{margin:0;font:14px -apple-system,system-ui;background:#0F171C;color:#E8F1F2;padding:12px;padding-bottom:32px}
h1{font-size:17px;margin:0 0 4px;color:#5EEAD4}
.sub{color:#7A9298;font-size:11px;margin-bottom:12px}
.flags{display:flex;flex-direction:column;gap:8px;margin-bottom:14px}
.flag{display:flex;gap:10px;align-items:flex-start;background:#1A2830;border-radius:12px;padding:10px;border:1px solid #24343E}
.flag input{width:18px;height:18px;margin-top:2px}
.flag b{display:block;font-size:13px}
.flag small{display:block;color:#8AA0A8;font-size:11px;margin-top:2px;line-height:1.3}
.wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;border:1px solid #24343E;border-radius:12px}
table{border-collapse:collapse;min-width:640px;width:100%;font-size:11px}
th,td{padding:7px 6px;border-bottom:1px solid #223038;white-space:nowrap}
th{position:sticky;top:0;background:#152028;color:#5EEAD4;font-size:10px;text-align:right}
th:first-child,td:first-child{text-align:left;position:sticky;left:0;background:#152028;z-index:1;font-weight:700}
th:nth-child(2),td:nth-child(2){text-align:left;color:#8AA0A8}
td{text-align:right;font-variant-numeric:tabular-nums}
td.pay{color:#5EEAD4;font-weight:700}
td.wd{color:#F59E0B;font-weight:700}
td.debt{font-weight:700}
tr.tail td{color:#5EEAD4;background:#134E4A}
.sums{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}
.sum{background:#1A2830;border-radius:12px;padding:10px;border:1px solid #24343E}
.sum .l{font-size:10px;color:#8AA0A8}
.sum .v{font-size:18px;font-weight:800;color:#5EEAD4;margin-top:2px}
.hint{margin-top:12px;color:#7A9298;font-size:11px;line-height:1.4}
</style></head><body>
<h1>Матрица · кредитка</h1>
<div class="sub">Снятие / погашение по датам · флаги пересчитывают всё · v${CORE_VERSION}</div>
<div class="flags">
  <label class="flag"><input type="checkbox" id="extraWithdraw"/><span><b>Снятие +10 000</b><small>Строка «до25»: снятие с карты → долг 110к.</small></span></label>
  <label class="flag"><input type="checkbox" id="skipBike"/><span><b>Отложить велик 6 000</b><small>Убрать расход 01.09, +6к к погашению 05.09.</small></span></label>
  <label class="flag"><input type="checkbox" id="microBuffer"/><span><b>Микробуфер 25.08</b><small>Погашение 13к вместо 15к.</small></span></label>
  <label class="flag"><input type="checkbox" id="honestFood"/><span><b>Честная еда</b><small>Еда 7,5к (10.09) и 17,5к (25.09) → меньше погашение.</small></span></label>
</div>
<div class="sums">
  <div class="sum"><div class="l">Σ погашения</div><div class="v" id="sPay">—</div></div>
  <div class="sum"><div class="l">Σ снятия</div><div class="v" id="sWd">—</div></div>
  <div class="sum"><div class="l">% за путь</div><div class="v" id="sInt">—</div></div>
  <div class="sum"><div class="l">Хвост 29.09</div><div class="v" id="sTail">—</div></div>
</div>
<div class="wrap" style="margin-top:12px"><table>
<thead><tr>
<th>Дата</th><th>Заметка</th><th>Приход</th><th>Нал.расход</th><th>Снятие</th><th>Погашение</th><th>%</th><th>Долг</th>
</tr></thead>
<tbody id="tb"></tbody>
</table></div>
<p class="hint">Закрой экран (Done) — флаги сохранятся и обновят виджет. На плитке: Дата × Снятие × Погаш × Долг.</p>
<script>
window.__flags = ${boot};
const RATE = ${RATE_PER_DAY};
function rubFull(n){
  if(!n) return '—';
  return Math.round(n).toLocaleString('ru-RU') + ' ₽';
}
function cell(n, empty){
  if(!n) return empty || '·';
  return Math.round(n).toLocaleString('ru-RU');
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
  rows.push({date:'16.08',note:'факт',income:0,cashOut:0,withdraw:0,pay:0,interest:0,debt:debt});
  if(withdraw10){ debt+=withdraw10; rows.push({date:'до25',note:'+10к',income:0,cashOut:0,withdraw:withdraw10,pay:0,interest:0,debt:debt}); }
  else { rows.push({date:'до25',note:'без +10к',income:0,cashOut:0,withdraw:0,pay:0,interest:0,debt:debt}); }
  const cash2508 = 20000+15000+bike+7000;
  debt=Math.max(0,debt-pay2508);
  rows.push({date:'25.08',note:'ЗП',income:63000,cashOut:cash2508,withdraw:0,pay:pay2508,interest:0,debt:debt});
  rows.push({date:'29.08',note:'грейс↓',income:0,cashOut:0,withdraw:0,pay:0,interest:0,debt:debt});
  rows.push({date:'01.09',note:'школа',income:0,cashOut:15000+bike,withdraw:0,pay:0,interest:0,debt:debt});
  rows.push({date:'03.09',note:'ЖКУ',income:0,cashOut:7000,withdraw:0,pay:0,interest:0,debt:debt});
  let step=accrue(debt,7); debt=step.debt; interestTotal+=step.interest; const i1=step.interest;
  debt=Math.max(0,debt-pay0509);
  rows.push({date:'05.09',note:'приход',income:40000,cashOut:10000,withdraw:0,pay:pay0509,interest:i1,debt:debt});
  step=accrue(debt,5); debt=step.debt; interestTotal+=step.interest; const i2=step.interest;
  debt=Math.max(0,debt-pay1009);
  rows.push({date:'10.09',note:'крит.',income:83000,cashOut:69000+food10,withdraw:0,pay:pay1009,interest:i2,debt:debt});
  rows.push({date:'13.09',note:'квартира',income:0,cashOut:0,withdraw:0,pay:0,interest:0,debt:debt});
  step=accrue(debt,15); debt=step.debt; interestTotal+=step.interest; const i3=step.interest;
  debt=Math.max(0,debt-pay2509);
  rows.push({date:'25.09',note:'ЗП',income:63000,cashOut:food25,withdraw:0,pay:pay2509,interest:i3,debt:debt});
  step=accrue(debt,4); debt=step.debt; interestTotal+=step.interest; const i4=step.interest;
  rows.push({date:'29.09',note:'хвост',income:0,cashOut:0,withdraw:0,pay:0,interest:i4,debt:Math.max(0,debt)});
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
      '<td>'+r.note+'</td>'+
      '<td>'+cell(r.income)+'</td>'+
      '<td>'+cell(r.cashOut)+'</td>'+
      '<td class="wd">'+cell(r.withdraw)+'</td>'+
      '<td class="pay">'+cell(r.pay)+'</td>'+
      '<td>'+cell(r.interest)+'</td>'+
      '<td class="debt">'+cell(r.debt,'0')+'</td>'+
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
