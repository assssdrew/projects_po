// CurrencyConverterCore — плитка виджета и полноэкранный экран показывают
// одну и ту же "Таблицу всех валют" (флаг+код / сумма, тап выбирает активную
// валюту, вся таблица пересчитывается сразу), плюс Lock Screen и тап-зоны.
// v6.0: убран переключатель стилей и "Тикер" — остался только "Минимальный",
// теперь со спарклайном на каждой строке. Убрана служебная метка версии/
// времени с самого виджета (осталась только в заголовке меню). Видно на
// одну пару больше на каждом размере виджета.
// v6.1: спарклайн рисуется сглаженной кривой (addCurve/Catmull-Rom) вместо
// прямых отрезков (addLines) — выглядит как настоящий график, а не угловатая
// "молния".
// v6.2: добавлена полноэкранная интерактивная "Таблица всех валют" (пункт
// меню) — флаг+код в первой колонке, сумма во второй, тап по строке выбирает,
// в какую валюту вводится сумма, вся таблица пересчитывается сразу, строки
// разделены полоской. Живёт внутри приложения Scriptable (WebView), т.к.
// сама плитка Home Screen — статичный снапшот без клавиатуры.
// v6.3: сама плитка Home Screen теперь тоже показывает таблицу всех валют
// (тот же список currencies/activeCurrency/amount, что и в полноэкранной
// таблице) вместо старого списка пар "FROM → TO" — старая система пар/суммы
// для виджета (DEFAULT_PAIRS, widgetAmount и связанные пункты меню) удалена,
// т.к. её полностью заменяет таблица. Тап по плитке целиком теперь сразу
// открывает полноэкранную таблицу с клавиатурой (а не общее меню — оно
// доступно только через ручной ▶ Play в приложении). Также исправлен баг
// вёрстки в самой таблице: нижний ряд цифр клавиатуры уходил за пределы
// экрана из-за отсутствия min-height:0 на скроллящемся списке валют (из-за
// этого он не мог сжаться, как ему говорил flex, и раздувал всю страницу).
// v6.4: строки на плитке центрированы по вертикали (а не прижаты к верху),
// шрифт кода/суммы заметно крупнее, разделитель между валютами сделан ярче,
// а значок обновления в углу убран целиком — на плитке остаются только
// курсы.
// v6.5: отступ плитки сверху/снизу 15pt; суммы крупнее кода; флаг BRL;
// обновление курсов — параллельный race провайдеров (раньше 3×10с подряд
// легко упирались в общий лимит 15с → «Не успели обновить»); в таблице
// клавиатура приподнята и компактнее, чтобы нижний ряд цифр не обрезался.
// v6.6: убран presentMedium()-превью после Play/тапа (каждый раз всплывало
// окно «Close» с плиткой); обновление курсов — по очереди с жёстким
// withTimeout(3с) на каждый URL (Scriptable часто игнорирует
// Request.timeoutInterval, и параллельные loadJSON «висели» до общего
// лимита 20с); при сбое сети показываем кэш, а не красную ошибку.
// v6.7: таймаут на провайдер 10с (3с на мобильной сети убивал все попытки
// → «Сеть не ответила» при живом кэше); loadString+JSON.parse; jsdelivr
// первым (тот же CDN, что уже доставляет core); exchangerate-api v4;
// если кэш свежий — «Курсы актуальны», а не ошибка; на плитке убрана
// синяя подсветка активной строки.
// v6.8: курсы не дневные — первым fxratesapi (почасовое обновление),
// кэш на телефоне 30 мин вместо 12 ч, WidgetKit refresh hint 20 мин,
// в подписи возраста — минуты, а не только «только что / Nч».
const MARKER = "CURRENCY_WIDGET_V1";

// Показывается в заголовке меню (тап по виджету → открывается меню) — так
// видно, подтянулась ли на телефон действительно последняя версия кода
// (см. README → "Как проверить, что обновление подтянулось"). На самом
// виджете (плитке Home Screen) эта метка не показывается. Увеличивать при
// каждом заметном изменении.
const CORE_VERSION = "6.8";

// Базовая валюта, относительно которой кэшируются все курсы одним запросом.
const BASE_CCY = "USD";

