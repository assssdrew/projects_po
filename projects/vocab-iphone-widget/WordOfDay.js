// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: book;
// Word of Day — bootstrap (короткий код).
// Вставь ЭТО вместо всего старого скрипта WordOfDay в Scriptable.
// Имя скрипта должно быть ровно: WordOfDay
//
// ▶ Play один раз — скачается пассивный виджет (без кнопок, автосмена).
// Потом просто смотри на домашний экран / экран блокировки.

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

async function ensureCore() {
  let needDownload = !fm.fileExists(corePath);
  if (!needDownload) {
    const local = fm.readString(corePath) || "";
    // Старая версия без примера предложения — перекачать
    if (!local.includes("PASSIVE_WIDGET_V2") || !local.includes("fallbackExample")) {
      needDownload = true;
    }
  }
  if (needDownload) {
    const req = new Request(CORE_URL);
    const code = await req.loadString();
    if (!code || code.length < 500 || code.trim().startsWith("<!")) {
      throw new Error("Не удалось скачать WordOfDayCore.js. Проверь интернет.");
    }
    fm.writeString(corePath, code);
  }
  try {
    if (fm.isFileStoredIniCloud(corePath) && !fm.isFileDownloaded(corePath)) {
      await fm.downloadFileFromiCloud(corePath);
    }
  } catch (e) {}
}

await ensureCore();
const core = importModule("WordOfDayCore");
await core.main();
