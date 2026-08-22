// KreditkaPlanCore v3.9 — матрица по актуальному плану (Sheets, авг–окт 2026).
const MARKER = "KREDITKA_PLAN_WIDGET_V1";
const CORE_VERSION = "3.9"; // CORE_VERSION = "3.8" // CORE_VERSION = "3.7" // CORE_VERSION = "3.6" // CORE_VERSION = "3.5" // CORE_VERSION = "3.4" // CORE_VERSION = "3.3" // CORE_VERSION = "3.1"

const SETTINGS_NAME = "kreditka-plan-settings.json";
const FX_CACHE_NAME = "kreditka-vnd-rub.json";
const RATE_PER_DAY = 0.599 / 365;
const VND_RUB_FALLBACK = 0.00322;
const BASE_DEBT = 100000;
const GRACE_END = "2026-08-29";
const FREE_LIMIT = 100000;
const COMM_PCT = 0.029;
const COMM_FIX = 290;
const TAIL_ISO = "2026-10-05";
const BILLING = { "2026-08-29": 1, "2026-09-29": 1, "2026-10-29": 1 };
const STATEMENT = { "2026-09-04": 1, "2026-10-04": 1, "2026-11-04": 1 };

const FOOD_SEP = 5000;
const ENG_WEEK = 3500;
const ENG_25 = 3200;
const SPORT_OWN = 500;
const SCHOOL_HALF = 22500;
const FEE = 15000;
const ATTACH = 4500;
const VISA = 9000;
const BIKE = 6000;
const JKU = 7000;
const APT = 70000;
const SPORT_CATCH = 8250;
const SPORT_2W = 1350;
const LIVE = FOOD_SEP + ENG_WEEK + SPORT_OWN;
const LIVE2 = LIVE * 2;

const DEFAULT_FLAGS = {
  extraWithdraw: false,
  splitSchool: true,
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
  if (!raw.version || String(raw.version) < "3.9") flags.splitSchool = true;
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

function isoAdd(iso, days) {
  const p = String(iso).split("-");
  const d = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2] + days));
  return (
    d.getUTCFullYear() +
    "-" +
    ("0" + (d.getUTCMonth() + 1)).slice(-2) +
    "-" +
    ("0" + d.getUTCDate()).slice(-2)
  );
}

