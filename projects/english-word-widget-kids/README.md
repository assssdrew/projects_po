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

Контент: **300 слов**, 30 дней × 10 слов/день.

## Структура папки

```
english-word-widget-kids/
  README.md
  docs/PROJECT_HANDOFF.md   # полный handoff и чеклист
  data/                     # words.json, image plan, ассеты (когда появятся)
  app/                      # Xcode/SwiftUI проект (когда появится)
```

## Статус

1. Концепт — согласован (см. handoff)
2. Датасет / v3 zip с картинками — **нужен аудит**, файлы ещё не в репо
3. Сборка на устройстве — блокер: нужен Mac с актуальным Xcode

## Следующий шаг

Положить в `data/` артефакты (`words.json`, image plan CSV, или содержимое v3 zip) и провести аудит по `docs/PROJECT_HANDOFF.md`.
