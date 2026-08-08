# English Word Widget (Kids)

Детское native-приложение: английское слово на Home Screen для ребёнка ~10 лет.

**Не путать** с `../vocab-iphone-widget/` (Scriptable, взрослый словарь 948 слов).

## Стек

- Swift / SwiftUI / WidgetKit
- Локальный `data/words.json` + SF Symbols / WikiVoc
- Цель: iOS 26.x (нужен современный Mac + актуальный Xcode)

## Визуальная стратегия (вариант WikiVoc)

1. Если есть ясное совпадение — картинка WikiVoc (Public Domain)  
2. Иначе — SF Symbol  
3. Позже можно догенерировать недостающие иллюстрации в стиле WikiVoc

Сейчас: **6** карточек на WikiVoc, **294** на SF Symbol.  
Подробности: `data/image_coverage.md`.

## Продукт

| Часть | Содержание |
|-------|------------|
| Виджет Small | картинка/symbol + EN + RU |
| Виджет Medium | + произношение |
| Приложение | 10 слов дня, TTS, обзор |

Контент: **300 слов**, 30×10, 30 тем.

## Структура

```
english-word-widget-kids/
  data/
    words.json                 ✅ словарь (EN/RU/pronunciation/example/visual)
    image_plan_300.csv         ✅ план картинок
    image_coverage.*           ✅ отчёт WikiVoc vs SF Symbol
    images/wikivoc/            ✅ скачанный маленький набор WikiVoc
    ATTRIBUTION_WIKIVOC.md
  app/prototypes/              ✅ ContentView + WordStore
  scripts/build_words_json.py  ✅ пересборка words.json
  docs/PROJECT_HANDOFF.md
```

## Чего ещё нет

- Полный Xcode / WidgetKit проект
- 300 единых иллюстраций (WikiVoc на Commons почти пустой)
- Сборка на современном Mac под iOS 26.x

## Пересборка словаря

```bash
python3 scripts/build_words_json.py
```