function calendarEvents(rate, flags) {
  const school = flags && flags.splitSchool ? SCHOOL_HALF : SCHOOL_HALF * 2;
  const bike = flags && flags.skipBike ? 0 : BIKE;
  const food = !flags || flags.honestFood !== false;
  const ev = [];
  function add(date, kind, amount, note, extra) {
    ev.push(Object.assign({ date: date, kind: kind, amount: amount, note: note }, extra || {}));
  }
  add("2026-08-16", "mark", 0, "факт");
  add("2026-08-22", "withdraw", 2702, "снятие 22.08", { source: "card", spent: true });
  if (flags && flags.extraWithdraw) add("2026-08-24", "withdraw", 10000, "+10к", { source: "card" });
  add("2026-08-25", "income", 58000, "ЗП Жени");
  add("2026-08-25", "income", 10000, "алименты");
  add("2026-08-25", "cost", ENG_25, "английский", { source: "cash" });
  add("2026-08-29", "pay", 0, "остаток на карту");
  add("2026-08-29", "mark", 0, "грейс↓");
  if (food) add("2026-08-30", "cost", SPORT_OWN, "спорт наш", { source: "card" });
  add("2026-09-01", "cost", school, flags && flags.splitSchool ? "школа ½" : "школа", { source: "card" });
  add("2026-09-01", "cost", FEE, "взнос в школу", { source: "card" });
  add("2026-09-01", "cost", ATTACH, "прикрепление", { source: "card" });
  if (food) add("2026-09-01", "cost", FOOD_SEP, "еда", { source: "card" });
  add("2026-09-01", "cost", VISA, "visa run", { source: "card" });
  if (bike) add("2026-09-03", "cost", bike, "байк", { source: "card" });
  add("2026-09-03", "cost", JKU, "ЖКУ", { source: "card" });
  add("2026-09-05", "income", 40000, "ЗП Симы");
  if (food) {
    add("2026-09-05", "cost", FOOD_SEP, "еда", { source: "cash" });
    add("2026-09-05", "cost", ENG_WEEK, "английский", { source: "cash" });
    add("2026-09-05", "cost", SPORT_OWN, "спорт наш", { source: "cash" });
  }
  add("2026-09-05", "pay", 0, "остаток на карту");
  add("2026-09-10", "income", 83000, "ЗП Жени");
  add("2026-09-10", "income", 10000, "алименты");
  add("2026-09-10", "pay", 0, "погашение в ноль", { payAll: true });
  add("2026-09-10", "cost", APT, "квартира", { source: "mixed", keep: food ? LIVE2 : 0 });
  if (food) add("2026-09-10", "cost", LIVE2, "еда+англ+спорт до 25.09", { source: "cashOnly" });
  add("2026-09-25", "income", 58000, "ЗП Жени");
  add("2026-09-25", "income", 10000, "алименты");
  add("2026-09-25", "pay", 0, "всё на карту");
  add("2026-09-29", "cost", school, flags && flags.splitSchool ? "школа ½" : "школа", { source: "card" });
  if (food) add("2026-09-29", "cost", LIVE2, "еда+англ+спорт 2 нед", { source: "card" });
  add("2026-09-29", "cost", SPORT_CATCH, "спорт Гордея", { source: "card" });
  if (bike) add("2026-09-29", "cost", bike, "байк", { source: "card" });
  add("2026-09-29", "cost", JKU, "ЖКУ", { source: "card" });
  add("2026-10-05", "income", 120000, "ЗП Симы");
  add("2026-10-05", "pay", 0, "закрытие в ноль", { payAll: true });
  add("2026-10-05", "cost", SPORT_2W, "спорт Гордея", { source: "cash" });
  add("2026-10-05", "cost", VISA, "резерв visa", { source: "reserve" });
  add("2026-10-16", "cost", VISA, "visa run", { source: "fromReserve" });
  return ev.filter(function (e) {
    return e.kind === "mark" || e.kind === "pay" || e.amount > 0;
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

function simulatePlan(events) {
  const by = {};
  const seen = {};
  function touch(d) {
    if (!by[d]) by[d] = [];
    seen[d] = 1;
  }
  for (let i = 0; i < events.length; i++) {
    touch(events[i].date);
    by[events[i].date].push(events[i]);
  }
  Object.keys(STATEMENT).forEach(touch);
  const dates = Object.keys(seen).sort();
  const end = dates[dates.length - 1];

  let revolving = BASE_DEBT;
  let grace = 0;
  let excess = 0;
  let billed = 0;
  let cash = 0;
  let visa = 0;
  let interest = 0;
  let commission = 0;
  let accrued = 0;
  let usedFree = FREE_LIMIT;
  let graceBroken = false;

  function debtNow() {
    return revolving + grace + excess + billed;
  }
  function cardSpend(amount) {
    const freeLeft = Math.max(0, FREE_LIMIT - usedFree);
    let c = 0;
    if (amount <= freeLeft + 1e-9) {
      usedFree += amount;
      if (graceBroken) revolving += amount;
      else grace += amount;
    } else {
      if (freeLeft > 0) {
        if (graceBroken) revolving += freeLeft;
        else grace += freeLeft;
        usedFree = FREE_LIMIT;
        amount -= freeLeft;
      }
      c = amount * COMM_PCT + COMM_FIX;
      commission += c;
      excess += amount + c;
    }
    return c;
  }
  function pay(keep, limitAmt) {
    let payable = Math.max(0, cash - (keep || 0));
    if (limitAmt > 0) payable = Math.min(payable, limitAmt);
    const apply = Math.min(payable, debtNow());
    let left = apply;
    const names = ["billed", "excess", "revolving", "grace"];
    for (let i = 0; i < names.length; i++) {
      if (left <= 0) break;
      const name = names[i];
      const bucket = name === "billed" ? billed : name === "excess" ? excess : name === "revolving" ? revolving : grace;
      const u = Math.min(left, bucket);
      if (name === "billed") billed -= u;
      else if (name === "excess") excess -= u;
      else if (name === "revolving") revolving -= u;
      else grace -= u;
      left -= u;
    }
    cash -= apply;
    if (debtNow() < 0.5) {
      revolving = 0;
      grace = 0;
      excess = 0;
      billed = 0;
      accrued = 0;
      graceBroken = false;
    }
    return apply;
  }

  const rows = [];
  let day = "2026-08-16";
  while (day <= end) {
    if (BILLING[day]) usedFree = 0;
    let dayPct = 0;
    if (graceBroken) {
      const base = debtNow();
      if (base >= 0.01) {
        const x = base * RATE_PER_DAY;
        accrued += x;
        interest += x;
        dayPct = x;
      }
    }
    let posted = 0;
    if (STATEMENT[day] && accrued >= 0.5) {
      posted = accrued;
      billed += accrued;
      accrued = 0;
    }
    const ops = by[day] || [];
    let income = 0;
    let cashOut = 0;
    let withdraw = 0;
    let payAmt = 0;
    const notes = [];
    const customIdx = [];
    if (posted >= 0.5) notes.push("выписка %");
    for (let i = 0; i < ops.length; i++) {
      const o = ops[i];
      const amount = Number(o.amount) || 0;
      const src = o.source || (o.kind === "withdraw" ? "card" : "cash");
      if (o.custom) customIdx.push(o.ci);
      if (o.kind === "mark" && o.note) notes.push(o.note);
      else if (o.kind === "income") {
        cash += amount;
        income += amount;
        notes.push(o.note);
      } else if (o.kind === "pay") {
        const applied = pay(o.keep || 0, amount);
        payAmt += applied;
        if (applied > 0.5) notes.push(o.note);
      } else if (o.kind === "withdraw") {
        const c = cardSpend(amount);
        withdraw += amount;
        if (!o.spent) cash += amount;
        notes.push(o.note + (c >= 1 ? " ком." + Math.round(c) : ""));
      } else if (o.kind === "cost") {
        notes.push(o.note);
        if (src === "reserve") {
          const take = Math.min(amount, cash);
          cash -= take;
          visa += take;
          cashOut += take;
        } else if (src === "fromReserve") {
          if (visa >= amount - 0.01) visa -= amount;
          else {
            const need = amount - visa;
            visa = 0;
            if (cash >= need) {
              cash -= need;
              cashOut += need;
            } else {
              cashOut += cash;
              const short = need - cash;
              cash = 0;
              cardSpend(short);
              withdraw += short;
            }
          }
        } else if (src === "mixed") {
          const keep = Number(o.keep) || 0;
          const liveCash = Math.min(cash, keep);
          const liveCard = Math.max(0, keep - liveCash);
          let aptCash = Math.max(0, cash - liveCash);
          aptCash = Math.min(aptCash, amount);
          cash -= aptCash;
          cashOut += aptCash;
          const aptCard = amount - aptCash;
          const cardPart = aptCard + liveCard;
          if (cardPart > 0.01) {
            cardSpend(cardPart);
            withdraw += aptCard;
          }
        } else if (src === "cashOnly") {
          const take = Math.min(amount, cash);
          cash -= take;
          cashOut += take;
        } else if (src === "card") {
          cardSpend(amount);
          withdraw += amount;
        } else if (cash >= amount) {
          cash -= amount;
          cashOut += amount;
        } else {
          cashOut += cash;
          const need = amount - cash;
          cash = 0;
          cardSpend(need);
          withdraw += need;
        }
      }
    }
    if (BILLING[day] && debtNow() > 0.5) {
      revolving += grace;
      grace = 0;
      graceBroken = true;
    }
    if (ops.length || posted >= 0.5) {
      rows.push({
        date: fmtDate(day),
        iso: day,
        note: notes.filter(Boolean).join(", "),
        income: Math.round(income),
        cashOut: Math.round(cashOut),
        withdraw: Math.round(withdraw),
        pay: Math.round(payAmt),
        interest: Math.round(posted >= 0.5 ? posted : dayPct),
        debt: Math.round(debtNow()),
        cash: Math.round(cash),
        customIdx: customIdx,
      });
    }
    day = isoAdd(day, 1);
  }
  return {
    rows: rows,
    interest: Math.round(interest),
    commission: Math.round(commission),
    overpay: Math.round(interest + commission),
    debt: Math.round(debtNow()),
    cash: Math.round(cash),
  };
}

function buildMatrix(settings, rate) {
  const s = settings || loadSettings();
  const flags = Object.assign({}, DEFAULT_FLAGS, s.flags || {});
  const customs = (s.customs || []).map(function (c, i) {
    const kind = c.kind || "cost";
    return {
      date: c.date,
      kind: kind,
      amount: Math.round(Number(c.amount) || 0),
      note: c.note || "своё",
      custom: true,
      ci: i,
      source: kind === "withdraw" ? "card" : kind === "pay" ? "cash" : "cash",
    };
  });
  const events = calendarEvents(rate, flags).concat(customs).sort(function (a, b) {
    if (a.date === b.date) return 0;
    return a.date < b.date ? -1 : 1;
  });
  const sim = simulatePlan(events);
  const rows = sim.rows;
  const paySum = rows.reduce(function (a, r) {
    return a + (r.pay || 0);
  }, 0);
  const withdrawSum = rows.reduce(function (a, r) {
    return a + (r.withdraw || 0);
  }, 0);
  const tailRow = rows.filter(function (r) {
    return r.iso === TAIL_ISO;
  })[0] || rows[rows.length - 1];
  const pay2908 = (rows.filter(function (r) {
    return r.iso === "2026-08-29";
  })[0] || {}).pay || 0;

  return {
    flags: flags,
    customs: s.customs || [],
    rows: rows,
    rate: 1,
    tail: Math.max(0, tailRow ? tailRow.debt : sim.debt),
    interestTotal: sim.overpay,
    paySum: paySum,
    withdrawSum: withdrawSum,
    minPay: 600,
    minCovered: pay2908 >= 600,
    cash: sim.cash,
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
  const keep = { "2026-08-16": 1, "2026-08-29": 1, "2026-09-29": 1, "2026-10-05": 1 };
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
  return 1;
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
    return r.withdraw || r.pay || r.iso === "2026-08-16" || r.iso === "2026-08-29" || r.iso === "2026-09-29" || r.iso === TAIL_ISO;
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
    const isTail = r.iso === TAIL_ISO;
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
  <div class="sum"><div class="l">Хвост 05.10</div><div class="v" id="sTail">—</div></div>
</div>
<div class="wrap"><table>
<thead><tr>
<th>Дата</th><th>Что</th><th>Приход</th><th>Нал.расход</th><th>Снятие</th><th>Погаш</th><th>%</th><th>Нал</th><th>Долг</th>
</tr></thead>
<tbody id="tb"></tbody>
</table></div>
<p class="warn" id="warn" hidden>На 29.08 нет погашения — проверь платёж.</p>
<script>
window.__flags = ${flags};
window.__customs = ${customs};
const RATE_DAY = ${RATE_PER_DAY};
const BASE = ${BASE_DEBT};
const FREE = ${FREE_LIMIT};
const COMM_P = ${COMM_PCT};
const COMM_F = ${COMM_FIX};
const BILL = {'2026-08-29':1,'2026-09-29':1,'2026-10-29':1};
const STMT = {'2026-09-04':1,'2026-10-04':1};
const TAIL = '2026-10-05';
const SCHOOL_H = ${SCHOOL_HALF};
const LIVE2 = ${LIVE2};
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
function isoAdd(iso,n){const p=iso.split('-'); const d=new Date(Date.UTC(+p[0],+p[1]-1,+p[2]+n)); return d.getUTCFullYear()+'-'+('0'+(d.getUTCMonth()+1)).slice(-2)+'-'+('0'+d.getUTCDate()).slice(-2)}
function cal(flags){
  const school=flags.splitSchool?SCHOOL_H:SCHOOL_H*2;
  const bike=flags.skipBike?0:6000;
  const food=flags.honestFood!==false;
  const ev=[];
  function add(date,kind,amount,note,extra){ev.push(Object.assign({date:date,kind:kind,amount:amount,note:note},extra||{}))}
  add('2026-08-16','mark',0,'факт');
  add('2026-08-22','withdraw',2702,'снятие 22.08',{source:'card',spent:true});
  if(flags.extraWithdraw) add('2026-08-24','withdraw',10000,'+10к',{source:'card'});
  add('2026-08-25','income',58000,'ЗП Жени');
  add('2026-08-25','income',10000,'алименты');
  add('2026-08-25','cost',3200,'английский',{source:'cash'});
  add('2026-08-29','pay',0,'остаток на карту');
  add('2026-08-29','mark',0,'грейс↓');
  if(food) add('2026-08-30','cost',500,'спорт наш',{source:'card'});
  add('2026-09-01','cost',school,flags.splitSchool?'школа ½':'школа',{source:'card'});
  add('2026-09-01','cost',15000,'взнос в школу',{source:'card'});
  add('2026-09-01','cost',4500,'прикрепление',{source:'card'});
  if(food) add('2026-09-01','cost',5000,'еда',{source:'card'});
  add('2026-09-01','cost',9000,'visa run',{source:'card'});
  if(bike) add('2026-09-03','cost',bike,'байк',{source:'card'});
  add('2026-09-03','cost',7000,'ЖКУ',{source:'card'});
  add('2026-09-05','income',40000,'ЗП Симы');
  if(food){add('2026-09-05','cost',5000,'еда',{source:'cash'});add('2026-09-05','cost',3500,'английский',{source:'cash'});add('2026-09-05','cost',500,'спорт наш',{source:'cash'})}
  add('2026-09-05','pay',0,'остаток на карту');
  add('2026-09-10','income',83000,'ЗП Жени');
  add('2026-09-10','income',10000,'алименты');
  add('2026-09-10','pay',0,'погашение в ноль',{payAll:true});
  add('2026-09-10','cost',70000,'квартира',{source:'mixed',keep:food?LIVE2:0});
  if(food) add('2026-09-10','cost',LIVE2,'еда+англ+спорт до 25.09',{source:'cashOnly'});
  add('2026-09-25','income',58000,'ЗП Жени');
  add('2026-09-25','income',10000,'алименты');
  add('2026-09-25','pay',0,'всё на карту');
  add('2026-09-29','cost',school,flags.splitSchool?'школа ½':'школа',{source:'card'});
  if(food) add('2026-09-29','cost',LIVE2,'еда+англ+спорт 2 нед',{source:'card'});
  add('2026-09-29','cost',8250,'спорт Гордея',{source:'card'});
  if(bike) add('2026-09-29','cost',bike,'байк',{source:'card'});
  add('2026-09-29','cost',7000,'ЖКУ',{source:'card'});
  add('2026-10-05','income',120000,'ЗП Симы');
  add('2026-10-05','pay',0,'закрытие в ноль',{payAll:true});
  add('2026-10-05','cost',1350,'спорт Гордея',{source:'cash'});
  add('2026-10-05','cost',9000,'резерв visa',{source:'reserve'});
  add('2026-10-16','cost',9000,'visa run',{source:'fromReserve'});
  return ev.filter(function(e){return e.kind==='mark'||e.kind==='pay'||e.amount>0});
}
function build(flags,customs){
  const extra=(customs||[]).map(function(c,i){return {date:c.date,kind:c.kind,amount:+c.amount||0,note:c.note||'своё',custom:true,ci:i,source:c.kind==='withdraw'?'card':'cash'}});
  const events=cal(flags).concat(extra).sort(function(a,b){return a.date<b.date?-1:a.date>b.date?1:0});
  const by={}; events.forEach(function(e){if(!by[e.date]) by[e.date]=[]; by[e.date].push(e)});
  Object.keys(STMT).forEach(function(d){if(!by[d]) by[d]=[]});
  const end=Object.keys(by).sort().slice(-1)[0];
  let revolving=BASE,grace=0,excess=0,billed=0,cash=0,visa=0,interest=0,commission=0,accrued=0,usedFree=FREE,graceBroken=false;
  function debtNow(){return revolving+grace+excess+billed}
  function cardSpend(amount){
    const freeLeft=Math.max(0,FREE-usedFree); let c=0;
    if(amount<=freeLeft+1e-9){usedFree+=amount; if(graceBroken) revolving+=amount; else grace+=amount}
    else {
      if(freeLeft>0){if(graceBroken) revolving+=freeLeft; else grace+=freeLeft; usedFree=FREE; amount-=freeLeft}
      c=amount*COMM_P+COMM_F; commission+=c; excess+=amount+c;
    }
    return c;
  }
  function pay(keep,limitAmt){
    let payable=Math.max(0,cash-(keep||0));
    if(limitAmt>0) payable=Math.min(payable,limitAmt);
    const apply=Math.min(payable,debtNow()); let left=apply;
    ['billed','excess','revolving','grace'].forEach(function(name){
      if(left<=0) return;
      const bucket=name==='billed'?billed:name==='excess'?excess:name==='revolving'?revolving:grace;
      const u=Math.min(left,bucket);
      if(name==='billed') billed-=u; else if(name==='excess') excess-=u; else if(name==='revolving') revolving-=u; else grace-=u;
      left-=u;
    });
    cash-=apply;
    if(debtNow()<0.5){revolving=grace=excess=billed=accrued=0; graceBroken=false}
    return apply;
  }
  const rows=[]; let day='2026-08-16';
  while(day<=end){
    if(BILL[day]) usedFree=0;
    let dayPct=0;
    if(graceBroken){const base=debtNow(); if(base>=0.01){const x=base*RATE_DAY; accrued+=x; interest+=x; dayPct=x}}
    let posted=0;
    if(STMT[day]&&accrued>=0.5){posted=accrued; billed+=accrued; accrued=0}
    const ops=by[day]||[];
    let income=0,cashOut=0,withdraw=0,payAmt=0; const notes=[]; const customIdx=[];
    if(posted>=0.5) notes.push('выписка %');
    ops.forEach(function(o){
      const amount=+o.amount||0; const src=o.source||(o.kind==='withdraw'?'card':'cash');
      if(o.custom) customIdx.push(o.ci);
      if(o.kind==='mark'&&o.note) notes.push(o.note);
      else if(o.kind==='income'){cash+=amount; income+=amount; notes.push(o.note)}
      else if(o.kind==='pay'){const applied=pay(o.keep||0,amount); payAmt+=applied; if(applied>0.5) notes.push(o.note)}
      else if(o.kind==='withdraw'){const c=cardSpend(amount); withdraw+=amount; if(!o.spent) cash+=amount; notes.push(o.note+(c>=1?' ком.'+Math.round(c):''))}
      else if(o.kind==='cost'){
        notes.push(o.note);
        if(src==='reserve'){const take=Math.min(amount,cash); cash-=take; visa+=take; cashOut+=take}
        else if(src==='fromReserve'){
          if(visa>=amount-0.01) visa-=amount;
          else {const need=amount-visa; visa=0; if(cash>=need){cash-=need; cashOut+=need} else {cashOut+=cash; const short=need-cash; cash=0; cardSpend(short); withdraw+=short}}
        } else if(src==='mixed'){
          const keep=+o.keep||0; const liveCash=Math.min(cash,keep); const liveCard=Math.max(0,keep-liveCash);
          let aptCash=Math.max(0,cash-liveCash); aptCash=Math.min(aptCash,amount); cash-=aptCash; cashOut+=aptCash;
          const aptCard=amount-aptCash; const cardPart=aptCard+liveCard;
          if(cardPart>0.01){cardSpend(cardPart); withdraw+=aptCard}
        } else if(src==='cashOnly'){const take=Math.min(amount,cash); cash-=take; cashOut+=take}
        else if(src==='card'){cardSpend(amount); withdraw+=amount}
        else if(cash>=amount){cash-=amount; cashOut+=amount}
        else {cashOut+=cash; const need=amount-cash; cash=0; cardSpend(need); withdraw+=need}
      }
    });
    if(BILL[day]&&debtNow()>0.5){revolving+=grace; grace=0; graceBroken=true}
    if(ops.length||posted>=0.5){
      rows.push({date:fmt(day),iso:day,note:notes.filter(Boolean).join(', '),income:Math.round(income),cashOut:Math.round(cashOut),withdraw:Math.round(withdraw),pay:Math.round(payAmt),interest:Math.round(posted>=0.5?posted:dayPct),debt:Math.round(debtNow()),cash:Math.round(cash),customIdx:customIdx});
    }
    day=isoAdd(day,1);
  }
  const paySum=rows.reduce((s,r)=>s+r.pay,0), wdSum=rows.reduce((s,r)=>s+r.withdraw,0);
  const tailRow=rows.find(function(r){return r.iso===TAIL})||rows[rows.length-1];
  const pay2908=(rows.find(function(r){return r.iso==='2026-08-29'})||{}).pay||0;
  return {rows,tail:tailRow?tailRow.debt:0,paySum,wdSum,interestTotal:Math.round(interest+commission),minCovered:pay2908>=600};
}
function uniqNotes(s){
  const seen={}; return String(s||'').split(',').map(function(x){return x.trim()}).filter(function(x){if(!x||seen[x])return false; seen[x]=1; return true}).join(', ');
}
function compact(rows){
  const keep={'2026-08-16':1,'2026-08-29':1,'2026-09-29':1,'2026-10-05':1}; const out=[];
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
    const cls=r.iso===TAIL?' class="tail"':'';
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

// Если этот файл открыт как скрипт KreditkaPlanCore* — запускаем сами
// (старый bootstrap с importModule на только что записанный файл падает).
if (typeof Script !== "undefined") {
  const entry = String(Script.name() || "");
  if (/^KreditkaPlanCore/i.test(entry)) {
    await main();
  }
}
