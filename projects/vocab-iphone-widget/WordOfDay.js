// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: book;
//
// ВАЖНО: вставь ЭТОТ код целиком вместо старого WordOfDay.
// Имя скрипта: WordOfDay
// Затем ▶ Play — каждый Play заново скачивает ядро с GitHub.

const CORE_URL =
  "https://raw.githubusercontent.com/assssdrew/projects_po/cursor/vocabulary-full-list-f829/projects/vocab-iphone-widget/WordOfDayCore.js";

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

async function downloadCore() {
  // cache-buster: GitHub/CDN иногда отдают старый файл
  const req = new Request(CORE_URL + "?t=" + Date.now());
  req.timeoutInterval = 45;
  const code = await req.loadString();
  if (!code || code.length < 500 || code.trim().startsWith("<!")) {
    throw new Error("Не удалось скачать WordOfDayCore.js");
  }
  if (!code.includes("PASSIVE_WIDGET_V2") || !code.includes("fallbackExample")) {
    throw new Error("Скачалась старая версия ядра. Попробуй Play ещё раз.");
  }
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
  // В виджете — кэш; при Play / тапе — всегда свежий код
  const force = !config.runsInWidget;
  if (force || !fm.fileExists(corePath)) {
    await downloadCore();
    return;
  }
  const local = fm.readString(corePath) || "";
  if (!local.includes("PASSIVE_WIDGET_V2") || !local.includes("fallbackExample")) {
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
