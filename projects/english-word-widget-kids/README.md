# English Word Widget (Kids)

Детское native-приложение: английское слово на Home Screen для ребёнка ~10 лет.

**Не путать** с `../vocab-iphone-widget/` (Scriptable, взрослый словарь 948 слов).

## Стек

- Swift / SwiftUI / WidgetKit
- `data/words.json` + картинки Fluent/Twemoji
- Цель: iOS 17+ код; установка на iOS 26.x — на современном Mac/Xcode

## Картинки (бесплатно)

| Источник | Лицензия | Сколько |
|----------|----------|---------|
| [Fluent UI Emoji](https://github.com/microsoft/fluentui-emoji) | MIT | ~235 |
| [Twemoji](https://github.com/jdecked/twemoji) | CC BY 4.0 | ~65 |

Все **300** карточек с PNG. Обзор источников: `docs/IMAGE_SOURCES.md`.  
Файлы: `data/images/words/`, в приложении — `app/EnglishWordKids/Resources/WordImages.xcassets/`.

Перескачать:

```bash
python3 scripts/fetch_word_images.py
```

## Открыть проект

```
app/EnglishWordKids/EnglishWordKids.xcodeproj
```

Инструкция: [`app/EnglishWordKids/README.md`](app/EnglishWordKids/README.md).

## Возможности MVP

- Виджет Small / Medium с картинкой, EN, RU (+ произношение в Medium)
- App: сегодняшние 10 слов, карточка с TTS, обзор 30 дней
- Ротация слова каждые 2 часа; курс дней 1…30 циклом
