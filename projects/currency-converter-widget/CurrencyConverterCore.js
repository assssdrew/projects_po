// CurrencyConverterCore — v3: карточки, флаги, изменение курса, спарклайн,
// Lock Screen виджет, раздельные тап-зоны.
const MARKER = "CURRENCY_WIDGET_V1";

// Пары по умолчанию, если для виджета не задан Parameter.
// Format: [{ from, to }]
const DEFAULT_PAIRS = [
  { from: "USD", to: "RUB" },
  { from: "EUR", to: "RUB" },
  { from: "USD", to: "EUR" },
];

// Базовая валюта, относительно которой кэшируются все курсы одним запросом.
const BASE_CCY = "USD";

// Флаг + акцентный цвет для распространённых валют. Остальные — нейтральный вид.
const CURRENCY_META = {
  USD: { flag: "🇺🇸", color: "#2ECC71" },
  EUR: { flag: "🇪🇺", color: "#3498DB" },
  RUB: { flag: "🇷🇺", color: "#ECF0F1" },
  VND: { flag: "🇻🇳", color: "#F1C40F" },
  GBP: { flag: "🇬🇧", color: "#9B59B6" },
  JPY: { flag: "🇯🇵", color: "#E74C3C" },
  CNY: { flag: "🇨🇳", color: "#E67E22" },
  THB: { flag: "🇹🇭", color: "#1ABC9C" },
  KRW: { flag: "🇰🇷", color: "#5DADE2" },
  AUD: { flag: "🇦🇺", color: "#48C9B0" },
  CAD: { flag: "🇨🇦", color: "#EC7063" },
  CHF: { flag: "🇨🇭", color: "#D7DBDD" },
  TRY: { flag: "🇹🇷", color: "#E57373" },
  INR: { flag: "🇮🇳", color: "#F39C12" },
  IDR: { flag: "🇮🇩", color: "#EF5350" },
  SGD: { flag: "🇸🇬", color: "#AED581" },
  HKD: { flag: "🇭🇰", color: "#E57373" },
  AED: { flag: "🇦🇪", color: "#26A69A" },
  PLN: { flag: "🇵🇱", color: "#EF5350" },
  KZT: { flag: "🇰🇿", color: "#4FC3F7" },
  GEL: { flag: "🇬🇪", color: "#7986CB" },
  AMD: { flag: "🇦🇲", color: "#FF8A65" },
};

function currencyMeta(code) {
  return CURRENCY_META[(code || "").toUpperCase()] || { flag: "💱", color: "#FFFFFF" };
}

// Бесплатные API без ключа. Первый рабочий побеждает.
function providerUrls(base) {
  const b = base.toUpperCase();
  const bLower = base.toLowerCase();
  return [
    { kind: "erapi", url: "https://open.er-api.com/v6/latest/" + b },
    {
      kind: "fawaz",
      url:
        "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/" +
        bLower +
        ".json",
    },
    {
      kind: "fawaz",
      url: "https://latest.currency-api.pages.dev/v1/currencies/" + bLower + ".json",
    },
  ];
}

const CACHE_NAME = "currency-rates-cache.json";
const SETTINGS_NAME = "currency-settings.json";
const HISTORY_NAME = "currency-history.json";
const CACHE_TTL_MS = 12 * 60 * 60 * 1000; // курсы обновляются раз в сутки апстримом
const REFRESH_STEP_MS = 60 * 60 * 1000; // как часто система будет пытаться перерисовать виджет
const HISTORY_MAX_POINTS = 30; // ~месяц точек для изменения курса и спарклайна
const HISTORY_MIN_GAP_MS = 6 * 60 * 60 * 1000; // не пишем точки чаще, чем раз в 6ч

function delay(ms) {
  return new Promise((resolve) => Timer.schedule(Math.max(ms, 1) / 1000, false, resolve));
}

/** Не даёт медленной сети подвесить открытие меню при тапе по виджету. */
async function withTimeout(promise, ms, timeoutMessage) {
  return Promise.race([
    promise,
    delay(ms).then(() => {
      throw new Error(timeoutMessage || "Таймаут (" + Math.round(ms / 1000) + "с)");
    }),
  ]);
}

function fm() {
  return FileManager.local();
}

