// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: sync;
//
// Перезаписывает короткий LOADER 3.9 + ядро. Без importModule.

const BOOT =
  "https://raw.githubusercontent.com/assssdrew/projects_po/cursor/tbank-platinum-handoff-231e/projects/kreditka-plan-widget/KreditkaPlan.js";
const CORE =
  "https://raw.githubusercontent.com/assssdrew/projects_po/cursor/tbank-platinum-handoff-231e/projects/kreditka-plan-widget/KreditkaPlanCore.js";

function managers() {
  const out = [];
  try {
    const i = FileManager.iCloud();
    i.documentsDirectory();
    out.push(i);
  } catch (e) {}
  try {
    out.push(FileManager.local());
  } catch (e) {}
  return out;
}

async function loadUrl(url) {
  const req = new Request(url + (url.includes("?") ? "&" : "?") + "t=" + Date.now());
  req.timeoutInterval = 45;
  const code = await req.loadString();
  if (!code || code.trim().startsWith("<!")) throw new Error("Не скачался " + url);
  return code;
}

function writeAll(name, code) {
  const fms = managers();
  for (let i = 0; i < fms.length; i++) {
    const fm = fms[i];
    const path = fm.joinPath(fm.documentsDirectory(), name);
    try {
      if (fm.fileExists(path)) fm.remove(path);
    } catch (e) {}
    fm.writeString(path, code);
  }
}

const boot = await loadUrl(BOOT);
const core = await loadUrl(CORE);
if (!boot.includes("LOADER_39") || boot.includes('importModule("KreditkaPlanCore")')) {
  throw new Error("Скачался старый KreditkaPlan.js. Проверь сеть / GitHub.");
}
if (!core.includes('CORE_VERSION = "3.9"')) {
  throw new Error("Скачалось старое ядро. Проверь сеть / GitHub.");
}

writeAll("KreditkaPlan.js", boot);
writeAll("KreditkaPlanCore.js", core);
writeAll("KreditkaPlanCore39.js", core);

const a = new Alert();
a.title = "LOADER 3.9 записан";
a.message =
  "1) App Switcher → закрой Scriptable свайпом.\n2) Открой KreditkaPlan → ▶ Play.\nВ коде должна быть строка const LOADER_39 = true (нет importModule).";
a.addAction("OK");
await a.presentAlert();
