# Виджет «Кредитка · план» — Scriptable

Матрица погашения Т-Банк Платинум по **календарю** (VND → ₽).

## Ошибка `importModule("KreditkaPlanCore")`

На телефоне **старый** `KreditkaPlan.js` (в коде `CORE_URLS = {` и `importModule`). Scriptable не подхватывает только что скачанный модуль в том же запуске — отсюда `undefined is not an object`.

**Что сделать:** открой `KreditkaPlan` → **Select All** → удали всё → вставь **целиком** `KreditkaPlan.js` v3.8 (в начале есть `KREDITKA_STANDALONE = "3.8"`, **нет** `importModule`) → ▶ Play.

Либо создай скрипт `UpdateKreditkaPlan`, вставь `UpdateKreditkaPlan.js`, Play, затем полностью закрой Scriptable из App Switcher и открой `KreditkaPlan`.

## v3.8

- Один файл: весь расчёт и UI внутри `KreditkaPlan.js`, без `importModule`
- Дата: `20.09` или `2009` (= 20.09)
- Нет серого текста, галочки по две в ряд

## v3.0–3.7

Полный прокручиваемый экран (не «один экран без скролла»).

- 9 колонок: Дата, Что, Приход, Нал.расход, Снятие, Погаш, %, Нал, Долг
- Карточки: Σ погашения / Σ снятия / % за путь / хвост 29.09
- Галочки: +10к, школа ½, отложить байк, честная еда
- Свои суммы: расход / погашение / снятие / приход
- 25.08 автоматически кладёт **минималку ~8к**, остальное держит на школу

Рекомендация: `notes/plan-udobnoe-pogashenie.md`. Календарь: `notes/calendar-cashflow-rub.md`.

## Установка

1. Scriptable → скрипт `KreditkaPlan` → **весь** код из `KreditkaPlan.js` → ▶ **Play**
2. Экран: заголовок **Матрица · кредитка**. Страница **скроллится**.
3. Home Screen → Scriptable → Medium/Large

## Плитка

| Дата | Снятие | Погаш | Долг |

## Файлы

| Файл | Назначение |
|------|------------|
| `KreditkaPlan.js` | весь виджет (вставь этот файл) |
| `KreditkaPlanCore.js` | то же ядро, если открыть как отдельный скрипт |
| `UpdateKreditkaPlan.js` | перезаписывает `KreditkaPlan.js` с GitHub |