function cachePath() {
  return fm().joinPath(fm().documentsDirectory(), CACHE_NAME);
}

function settingsPath() {
  return fm().joinPath(fm().documentsDirectory(), SETTINGS_NAME);
}

function historyPath() {
  return fm().joinPath(fm().documentsDirectory(), HISTORY_NAME);
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

function loadCache() {
  return loadJson(cachePath(), null);
}

function saveCache(cache) {
  saveJson(cachePath(), cache);
}

function loadHistory() {
  const h = loadJson(historyPath(), []);
  return Array.isArray(h) ? h : [];
}

function saveHistory(history) {
  saveJson(historyPath(), history);
}

/** Копит по одной точке курсов не чаще, чем раз в HISTORY_MIN_GAP_MS — для изменения курса и спарклайна. */
function recordHistory(cache) {
  if (!cache || !cache.rates) return;
  const history = loadHistory();
  const last = history[history.length - 1];
  if (last && cache.fetchedAt - last.fetchedAt < HISTORY_MIN_GAP_MS) return;
  history.push({ fetchedAt: cache.fetchedAt, rates: cache.rates });
  while (history.length > HISTORY_MAX_POINTS) history.shift();
  saveHistory(history);
}

const VALID_STYLES = ["cards", "minimal"];

function loadSettings() {
  const settings = loadJson(settingsPath(), {
    pairs: DEFAULT_PAIRS,
    widgetAmount: 1,
    lastAmount: 1,
    lastFrom: "USD",
    lastTo: "RUB",
    style: "cards",
  });
  if (!Number.isFinite(settings.widgetAmount) || settings.widgetAmount <= 0) {
    settings.widgetAmount = 1;
  }
  if (VALID_STYLES.indexOf(settings.style) === -1) {
    settings.style = "cards";
  }
  return settings;
}

function saveSettings(settings) {
  saveJson(settingsPath(), settings);
}

function isCacheFresh(cache) {
  return !!cache && !!cache.rates && Date.now() - cache.fetchedAt < CACHE_TTL_MS;
}

function normalizeRates(kind, base, payload) {
  if (kind === "erapi") {
    if (payload && payload.result === "success" && payload.rates) {
      return payload.rates;
    }
    return null;
  }
  if (kind === "fawaz") {
    const key = base.toLowerCase();
    if (payload && payload[key]) {
      const rates = {};
      for (const [code, value] of Object.entries(payload[key])) {
        rates[code.toUpperCase()] = value;
      }
      rates[base.toUpperCase()] = 1;
      return rates;
    }
    return null;
  }
  return null;
}

async function fetchRates(base) {
  let lastError = null;
  for (const provider of providerUrls(base)) {
    try {
      const req = new Request(provider.url);
      req.timeoutInterval = 10;
      const payload = await req.loadJSON();
      const rates = normalizeRates(provider.kind, base, payload);
      if (rates && Object.keys(rates).length > 5) {
        return { base: base.toUpperCase(), rates, fetchedAt: Date.now() };
      }
      lastError = new Error("Пустой/неверный ответ от " + provider.url);
    } catch (e) {
      lastError = e;
    }
  }
  throw lastError || new Error("Не удалось получить курсы");
}

/** Курсы (с диска, если свежие; иначе — сеть, с фолбэком на устаревший кэш). */
async function ensureRates(forceRefresh) {
  const cache = loadCache();
  if (!forceRefresh && isCacheFresh(cache)) return cache;
  try {
    const fresh = await fetchRates(BASE_CCY);
    saveCache(fresh);
    recordHistory(fresh);
    return fresh;
  } catch (e) {
    if (cache && cache.rates) return cache; // офлайн / API недоступен — показываем старое
    throw e;
  }
}

function getRate(rates, from, to) {
  const f = rates[from.toUpperCase()];
  const t = rates[to.toUpperCase()];
  if (!f || !t) return null;
  return t / f;
}

function convert(rates, amount, from, to) {
  const rate = getRate(rates, from, to);
  if (rate === null) return null;
  return amount * rate;
}

function formatNumber(n) {
  if (n === null || n === undefined || Number.isNaN(n)) return "—";
  const abs = Math.abs(n);
  const digits = abs >= 100 ? 2 : abs >= 1 ? 3 : 4;
  return n.toLocaleString("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  });
}

function formatPct(n) {
  if (n === null || n === undefined || Number.isNaN(n)) return "";
  return n.toLocaleString("ru-RU", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + "%";
}

function cacheAgeLabel(cache) {
  if (!cache || !cache.fetchedAt) return "нет данных";
  const ms = Date.now() - cache.fetchedAt;
  const h = Math.floor(ms / (60 * 60 * 1000));
  if (h <= 0) return "обновлено только что";
  if (h === 1) return "обновлено 1ч назад";
  if (h < 24) return "обновлено " + h + "ч назад";
  const d = Math.floor(h / 24);
  return "обновлено " + d + "д назад";
}

/** true, если данные получены из сети меньше часа назад ("только что"). */
function isJustUpdated(cache) {
  if (!cache || !cache.fetchedAt) return false;
  return Date.now() - cache.fetchedAt < 60 * 60 * 1000;
}

/** Ближайшая по времени точка истории к "targetAgeMs назад" (в пределах toleranceMs). */
function findSnapshotNear(history, targetAgeMs, toleranceMs) {
  if (!history || !history.length) return null;
  const targetTime = Date.now() - targetAgeMs;
  let best = null;
  let bestDiff = Infinity;
  for (const h of history) {
    const diff = Math.abs(h.fetchedAt - targetTime);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = h;
    }
  }
  if (toleranceMs && bestDiff > toleranceMs) return null;
  return best;
}

/** % изменения курса пары за ~сутки, или null, если истории ещё недостаточно. */
function pairChangePct(history, currentRates, from, to) {
  const past = findSnapshotNear(history, 24 * 60 * 60 * 1000, 20 * 60 * 60 * 1000);
  if (!past) return null;
  const pastRate = getRate(past.rates, from, to);
  const currentRate = getRate(currentRates, from, to);
  if (pastRate === null || currentRate === null || pastRate === 0) return null;
  return ((currentRate - pastRate) / pastRate) * 100;
}

/** Маленький линейный график изменения курса пары по истории. null, если данных мало. */
function sparklineImage(history, from, to, width, height, color) {
  if (!history || history.length < 2) return null;
  const values = [];
  for (const h of history) {
    const r = getRate(h.rates, from, to);
    if (r !== null) values.push(r);
  }
  if (values.length < 2) return null;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || Math.abs(max || 1) * 0.01 || 1;

  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return new Point(x, y);
  });

  const path = new Path();
  path.addLines(points);

  const ctx = new DrawContext();
  ctx.size = new Size(width, height);
  ctx.opaque = false;
  ctx.respectScreenScale = true;
  ctx.addPath(path);
  ctx.setStrokeColor(color);
  ctx.setLineWidth(1.5);
  ctx.strokePath();
  return ctx.getImage();
}

