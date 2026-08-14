// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: dollar-sign;
// CurrencyConverter — вставь ОДИН раз и больше не трогай. Обновление = Play ▶

// Постоянные адреса (первый рабочий и с правильной сигнатурой — побеждает).
// Чтобы GitHub работал: Settings репозитория projects_po → Change visibility → Public
//
// Пока PR не смёржен в main, файла там ещё нет (main-адрес отдаёт 404 и
// код просто идёт дальше по списку) — актуальный код только в ветке
// cursor/currency-converter-scriptable-widget-bfeb. После мёржа первый адрес
// заработает сам по себе, менять ничего не придётся.
//
// Важно: raw.githubusercontent.com и jsdelivr — это CDN с собственным кэшем,
// поэтому после `git push` новый код может доехать туда не мгновенно, а с
// задержкой в несколько минут — это нормально, не баг. Проверяй актуальность
// по номеру версии в заголовке меню (см. README).
const RAW_URLS = [
  "https://raw.githubusercontent.com/assssdrew/projects_po/main/projects/currency-converter-widget/CurrencyConverterCore.js",
  "https://raw.githubusercontent.com/assssdrew/projects_po/cursor/currency-converter-scriptable-widget-bfeb/projects/currency-converter-widget/CurrencyConverterCore.js",
  "https://cdn.jsdelivr.net/gh/assssdrew/projects_po@cursor/currency-converter-scriptable-widget-bfeb/projects/currency-converter-widget/CurrencyConverterCore.js",
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

// Виджет на Home Screen НИКОГДА не открывает интерактивное меню и обычно не
// обновляет код сам по себе (см. ensureCore ниже) — единственный надёжный
// способ доставить новую версию логики это открыть приложение Scriptable,
// найти скрипт CurrencyConverter и нажать ▶ Play ВНУТРИ приложения (не тап
// по плитке на Home Screen). Если этого не сделать, виджет годами может
// показывать код от того самого первого Play, даже если в GitHub давно
// всё поменялось.
const CORE_MAX_AGE_MS = 3 * 60 * 60 * 1000; // виджет обновит код сам, если ему больше 3ч

/**
 * Первая установка: ждём сколько нужно — кэша ещё нет.
 * Play / тап по виджету (при "When Interacting = Run Script") при уже
 * установленном кэше: пробуем обновиться, но не дольше 7 секунд — иначе
 * просто открываем меню со старым кодом, а не подвешиваем интерфейс.
 * Просто отрисовка виджета: используем кэш, но если ему больше
 * CORE_MAX_AGE_MS — пробуем по-быстрому (4с) обновиться и здесь, чтобы
 * новые версии рано или поздно доехали без ручного Play в приложении.
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

  let isStale = false;
  try {
    const mtime = fm.modificationDate(path);
    isStale = !mtime || Date.now() - mtime.getTime() > CORE_MAX_AGE_MS;
  } catch (e) {}

  if (isStale) {
    try {
      await withTimeout(downloadCore(), 4000, "Обновление кода не успело за 4с");
    } catch (e) {
      // Не получилось — просто рисуем виджет со старым кодом, без ошибок.
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
