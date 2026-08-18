// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: credit-card;
//
// LOADER 3.8 — без importModule. Select All → удали всё → Paste → Play.
// Успех: заголовок «Матрица · кредитка». Если в коде есть importModule — файл не обновился.

const LOADER_38 = true;
const REQUIRED_CORE = "CORE_VERSION = \"3.8\"";
const CORE_URL =
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

async function readExistingCore() {
  const names = ["KreditkaPlanCore.js", "KreditkaPlanCore38.js"];
  const fms = managers();
  for (let i = 0; i < fms.length; i++) {
    const fm = fms[i];
    for (let n = 0; n < names.length; n++) {
      const path = fm.joinPath(fm.documentsDirectory(), names[n]);
      try {
        if (!fm.fileExists(path)) continue;
        if (typeof fm.downloadFileFromiCloud === "function") {
          await fm.downloadFileFromiCloud(path);
        }
      } catch (e) {}
      try {
        if (!fm.fileExists(path)) continue;
        const code = fm.readString(path);
        if (code && code.includes(REQUIRED_CORE) && code.includes("KREDITKA_PLAN_WIDGET_V1")) {
          return code;
        }
      } catch (e) {}
    }
  }
  return "";
}

async function fetchCoreCode() {
  const req = new Request(CORE_URL + "?t=" + Date.now());
  req.timeoutInterval = 45;
  const code = await req.loadString();
  if (!code || code.length < 500 || code.trim().startsWith("<!")) {
    throw new Error("Пустой ответ GitHub");
  }
  if (!code.includes("KREDITKA_PLAN_WIDGET_V1") || !code.includes("async function main")) {
    throw new Error("Это не ядро виджета");
  }
  if (!code.includes(REQUIRED_CORE)) {
    throw new Error("Старое ядро, без v3.8");
  }
  return code;
}

function writeCore(code) {
  const names = ["KreditkaPlanCore.js", "KreditkaPlanCore38.js"];
  const fms = managers();
  for (let i = 0; i < fms.length; i++) {
    const fm = fms[i];
    for (let n = 0; n < names.length; n++) {
      const path = fm.joinPath(fm.documentsDirectory(), names[n]);
      try {
        if (fm.fileExists(path)) fm.remove(path);
      } catch (e) {}
      try {
        fm.writeString(path, code);
      } catch (e) {}
    }
  }
}

async function loadCore(code) {
  const moduleObj = { exports: {} };
  const fn = new Function(
    "module",
    "exports",
    "return (async function () {\n" + code + "\nreturn module.exports;\n})();"
  );
  const core = await fn(moduleObj, moduleObj.exports);
  if (!core || typeof core.main !== "function") {
    throw new Error("Ядро без main()");
  }
  return core;
}

function failWidget(err) {
  const w = new ListWidget();
  w.backgroundColor = new Color("#3B0D0D");
  const t = w.addText("KreditkaPlan: " + String(err));
  t.textColor = Color.white();
  t.font = Font.systemFont(11);
  Script.setWidget(w);
  Script.complete();
}

let coreCode = "";
try {
  try {
    coreCode = await fetchCoreCode();
    writeCore(coreCode);
  } catch (netErr) {
    coreCode = await readExistingCore();
    if (!coreCode) throw netErr;
  }
} catch (e) {
  if (config.runsInWidget) {
    failWidget(e);
    return;
  }
  const a = new Alert();
  a.title = "Нужен новый KreditkaPlan.js";
  a.message =
    String(e) +
    "\n\nСотри весь код этого скрипта и вставь LOADER 3.8 (в начале должно быть const LOADER_38 = true).\nЛибо открой скрипт KreditkaPlanCore и нажми Play.";
  a.addAction("OK");
  await a.presentAlert();
  return;
}

const core = await loadCore(coreCode);
await core.main();
