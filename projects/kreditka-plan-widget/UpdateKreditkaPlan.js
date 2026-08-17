// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: sync;
//
// Принудительно скачивает свежий KreditkaPlanCore.js и запускает виджет.

const BOOT =
  "https://raw.githubusercontent.com/assssdrew/projects_po/cursor/tbank-platinum-handoff-231e/projects/kreditka-plan-widget/KreditkaPlan.js";

const fm = (() => {
  try {
    const i = FileManager.iCloud();
    i.documentsDirectory();
    return i;
  } catch (e) {
    return FileManager.local();
  }
})();

const bootPath = fm.joinPath(fm.documentsDirectory(), "KreditkaPlan.js");
const corePath = fm.joinPath(fm.documentsDirectory(), "KreditkaPlanCore.js");

try {
  if (fm.fileExists(corePath)) fm.remove(corePath);
} catch (e) {}

const req = new Request(BOOT + "?t=" + Date.now());
req.timeoutInterval = 45;
const code = await req.loadString();
if (!code || code.trim().startsWith("<!")) {
  throw new Error("Не скачался KreditkaPlan.js");
}
fm.writeString(bootPath, code);

const a = new Alert();
a.title = "KreditkaPlan обновлён";
a.message = "Открой скрипт KreditkaPlan → ▶ Play, затем добавь виджет на Home Screen.";
a.addAction("OK");
await a.presentAlert();
