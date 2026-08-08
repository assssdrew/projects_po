# English Word Widget (Kids)

Детское native-приложение: английское слово на Home Screen для ребёнка ~10 лет.

**Не путать** с `../vocab-iphone-widget/` (Scriptable, взрослый словарь 948 слов).

## Стек

- Swift / SwiftUI / WidgetKit
- `data/words.json` + SF Symbols (WikiVoc — где есть)
- Цель: iOS 17+ код; установка на iOS 26.x — на современном Mac/Xcode

## Открыть проект

```
app/EnglishWordKids/EnglishWordKids.xcodeproj
```

Инструкция: [`app/EnglishWordKids/README.md`](app/EnglishWordKids/README.md).

## Визуальная стратегия

1. WikiVoc SVG, если есть ясное совпадение  
2. Иначе SF Symbol  
Сейчас: **6** WikiVoc / **294** SF Symbol → `data/image_coverage.md`

## Структура

```
english-word-widget-kids/
  data/words.json
  data/images/wikivoc/
  app/EnglishWordKids/          ← Xcode app + widget
  app/prototypes/               ← старые черновики
  scripts/build_words_json.py
  scripts/generate_xcodeproj.py
  scripts/sync_words_into_app.sh
  docs/PROJECT_HANDOFF.md
```

## Возможности MVP

- Виджет Small: symbol + EN + RU  
- Виджет Medium: + произношение + день курса  
- App: сегодняшние 10 слов, карточка с TTS, обзор 30 дней  
- Автосмена слова каждые 2 часа; день курса циклом 1…30  

## Ещё нет

- 300 единых иллюстраций  
- «Знаю / повторить» и spaced repetition  
- Реальная установка на iPhone (нужен Mac)