// Список валют по умолчанию для полноэкранной "Таблицы всех валют" —
// как в приложениях-обменниках: одна и та же сумма пересчитывается сразу
// во все валюты списка, тап по строке меняет, в какую валюту вводится сумма.
const DEFAULT_TABLE_CURRENCIES = ["USD", "EUR", "RUB", "VND", "THB", "IDR"];

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
  BRL: { flag: "🇧🇷", color: "#66BB6A" },
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
// fxratesapi — почасовой mid-market (не суточный снимок ЕЦБ/open.er-api).
// jsdelivr / open.er-api — дневные фолбэки, если почасовой URL недоступен
// с устройства (VPN, DNS, таймаут).
function providerUrls(base) {
  const b = base.toUpperCase();
  const bLower = base.toLowerCase();
  return [
    { kind: "fxrates", url: "https://api.fxratesapi.com/latest?base=" + b },
    {
      kind: "fawaz",
      url:
        "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/" +
        bLower +
        ".min.json",
    },
    { kind: "erapi", url: "https://open.er-api.com/v6/latest/" + b },
  ];
}

const CACHE_NAME = "currency-rates-cache.json";
const SETTINGS_NAME = "currency-settings.json";
// Раньше 12ч — виджет мог сутки держать вчерашний суточный снимок.
// 30 мин: при каждой перерисовке/Play чаще ходим в почасовой API.
const CACHE_TTL_MS = 30 * 60 * 1000;

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
    tableCurrencies: DEFAULT_TABLE_CURRENCIES,
    tableActiveCurrency: DEFAULT_TABLE_CURRENCIES[0],
    tableAmount: 1000,
  });
  if (!Array.isArray(settings.tableCurrencies) || !settings.tableCurrencies.length) {
    settings.tableCurrencies = DEFAULT_TABLE_CURRENCIES;
  }
  if (
    !settings.tableActiveCurrency ||
    settings.tableCurrencies.indexOf(settings.tableActiveCurrency) === -1
  ) {
    settings.tableActiveCurrency = settings.tableCurrencies[0];
  }
  if (!Number.isFinite(settings.tableAmount) || settings.tableAmount <= 0) {
    settings.tableAmount = 1000;
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
  if (kind === "fxrates") {
    // api.fxratesapi.com/latest → { success, timestamp, base, rates }
    if (payload && payload.rates && typeof payload.rates === "object") {
      const rates = Object.assign({}, payload.rates);
      rates[base.toUpperCase()] = 1;
      return {
        rates,
        ratesUpdatedAt:
          typeof payload.timestamp === "number" && payload.timestamp > 0
            ? payload.timestamp * 1000
            : null,
      };
    }
    return null;
  }
  if (kind === "erapi") {
    if (payload && payload.result === "success" && payload.rates) {
      return {
        rates: payload.rates,
        ratesUpdatedAt:
          typeof payload.time_last_update_unix === "number"
            ? payload.time_last_update_unix * 1000
            : null,
      };
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
      let ratesUpdatedAt = null;
      if (typeof payload.date === "string" && /^\d{4}-\d{2}-\d{2}/.test(payload.date)) {
        const parsed = Date.parse(payload.date + "T00:00:00Z");
        if (!Number.isNaN(parsed)) ratesUpdatedAt = parsed;
      }
      return { rates, ratesUpdatedAt };
    }
    return null;
  }
  return null;
}

/**
 * Один провайдер. loadString + JSON.parse надёжнее loadJSON на части
 * прошивок Scriptable; timeoutInterval — в СЕКУНДАХ (документация Scriptable).
 * Снаружи всё равно withTimeout, т.к. нативный abort иногда не срабатывает.
 */
async function fetchRatesFromProvider(provider, base) {
  const req = new Request(provider.url);
  req.timeoutInterval = 12;
  req.headers = { Accept: "application/json", "Cache-Control": "no-cache" };
  const raw = await req.loadString();
  let payload;
  try {
    payload = JSON.parse(raw);
  } catch (e) {
    throw new Error("Не JSON от " + provider.kind);
  }
  const normalized = normalizeRates(provider.kind, base, payload);
  if (normalized && normalized.rates && Object.keys(normalized.rates).length > 5) {
    return {
      base: base.toUpperCase(),
      rates: normalized.rates,
      fetchedAt: Date.now(),
      ratesUpdatedAt: normalized.ratesUpdatedAt || Date.now(),
      source: provider.kind,
    };
  }
  throw new Error("Пустой/неверный ответ от " + provider.kind);
}

/**
 * Курсы по очереди. На каждый URL — withTimeout(10с): на мобильной сети
 * 3с из v6.6 оказалось мало (TCP+TLS+DNS), все три провайдера отваливались
 * подряд → «Сеть не ответила», хотя кэш при этом мог быть свежим.
 * Максимум 3×10с, на практике обычно отвечает первый (jsdelivr) за 1–2с.
 */
