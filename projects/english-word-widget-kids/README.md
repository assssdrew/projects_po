# English Word Widget (Kids)

Детское native-приложение: английское слово на Home Screen для ребёнка ~10 лет.

**Не путать** с `../vocab-iphone-widget/` (Scriptable, взрослый словарь 948 слов).

## Стек

- Swift / SwiftUI / WidgetKit
- Локальный `words.json` + картинки в Assets
- Цель: iOS 26.x (нужен современный Mac + актуальный Xcode)

## Продукт

| Часть | Содержание |
|-------|------------|
| Виджет Small | картинка + EN + RU |
| Виджет Medium | картинка + EN + произношение + RU |
| Приложение | сегодняшние 10 слов, TTS, «знаю / повторить», обзор по дням |

Контент: **300 слов**, 30 дней × 10 слов/день, 30 тем.

## Структура папки

```
english-word-widget-kids/
  README.md
  docs/PROJECT_HANDOFF.md
  data/
    image_plan_300.csv     ✅ есть
    words.json             ❌ ещё нет
  app/
    prototypes/            ✅ ранние ContentView (SF Symbols + TTS)
    …                      ❌ полный Xcode/WidgetKit проект ещё нет
```

## Что уже в репо

| Артефакт | Статус |
|----------|--------|
| `data/image_plan_300.csv` | 300 строк, 30 дней × 10, план картинок |
| `app/prototypes/ContentView+List.swift` | список всех слов |
| `app/prototypes/ContentView+FlashcardTTS.swift` | карточка + en-US TTS + prev/next |
| `docs/PROJECT_HANDOFF.md` | полный handoff |

Прототипы ссылаются на `WordStore.words` и `item.symbol` (SF Symbols) — самих `WordStore`, `words.json` и картинок в репо нет.

## Замечания по CSV

- Структура дней/тем ровная: 30×10.
- ~20 слов повторяются в разных днях (`friend`, `play`, `question`…; `answer` — 3 раза). Для обучения это ок (recycling), для уникальных ассетов — решать: один файл на слово или отдельный `word_NNN` на каждую строку id.

## Чего не хватает (приоритет)

1. `words.json` (или полный v2/v3 пакет) — произношение, перевод, example, id ассета  
2. Картинки / `Assets.xcassets` (v3 zip — аудит)  
3. `WordStore` + WidgetKit-код  
4. Сборка на современном Mac под iOS 26.x  

Подробности и чеклист: `docs/PROJECT_HANDOFF.md`.