/** Парсит Parameter виджета вида "USD-RUB,EUR-RUB,USD-EUR". */
function parsePairsParam(param) {
  if (!param || typeof param !== "string") return null;
  const pairs = param
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => {
      const [from, to] = s.split("-").map((x) => x && x.trim().toUpperCase());
      return from && to ? { from, to } : null;
    })
    .filter(Boolean);
  return pairs.length ? pairs : null;
}

/** URL, который снова запускает этот же скрипт с параметрами действия (тап-зона). */
function scriptRunUrl(params) {
  try {
    const name = encodeURIComponent(Script.name());
    const query = Object.entries(params || {})
      .map(([k, v]) => encodeURIComponent(k) + "=" + encodeURIComponent(v))
      .join("&");
    return "scriptable:///run/" + name + (query ? "?" + query : "");
  } catch (e) {
    return null;
  }
}

function addShadow(t, alpha) {
  t.shadowColor = new Color("#000000", alpha == null ? 0.4 : alpha);
  t.shadowRadius = 2;
  t.shadowOffset = new Point(0, 1);
}

/** Иконка-статус обновления в правом нижнем углу: зелёная "только что", иначе тусклая. */
function addRefreshIndicator(w, cache, interactive) {
  const row = w.addStack();
  row.addSpacer();

  const symbol = SFSymbol.named("arrow.triangle.2.circlepath");
  symbol.applyFont(Font.mediumSystemFont(11));
  const img = row.addImage(symbol.image);
  img.imageSize = new Size(11, 11);
  img.tintColor = isJustUpdated(cache) ? new Color("#34C759") : new Color("#FFFFFF", 0.4);

  if (interactive) {
    const url = scriptRunUrl({ action: "refresh" });
    if (url) row.url = url;
  }
}

