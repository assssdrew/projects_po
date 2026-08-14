// CurrencyConverterCore — v1: курсы валют на Home Screen + интерактивная конвертация
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
const CACHE_TTL_MS = 12 * 60 * 60 * 1000; // курсы обновляются раз в сутки апстримом
const REFRESH_STEP_MS = 60 * 60 * 1000; // как часто система будет пытаться перерисовать виджет

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

function loadSettings() {
  const settings = loadJson(settingsPath(), {
    pairs: DEFAULT_PAIRS,
    widgetAmount: 1,
    lastAmount: 1,
    lastFrom: "USD",
    lastTo: "RUB",
  });
  if (!Number.isFinite(settings.widgetAmount) || settings.widgetAmount <= 0) {
    settings.widgetAmount = 1;
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

function addShadow(t, alpha) {
  t.shadowColor = new Color("#000000", alpha == null ? 0.4 : alpha);
  t.shadowRadius = 2;
  t.shadowOffset = new Point(0, 1);
}

/** Иконка-статус обновления в правом нижнем углу: зелёная "только что", иначе тусклая. */
function addRefreshIndicator(w, cache) {
  const row = w.addStack();
  row.addSpacer();

  const symbol = SFSymbol.named("arrow.triangle.2.circlepath");
  symbol.applyFont(Font.mediumSystemFont(11));
  const img = row.addImage(symbol.image);
  img.imageSize = new Size(11, 11);
  img.tintColor = isJustUpdated(cache)
    ? new Color("#34C759")
    : new Color("#FFFFFF", 0.4);
}

function createWidget(pairs, cache, amount) {
  const w = new ListWidget();
  w.backgroundColor = Color.clear();
  w.setPadding(12, 16, 10, 16);
  w.refreshAfterDate = new Date(Date.now() + REFRESH_STEP_MS);

  const family = config.widgetFamily || "medium";
  const rates = cache ? cache.rates : null;
  const maxRows = family === "small" ? 3 : family === "large" ? 7 : 4;
  const rowsToShow = pairs.slice(0, maxRows);
  const displayAmount = Number.isFinite(amount) && amount > 0 ? amount : 1;

  if (!rates) {
    const err = w.addText("Нет данных. Открой приложение для обновления.");
    err.font = Font.systemFont(13);
    err.textColor = Color.white();
    err.lineLimit = 3;
    w.addSpacer();
    addRefreshIndicator(w, cache);
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
  addRefreshIndicator(w, cache);

  return w;
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
  const current = settings.pairs
    .map((p) => p.from + "-" + p.to)
    .join(",");
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

async function runMenu(settings, cache) {
  const alert = new Alert();
  alert.title = "Конвертер валют";
  alert.message = cacheAgeLabel(cache);
  alert.addAction("Задать сумму для виджета");
  alert.addAction("Конвертировать сумму");
  alert.addAction("Настроить пары для виджета");
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
    try {
      cache = await withTimeout(ensureRates(true), 15000, "Не успели обновить за 15с");
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
    Script.setWidget(createWidget(pairs, cache, settings.widgetAmount));
    return;
  }

  // Тап по виджету / Play: меню должно открыться быстро в любом случае.
  try {
    await runMenu(settings, cache);
  } catch (e) {
    const err = new Alert();
    err.title = "Ошибка";
    err.message = String(e && e.message ? e.message : e);
    err.addAction("OK");
    await err.presentAlert();
  }

  const refreshedSettings = loadSettings();
  const refreshedPairs =
    widgetParamPairs || refreshedSettings.pairs || DEFAULT_PAIRS;
  const refreshedCache = loadCache() || cache;
  Script.setWidget(
    createWidget(refreshedPairs, refreshedCache, refreshedSettings.widgetAmount)
  );
}

module.exports = { main, MARKER };
