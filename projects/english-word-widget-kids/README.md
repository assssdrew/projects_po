# English Word Widget (Kids)

Детское native-приложение: английское слово на Home Screen для ребёнка ~10 лет.

**Не путать** с `../vocab-iphone-widget/` (Scriptable, взрослый словарь 948 слов).

## Стек

- Swift / SwiftUI / WidgetKit
- `data/words.json` + картинки Fluent/Twemoji
- Цель: iOS 17+ код; установка на iOS 26.x — на современном Mac/Xcode

## Curriculum v2

- 30×10 = 300 карточек, **290 новых** слов + день 30 review  
- Добавлены: цвета, числа 1–10, дни недели, grandma/baby, zoo/farm, snow, предлоги, yes/no/can/have  
- Убраны ранние абстракции и лишние дубли  
- Заметки: [`data/CURRICULUM_V2_NOTES.md`](data/CURRICULUM_V2_NOTES.md)

```bash
python3 scripts/build_corrected_curriculum.py
python3 scripts/fetch_word_images.py
```

## Картинки (бесплатно)

| Источник | Лицензия | Роль |
|----------|----------|------|
| [Fluent UI Emoji](https://github.com/microsoft/fluentui-emoji) | MIT | основной |
| [Twemoji](https://github.com/jdecked/twemoji) | CC BY 4.0 | запасной |

Все **300** карточек с PNG. Обзор: `docs/IMAGE_SOURCES.md`.  
Файлы: `data/images/words/`, в app — `WordImages.xcassets/`.

## Открыть проект

```
app/EnglishWordKids/EnglishWordKids.xcodeproj
```

Инструкция: [`app/EnglishWordKids/README.md`](app/EnglishWordKids/README.md).

## Возможности MVP

- Виджет Small / Medium с картинкой, EN, RU (+ произношение в Medium)
- App: сегодняшние 10 слов, карточка с TTS, обзор 30 дней
- Ротация слова каждые 2 часа; курс дней 1…30 циклом