/** Минималистичный стиль: просто список "сумма FROM = сумма TO", без карточек. */
function createMinimalWidget(pairs, cache, amount) {
  const w = new ListWidget();
  w.backgroundColor = Color.clear();
  w.setPadding(12, 16, 10, 16);
  w.refreshAfterDate = new Date(Date.now() + REFRESH_STEP_MS);

  const family = config.widgetFamily || "medium";
  const rates = cache ? cache.rates : null;
  const maxRows = family === "small" ? 3 : family === "large" ? 7 : 4;
  const rowsToShow = pairs.slice(0, maxRows);
  const displayAmount = Number.isFinite(amount) && amount > 0 ? amount : 1;
  const canTap = family !== "small";

  if (!rates) {
    const err = w.addText("Нет данных. Открой приложение для обновления.");
    err.font = Font.systemFont(13);
    err.textColor = Color.white();
    err.lineLimit = 3;
    w.addSpacer();
    addRefreshIndicator(w, cache, canTap);
    return w;
  }

  rowsToShow.forEach((pair, i) => {
    if (i > 0) w.addSpacer(family === "small" ? 3 : 6);
    const rate = getRate(rates, pair.from, pair.to);
    const converted = rate === null ? null : displayAmount * rate;
    const line = w.addText(
      formatNumber(displayAmount) +
        " " +
        pair.from +
        " = " +
        (converted === null ? "—" : formatNumber(converted)) +
        " " +
        pair.to
    );
    line.font = Font.boldSystemFont(family === "small" ? 14 : 17);
    line.textColor = Color.white();
    line.lineLimit = 1;
    line.minimumScaleFactor = 0.6;
    addShadow(line, 0.5);
  });

  w.addSpacer();
  addRefreshIndicator(w, cache, canTap);

  return w;
}

/** Карточный стиль: цветной акцент по валюте, флаг, изменение курса, спарклайн у первой пары. */
function createCardsWidget(pairs, cache, amount, history) {
  const w = new ListWidget();
  w.backgroundColor = Color.clear();
  w.setPadding(10, 10, 8, 10);
  w.refreshAfterDate = new Date(Date.now() + REFRESH_STEP_MS);

  const family = config.widgetFamily || "medium";
  const rates = cache ? cache.rates : null;
  const maxRows = family === "small" ? 2 : family === "large" ? 6 : 3;
  const rowsToShow = pairs.slice(0, maxRows);
  const displayAmount = Number.isFinite(amount) && amount > 0 ? amount : 1;
  const canTapRows = family !== "small";

  if (!rates) {
    const err = w.addText("Нет данных. Открой приложение для обновления.");
    err.font = Font.systemFont(13);
    err.textColor = Color.white();
    err.lineLimit = 3;
    w.addSpacer();
    addRefreshIndicator(w, cache, canTapRows);
    return w;
  }

  rowsToShow.forEach((pair, i) => {
    if (i > 0) w.addSpacer(family === "small" ? 5 : 7);

    const meta = currencyMeta(pair.from);
    const rate = getRate(rates, pair.from, pair.to);
    const converted = rate === null ? null : displayAmount * rate;
    const changePct = pairChangePct(history, rates, pair.from, pair.to);

    const row = w.addStack();
    row.layoutHorizontally();
    row.centerAlignContent();
    row.cornerRadius = 10;
    row.backgroundColor = new Color(meta.color, 0.16);
    row.setPadding(
      family === "small" ? 6 : 8,
      10,
      family === "small" ? 6 : 8,
      10
    );
    if (canTapRows) {
      const url = scriptRunUrl({ action: "convert", from: pair.from, to: pair.to });
      if (url) row.url = url;
    }

    const bar = row.addStack();
    bar.size = new Size(3, family === "small" ? 26 : 30);
    bar.backgroundColor = new Color(meta.color, 0.9);
    bar.cornerRadius = 1.5;

    row.addSpacer(8);

    const col = row.addStack();
    col.layoutVertically();

    const line1 = col.addText(
      (converted === null ? "—" : formatNumber(converted)) + " " + pair.to
    );
    line1.font = Font.boldSystemFont(family === "small" ? 14 : 16);
    line1.textColor = Color.white();
    line1.lineLimit = 1;
    line1.minimumScaleFactor = 0.6;

    const line2 = col.addStack();
    line2.layoutHorizontally();
    line2.centerAlignContent();
    const sub = line2.addText(
      meta.flag + " " + formatNumber(displayAmount) + " " + pair.from
    );
    sub.font = Font.systemFont(family === "small" ? 10 : 11);
    sub.textColor = new Color("#FFFFFF", 0.6);
    sub.lineLimit = 1;
    sub.minimumScaleFactor = 0.7;

    if (changePct !== null && family !== "small") {
      line2.addSpacer(6);
      const arrow = changePct >= 0 ? "▲" : "▼";
      const changeText = line2.addText(arrow + formatPct(Math.abs(changePct)));
      changeText.font = Font.mediumSystemFont(10);
      changeText.textColor =
        changePct >= 0 ? new Color("#34C759") : new Color("#FF453A");
    }

    row.addSpacer();

    if (i === 0 && family === "large") {
      const spark = sparklineImage(
        history,
        pair.from,
        pair.to,
        46,
        24,
        new Color(meta.color, 0.9)
      );
      if (spark) {
        const imgEl = row.addImage(spark);
        imgEl.imageSize = new Size(46, 24);
      }
    }
  });

  w.addSpacer();
  addRefreshIndicator(w, cache, canTapRows);

  return w;
}

