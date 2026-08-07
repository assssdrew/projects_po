// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: sync;
// Обновление «Слово дня»: Play → полный код в буфер

// Публичная ссылка (репозиторий приватный, raw GitHub не открывается)
const RAW_URL = "https://dpaste.com/33R7C2Z7Y.txt";
const SCRIPT_NAME = "WordOfDay.js";

async function main() {
  const req = new Request(RAW_URL);
  req.timeoutInterval = 60;
  let code = "";
  try {
    code = await req.loadString();
  } catch (e) {
    const a = new Alert();
    a.title = "Нет сети / не скачалось";
    a.message = String(e);
    a.addAction("OK");
    await a.presentAlert();
    return;
  }

  const ok =
    code.includes("const WORDS") &&
    (code.includes("Слово дня") || code.includes("WORD OF") || code.includes("ensureWordOfDay"));

  if (!ok) {
    const a = new Alert();
    a.title = "Файл не тот";
    a.message =
      "Ожидал код виджета, получил:\n" +
      code.slice(0, 160);
    a.addAction("OK");
    await a.presentAlert();
    return;
  }

  Pasteboard.copy(code);

  try {
    const fm = FileManager.iCloud();
    fm.writeString(fm.joinPath(fm.documentsDirectory(), SCRIPT_NAME), code);
  } catch (e1) {
    try {
      const fm = FileManager.local();
      fm.writeString(fm.joinPath(fm.documentsDirectory(), SCRIPT_NAME), code);
    } catch (e2) {}
  }

  const done = new Alert();
  done.title = "Готово";
  done.message =
    "Код в буфере.\n\n" +
    "Открой скрипт WordOfDay → вставь → Done.\n" +
    "Виджет привяжи к WordOfDay.";
  done.addAction("OK");
  await done.presentAlert();
}

await main();
Script.complete();
