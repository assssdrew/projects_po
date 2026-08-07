// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: sync;
// Обновление виджета «Слово дня» — Play → код в буфер (+ запись файла)

const RAW_URL =
  "https://raw.githubusercontent.com/assssdrew/projects_po/cursor/vocabulary-full-list-f829/projects/vocab-iphone-widget/WordOfDay.js";
const SCRIPT_NAME = "WordOfDay.js";

async function main() {
  const req = new Request(RAW_URL);
  req.timeoutInterval = 30;
  let code;
  try {
    code = await req.loadString();
  } catch (e) {
    const a = new Alert();
    a.title = "Ошибка загрузки";
    a.message = String(e);
    a.addAction("OK");
    await a.presentAlert();
    return;
  }

  if (!code || (!code.includes("Слово дня") && !code.includes("WORDS"))) {
    const a = new Alert();
    a.title = "Похоже, файл битый";
    a.message = "Проверь интернет или URL в апдейтере.";
    a.addAction("OK");
    await a.presentAlert();
    return;
  }

  // 1) в буфер обмена — как у часов/шагов
  Pasteboard.copy(code);

  // 2) сразу перезаписать скрипт виджета, если он лежит в Scriptable
  const fm = FileManager.iCloud();
  const path = fm.joinPath(fm.documentsDirectory(), SCRIPT_NAME);
  try {
    fm.writeString(path, code);
  } catch (e) {
    // если iCloud недоступен — пробуем local
    const local = FileManager.local();
    local.writeString(local.joinPath(local.documentsDirectory(), SCRIPT_NAME), code);
  }

  const done = new Alert();
  done.title = "Слово дня обновлено";
  done.message =
    "1) Полный код скопирован в буфер.\n" +
    "2) Файл WordOfDay.js перезаписан.\n\n" +
    "Если виджет не обновился сам:\n" +
    "открой скрипт WordOfDay → выдели всё → вставь из буфера → Done.\n" +
    "Потом зажми виджет → Обновить.";
  done.addAction("OK");
  await done.presentAlert();
}

await main();
Script.complete();