async function fetchRates(base) {
  let lastError = null;
  for (const provider of providerUrls(base)) {
    try {
      return await withTimeout(
        fetchRatesFromProvider(provider, base),
        10000,
        "Таймаут " + provider.kind
      );
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

/**
 * Принудительное обновление для пункта меню: сеть обязательна.
 * Не подменяет тихий фолбэк на кэш успехом — вызывающий код сам решает,
 * что показать пользователю.
 */
async function forceFetchRates() {
  const fresh = await fetchRates(BASE_CCY);
  saveCache(fresh);
  return fresh;
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

  // Валюты вроде VND дают семи-восьмизначные числа — на строке с ними
  // получается заметно длиннее текст, чем у соседних пар. Из-за lineLimit(1)
  // + minimumScaleFactor это ужимает шрифт именно этой строки сильнее
  // остальных, и ряды визуально выглядят вразнобой (одни крупные, другие
  // мелкие). Сокращаем компактно (млн/млрд), а не просто округляем разряды.
  if (abs >= 1000000000) {
    return (n / 1000000000).toLocaleString("ru-RU", { maximumFractionDigits: 2 }) + " млрд";
  }
  if (abs >= 1000000) {
    return (n / 1000000).toLocaleString("ru-RU", { maximumFractionDigits: 2 }) + " млн";
  }

  const digits = abs >= 100 ? 2 : abs >= 1 ? 3 : 4;
  return n.toLocaleString("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  });
}

function cacheAgeLabel(cache) {
  if (!cache || !cache.fetchedAt) return "нет данных";
  // Предпочитаем время самого курса у провайдера (ratesUpdatedAt), а не
  // момент записи кэша — так видно, насколько свежий mid-market снимок.
  const anchor = cache.ratesUpdatedAt || cache.fetchedAt;
  const ms = Math.max(0, Date.now() - anchor);
  const mins = Math.floor(ms / (60 * 1000));
  const source = cache.source ? " · " + cache.source : "";
  if (mins < 2) return "обновлено только что" + source;
  if (mins < 60) return "обновлено " + mins + " мин назад" + source;
  const h = Math.floor(mins / 60);
  if (h === 1) return "обновлено 1ч назад" + source;
  if (h < 24) return "обновлено " + h + "ч назад" + source;
  const d = Math.floor(h / 24);
  return "обновлено " + d + "д назад" + source;
}

/** Парсит список кодов валют вида "USD,EUR,RUB,VND" для таблицы всех валют. */
function parseCurrencyCodesParam(param) {
  if (!param || typeof param !== "string") return null;
  const codes = param
    .split(",")
    .map((s) => s.trim().toUpperCase())
    .filter((s) => /^[A-Z]{3}$/.test(s));
  const unique = Array.from(new Set(codes));
  return unique.length ? unique : null;
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

/** Аварийный виджет: показывает текст ошибки прямо на плитке вместо тихого "ничего не поменялось". */
function createErrorWidget(message) {
  const w = new ListWidget();
  w.backgroundColor = new Color("#3A0A0A");
  w.setPadding(12, 12, 12, 12);

  const title = w.addText("⚠️ Ошибка рендера");
  title.font = Font.boldSystemFont(12);
  title.textColor = Color.white();
  title.lineLimit = 1;
  title.minimumScaleFactor = 0.7;

  w.addSpacer(4);

  const body = w.addText(String(message));
  body.font = Font.systemFont(11);
  body.textColor = new Color("#FFD6D6");
  body.lineLimit = 6;
  body.minimumScaleFactor = 0.6;

  // Ошибка может быть временной (сеть/API) — просим систему попробовать
  // перерисовать раньше обычного, а не ждать полный REFRESH_HINT_MS.
  try {
    w.refreshAfterDate = new Date(Date.now() + 5 * 60 * 1000);
  } catch (e) {}

  return w;
}

/** Общий "нет данных" фрагмент для любого стиля. */
function addNoDataMessage(container) {
  const err = container.addText("Нет данных. Открой приложение для обновления.");
  err.font = Font.systemFont(13);
  err.textColor = Color.white();
  err.lineLimit = 3;
}

/**
 * Единственный стиль виджета — сама плитка выглядит как таблица всех валют
 * (тот же список currencies/activeCurrency/amount, что и в полноэкранной
 * интерактивной таблице): флаг+код слева, сумма справа, строки разделены
 * заметной полоской, активная валюта (та, в которую введена сумма)
 * подсвечена. Блок строк центрирован по вертикали внутри плитки, а не
 * прижат к верхнему краю. Никакого значка обновления — только курсы.
 * С v6.7 активная валюта на плитке больше не подсвечивается синим — все
 * строки выглядят одинаково; выбор активной валюты остаётся в таблице.
 * Тап по плитке целиком открывает ту же таблицу, но уже с клавиатурой —
 * ввод суммы прямо на плитке невозможен: Home Screen виджет — статичный
 * снапшот, который перерисовывает система, а не работающее приложение.
 */
function createTableWidget(currencies, cache, activeCurrency, amount) {
  const w = new ListWidget();
  w.backgroundColor = new Color("#0B0C0E");

  const family = config.widgetFamily || "medium";
  const rates = cache ? cache.rates : null;
  const roomy = family === "large";
  // Фиксированные 15pt сверху/снизу — по краям скругления плитки больше
  // не «прилипают» строки; по горизонтали чуть шире прежнего.
  w.setPadding(15, 16, 15, 16);

  if (!rates) {
    w.addSpacer();
    addNoDataMessage(w);
    w.addSpacer();
    return w;
  }

  const maxRows = family === "small" ? 3 : family === "large" ? 7 : 5;
  const active = currencies.indexOf(activeCurrency) !== -1 ? activeCurrency : currencies[0];
  const displayAmount = Number.isFinite(amount) && amount > 0 ? amount : 1000;
  const rowsToShow = currencies.slice(0, maxRows);
  const activeRate = rates[active];

  // Код — читаемый, суммы заметно крупнее (раньше почти совпадали по кеглю).
  const codeFont = family === "small" ? 14 : roomy ? 17 : 15;
  const valueFont = family === "small" ? 19 : roomy ? 24 : 21;
  const rowPad = family === "small" ? 3 : roomy ? 6 : 5;

  // Строки центрируются по вертикали внутри всей плитки (а не прижимаются к
  // верхнему краю, как раньше) — весь блок строк оборачивается спейсерами
  // сверху и снизу.
  w.addSpacer();
  const content = w.addStack();
  content.layoutVertically();

  rowsToShow.forEach((code, i) => {
    const targetRate = rates[code];
    const value = activeRate && targetRate ? displayAmount * (targetRate / activeRate) : null;

    const row = content.addStack();
    row.layoutHorizontally();
    row.centerAlignContent();
    row.setPadding(rowPad, 0, rowPad, 0);
    // Без синей подсветки активной строки на плитке — все строки одинаковые,
    // активная валюта влияет только на пересчёт сумм (и видна в таблице).

    const codeText = row.addText(currencyMeta(code).flag + " " + code);
    codeText.font = Font.boldSystemFont(codeFont);
    codeText.textColor = Color.white();
    codeText.lineLimit = 1;

    row.addSpacer();

    const valueText = row.addText(value === null ? "—" : formatNumber(value));
    valueText.font = Font.boldSystemFont(valueFont);
    valueText.textColor = Color.white();
    valueText.lineLimit = 1;
    valueText.minimumScaleFactor = 0.6;

    // Полоска-разделитель между строками (не после последней) — сделана
    // заметно ярче прежней, чтобы явно читалась как граница между валютами,
    // а не терялась на тёмном фоне.
    if (i < rowsToShow.length - 1) {
      content.addSpacer(family === "small" ? 4 : 6);
      const divider = content.addStack();
      divider.size = new Size(0, 1.5);
      divider.backgroundColor = new Color("#FFFFFF", 0.22);
      content.addSpacer(family === "small" ? 4 : 6);
    }
  });

  w.addSpacer();

  return w;
}

const ACCESSORY_FAMILIES = ["accessoryRectangular", "accessoryCircular", "accessoryInline"];

/** Компактный виджет для экрана блокировки — система всё равно раскрасит его сама. */
function createAccessoryWidget(currencies, cache, activeCurrency, amount, family) {
  const w = new ListWidget();
  const rates = cache ? cache.rates : null;
  const displayAmount = Number.isFinite(amount) && amount > 0 ? amount : 1000;
  const active = currencies.indexOf(activeCurrency) !== -1 ? activeCurrency : currencies[0] || BASE_CCY;
  const target = currencies.find((c) => c !== active) || active;
  const activeRate = rates ? rates[active] : null;
  const targetRate = rates ? rates[target] : null;
  const converted = activeRate && targetRate ? displayAmount * (targetRate / activeRate) : null;
  const valueText = (converted === null ? "—" : formatNumber(converted)) + " " + target;

  if (family === "accessoryInline") {
    w.addText("💱 " + formatNumber(displayAmount) + " " + active + " = " + valueText);
    return w;
  }

  if (family === "accessoryCircular") {
    w.setPadding(2, 2, 2, 2);
    const code = w.addText(target);
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
  const title = w.addText(active + " → " + target);
  title.font = Font.mediumSystemFont(11);
  w.addSpacer(2);
  const value = w.addText(formatNumber(displayAmount) + " " + active + " = " + valueText);
  value.font = Font.boldSystemFont(15);
  value.lineLimit = 1;
  value.minimumScaleFactor = 0.6;
  return w;
}

// Без этой подсказки WidgetKit сам решает, когда в следующий раз вызвать
// скрипт заново — и это решение целиком на стороне iOS: если система решит,
// что виджет "редко смотрят", перерисовки могут случаться раз в несколько
// часов, а то и реже (это подтверждено на практике: см. README, промежуток
// в ~12 часов между отрисовками при обычном использовании). Явная
// refreshAfterDate — единственный официальный рычаг Scriptable, чтобы
// попросить систему не тянуть дольше разумного окна для курсов валют.
const REFRESH_HINT_MS = 20 * 60 * 1000;

function createWidget(currencies, cache, activeCurrency, amount) {
  const family = config.widgetFamily || "medium";
  const isAccessory = ACCESSORY_FAMILIES.indexOf(family) !== -1;
  const w = isAccessory
    ? createAccessoryWidget(currencies, cache, activeCurrency, amount, family)
    : createTableWidget(currencies, cache, activeCurrency, amount);
  if (!isAccessory) {
    // Тап по плитке целиком (кроме значка обновления, у которого свой,
    // более специфичный url) открывает ту же полноэкранную таблицу с
    // клавиатурой — см. main() → action === "table".
    const url = scriptRunUrl({ action: "table" });
    if (url) w.url = url;
  }
  try {
    w.refreshAfterDate = new Date(Date.now() + REFRESH_HINT_MS);
  } catch (e) {}
  return w;
}

/**
 * HTML для полноэкранной "Таблицы всех валют": первый столбец — флаг+код,
 * второй — сумма. Тап по строке делает её "активной" (в неё вводится сумма
 * с клавиатуры), остальные строки пересчитываются мгновенно на лету —
 * прямо внутри WebView, без обращений к сети. Строки разделены тонкой
 * полоской, активная подсвечена.
 */
function buildTableHtml(currencies, rates, activeCurrency, amount) {
  const meta = {};
  currencies.forEach((c) => {
    meta[c] = currencyMeta(c);
  });
  const data = {
    currencies,
    meta,
    rates,
    active: currencies.indexOf(activeCurrency) !== -1 ? activeCurrency : currencies[0],
    amount,
  };
  const dataJson = JSON.stringify(data).replace(/</g, "\\u003c");

  const rowsHtml = currencies
    .map((code) => {
      const m = meta[code] || { flag: "💱", color: "#888888" };
      return (
        '<div class="row" id="row-' +
        code +
        '" onclick="selectCurrency(\'' +
        code +
        '\')">' +
        '<div class="left"><span class="flag">' +
        m.flag +
        '</span><span class="code">' +
        code +
        "</span></div>" +
        '<div class="value" id="val-' +
        code +
        '"></div>' +
        "</div>"
      );
    })
    .join("\n");

  return (
    "<!DOCTYPE html><html><head><meta charset='utf-8'>" +
    "<meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'>" +
    "<style>" +
    "* { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }" +
    "html, body { margin:0; padding:0; height:100%; background:#0B0C0E; color:#F5F6F7; " +
    "font-family: -apple-system, BlinkMacSystemFont, sans-serif; overflow:hidden; }" +
    // display:flex + height:100% на body — но без min-height:0 / flex-basis:0
    // у .list flex-элемент по умолчанию не сжимается ниже своего контента, и
    // .keypad снизу выталкивается за пределы видимой области (в Scriptable
    // WebView ещё и chrome Close/Share съедает часть экрана поверх 100vh).
    // flex:1 1 0 + min-height:0 явно отдают лишнее место списку и оставляют
    // клавиатуру целиком внизу; компактные отступы/кнопки поднимают сетку
    // цифр выше, чтобы был виден нижний ряд.
    "body { display:flex; flex-direction:column; height:100%; max-height:100%; min-height:0; }" +
    ".header { flex: 0 0 auto; padding: 15px 18px 8px; }" +
    ".header h1 { margin:0; font-size:17px; font-weight:700; }" +
    ".header p { margin:4px 0 0; font-size:11px; color:#8A8D93; }" +
    ".list { flex: 1 1 0; min-height:0; overflow-y:auto; -webkit-overflow-scrolling: touch; padding: 0 4px; }" +
    ".row { display:flex; align-items:center; justify-content:space-between; " +
    "padding: 8px 14px; border-bottom: 1px solid rgba(255,255,255,0.08); border-radius: 10px; }" +
    ".row.active { background: rgba(52,120,246,0.18); border-bottom-color: transparent; }" +
    ".left { display:flex; align-items:center; gap:10px; }" +
    ".flag { font-size:20px; }" +
    ".code { font-size:15px; font-weight:600; letter-spacing:0.3px; }" +
    ".value { font-size:20px; font-weight:600; font-variant-numeric: tabular-nums; }" +
    ".row.active .value { color:#5AA4FF; }" +
    ".keypad { flex: 0 0 auto; padding: 4px 10px 6px; " +
    "border-top: 1px solid rgba(255,255,255,0.08); background:#0B0C0E; }" +
    ".keypad-top { display:flex; justify-content:flex-end; padding: 0 4px 4px; }" +
    ".clearBtn { color:#8A8D93; font-size:13px; background:none; border:none; padding:2px 8px; }" +
    ".grid { display:grid; grid-template-columns: 1fr 1fr 1fr; gap:5px; }" +
    ".grid button { font-size:18px; font-weight:500; color:#F5F6F7; background: rgba(255,255,255,0.06); " +
    "border:none; border-radius:10px; padding:8px 0; }" +
    ".grid button:active { background: rgba(255,255,255,0.14); }" +
    ".grid button.wide { grid-column: span 1; }" +
    "</style></head><body>" +
    "<div class='header'><h1>Таблица всех валют</h1>" +
    "<p>Тап по валюте — ввод суммы в неё. Остальные пересчитаются сразу</p></div>" +
    "<div class='list'>" +
    rowsHtml +
    "</div>" +
    "<div class='keypad'>" +
    "<div class='keypad-top'><button class='clearBtn' onclick='pressClear()'>Очистить</button></div>" +
    "<div class='grid'>" +
    "<button onclick=\"pressDigit('1')\">1</button><button onclick=\"pressDigit('2')\">2</button><button onclick=\"pressDigit('3')\">3</button>" +
    "<button onclick=\"pressDigit('4')\">4</button><button onclick=\"pressDigit('5')\">5</button><button onclick=\"pressDigit('6')\">6</button>" +
    "<button onclick=\"pressDigit('7')\">7</button><button onclick=\"pressDigit('8')\">8</button><button onclick=\"pressDigit('9')\">9</button>" +
    "<button onclick='pressComma()'>,</button><button onclick=\"pressDigit('0')\">0</button><button onclick='pressBackspace()'>⌫</button>" +
    "</div></div>" +
    "<script>" +
    "var DATA = " +
    dataJson +
    ";" +
    "var state = { active: DATA.active, buffer: String(DATA.amount).replace('.', ',') };" +
    "function rateOf(code) { return DATA.rates[code]; }" +
    "function convert(amt, from, to) {" +
    "  var rf = rateOf(from), rt = rateOf(to);" +
    "  if (!rf || !rt) return null;" +
    "  return amt * (rt / rf);" +
    "}" +
    "function fmtGrouped(n) {" +
    "  if (n === null || n === undefined || isNaN(n)) return '—';" +
    "  return n.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });" +
    "}" +
    "function bufferAmount() {" +
    "  var v = parseFloat(state.buffer.replace(',', '.'));" +
    "  return isNaN(v) ? 0 : v;" +
    "}" +
    "function render() {" +
    "  var amt = bufferAmount();" +
    "  DATA.currencies.forEach(function (code) {" +
    "    var rowEl = document.getElementById('row-' + code);" +
    "    var valEl = document.getElementById('val-' + code);" +
    "    var isActive = code === state.active;" +
    "    rowEl.classList.toggle('active', isActive);" +
    "    if (isActive) {" +
    "      valEl.textContent = state.buffer.length ? state.buffer : '0';" +
    "    } else {" +
    "      valEl.textContent = fmtGrouped(convert(amt, state.active, code));" +
    "    }" +
    "  });" +
    "  window.__active = state.active;" +
    "  window.__amount = amt;" +
    "}" +
    "function selectCurrency(code) {" +
    "  if (state.active === code) return;" +
    "  var amt = bufferAmount();" +
    "  var converted = convert(amt, state.active, code);" +
    "  state.active = code;" +
    "  state.buffer = converted === null ? '0' : (Math.round(converted * 100) / 100).toString().replace('.', ',');" +
    "  render();" +
    "}" +
    "function pressDigit(d) {" +
    "  if (state.buffer === '0') state.buffer = '';" +
    "  if (state.buffer.replace(',', '').length >= 15) return;" +
    "  state.buffer += d;" +
    "  render();" +
    "}" +
    "function pressComma() {" +
    "  if (state.buffer.indexOf(',') !== -1) return;" +
    "  if (!state.buffer.length) state.buffer = '0';" +
    "  state.buffer += ',';" +
    "  render();" +
    "}" +
    "function pressBackspace() {" +
    "  state.buffer = state.buffer.slice(0, -1);" +
    "  if (!state.buffer.length) state.buffer = '0';" +
    "  render();" +
    "}" +
    "function pressClear() {" +
    "  state.buffer = '0';" +
    "  render();" +
    "}" +
    "render();" +
    "</script>" +
    "</body></html>"
  );
}

/** Открывает полноэкранную интерактивную таблицу всех валют (см. buildTableHtml). */
async function runFullTableView(settings, cache) {
  const rates = cache ? cache.rates : null;
  if (!rates) {
    const err = new Alert();
    err.title = "Нет данных";
    err.message = "Сначала обнови курсы (Обновить курсы сейчас), затем открой таблицу.";
    err.addAction("OK");
    await err.presentAlert();
    return;
  }

  const configured = settings.tableCurrencies && settings.tableCurrencies.length ? settings.tableCurrencies : DEFAULT_TABLE_CURRENCIES;
  const currencies = configured.filter((c) => rates[c] !== undefined);
  if (!currencies.length) {
    const err = new Alert();
    err.title = "Нет курсов для этих валют";
    err.message = "Проверь список валют для таблицы в меню.";
    err.addAction("OK");
    await err.presentAlert();
    return;
  }

  const active = currencies.indexOf(settings.tableActiveCurrency) !== -1 ? settings.tableActiveCurrency : currencies[0];
  const amount = Number.isFinite(settings.tableAmount) && settings.tableAmount > 0 ? settings.tableAmount : 1000;

  const html = buildTableHtml(currencies, rates, active, amount);
  const webView = new WebView();
  await webView.loadHTML(html);
  await webView.present(true);

  // Best-effort: подтягиваем последнее состояние (валюта/сумма) обратно в
  // настройки, чтобы при следующем открытии таблица открывалась там же, где
  // её оставили. WKWebView остаётся в памяти после present(), поэтому это
  // обычно срабатывает, но не является гарантией на всех версиях iOS —
  // если не получилось, просто тихо остаёмся при прежних настройках.
  try {
    const stateJson = await webView.evaluateJavaScript(
      "JSON.stringify({ active: window.__active, amount: window.__amount })"
    );
    const parsed = JSON.parse(stateJson);
    if (parsed && typeof parsed.active === "string" && Number.isFinite(parsed.amount) && parsed.amount > 0) {
      settings.tableActiveCurrency = parsed.active;
      settings.tableAmount = parsed.amount;
      saveSettings(settings);
    }
  } catch (e) {
    // WebView может быть уже недоступен для evaluateJavaScript — не критично.
  }
}

/** Настройка списка валют для полноэкранной таблицы (см. runFullTableView). */
async function runTableCurrenciesDialog(settings) {
  const current = (settings.tableCurrencies || DEFAULT_TABLE_CURRENCIES).join(",");
  const a = new Alert();
  a.title = "Валюты для таблицы";
  a.message = "Формат: USD,EUR,RUB,VND,THB,IDR";
  a.addTextField("Валюты", current);
  a.addAction("Сохранить");
  a.addCancelAction("Отмена");
  const choice = await a.presentAlert();
  if (choice !== 0) return;
  const parsed = parseCurrencyCodesParam(a.textFieldValue(0));
  if (parsed) {
    settings.tableCurrencies = parsed;
    if (parsed.indexOf(settings.tableActiveCurrency) === -1) {
      settings.tableActiveCurrency = parsed[0];
    }
    saveSettings(settings);
  }
}

async function runMenu(settings, cache) {
  const alert = new Alert();
  alert.title = "Конвертер валют · v" + CORE_VERSION;
  alert.message = cacheAgeLabel(cache);
  alert.addAction("Открыть таблицу всех валют");
  alert.addAction("Валюты для таблицы");
  alert.addAction("Обновить курсы сейчас");
  alert.addCancelAction("Закрыть");

  const choice = await alert.presentSheet();
  if (choice === 0) {
    await runFullTableView(settings, cache);
  } else if (choice === 1) {
    await runTableCurrenciesDialog(settings);
  } else if (choice === 2) {
    const result = new Alert();
    try {
      const fresh = await forceFetchRates();
      result.title = "Курсы обновлены";
      result.message = cacheAgeLabel(fresh);
    } catch (e) {
      const fallback = loadCache();
      const detail = String(e && e.message ? e.message : e);
      // Если кэш ещё свежий — это не авария: курсы на плитке уже актуальные,
      // просто повторный запрос сейчас не прошёл (сеть/DNS). Не пугаем
      // «Сеть не ответила», когда данные только что были получены.
      if (fallback && fallback.rates && isCacheFresh(fallback)) {
        result.title = "Курсы актуальны";
        result.message = cacheAgeLabel(fallback) + "\nПовторная загрузка: " + detail;
      } else if (fallback && fallback.rates) {
        result.title = "Сеть не ответила";
        result.message =
          "Оставлен прежний кэш (" + cacheAgeLabel(fallback) + ").\n" + detail;
      } else {
        result.title = "Не удалось обновить";
        result.message = detail;
      }
    }
    result.addAction("OK");
    await result.presentAlert();
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
  const widgetParamCurrencies = parseCurrencyCodesParam((args && args.widgetParameter) || null);
  const currencies = widgetParamCurrencies || settings.tableCurrencies || DEFAULT_TABLE_CURRENCIES;

  // Виджет: свежие курсы, если кэш успел устареть, но без риска зависнуть надолго.
  const cache = await safeEnsureRates(false, 10000);

  if (config.runsInWidget) {
    let widget;
    try {
      widget = createWidget(currencies, cache, settings.tableActiveCurrency, settings.tableAmount);
    } catch (e) {
      // Раньше при исключении здесь Script.setWidget() вообще не вызывался,
      // и WidgetKit молча оставлял старый рендер — выглядело как "ничего не меняется".
      // Теперь отрисовываем сам текст ошибки, чтобы её можно было увидеть на плитке.
      widget = createErrorWidget(e && e.message ? e.message : String(e));
    }
    Script.setWidget(widget);
    return;
  }

  // Тап по виджету / Play: по умолчанию сразу открывается полноэкранная
  // таблица всех валют (см. action === "table") — так тап по плитке ведёт
  // прямиком туда же, где показана та же таблица, но уже с клавиатурой для
  // ввода любой суммы. Общее меню (настройки, обновление курсов) остаётся
  // доступно, только если запустить скрипт вручную в приложении Scriptable
  // (▶ Play) — тогда queryParameters пустые и qp.action не задан.
  const qp = (args && args.queryParameters) || {};
  try {
    if (qp.action === "refresh") {
      try {
        await forceFetchRates();
      } catch (e) {
        // Тихий фолбэк: виджет/тап не должен показывать алерт поверх Home Screen.
      }
    } else if (qp.action === "table") {
      await runFullTableView(settings, cache);
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

  // Превью ListWidget после Play/тапа больше не показываем: окно «Close» с
  // плиткой всплывало каждый раз и мешало. Home Screen виджет обновляем
  // через Script.setWidget (без presentMedium/presentLarge) — WidgetKit
  // подхватит новый снапшот, а модалка «предпросмотр» не откроется.
  const refreshedSettings = loadSettings();
  const refreshedCurrencies =
    widgetParamCurrencies || refreshedSettings.tableCurrencies || DEFAULT_TABLE_CURRENCIES;
  const refreshedCache = loadCache() || cache;
  let updatedWidget;
  try {
    updatedWidget = createWidget(
      refreshedCurrencies,
      refreshedCache,
      refreshedSettings.tableActiveCurrency,
      refreshedSettings.tableAmount
    );
  } catch (e) {
    updatedWidget = createErrorWidget(e && e.message ? e.message : String(e));
  }
  Script.setWidget(updatedWidget);
}

module.exports = { main, MARKER, CORE_VERSION };