const ACCESSORY_FAMILIES = ["accessoryRectangular", "accessoryCircular", "accessoryInline"];

/** Компактный виджет для экрана блокировки — система всё равно раскрасит его сама. */
function createAccessoryWidget(pairs, cache, amount, family) {
  const w = new ListWidget();
  const rates = cache ? cache.rates : null;
  const displayAmount = Number.isFinite(amount) && amount > 0 ? amount : 1;
  const primary = pairs[0] || DEFAULT_PAIRS[0];
  const rate = rates ? getRate(rates, primary.from, primary.to) : null;
  const converted = rate === null ? null : displayAmount * rate;
  const valueText = (converted === null ? "—" : formatNumber(converted)) + " " + primary.to;

  if (family === "accessoryInline") {
    w.addText(
      "💱 " + formatNumber(displayAmount) + " " + primary.from + " = " + valueText
    );
    return w;
  }

  if (family === "accessoryCircular") {
    w.setPadding(2, 2, 2, 2);
    const code = w.addText(primary.to);
    code.font = Font.boldSystemFont(11);
    code.centerAlignText();
    w.addSpacer(1);
    const val = w.addText(converted === null ? "—" : formatNumber(converted));
    val.font = Font.systemFont(13);
    val.minimumScaleFactor = 0.6;
    val.lineLimit = 1;
    val.centerAlignText();
    return w;
  }

  // accessoryRectangular
  w.setPadding(4, 8, 4, 8);
  const title = w.addText(primary.from + " → " + primary.to);
  title.font = Font.mediumSystemFont(11);
  w.addSpacer(2);
  const value = w.addText(formatNumber(displayAmount) + " " + primary.from + " = " + valueText);
  value.font = Font.boldSystemFont(15);
  value.lineLimit = 1;
  value.minimumScaleFactor = 0.6;
  return w;
}

function createWidget(pairs, cache, amount, settings, history) {
  const family = config.widgetFamily || "medium";
  if (ACCESSORY_FAMILIES.indexOf(family) !== -1) {
    return createAccessoryWidget(pairs, cache, amount, family);
  }
  const style = (settings && settings.style) || "cards";
  if (style === "minimal") {
    return createMinimalWidget(pairs, cache, amount);
  }
  return createCardsWidget(pairs, cache, amount, history || []);
}

