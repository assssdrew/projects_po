// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: dollar-sign;
// CurrencyConverter — вставь ОДИН раз и больше не трогай. Обновление = Play ▶

// Постоянные адреса (первый рабочий победит).
// Чтобы GitHub работал: Settings репозитория projects_po → Change visibility → Public
const RAW_URLS = [
  "https://raw.githubusercontent.com/assssdrew/projects_po/main/projects/currency-converter-widget/CurrencyConverterCore.js",
  "https://raw.githubusercontent.com/assssdrew/projects_po/cursor/currency-converter-scriptable-widget-bfeb/projects/currency-converter-widget/CurrencyConverterCore.js",
  "https://cdn.jsdelivr.net/gh/assssdrew/projects_po@main/projects/currency-converter-widget/CurrencyConverterCore.js",
];

const MODULE_NAME = "CurrencyConverterCore";

function modulePath() {
  try {
    const fm = FileManager.iCloud();
    return { fm, path: fm.joinPath(fm.documentsDirectory(), MODULE_NAME + ".js") };
  } catch (e) {
    const fm = FileManager.local();
    return { fm, path: fm.joinPath(fm.documentsDirectory(), MODULE_NAME + ".js") };
  }
}

function delay(ms) {
  return new Promise((resolve) => Timer.schedule(Math.max(ms, 1) / 1000, false, resolve));
}

/** Не даёт медленной/недоступной сети подвесить открытие меню при тапе. */
async function withTimeout(promise, ms, timeoutMessage) {
  return Promise.race([
    promise,
    delay(ms).then(() => {
      throw new Error(timeoutMessage || "Таймаут (" + Math.round(ms / 1000) + "с)");
    }),
  ]);
}

async function fetchCore() {
  let lastError = null;
  for (const url of RAW_URLS) {
    try {
      const req = new Request(url + (url.includes("?") ? "&" : "?") + "t=" + Date.now());
      req.timeoutInterval = 8;
      const code = await req.loadString();
      if (code.includes("module.exports") && code.includes("CURRENCY_WIDGET_V1")) {
        return code;
      }
      lastError = new Error("Неверный ответ от:\n" + url);
    } catch (e) {
      lastError = e;
    }
  }
  throw lastError || new Error("Не удалось скачать код");
}

async function downloadCore() {
  const code = await fetchCore();
  const { fm, path } = modulePath();
  fm.writeString(path, code);
  if (fm.isFileStoredIniCloud && fm.isFileStoredIniCloud(path)) {
    await fm.downloadFileFromiCloud(path);
  }
  return path;
}

/**
 * Виджет: только кэш (быстро, без сети).
 * Первая установка: ждём сколько нужно — кэша ещё нет.
 * Play / тап по виджету при уже установленном кэше: пробуем обновиться,
 * но не дольше 7 секунд — иначе просто открываем меню со старым кодом,
 * а не подвешиваем интерфейс на плохой сети.
 */
async function ensureCore(forceUpdate) {
  const { fm, path } = modulePath();
  const hasCache = fm.fileExists(path);

  if (!hasCache) {
    await downloadCore();
    return;
  }

  if (forceUpdate) {
    try {
      await withTimeout(downloadCore(), 7000, "Обновление кода не успело за 7с");
    } catch (e) {
      // Сеть медленная/недоступна — работаем с тем, что уже скачано ранее.
    }
    return;
  }

  if (fm.isFileStoredIniCloud && fm.isFileStoredIniCloud(path)) {
    await fm.downloadFileFromiCloud(path);
  }
}

async function boot() {
  // Виджет: кэш. Play / тап: попытаться обновиться (с таймаутом).
  const forceUpdate = !config.runsInWidget;
  try {
    await ensureCore(forceUpdate);
  } catch (e) {
    const { fm, path } = modulePath();
    if (!fm.fileExists(path)) {
      const a = new Alert();
      a.title = "Не удалось скачать";
      a.message =
        String(e) +
        "\n\nЕсли репозиторий приватный — сделай его Public в GitHub (один раз), затем снова Play.";
      a.addAction("OK");
      await a.presentAlert();
      return;
    }
  }

  try {
    const core = importModule(MODULE_NAME);
    await core.main();
  } catch (e) {
    if (!config.runsInWidget) {
      const a = new Alert();
      a.title = "Ошибка в скрипте";
      a.message = String(e && e.message ? e.message : e);
      a.addAction("OK");
      await a.presentAlert();
    }
  }
}

await boot();
Script.complete();
