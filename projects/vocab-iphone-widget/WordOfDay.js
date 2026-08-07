// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: book;
// WordOfDay — вставь ОДИН раз и больше не трогай. Обновление = Play ▶

// Постоянные адреса (первый рабочий победит).
// Чтобы GitHub работал: Settings репозитория projects_po → Change visibility → Public
const RAW_URLS = [
  "https://raw.githubusercontent.com/assssdrew/projects_po/main/projects/vocab-iphone-widget/WordOfDayCore.js",
  "https://raw.githubusercontent.com/assssdrew/projects_po/cursor/vocabulary-full-list-f829/projects/vocab-iphone-widget/WordOfDayCore.js",
  "https://cdn.jsdelivr.net/gh/assssdrew/projects_po@main/projects/vocab-iphone-widget/WordOfDayCore.js",
];

const MODULE_NAME = "WordOfDayCore";

function modulePath() {
  try {
    const fm = FileManager.iCloud();
    return { fm, path: fm.joinPath(fm.documentsDirectory(), MODULE_NAME + ".js") };
  } catch (e) {
    const fm = FileManager.local();
    return { fm, path: fm.joinPath(fm.documentsDirectory(), MODULE_NAME + ".js") };
  }
}

async function fetchCore() {
  let lastError = null;
  for (const url of RAW_URLS) {
    try {
      const req = new Request(url);
      req.timeoutInterval = 45;
      const code = await req.loadString();
      if (code.includes("module.exports") && code.includes("const WORDS")) {
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

async function ensureCore(forceUpdate) {
  const { fm, path } = modulePath();
  if (forceUpdate || !fm.fileExists(path)) {
    await downloadCore();
  } else if (fm.isFileStoredIniCloud && fm.isFileStoredIniCloud(path)) {
    await fm.downloadFileFromiCloud(path);
  }
}

async function boot() {
  // Виджет: кэш. Play / тап: скачать свежую версию самому.
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

  const core = importModule(MODULE_NAME);
  await core.main();
}

await boot();
Script.complete();