/** Диалог конвертации суммы между двумя валютами (запуск из приложения, не из виджета). */
async function runConvertDialog(settings, cache) {
  const a = new Alert();
  a.title = "Конвертировать";
  a.message = cacheAgeLabel(cache);
  a.addTextField("Сумма", String(settings.lastAmount ?? 1));
  a.addTextField("Из (код)", settings.lastFrom || "USD");
  a.addTextField("В (код)", settings.lastTo || "RUB");
  a.addAction("Посчитать");
  a.addCancelAction("Отмена");

  const choice = await a.presentAlert();
  if (choice !== 0) return;

  const amount = parseFloat(a.textFieldValue(0).replace(",", ".")) || 0;
  const from = (a.textFieldValue(1) || "USD").trim().toUpperCase();
  const to = (a.textFieldValue(2) || "RUB").trim().toUpperCase();

  settings.lastAmount = amount;
  settings.lastFrom = from;
  settings.lastTo = to;
  saveSettings(settings);

  const rates = cache ? cache.rates : null;
  const result = rates ? convert(rates, amount, from, to) : null;

  const r = new Alert();
  r.title = result === null ? "Не удалось посчитать" : formatNumber(amount) + " " + from;
  r.message =
    result === null
      ? "Проверь коды валют (например USD, EUR, RUB) или обнови курсы."
      : "= " + formatNumber(result) + " " + to;
  r.addAction("OK");
  await r.presentAlert();
}

/** Задаёт сумму, которая пересчитывается во всех парах виджета (не только "1 X = Y"). */
async function runAmountDialog(settings, cache) {
  const a = new Alert();
  a.title = "Сумма для виджета";
  a.message = "Пересчитается сразу во всех парах на виджете";
  a.addTextField("Сумма", String(settings.widgetAmount ?? 1));
  a.addAction("Сохранить");
  a.addCancelAction("Отмена");

  const choice = await a.presentAlert();
  if (choice !== 0) return;

  const raw = (a.textFieldValue(0) || "").trim().replace(/\s/g, "").replace(",", ".");
  const amount = parseFloat(raw);
  if (!Number.isFinite(amount) || amount <= 0) {
    const err = new Alert();
    err.title = "Некорректная сумма";
    err.message = "Введи положительное число, например 100";
    err.addAction("OK");
    await err.presentAlert();
    return;
  }

  settings.widgetAmount = amount;
  saveSettings(settings);

  const rates = cache ? cache.rates : null;
  if (rates) {
    const lines = (settings.pairs || DEFAULT_PAIRS).map((pair) => {
      const rate = getRate(rates, pair.from, pair.to);
      const converted = rate === null ? null : amount * rate;
      return (
        formatNumber(amount) +
        " " +
        pair.from +
        " = " +
        (converted === null ? "—" : formatNumber(converted)) +
        " " +
        pair.to
      );
    });
    const ok = new Alert();
    ok.title = "Сохранено";
    ok.message = lines.join("\n");
    ok.addAction("OK");
    await ok.presentAlert();
  }
}

async function runPairsDialog(settings) {
  const current = settings.pairs.map((p) => p.from + "-" + p.to).join(",");
  const a = new Alert();
  a.title = "Пары для виджета";
  a.message = "Формат: USD-RUB,EUR-RUB,USD-EUR";
  a.addTextField("Пары", current);
  a.addAction("Сохранить");
  a.addCancelAction("Отмена");
  const choice = await a.presentAlert();
  if (choice !== 0) return;
  const parsed = parsePairsParam(a.textFieldValue(0));
  if (parsed) {
    settings.pairs = parsed;
    saveSettings(settings);
  }
}

/** Переключатель стиля виджета: карточки (по умолчанию) или минимальный список. */
async function runStyleDialog(settings) {
  const a = new Alert();
  a.title = "Стиль виджета";
  a.message = "Текущий: " + (settings.style === "minimal" ? "Минимальный" : "Карточки");
  a.addAction("Карточки (цвет, флаги, изменение курса)");
  a.addAction("Минимальный (просто список)");
  a.addCancelAction("Отмена");
  const choice = await a.presentAlert();
  if (choice === 0) {
    settings.style = "cards";
    saveSettings(settings);
  } else if (choice === 1) {
    settings.style = "minimal";
    saveSettings(settings);
  }
}

