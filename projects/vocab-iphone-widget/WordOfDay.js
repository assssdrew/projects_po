// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: book;
//
// Замени ВЕСЬ код WordOfDay на этот → ▶ Play.
// Успех: внизу виджета «v3», фон прозрачный, только EN + RU.

const CORE_URLS = [
  "https://raw.githubusercontent.com/assssdrew/projects_po/d2b14f6bf9cba9676c070a38aa15c676d6b56dd8/projects/vocab-iphone-widget/WordOfDayCore.js",
  "https://cdn.jsdelivr.net/gh/assssdrew/projects_po@d2b14f6bf9cba9676c070a38aa15c676d6b56dd8/projects/vocab-iphone-widget/WordOfDayCore.js",
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

async function fetchCoreCode() {
  let lastError = null;
  for (const base of CORE_URLS) {
    try {
      const req = new Request(base + (base.includes("?") ? "&" : "?") + "t=" + Date.now());
      req.timeoutInterval = 45;
      const code = await req.loadString();
      if (
        code &&
        code.length > 500 &&
        !code.trim().startsWith("<!") &&
        code.includes("PASSIVE_WIDGET_V3") &&
        code.includes("Color.clear()")
      ) {
        return code;
      }
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
  if (!config.runsInWidget || !fm.fileExists(corePath)) {
    await downloadCore();
    return;
  }
  const local = fm.readString(corePath) || "";
  if (!local.includes("PASSIVE_WIDGET_V3") || !local.includes(" ·  v3")) {
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
