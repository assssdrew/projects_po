// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: book;
// Word of Day — bootstrap (короткий код).
// Вставь ЭТО вместо всего старого скрипта WordOfDay в Scriptable.
// Имя скрипта должно быть ровно: WordOfDay
//
// После вставки нажми ▶ Play один раз — скачается новая версия с кнопками.
// Затем обнови виджет на домашнем экране (средний или большой).

const CORE_URL =
  "https://raw.githubusercontent.com/assssdrew/projects_po/cursor/vocabulary-full-list-f829/projects/vocab-iphone-widget/WordOfDayCore.js";

function getFileManager() {
  try {
    const fm = FileManager.iCloud();
    // Проверка: на части устройств iCloud недоступен
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
    // Старый монолитный код без кнопок/озвучки — перекачать
    if (!local.includes("addButton") || !local.includes("Speech.speak")) {
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
  } catch (e) {
    // local FileManager — ок, iCloud не нужен
  }
}

await ensureCore();
const core = importModule("WordOfDayCore");
await core.main();
