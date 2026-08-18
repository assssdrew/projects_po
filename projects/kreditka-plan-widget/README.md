# Виджет «Кредитка · план» — Scriptable

Матрица погашения Т-Банк Платинум по **календарю** (VND → ₽).

История чата (UX-круги, версии, importModule): [`notes/chat-kreditka-widget-2026-08-18.md`](../../notes/chat-kreditka-widget-2026-08-18.md).

## Ошибка `importModule("KreditkaPlanCore")`

Это **загрузчик v1.0** (~100 строк, комментарий «меню Кредитка · план · v1.0», в конце `importModule`). Он скачивает ядро, но Scriptable не подхватывает файл в том же запуске.

Обход без копирования загрузчика: в списке скриптов открой **KreditkaPlanCore** (не KreditkaPlan) → ▶ Play.

Иначе: `KreditkaPlan` → Select All → вставь короткий `KreditkaPlan.js` (в начале `const LOADER_38 = true`, **нет** `importModule`) → Play.

## v3.8

- Короткий загрузчик без `importModule` (`new Function`)
- Дата: `20.09` или `2009` (= 20.09)
- Нет серого текста, галочки по две в ряд
- Школа 31.08, в конце таблицы — переплата %

## Установка

1. Scriptable → скрипт `KreditkaPlan` → **весь** код из `KreditkaPlan.js` → ▶ **Play**
2. Экран: заголовок **Матрица · кредитка**. Страница **скроллится**.
3. Home Screen → Scriptable → Medium/Large

## Плитка

| Дата | Снятие | Погаш | Долг |

## Файлы

| Файл | Назначение |
|------|------------|
| `KreditkaPlan.js` | короткий загрузчик v3.8 |
| `KreditkaPlanCore.js` | расчёт + плитка + окно (можно Play напрямую) |
| `UpdateKreditkaPlan.js` | перезаписывает оба файла с GitHub |