/** Быстрая информация по конкретной паре (открывается тапом по строке в стиле "карточки"). */
async function quickPairInfo(settings, cache) {
  const rates = cache ? cache.rates : null;
  const amount = settings.widgetAmount || 1;
  const params = (args && args.queryParameters) || {};
  const from = (params.from || "USD").toUpperCase();
  const to = (params.to || "RUB").toUpperCase();
  const rate = rates ? getRate(rates, from, to) : null;
  const converted = rate === null ? null : amount * rate;

  const a = new Alert();
  a.title = currencyMeta(from).flag + " " + from + " → " + to + " " + currencyMeta(to).flag;
  a.message =
    (converted === null
      ? "Нет данных для этой пары"
      : formatNumber(amount) + " " + from + " = " + formatNumber(converted) + " " + to) +
    "\n" +
    cacheAgeLabel(cache);
  a.addAction("Изменить сумму для виджета");
  a.addAction("Обновить курсы");
  a.addCancelAction("Закрыть");

  const choice = await a.presentAlert();
  if (choice === 0) {
    await runAmountDialog(settings, cache);
  } else if (choice === 1) {
    try {
      await withTimeout(ensureRates(true), 15000, "Не успели обновить за 15с");
    } catch (e) {}
  }
}

async function runMenu(settings, cache) {
  const alert = new Alert();
  alert.title = "Конвертер валют";
  alert.message = cacheAgeLabel(cache);
  alert.addAction("Задать сумму для виджета");
  alert.addAction("Конвертировать сумму");
  alert.addAction("Настроить пары для виджета");
  alert.addAction("Стиль виджета");
  alert.addAction("Обновить курсы сейчас");
  alert.addCancelAction("Закрыть");

  const choice = await alert.presentSheet();
  if (choice === 0) {
    await runAmountDialog(settings, cache);
  } else if (choice === 1) {
    await runConvertDialog(settings, cache);
  } else if (choice === 2) {
    await runPairsDialog(settings);
  } else if (choice === 3) {
    await runStyleDialog(settings);
  } else if (choice === 4) {
    try {
      await withTimeout(ensureRates(true), 15000, "Не успели обновить за 15с");
    } catch (e) {
      const err = new Alert();
      err.title = "Не удалось обновить";
      err.message = String(e);
      err.addAction("OK");
      await err.presentAlert();
    }
  }
}

async function safeEnsureRates(forceRefresh, budgetMs) {
  try {
    return await withTimeout(
      ensureRates(forceRefresh),
      budgetMs,
      "Курсы не успели загрузиться за " + Math.round(budgetMs / 1000) + "с"
    );
  } catch (e) {
    return loadCache();
  }
}

async function main() {
  const settings = loadSettings();
  const widgetParamPairs = parsePairsParam((args && args.widgetParameter) || null);
  const pairs = widgetParamPairs || settings.pairs || DEFAULT_PAIRS;

  // Виджет: свежие курсы, если кэш успел устареть, но без риска зависнуть надолго.
  const cache = await safeEnsureRates(false, 10000);

  if (config.runsInWidget) {
    const history = loadHistory();
    Script.setWidget(createWidget(pairs, cache, settings.widgetAmount, settings, history));
    return;
  }

  // Тап по виджету / Play: меню (или прямое действие тап-зоны) должно открыться быстро.
  const qp = (args && args.queryParameters) || {};
  try {
    if (qp.action === "convert") {
      await quickPairInfo(settings, cache);
    } else if (qp.action === "refresh") {
      try {
        await withTimeout(ensureRates(true), 15000, "Не успели обновить за 15с");
      } catch (e) {}
    } else {
      await runMenu(settings, cache);
    }
  } catch (e) {
    const err = new Alert();
    err.title = "Ошибка";
    err.message = String(e && e.message ? e.message : e);
    err.addAction("OK");
    await err.presentAlert();
  }

  const refreshedSettings = loadSettings();
  const refreshedPairs = widgetParamPairs || refreshedSettings.pairs || DEFAULT_PAIRS;
  const refreshedCache = loadCache() || cache;
  const refreshedHistory = loadHistory();
  Script.setWidget(
    createWidget(
      refreshedPairs,
      refreshedCache,
      refreshedSettings.widgetAmount,
      refreshedSettings,
      refreshedHistory
    )
  );
}

module.exports = { main, MARKER };
