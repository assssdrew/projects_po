// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: credit-card;
//
// Замени ВЕСЬ код скрипта KreditkaPlan → ▶ Play.
// Успех: меню «Кредитка · матрица · v2.2».

const CORE_URLS = [
  "https://raw.githubusercontent.com/assssdrew/projects_po/cursor/tbank-platinum-handoff-231e/projects/kreditka-plan-widget/KreditkaPlanCore.js",
  "https://cdn.jsdelivr.net/gh/assssdrew/projects_po@cursor/tbank-platinum-handoff-231e/projects/kreditka-plan-widget/KreditkaPlanCore.js",
  "https://raw.githubusercontent.com/assssdrew/projects_po/main/projects/kreditka-plan-widget/KreditkaPlanCore.js",
  "https://cdn.jsdelivr.net/gh/assssdrew/projects_po@main/projects/kreditka-plan-widget/KreditkaPlanCore.js",
];

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
const corePath = fm.joinPath(fm.documentsDirectory(), "KreditkaPlanCore.js");

async function fetchCoreCode() {
  let lastError = null;
  for (const base of CORE_URLS) {
    try {
      const req = new Request(base + (base.includes("?") ? "&" : "?") + "t=" + Date.now());
      req.timeoutInterval = 45;
      const code = await req.loadString();
      if (
        code &&
        code.length > 500 &&
        !code.trim().startsWith("<!") &&
        code.includes("KREDITKA_PLAN_WIDGET_V1") &&
        code.includes("compute")
      ) {
        return code;
      }
      lastError = new Error("Старый/пустой ответ: " + base);
    } catch (e) {
      lastError = e;
    }
  }
  throw lastError || new Error("Не удалось скачать ядро");
}

async function downloadCore() {
  const code = await fetchCoreCode();
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
  if (!config.runsInWidget || !fm.fileExists(corePath)) {
    await downloadCore();
    return;
  }
  const local = fm.readString(corePath) || "";
  if (!local.includes("KREDITKA_PLAN_WIDGET_V1") || !local.includes("CORE_VERSION = \"2.2\"")) {
    await downloadCore();
  }
}

try {
  await ensureCore();
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
  a.message = String(e);
  a.addAction("OK");
  await a.presentAlert();
  return;
}

const core = importModule("KreditkaPlanCore");
await core.main();
