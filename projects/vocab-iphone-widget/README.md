# Виджет «Слово» — Scriptable (взрослый)

Пассивный Home Screen виджет на **Scriptable**: одно английское слово + перевод.

**Не путать** с `../english-word-widget-kids/` (native SwiftUI/WidgetKit для ребёнка, 300 слов + картинки).

## Поведение (v5)

- Одно английское слово (крупно) + перевод
- Подвал: `номер/всего | 3h 42m` — обратный отсчёт до смены
- Смена каждые 4 часа
- Фон прозрачный

## Файлы

| Файл | Назначение |
|------|------------|
| `WordOfDay.js` | короткий bootstrap для Scriptable |
| `WordOfDayCore.js` | словарь + логика |
| `vocabulary.json` | словарь (~948) |
| `UpdateWordOfDay.js` | обновление |

Словарь/заметки: `notes/vocabulary_full.md`, `notes/vocab_app_mvp.md`.

## Обновить

Замени код `WordOfDay` → ▶ Play  
Проверка подвала: `2/948 | 3h 42m` (минуты должны быть видны)
