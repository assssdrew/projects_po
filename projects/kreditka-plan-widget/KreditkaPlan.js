// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: credit-card;
//
// STANDALONE v3.8 — весь код в ОДНОМ файле, без importModule.
// Scriptable → KreditkaPlan → Select All (удали СТАРЫЙ код) → Paste → ▶ Play.
// Если видишь importModule("KreditkaPlanCore") или CORE_URLS = { — это старый скрипт.

const KREDITKA_STANDALONE = "3.8";

// KreditkaPlanCore v2 — матрица по календарю (VND→RUB) + произвольные суммы.
const MARKER = "KREDITKA_PLAN_WIDGET_V1";
const CORE_VERSION = "3.8"; // CORE_VERSION = "3.7" // CORE_VERSION = "3.6" // CORE_VERSION = "3.5" // CORE_VERSION = "3.4" // CORE_VERSION = "3.3" // CORE_VERSION = "3.1"

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
  skipBike: false,
  honestFood: true,
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
  if (flags && flags.honestFood) {
    events.push({ date: "2026-09-10", kind: "cost", amount: 7500, note: "Еда" });
    events.push({ date: "2026-09-25", kind: "cost", amount: 17500, note: "Еда" });
  }
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
  const s = String(dmy || "").trim().replace(/\s+/g, "").replace(/,/g, ".");
  let m = s.match(/^(\d{1,2})[./-](\d{1,2})(?:[./-](\d{2,4}))?$/);
  if (!m && /^\d{4}$/.test(s)) m = [s, s.slice(0, 2), s.slice(2, 4)];
  if (!m && /^\d{8}$/.test(s)) m = [s, s.slice(0, 2), s.slice(2, 4), s.slice(4, 8)];
  if (!m) return null;
  const dd = ("0" + m[1]).slice(-2);
  const mm = ("0" + m[2]).slice(-2);
  let y = m[3] ? +m[3] : 2026;
  if (y < 100) y += 2000;
  if (+mm < 1 || +mm > 12 || +dd < 1 || +dd > 31) return null;
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
    if (date === "2026-08-25") {
      const minNeed = Math.max(600, Math.round((BASE_DEBT + (flags.extraWithdraw ? 10000 : 0)) * 0.08));
      if (pay < minNeed) {
        const extra = Math.min(cash, minNeed - pay);
        if (extra > 0) {
          cash -= extra;
          pay += extra;
          debt = Math.max(0, debt - extra);
          notes.push("мин.");
        }
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
  const keep = { "2026-08-16": 1, "2026-08-29": 1, "2026-09-29": 1 };
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
      last.cash = r.cash;
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
      cash: r.cash,
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
  const bits = [
    (flags.extraWithdraw ? "●" : "○") + "+10к",
    (flags.splitSchool ? "●" : "○") + "школа½",
    (flags.skipBike ? "●" : "○") + "байк↓",
    (flags.honestFood ? "●" : "○") + "еда",
  ];
  return bits.join("  ");
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
html{background:#0F171C}
body{margin:0;font:13px -apple-system,system-ui;background:#0F171C;color:#E8F1F2;
  padding-top:calc(env(safe-area-inset-top, 0px) + 44px);
  padding-right:max(10px, env(safe-area-inset-right, 0px));
  padding-bottom:max(12px, env(safe-area-inset-bottom, 0px));
  padding-left:max(10px, env(safe-area-inset-left, 0px))}
h1{font-size:15px;margin:0 0 6px;color:#5EEAD4}
.addbar{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:6px;align-items:center}
.addbar input,.addbar select,button{font:12px -apple-system;border-radius:7px;border:1px solid #24343E;background:#1A2830;color:#E8F1F2;padding:5px 7px}
.addbar input,.addbar select{flex:1;min-width:64px}
.add{background:#5EEAD4;color:#0F171C;border:0;font-weight:800;padding:5px 10px}
.pills{display:flex;flex-wrap:wrap;gap:4px;margin:0 0 6px}
.pills:empty{display:none}
.pill{background:#1A2830;border:1px solid #24343E;border-radius:999px;padding:4px 8px;font-size:11px;display:flex;gap:6px;align-items:center}
.pill .x,.tblx{color:#F59E0B;font-weight:800;padding:0 4px}
.adderr{color:#F59E0B;font-size:10px;margin:0 0 6px;min-height:0}
.flags{display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-bottom:8px}
.flag{display:flex;gap:6px;align-items:center;background:#1A2830;border-radius:8px;padding:6px 7px;border:1px solid #24343E;min-width:0}
.flag input{width:16px;height:16px;flex:0 0 auto;margin:0}
.flag b{display:block;font-size:11px;line-height:1.15;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sums{display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-bottom:8px}
.sum{background:#1A2830;border-radius:8px;padding:6px 8px;border:1px solid #24343E}
.sum .l{font-size:9px;color:#8AA0A8}
.sum .v{font-size:14px;font-weight:800;color:#5EEAD4;margin-top:1px}
.wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;border:1px solid #24343E;border-radius:8px}
table{border-collapse:collapse;min-width:720px;width:100%;font-size:11px}
th,td{padding:5px 5px;border-bottom:1px solid #223038;white-space:nowrap}
th{position:sticky;top:0;background:#152028;color:#5EEAD4;font-size:10px;text-align:right}
th:first-child,td:first-child{text-align:left;position:sticky;left:0;background:#152028;z-index:1;font-weight:700}
th:nth-child(2),td:nth-child(2){text-align:left;color:#8AA0A8}
td{text-align:right;font-variant-numeric:tabular-nums}
td.pay{color:#5EEAD4;font-weight:700}
td.wd{color:#F59E0B;font-weight:700}
td.debt{font-weight:700}
tr.tail td{color:#5EEAD4;background:#134E4A}
tr.intsum td{color:#F59E0B;background:#1A2830;font-weight:700}
.warn{margin-top:8px;color:#F59E0B;font-size:11px;font-weight:700}
</style></head><body>
<h1>Матрица · кредитка</h1>
<div class="addbar">
    <input id="date" placeholder="20.09 или 2009" inputmode="decimal" autocomplete="off" autocorrect="off" autocapitalize="off"/>
  <select id="kind">
    <option value="cost">расход</option>
    <option value="pay">погашение</option>
    <option value="withdraw">снятие</option>
    <option value="income">приход</option>
  </select>
    <input id="amount" placeholder="сумма ₽ или 10к"/>
    <input id="note" placeholder="заметка"/>
    <button class="add" id="add">+</button>
  </div>
  <div class="adderr" id="addErr"></div>
  <div class="pills" id="list"></div>
<div class="flags">
  <label class="flag"><input type="checkbox" id="extraWithdraw"/><span><b>+10к снятие</b></span></label>
  <label class="flag"><input type="checkbox" id="splitSchool"/><span><b>Школа ½</b></span></label>
  <label class="flag"><input type="checkbox" id="skipBike"/><span><b>Байк позже</b></span></label>
  <label class="flag"><input type="checkbox" id="honestFood"/><span><b>Честная еда</b></span></label>
</div>
<div class="sums">
  <div class="sum"><div class="l">Σ погашения</div><div class="v" id="sPay">—</div></div>
  <div class="sum"><div class="l">Σ снятия</div><div class="v" id="sWd">—</div></div>
  <div class="sum"><div class="l">% за путь</div><div class="v" id="sInt">—</div></div>
  <div class="sum"><div class="l">Хвост 29.09</div><div class="v" id="sTail">—</div></div>
</div>
<div class="wrap"><table>
<thead><tr>
<th>Дата</th><th>Что</th><th>Приход</th><th>Нал.расход</th><th>Снятие</th><th>Погаш</th><th>%</th><th>Нал</th><th>Долг</th>
</tr></thead>
<tbody id="tb"></tbody>
</table></div>
<p class="warn" id="warn" hidden>Минималка к 29.08 не закрыта — будет +20% неустойки.</p>
<script>
window.__flags = ${flags};
window.__customs = ${customs};
const RATE = ${rate};
const RATE_DAY = ${RATE_PER_DAY};
const BASE = ${BASE_DEBT};
const FALLBACK = ${VND_RUB_FALLBACK};
function vnd(n){return Math.round(n*(RATE||FALLBACK))}
function cell(n){if(!n)return '·'; return Math.round(n).toLocaleString('ru-RU')}
function rubFull(n){if(!n)return '—'; return Math.round(n).toLocaleString('ru-RU')+' ₽'}
function iso(dmy){
  var s=String(dmy||'').trim().replace(/\\s+/g,'').replace(/,/g,'.');
  var m=s.match(/^(\\d{1,2})[.\\/-](\\d{1,2})(?:[.\\/-](\\d{2,4}))?$/);
  if(!m && /^\\d{4}$/.test(s)) m=[s,s.slice(0,2),s.slice(2,4)];
  if(!m && /^\\d{8}$/.test(s)) m=[s,s.slice(0,2),s.slice(2,4),s.slice(4)];
  if(!m) return null;
  var dd=('0'+m[1]).slice(-2), mm=('0'+m[2]).slice(-2);
  var y=m[3]?+m[3]:2026; if(y<100) y+=2000;
  if(+mm<1||+mm>12||+dd<1||+dd>31) return null;
  return y+'-'+mm+'-'+dd;
}
function money(s){var t=String(s||'').trim().toLowerCase().replace(/\\s/g,'').replace(',','.'); var k=/[кk]$/.test(t); t=t.replace(/[кk]$/,''); var n=parseFloat(t); if(!(n>0))return 0; return Math.round(k?n*1000:n)}
function fmt(iso){const p=iso.split('-'); return p[2]+'.'+p[1]}
function parseISO(s){const p=s.split('-'); return Date.UTC(+p[0],+p[1]-1,+p[2])}
function daysBetween(a,b){return Math.round((parseISO(b)-parseISO(a))/86400000)}
function accrue(debt,days){if(days<=0||debt<=0)return {debt:debt,interest:0}; const interest=debt*RATE_DAY*days; return {debt:debt+interest,interest:interest}}
function cal(flags){
  const skip=flags.skipBike;
  const split=flags.splitSchool;
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
    {date:'2026-08-31',kind:'cost',amount:vnd(split?11750000:23500000),note:split?'Школа ½':'Школа'},
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
  if(flags.honestFood){
    ev.push({date:'2026-09-10',kind:'cost',amount:7500,note:'Еда'});
    ev.push({date:'2026-09-25',kind:'cost',amount:17500,note:'Еда'});
  }
  return ev;
}
function build(flags,customs){
  const extra=(customs||[]).map(function(c,i){return {date:c.date,kind:c.kind,amount:+c.amount||0,note:c.note||'своё',custom:true,ci:i}});
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
    if(date==='2026-08-25'){
      const minNeed=Math.max(600, Math.round((BASE+(flags.extraWithdraw?10000:0))*0.08));
      if(pay<minNeed){
        const extraPay=Math.min(cash, minNeed-pay);
        if(extraPay>0){cash-=extraPay; pay+=extraPay; debt=Math.max(0,debt-extraPay); notes.push('мин.')}
      }
    }
    rows.push({date:fmt(date),iso:date,note:notes.filter(Boolean).join(', '),withdraw,pay,debt,income,cashOut,interest,cash,customIdx:day.filter(function(e){return e.custom}).map(function(e){return e.ci})});
    last=date;
  });
  const paySum=rows.reduce((s,r)=>s+r.pay,0), wdSum=rows.reduce((s,r)=>s+r.withdraw,0);
  const minNeed=Math.max(600, Math.round((BASE+(flags.extraWithdraw?10000:0))*0.08));
  const pay2508=(rows.find(function(r){return r.iso==='2026-08-25'})||{}).pay||0;
  return {rows,tail:rows[rows.length-1].debt,paySum,wdSum,interestTotal,minCovered:pay2508>=minNeed};
}
function uniqNotes(s){
  const seen={}; return String(s||'').split(',').map(function(x){return x.trim()}).filter(function(x){if(!x||seen[x])return false; seen[x]=1; return true}).join(', ');
}
function compact(rows){
  const keep={'2026-08-16':1,'2026-08-29':1,'2026-09-29':1}; const out=[];
  rows.forEach(function(r){
    const money=r.income||r.withdraw||r.pay;
    if(!money&&!r.cashOut&&!keep[r.iso]&&!(r.customIdx&&r.customIdx.length)) return;
    const last=out[out.length-1];
    if(last&&!keep[last.iso]&&last.cashOut&&!money&&r.cashOut&&r.cashOut<2000&&!last.income&&!last.withdraw&&!last.pay&&!(r.customIdx&&r.customIdx.length)&&!(last.customIdx&&last.customIdx.length)){
      last.cashOut+=r.cashOut; last.debt=r.debt; last.cash=r.cash;
      last.interest=(last.interest||0)+(r.interest||0);
      last.note=uniqNotes(last.note+', '+(r.note||''));
      const a=last.iso.split('-'), b=r.iso.split('-');
      last.date=a[1]===b[1]?a[2]+'–'+b[2]+'.'+a[1]:a[2]+'.'+a[1]+'–'+b[2]+'.'+b[1];
      return;
    }
    out.push({date:r.date,iso:r.iso,note:uniqNotes(r.note),income:r.income,cashOut:r.cashOut,withdraw:r.withdraw,pay:r.pay,interest:r.interest,cash:r.cash,debt:r.debt,customIdx:r.customIdx||[]});
  });
  return out;
}
const FLAG_IDS=['extraWithdraw','splitSchool','skipBike','honestFood'];
function readFlags(){
  const f=Object.assign({}, window.__flags||{});
  FLAG_IDS.forEach(function(id){ const el=document.getElementById(id); if(el) f[id]=el.checked; });
  window.__flags=f;
  return f;
}
function delCustom(i){
  window.__customs.splice(i,1);
  render();
}
function render(){
  const flags=readFlags();
  const list=document.getElementById('list');
  const cs=window.__customs||[];
  list.innerHTML=cs.map(function(c,i){
    const kind=c.kind==='pay'?'погаш':c.kind==='withdraw'?'снятие':c.kind==='income'?'приход':'расход';
    return '<span class="pill">'+fmt(c.date)+' '+kind+' '+cell(c.amount)+' <span class="x" data-i="'+i+'">×</span></span>';
  }).join('');
  list.querySelectorAll('.x').forEach(function(b){b.onclick=function(){delCustom(+b.dataset.i)}});
  const m=build(flags, window.__customs);
  document.getElementById('sPay').textContent=rubFull(m.paySum);
  document.getElementById('sWd').textContent=rubFull(m.wdSum);
  document.getElementById('sInt').textContent=rubFull(m.interestTotal);
  document.getElementById('sTail').textContent=rubFull(m.tail);
  document.getElementById('warn').hidden=!!m.minCovered;
  document.getElementById('tb').innerHTML=compact(m.rows).map(function(r){
    const cls=r.iso==='2026-09-29'?' class="tail"':'';
    const del=(r.customIdx||[]).map(function(i){return '<span class="tblx" data-i="'+i+'">×</span>'}).join('');
    return '<tr'+cls+'><td>'+r.date+'</td><td>'+(r.note||'')+' '+del+'</td><td>'+cell(r.income)+'</td><td>'+cell(r.cashOut)+'</td><td class="wd">'+cell(r.withdraw)+'</td><td class="pay">'+cell(r.pay)+'</td><td>'+cell(r.interest)+'</td><td>'+cell(r.cash)+'</td><td class="debt">'+cell(r.debt)+'</td></tr>';
  }).join('')+'<tr class="intsum"><td></td><td>переплата %</td><td>·</td><td>·</td><td>·</td><td>·</td><td>'+cell(m.interestTotal)+'</td><td>·</td><td>·</td></tr>';
  document.querySelectorAll('.tblx').forEach(function(b){b.onclick=function(){delCustom(+b.dataset.i)}});
}
function addCustom(){
  const err=document.getElementById('addErr');
  err.textContent='';
  const date=iso(document.getElementById('date').value);
  const amount=money(document.getElementById('amount').value);
  const kind=document.getElementById('kind').value;
  const note=document.getElementById('note').value||'своё';
  if(!date){err.textContent='Нужна дата, например 20.09'; return}
  if(!(amount>0)){err.textContent='Нужна сумма, например 5000 или 5к'; return}
  window.__customs.push({date:date,kind:kind,amount:amount,note:note});
  document.getElementById('amount').value='';
  document.getElementById('note').value='';
  render();
}
FLAG_IDS.forEach(function(id){
  const el=document.getElementById(id);
  if(!el) return;
  el.checked=!!window.__flags[id];
  el.onchange=render;
});
document.getElementById('add').onclick=addCustom;
['date','amount','note'].forEach(function(id){
  document.getElementById(id).addEventListener('keydown',function(e){if(e.key==='Enter')addCustom()});
});
function fitChrome(){
  var vv=window.visualViewport;
  if(vv && vv.offsetTop>8){
    document.body.style.paddingTop='8px';
    document.body.style.paddingBottom=Math.max(12, window.innerHeight-vv.height-vv.offsetTop)+'px';
    return;
  }
  var probe=document.createElement('div');
  probe.style.paddingTop='env(safe-area-inset-top)';
  document.body.appendChild(probe);
  var safe=parseFloat(getComputedStyle(probe).paddingTop)||0;
  probe.remove();
  var top=safe+44;
  if(top<90) top=98;
  document.body.style.paddingTop=top+'px';
  var bot=12;
  if(vv) bot=Math.max(12, Math.round(window.innerHeight-vv.height-vv.offsetTop));
  document.body.style.paddingBottom=bot+'px';
}
fitChrome();
if(window.visualViewport) window.visualViewport.addEventListener('resize',fitChrome);
window.addEventListener('resize',fitChrome);
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

await main();
