// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: book;
// WordOfDay — вставь ОДИН раз. Дальше только Play ▶ (без копирования)

const RAW_URL = "https://dpaste.com/97FX24745.txt";
const MODULE_NAME = "WordOfDayCore";

function modulePath() {
  // iCloud предпочтительнее — виджет и скрипт видят один файл
  try {
    const fm = FileManager.iCloud();
    return { fm, path: fm.joinPath(fm.documentsDirectory(), MODULE_NAME + ".js") };
  } catch (e) {
    const fm = FileManager.local();
    return { fm, path: fm.joinPath(fm.documentsDirectory(), MODULE_NAME + ".js") };
  }
}

async function downloadCore() {
  const req = new Request(RAW_URL);
  req.timeoutInterval = 60;
  const code = await req.loadString();
  if (!code.includes("module.exports") || !code.includes("const WORDS")) {
    throw new Error("Скачался не тот файл:\n" + code.slice(0, 120));
  }
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
  // Виджет: берём кэш (быстро, офлайн).
  // Play или тап по виджету: скачиваем свежий код сами — без буфера и вставки.
  const forceUpdate = !config.runsInWidget;
  try {
    await ensureCore(forceUpdate);
  } catch (e) {
    const { fm, path } = modulePath();
    if (!fm.fileExists(path)) {
      const a = new Alert();
      a.title = "Не удалось скачать";
      a.message = String(e);
      a.addAction("OK");
      await a.presentAlert();
      return;
    }
    // если сеть упала, но кэш есть — работаем с кэшем
  }

  const core = importModule(MODULE_NAME);
  await core.main();
}

await boot();
Script.complete();
