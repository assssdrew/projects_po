// KreditkaPlanCore v2 — матрица по календарю (VND→RUB) + произвольные суммы.
const MARKER = "KREDITKA_PLAN_WIDGET_V1";
const CORE_VERSION = "2.2";

const SETTINGS_NAME = "kreditka-plan-settings.json";
const FX_CACHE_NAME = "kreditka-vnd-rub.json";
const RATE_PER_DAY = 0.00164; // 59,9% / 365
const VND_RUB_FALLBACK = 0.00322; // ~311 ₫/₽, авг 2026
const BASE_DEBT = 100000;
const GRACE_END = "2026-08-29";
const SCHOOL_VND = 23500000;

const DEFAULT_FLAGS = {
  extraWithdraw: false,
  splitSchool: false,
};

function fm() {
  return FileManager.local();
}

function settingsPath() {
  return fm().joinPath(fm().documentsDirectory(), SETTINGS_NAME);
}

function fxPath() {
  return fm().joinPath(fm().documentsDirectory(), FX_CACHE_NAME);
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

function defaultSettings() {
  return { flags: Object.assign({}, DEFAULT_FLAGS), customs: [] };
}

function loadSettings() {
  const raw = loadJson(settingsPath(), {});
  const flags = Object.assign({}, DEFAULT_FLAGS, raw.flags || {});
  const customs = Array.isArray(raw.customs) ? raw.customs : [];
  return { flags: flags, customs: customs };
}

function saveSettings(s) {
  saveJson(settingsPath(), {
    flags: s.flags,
    customs: s.customs || [],
    savedAt: new Date().toISOString(),
    version: CORE_VERSION,
  });
}

function loadFlags() {
  return loadSettings().flags;
}

function saveFlags(flags) {
  const s = loadSettings();
  s.flags = Object.assign({}, DEFAULT_FLAGS, flags);
  saveSettings(s);
}

function vndToRub(vnd, rate) {
  return Math.round((Number(vnd) || 0) * (rate || VND_RUB_FALLBACK));
}

function schoolCost(rate, flags) {
  const full = vndToRub(SCHOOL_VND, rate);
  if (flags && flags.splitSchool) return Math.round(full / 2);
  return full;
}

function calendarEvents(rate, flags) {
  const v = function (n) {
    return vndToRub(n, rate);
  };
  const skipBike = flags && flags.skipBike;
  const splitSchool = flags && flags.splitSchool;
  const events = [
    { date: "2026-08-16", kind: "mark", note: "факт" },
    { date: "2026-08-18", kind: "cost", amount: 10000, note: "Еда" },
    { date: "2026-08-18", kind: "cost", amount: v(25000), note: "ГО" },
    { date: "2026-08-19", kind: "cost", amount: v(25000), note: "ГО" },
    { date: "2026-08-20", kind: "cost", amount: v(25000), note: "ГО" },
    { date: "2026-08-21", kind: "cost", amount: v(25000), note: "ГО" },
    { date: "2026-08-22", kind: "cost", amount: v(25000), note: "ГО" },
    { date: "2026-08-24", kind: "withdraw", amount: flags && flags.extraWithdraw ? 10000 : 0, note: "+10к" },
    { date: "2026-08-25", kind: "income", amount: 53000, note: "ЗП" },
    { date: "2026-08-29", kind: "mark", note: "грейс↓" },
    { date: "2026-08-31", kind: "cost", amount: schoolCost(rate, flags), note: splitSchool ? "Школа ½" : "Школа" },
    { date: "2026-09-03", kind: "cost", amount: v(2800000), note: "КУ" },
    { date: "2026-09-03", kind: "cost", amount: skipBike ? 0 : v(2000000), note: "Байк" },
    { date: "2026-09-03", kind: "cost", amount: v(100000), note: "ТЛФ" },
    { date: "2026-09-05", kind: "income", amount: 40000, note: "ЗП" },
    { date: "2026-09-09", kind: "cost", amount: v(100000), note: "ТЛФ" },
    { date: "2026-09-10", kind: "income", amount: 83000, note: "ЗП" },
    { date: "2026-09-12", kind: "cost", amount: v(23000000), note: "Квартира" },
    { date: "2026-09-25", kind: "income", amount: 63000, note: "ЗП+алименты" },
    { date: "2026-09-29", kind: "mark", note: "хвост" },
  ];
  return events.filter(function (e) {
    return e.kind !== "withdraw" || e.amount > 0;
  });
}

function parseISO(s) {
  const p = String(s).split("-");
  return Date.UTC(+p[0], +p[1] - 1, +p[2]);
}

function fmtDate(iso) {
  const p = String(iso).split("-");
  return p[2] + "." + p[1];
}

function toISO(dmy) {
  const m = String(dmy || "").trim().match(/^(\d{1,2})[./-](\d{1,2})(?:[./-](\d{2,4}))?$/);
  if (!m) return null;
  const dd = ("0" + m[1]).slice(-2);
  const mm = ("0" + m[2]).slice(-2);
  let y = m[3] ? +m[3] : 2026;
  if (y < 100) y += 2000;
  return y + "-" + mm + "-" + dd;
}

function daysBetween(a, b) {
  return Math.round((parseISO(b) - parseISO(a)) / 86400000);
}

function accrue(debt, days) {
  if (days <= 0 || debt <= 0) return { debt: debt, interest: 0 };
  const interest = debt * RATE_PER_DAY * days;
  return { debt: debt + interest, interest: interest };
}

function incomeDates(events) {
  return events
    .filter(function (e) {
      return e.kind === "income";
    })
    .map(function (e) {
      return e.date;
    })
    .sort();
}

function nextIncomeAfter(date, incomes) {
  for (let i = 0; i < incomes.length; i++) {
    if (incomes[i] > date) return incomes[i];
  }
  return "2026-09-30";
}

function upcomingCosts(fromDate, untilDate, events) {
  let s = 0;
  for (let i = 0; i < events.length; i++) {
    const e = events[i];
    if (e.kind !== "cost" || !e.amount) continue;
    if (e.date > fromDate && e.date <= untilDate) s += e.amount;
  }
  return s;
}

function buildMatrix(settings, rate) {
  const s = settings || loadSettings();
  const flags = Object.assign({}, DEFAULT_FLAGS, s.flags || {});
  const fx = rate || VND_RUB_FALLBACK;
  const customs = (s.customs || []).map(function (c) {
    return {
      date: c.date,
      kind: c.kind,
      amount: Math.round(Number(c.amount) || 0),
      note: c.note || "своё",
      custom: true,
    };
  });
  const events = calendarEvents(fx, flags).concat(customs).sort(function (a, b) {
    if (a.date === b.date) return 0;
    return a.date < b.date ? -1 : 1;
  });
  const incomes = incomeDates(events);

  const byDay = {};
  const order = [];
  for (let i = 0; i < events.length; i++) {
    const e = events[i];
    if (!byDay[e.date]) {
      byDay[e.date] = [];
      order.push(e.date);
    }
    byDay[e.date].push(e);
  }

  let debt = BASE_DEBT;
  let cash = 0;
  let last = "2026-08-16";
  let interestTotal = 0;
  const rows = [];

  for (let d = 0; d < order.length; d++) {
    const date = order[d];
    let interest = 0;
    if (last >= GRACE_END || date > GRACE_END) {
      const from = last < GRACE_END ? GRACE_END : last;
      const step = accrue(debt, daysBetween(from, date));
      debt = step.debt;
      interest = step.interest;
      interestTotal += interest;
    }

    let income = 0;
    let cashOut = 0;
    let withdraw = 0;
    let pay = 0;
    const notes = [];

    const day = byDay[date];
    for (let i = 0; i < day.length; i++) {
      const e = day[i];
      if (e.kind === "withdraw" && e.amount > 0) {
        withdraw += e.amount;
        debt += e.amount;
        cash += e.amount;
        notes.push(e.note);
      }
      if (e.kind === "income" && e.amount > 0) {
        income += e.amount;
        cash += e.amount;
        notes.push(e.note);
      }
      if (e.kind === "mark" && e.note) notes.push(e.note);
    }
    const firstIncome = incomes[0] || "2026-08-25";
    for (let i = 0; i < day.length; i++) {
      const e = day[i];
      if (e.kind !== "cost" || !e.amount) continue;
      notes.push(e.note);
      if (cash >= e.amount) {
        cash -= e.amount;
        cashOut += e.amount;
      } else if (date < firstIncome) {
        cashOut += e.amount;
      } else {
        const gap = e.amount - cash;
        cashOut += cash;
        cash = 0;
        withdraw += gap;
        debt += gap;
      }
    }
    for (let i = 0; i < day.length; i++) {
      const e = day[i];
      if (e.kind !== "pay" || !e.amount) continue;
      const use = Math.min(cash, e.amount);
      cash -= use;
      pay += use;
      debt = Math.max(0, debt - use);
      notes.push(e.note);
    }
    if (income > 0) {
      const until = nextIncomeAfter(date, incomes);
      const reserved = upcomingCosts(date, until, events);
      const auto = Math.max(0, cash - reserved);
      if (auto > 0) {
        cash -= auto;
        pay += auto;
        debt = Math.max(0, debt - auto);
      }
    }

    rows.push({
      date: fmtDate(date),
      iso: date,
      note: notes.filter(Boolean).join(", "),
      income: income,
      cashOut: cashOut,
      withdraw: withdraw,
      pay: pay,
      interest: interest,
      debt: debt,
      cash: cash,
    });
    last = date;
  }

  const paySum = rows.reduce(function (a, r) {
    return a + (r.pay || 0);
  }, 0);
  const withdrawSum = rows.reduce(function (a, r) {
    return a + (r.withdraw || 0);
  }, 0);
  const tail = rows.length ? rows[rows.length - 1].debt : debt;
  const minPay = Math.max(600, Math.round((BASE_DEBT + (flags.extraWithdraw ? 10000 : 0)) * 0.08));
  const pay2508 = (rows.find(function (r) {
    return r.iso === "2026-08-25";
  }) || {}).pay || 0;

  return {
    flags: flags,
    customs: s.customs || [],
    rows: rows,
    rate: fx,
    tail: Math.max(0, tail),
    interestTotal: interestTotal,
    paySum: paySum,
    withdrawSum: withdrawSum,
    minPay: minPay,
    minCovered: pay2508 >= minPay,
    cash: cash,
  };
}

function uniqueNotes(s) {
  const parts = String(s || "")
    .split(",")
    .map(function (x) {
      return x.trim();
    })
    .filter(Boolean);
  const seen = {};
  const out = [];
  for (let i = 0; i < parts.length; i++) {
    if (seen[parts[i]]) continue;
    seen[parts[i]] = 1;
    out.push(parts[i]);
  }
  return out.join(", ");
}

function dateRangeLabel(fromIso, toIso) {
  const a = String(fromIso).split("-");
  const b = String(toIso).split("-");
  if (a[1] === b[1]) return a[2] + "–" + b[2] + "." + a[1];
  return a[2] + "." + a[1] + "–" + b[2] + "." + b[1];
}

function compactRows(rows) {
  const keep = { "2026-08-29": 1, "2026-09-29": 1 };
  const out = [];
  for (let i = 0; i < (rows || []).length; i++) {
    const r = rows[i];
    const money = r.income || r.withdraw || r.pay;
    if (!money && !r.cashOut && !keep[r.iso]) continue;
    const last = out[out.length - 1];
    const attach =
      last &&
      !keep[last.iso] &&
      last.cashOut &&
      !money &&
      r.cashOut &&
      r.cashOut < 2000 &&
      !last.income &&
      !last.withdraw &&
      !last.pay;
    if (attach) {
      last.cashOut += r.cashOut;
      last.debt = r.debt;
      last.interest = (last.interest || 0) + (r.interest || 0);
      last.note = uniqueNotes(last.note + ", " + (r.note || ""));
      last.isoTo = r.iso;
      last.date = dateRangeLabel(last.iso, r.iso);
      continue;
    }
    out.push({
      date: r.date,
      iso: r.iso,
      note: uniqueNotes(r.note),
      income: r.income,
      cashOut: r.cashOut,
      withdraw: r.withdraw,
      pay: r.pay,
      interest: r.interest,
      debt: r.debt,
    });
  }
  return out;
}

function compute(flags) {
  const s = loadSettings();
  if (flags) s.flags = Object.assign({}, s.flags, flags);
  return buildMatrix(s, cachedRate());
}

function cachedRate() {
  const c = loadJson(fxPath(), null);
  if (c && c.rate > 0) return c.rate;
  return VND_RUB_FALLBACK;
}

async function refreshRate() {
  const cached = loadJson(fxPath(), null);
  if (cached && cached.rate > 0 && Date.now() - (cached.at || 0) < 12 * 60 * 60 * 1000) {
    return cached.rate;
  }
  try {
    const req = new Request("https://open.er-api.com/v6/latest/VND");
    req.timeoutInterval = 8;
    const j = await req.loadJSON();
    if (j && j.rates && j.rates.RUB > 0) {
      saveJson(fxPath(), { rate: j.rates.RUB, at: Date.now() });
      return j.rates.RUB;
    }
  } catch (e) {}
  return cachedRate();
}

function rub(n) {
  if (n == null || Math.abs(n) < 0.5) return "·";
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
  if (n == null || !n) return "—";
  return Math.round(Number(n)).toLocaleString("ru-RU") + " ₽";
}

function flagChips(flags) {
  return (
    (flags.extraWithdraw ? "●" : "○") +
    "+10к  " +
    (flags.splitSchool ? "●школа½  " : "○школа  ") +
    "курс " +
    (cachedRate() * 1000).toFixed(2) +
    " ₽/тыс.₫"
  );
}

function color(hex) {
  return new Color(hex);
}

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
}

