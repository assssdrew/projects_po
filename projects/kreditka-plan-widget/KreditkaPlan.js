// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: credit-card;
//
// Замени ВЕСЬ код скрипта KreditkaPlan (Select All → Paste) → ▶ Play.
// Успех: в подзаголовке v3.2. Если видишь старую версию — закрой Scriptable
// свайпом из App Switcher и Play ещё раз.

const REQUIRED_CORE = "CORE_VERSION = \"3.2\"";
const CORE_MODULE = "KreditkaPlanCore32";

const CORE_URLS = [
  "https://raw.githubusercontent.com/assssdrew/projects_po/cursor/tbank-platinum-handoff-231e/projects/kreditka-plan-widget/KreditkaPlanCore.js",
  "https://cdn.jsdelivr.net/gh/assssdrew/projects_po@cursor/tbank-platinum-handoff-231e/projects/kreditka-plan-widget/KreditkaPlanCore.js",
];

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

function corePaths() {
  const names = [CORE_MODULE + ".js", "KreditkaPlanCore.js"];
  const paths = [];
  const fms = managers();
  for (let i = 0; i < fms.length; i++) {
    const fm = fms[i];
    for (let n = 0; n < names.length; n++) {
      paths.push({ fm: fm, path: fm.joinPath(fm.documentsDirectory(), names[n]) });
    }
  }
  return paths;
}

async function fetchCoreCode() {
  let lastError = null;
  for (let i = 0; i < CORE_URLS.length; i++) {
    const base = CORE_URLS[i];
    try {
      const req = new Request(base + (base.includes("?") ? "&" : "?") + "t=" + Date.now());
      req.timeoutInterval = 45;
      const code = await req.loadString();
      if (!code || code.length < 500 || code.trim().startsWith("<!")) {
        lastError = new Error("Пустой ответ: " + base);
        continue;
      }
      if (!code.includes("KREDITKA_PLAN_WIDGET_V1") || !code.includes("compute")) {
        lastError = new Error("Это не ядро виджета: " + base);
        continue;
      }
      if (!code.includes(REQUIRED_CORE)) {
        lastError = new Error("Старое ядро, без " + REQUIRED_CORE);
        continue;
      }
      return code;
    } catch (e) {
      lastError = e;
    }
  }
  throw lastError || new Error("Не удалось скачать ядро v3.2");
}

function writeCore(code) {
  const paths = corePaths();
  for (let i = 0; i < paths.length; i++) {
    const p = paths[i];
    try {
      if (p.fm.fileExists(p.path)) p.fm.remove(p.path);
    } catch (e) {}
    try {
      p.fm.writeString(p.path, code);
    } catch (e) {}
  }
}

function loadCore(code) {
  const moduleObj = { exports: {} };
  const fn = new Function(
    "module",
    "exports",
    code + "\nreturn module.exports;"
  );
  const core = fn(moduleObj, moduleObj.exports);
  if (!core || typeof core.main !== "function") {
    throw new Error("Ядро без main()");
  }
  return core;
}

let coreCode = "";
try {
  coreCode = await fetchCoreCode();
  writeCore(coreCode);
} catch (e) {
  if (config.runsInWidget) {
    const w = new ListWidget();
    w.backgroundColor = new Color("#3B0D0D");
    const t = w.addText("KreditkaPlan: " + String(e));
    t.textColor = Color.white();
    t.font = Font.systemFont(11);
    Script.setWidget(w);
    Script.complete();
    return;
  }
  const a = new Alert();
  a.title = "Обновление не удалось";
  a.message =
    String(e) +
    "\n\nСкопируй заново KreditkaPlan.js из GitHub (ветка cursor/tbank-platinum-handoff-231e) и закрой Scriptable из App Switcher.";
  a.addAction("OK");
  await a.presentAlert();
  return;
}

const core = loadCore(coreCode);
await core.main();
