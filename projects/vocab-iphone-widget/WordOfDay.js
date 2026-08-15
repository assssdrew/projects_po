// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: book;
//
// Вставь ОДИН раз. Дальше только ▶ Play — ядро скачается само.
// Не нужно копировать код при каждом обновлении.

const CORE_URLS = [
  "https://raw.githubusercontent.com/assssdrew/projects_po/cursor/vocabulary-full-list-f829/projects/vocab-iphone-widget/WordOfDayCore.js",
  "https://cdn.jsdelivr.net/gh/assssdrew/projects_po@cursor/vocabulary-full-list-f829/projects/vocab-iphone-widget/WordOfDayCore.js",
];

function getFileManager() {
  try {
    const fm = FileManager.iCloud();
    fm.documentsDirectory();
    return fm;
  } catch (e) {
    return FileManager.local();
  }
}

const fm = getFileManager();
const corePath = fm.joinPath(fm.documentsDirectory(), "WordOfDayCore.js");

function isValidCore(code) {
  return !!(
    code &&
    code.length > 500 &&
    !String(code).trim().startsWith("<!") &&
    code.includes("module.exports") &&
    code.includes("PASSIVE_WIDGET") &&
    code.includes("exRu") &&
    code.includes("wrapLines")
  );
}

async function fetchCoreCode() {
  let lastError = null;
  for (const base of CORE_URLS) {
    try {
      const req = new Request(base + (base.includes("?") ? "&" : "?") + "t=" + Date.now());
      req.timeoutInterval = 45;
      const code = await req.loadString();
      if (isValidCore(code)) return code;
      lastError = new Error("Старый/пустой ответ: " + base);
    } catch (e) {
      lastError = e;
    }
  }
  throw lastError || new Error("Не удалось скачать ядро");
}

async function downloadCore() {
  const code = await fetchCoreCode();
  if (fm.fileExists(corePath)) {
    try {
      fm.remove(corePath);
    } catch (e) {}
  }
  fm.writeString(corePath, code);
  try {
    if (fm.isFileStoredIniCloud(corePath) && !fm.isFileDownloaded(corePath)) {
      await fm.downloadFileFromiCloud(corePath);
    }
  } catch (e) {}
}

async function ensureCore() {
  // ▶ Play в приложении — всегда тянем свежее ядро
  if (!config.runsInWidget) {
    await downloadCore();
    return;
  }
  // виджет: локальный файл, если валиден
  if (!fm.fileExists(corePath) || !isValidCore(fm.readString(corePath) || "")) {
    await downloadCore();
  }
}

try {
  await ensureCore();
} catch (e) {
  const a = new Alert();
  a.title = "Обновление не удалось";
  a.message = String(e);
  a.addAction("OK");
  await a.presentAlert();
  return;
}

const core = importModule("WordOfDayCore");
await core.main();