function widgetRows(plan, family) {
  const key = plan.rows.filter(function (r) {
    return r.withdraw || r.pay || r.iso === "2026-08-16" || r.iso === "2026-08-29" || r.iso === "2026-09-29";
  });
  if (family === "small") return key.slice(0, 5);
  if (family === "large") return plan.rows;
  return key.slice(0, 8);
}

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

  const rows = family === "large" ? compactRows(plan.rows) : widgetRows(plan, family);
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    const isTail = r.iso === "2026-09-29";
    addMatrixRow(
      w,
      [r.date, r.withdraw ? rub(r.withdraw) : "·", r.pay ? rub(r.pay) : "·", rub(r.debt)],
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
    "Σ " + rub(plan.paySum) + " погаш · " + rub(plan.withdrawSum) + " снят · хвост " + rub(plan.tail)
  );
  foot.font = Font.mediumSystemFont(8);
  foot.textColor = color("#8AA0A8");
  foot.lineLimit = 1;
  foot.minimumScaleFactor = 0.65;
  return w;
}

function combinedHtml(plan) {
  const customs = JSON.stringify(plan.customs || []);
  const flags = JSON.stringify(plan.flags || DEFAULT_FLAGS);
  const rate = plan.rate;
  return `<!DOCTYPE html>
<html><head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,viewport-fit=cover"/>
<style>
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html,body{height:100%;height:100dvh;margin:0;overflow:hidden}
body{font:11px -apple-system;background:#0F171C;color:#E8F1F2;display:flex;flex-direction:column;
  padding:6px;padding-bottom:max(6px,env(safe-area-inset-bottom))}
.top{flex:0 0 auto}
.row{display:flex;gap:4px;margin-bottom:4px;align-items:center}
input,select,button{font:11px -apple-system;border-radius:7px;border:1px solid #24343E;background:#1A2830;color:#E8F1F2;padding:6px 7px}
input,select{flex:1;min-width:0}
button{font-weight:700}
.add{background:#5EEAD4;color:#0F171C;border:0;padding:6px 11px}
.flag{display:flex;gap:4px;align-items:center;color:#8AA0A8;font-size:10px;white-space:nowrap;flex:0 0 auto}
.pills{display:flex;flex-wrap:wrap;gap:4px;margin:0 0 4px;max-height:28px;overflow:hidden}
.pills:empty{display:none;margin:0}
.pill{background:#1A2830;border:1px solid #24343E;border-radius:999px;padding:2px 7px;font-size:10px;display:flex;gap:5px;align-items:center}
.pill .x{color:#F59E0B;font-weight:800}
.sums{display:flex;flex-wrap:wrap;gap:7px;font-size:10px;color:#8AA0A8;margin-bottom:4px}
.sums b{color:#5EEAD4}
.wrap{flex:1 1 auto;min-height:0;overflow:hidden;border:1px solid #24343E;border-radius:8px;display:flex}
table{width:100%;height:100%;border-collapse:collapse;font-size:clamp(8px,2.05vh,11px);table-layout:fixed}
th,td{padding:1px 3px;border-bottom:1px solid #223038;text-align:right;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
th{color:#5EEAD4;background:#152028;font-size:8px}
td:first-child,th:first-child,td:nth-child(2),th:nth-child(2){text-align:left}
td.pay{color:#5EEAD4;font-weight:700}
td.wd{color:#F59E0B;font-weight:700}
tr.tail td{color:#5EEAD4;background:#134E4A}
</style></head><body>
<div class="top">
  <div class="row">
    <input id="date" placeholder="дата 20.09" inputmode="numeric"/>
    <select id="kind">
      <option value="cost">расход</option>
      <option value="pay">погашение</option>
      <option value="withdraw">снятие</option>
    </select>
    <input id="amount" type="number" placeholder="₽"/>
    <button class="add" id="add">+</button>
  </div>
  <div class="row">
    <input id="note" placeholder="заметка"/>
    <label class="flag"><input type="checkbox" id="extraWithdraw"/> +10к</label>
    <label class="flag"><input type="checkbox" id="splitSchool"/> школа ½ с мамой</label>
  </div>
  <div class="pills" id="list"></div>
  <div class="sums">хвост <b id="tail">—</b> · погаш <b id="pay">—</b> · снят <b id="wd">—</b> · % <b id="int">—</b> · v${CORE_VERSION}</div>
</div>
<div class="wrap"><table>
<thead><tr>
<th>Дата</th><th>Что</th><th>Приход</th><th>Расход</th><th>Снятие</th><th>Погаш</th><th>Долг</th>
</tr></thead>
<tbody id="tb"></tbody>
</table></div>
<script>
window.__flags = ${flags};
window.__customs = ${customs};
const RATE = ${rate};
const RATE_DAY = ${RATE_PER_DAY};
const BASE = ${BASE_DEBT};
const FALLBACK = ${VND_RUB_FALLBACK};
function vnd(n){return Math.round(n*(RATE||FALLBACK))}
function rub(n){if(!n)return '·'; const x=Math.round(n); const a=Math.abs(x); if(a>=1000){const k=a/1000; return (x<0?'−':'')+(k>=10||Math.abs(k-Math.round(k))<0.05?Math.round(k):k.toFixed(1).replace('.0',''))+'к'} return String(x)}
function rubFull(n){if(!n)return '—'; return Math.round(n).toLocaleString('ru-RU')+' ₽'}
function iso(dmy){const m=String(dmy||'').trim().match(/^(\\d{1,2})[.\\/-](\\d{1,2})(?:[.\\/-](\\d{2,4}))?$/); if(!m)return null; const dd=('0'+m[1]).slice(-2), mm=('0'+m[2]).slice(-2); let y=m[3]?+m[3]:2026; if(y<100)y+=2000; return y+'-'+mm+'-'+dd}
function fmt(iso){const p=iso.split('-'); return p[2]+'.'+p[1]}
function parseISO(s){const p=s.split('-'); return Date.UTC(+p[0],+p[1]-1,+p[2])}
function daysBetween(a,b){return Math.round((parseISO(b)-parseISO(a))/86400000)}
function accrue(debt,days){if(days<=0||debt<=0)return {debt,interest:0}; const interest=debt*RATE_DAY*days; return {debt:debt+interest,interest}}
function cal(flags){
  const skip=flags.skipBike;
  const ev=[
    {date:'2026-08-16',kind:'mark',note:'факт'},
    {date:'2026-08-18',kind:'cost',amount:10000,note:'Еда'},
    {date:'2026-08-18',kind:'cost',amount:vnd(25000),note:'ГО'},
    {date:'2026-08-19',kind:'cost',amount:vnd(25000),note:'ГО'},
    {date:'2026-08-20',kind:'cost',amount:vnd(25000),note:'ГО'},
    {date:'2026-08-21',kind:'cost',amount:vnd(25000),note:'ГО'},
    {date:'2026-08-22',kind:'cost',amount:vnd(25000),note:'ГО'},
    {date:'2026-08-25',kind:'income',amount:53000,note:'ЗП'},
    {date:'2026-08-29',kind:'mark',note:'грейс↓'},
    {date:'2026-08-31',kind:'cost',amount:vnd(flags.splitSchool?11750000:23500000),note:flags.splitSchool?'Школа ½':'Школа'},
    {date:'2026-09-03',kind:'cost',amount:vnd(2800000),note:'КУ'},
    {date:'2026-09-03',kind:'cost',amount:skip?0:vnd(2000000),note:'Байк'},
    {date:'2026-09-03',kind:'cost',amount:vnd(100000),note:'ТЛФ'},
    {date:'2026-09-05',kind:'income',amount:40000,note:'ЗП'},
    {date:'2026-09-09',kind:'cost',amount:vnd(100000),note:'ТЛФ'},
    {date:'2026-09-10',kind:'income',amount:83000,note:'ЗП'},
    {date:'2026-09-12',kind:'cost',amount:vnd(23000000),note:'Квартира'},
    {date:'2026-09-25',kind:'income',amount:63000,note:'ЗП+алименты'},
    {date:'2026-09-29',kind:'mark',note:'хвост'}
  ];
  if(flags.extraWithdraw) ev.push({date:'2026-08-24',kind:'withdraw',amount:10000,note:'+10к'});
  return ev;
}
function build(flags,customs){
  const extra=(customs||[]).map(function(c){return {date:c.date,kind:c.kind,amount:+c.amount||0,note:c.note||'своё'}});
  const events=cal(flags).concat(extra).sort(function(a,b){return a.date<b.date?-1:a.date>b.date?1:0});
  const incomes=events.filter(function(e){return e.kind==='income'}).map(function(e){return e.date});
  function nextInc(date){for(let i=0;i<incomes.length;i++) if(incomes[i]>date) return incomes[i]; return '2026-09-30'}
  function upcoming(from,until){let s=0; events.forEach(function(e){if(e.kind==='cost'&&e.amount&&e.date>from&&e.date<=until)s+=e.amount}); return s}
  const by={}; const order=[];
  events.forEach(function(e){if(!by[e.date]){by[e.date]=[]; order.push(e.date)} by[e.date].push(e)});
  let debt=BASE, cash=0, last='2026-08-16', interestTotal=0, rows=[];
  order.forEach(function(date){
    let interest=0;
    if(last>='2026-08-29'||date>'2026-08-29'){
      const from=last<'2026-08-29'?'2026-08-29':last;
      const step=accrue(debt,daysBetween(from,date)); debt=step.debt; interest=step.interest; interestTotal+=interest;
    }
    let income=0,cashOut=0,withdraw=0,pay=0; const notes=[];
    const day=by[date];
    day.forEach(function(e){
      if(e.kind==='withdraw'&&e.amount){withdraw+=e.amount; debt+=e.amount; cash+=e.amount; notes.push(e.note)}
      if(e.kind==='income'&&e.amount){income+=e.amount; cash+=e.amount; notes.push(e.note)}
      if(e.kind==='mark'&&e.note) notes.push(e.note)
    });
    const firstIncome = incomes[0] || '2026-08-25';
    day.forEach(function(e){
      if(e.kind!=='cost'||!e.amount) return;
      notes.push(e.note);
      if(cash>=e.amount){cash-=e.amount; cashOut+=e.amount}
      else if(date<firstIncome){cashOut+=e.amount}
      else {const gap=e.amount-cash; cashOut+=cash; cash=0; withdraw+=gap; debt+=gap}
    });
    day.forEach(function(e){
      if(e.kind!=='pay'||!e.amount) return;
      notes.push(e.note);
      const use=Math.min(cash,e.amount); cash-=use; pay+=use; debt=Math.max(0,debt-use);
    });
    if(income>0){
      const auto=Math.max(0, cash - upcoming(date, nextInc(date)));
      if(auto>0){cash-=auto; pay+=auto; debt=Math.max(0,debt-auto)}
    }
    rows.push({date:fmt(date),iso:date,note:notes.filter(Boolean).join(', '),withdraw,pay,debt,income,cashOut});
    last=date;
  });
  const paySum=rows.reduce((s,r)=>s+r.pay,0), wdSum=rows.reduce((s,r)=>s+r.withdraw,0);
  return {rows,tail:rows[rows.length-1].debt,paySum,wdSum,interestTotal};
}
function uniqNotes(s){
  const seen={}; return String(s||'').split(',').map(function(x){return x.trim()}).filter(function(x){if(!x||seen[x])return false; seen[x]=1; return true}).join(', ');
}
function compact(rows){
  const keep={'2026-08-29':1,'2026-09-29':1}; const out=[];
  rows.forEach(function(r){
    const money=r.income||r.withdraw||r.pay;
    if(!money&&!r.cashOut&&!keep[r.iso]) return;
    const last=out[out.length-1];
    if(last&&!keep[last.iso]&&last.cashOut&&!money&&r.cashOut&&r.cashOut<2000&&!last.income&&!last.withdraw&&!last.pay){
      last.cashOut+=r.cashOut; last.debt=r.debt;
      last.note=uniqNotes(last.note+', '+(r.note||''));
      const a=last.iso.split('-'), b=r.iso.split('-');
      last.date=a[1]===b[1]?a[2]+'–'+b[2]+'.'+a[1]:a[2]+'.'+a[1]+'–'+b[2]+'.'+b[1];
      return;
    }
    out.push({date:r.date,iso:r.iso,note:uniqNotes(r.note),income:r.income,cashOut:r.cashOut,withdraw:r.withdraw,pay:r.pay,debt:r.debt});
  });
  return out;
}
function render(){
  window.__flags.extraWithdraw = document.getElementById('extraWithdraw').checked;
  window.__flags.splitSchool = document.getElementById('splitSchool').checked;
  const list=document.getElementById('list');
  const cs=window.__customs||[];
  list.innerHTML=cs.map(function(c,i){
    const kind=c.kind==='pay'?'погаш':c.kind==='withdraw'?'снятие':'расход';
    return '<span class="pill">'+fmt(c.date)+' '+kind+' '+rub(c.amount)+' <span class="x" data-i="'+i+'">×</span></span>';
  }).join('');
  list.querySelectorAll('.x').forEach(function(b){b.onclick=function(){window.__customs.splice(+b.dataset.i,1); render()}});
  const m=build(window.__flags, window.__customs);
  document.getElementById('tail').textContent=rubFull(m.tail);
  document.getElementById('pay').textContent=rubFull(m.paySum);
  document.getElementById('wd').textContent=rubFull(m.wdSum);
  document.getElementById('int').textContent=rubFull(m.interestTotal);
  document.getElementById('tb').innerHTML=compact(m.rows).map(function(r){
    const cls=r.iso==='2026-09-29'?' class="tail"':'';
    return '<tr'+cls+'><td>'+r.date+'</td><td>'+(r.note||'')+'</td><td>'+rub(r.income)+'</td><td>'+rub(r.cashOut)+'</td><td class="wd">'+rub(r.withdraw)+'</td><td class="pay">'+rub(r.pay)+'</td><td>'+rub(r.debt)+'</td></tr>';
  }).join('');
}
document.getElementById('extraWithdraw').checked=!!window.__flags.extraWithdraw;
document.getElementById('splitSchool').checked=!!window.__flags.splitSchool;
document.getElementById('extraWithdraw').onchange=render;
document.getElementById('splitSchool').onchange=render;
document.getElementById('add').onclick=function(){
  const date=iso(document.getElementById('date').value);
  const amount=+document.getElementById('amount').value;
  const kind=document.getElementById('kind').value;
  const note=document.getElementById('note').value||'своё';
  if(!date||!(amount>0)) return;
  window.__customs.push({date,kind,amount,note});
  document.getElementById('amount').value='';
  document.getElementById('note').value='';
  render();
};
render();
</script></body></html>`;
}

async function presentCombined(plan) {
  const wv = new WebView();
  await wv.loadHTML(combinedHtml(plan));
  await wv.present(true);
  try {
    const stateJson = await wv.evaluateJavaScript(
      "JSON.stringify({ customs: window.__customs || [], flags: window.__flags || {} })"
    );
    const parsed = JSON.parse(stateJson);
    if (parsed) {
      const s = loadSettings();
      if (Array.isArray(parsed.customs)) s.customs = parsed.customs;
      if (parsed.flags) s.flags = Object.assign({}, s.flags, parsed.flags);
      saveSettings(s);
    }
  } catch (e) {}
  return loadSettings();
}

async function presentMenu(plan) {
  return await presentCombined(plan);
}

async function main() {
  const rate = await refreshRate();
  let settings = loadSettings();
  let plan = buildMatrix(settings, rate);

  if (config.runsInWidget) {
    const family = config.widgetFamily || "medium";
    Script.setWidget(await buildWidget(plan, family));
    Script.complete();
    return;
  }

  settings = await presentMenu(plan);
  plan = buildMatrix(settings, rate);
  Script.setWidget(await buildWidget(plan, "medium"));
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
  loadSettings,
  saveSettings,
  compactRows,
  buildWidget,
};
