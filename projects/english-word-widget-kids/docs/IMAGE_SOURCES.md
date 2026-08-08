# Бесплатные источники картинок

Для детского виджета нужны: бесплатно, можно в приложение, желательно единый стиль.

## Выбрано для проекта

| Источник | Лицензия | Стиль | Роль |
|----------|----------|-------|------|
| **[Fluent UI Emoji](https://github.com/microsoft/fluentui-emoji)** (Microsoft) | MIT | цветные 3D PNG | основной |
| **[Twemoji](https://github.com/jdecked/twemoji)** | CC-BY 4.0 (графика) | плоские emoji | запасной |
| SF Symbols | системные Apple | иконки | если нет картинки |

Атрибуция: `data/ATTRIBUTION_IMAGES.md`.

## Другие бесплатные варианты (не взяли сейчас)

| Источник | Лицензия | Почему не основной |
|----------|----------|--------------------|
| [OpenMoji](https://openmoji.org/) | CC BY-SA 4.0 | ShareAlike неудобнее для app |
| [WikiVoc](https://commons.wikimedia.org/wiki/Commons:WikiVoc) | PD | мало файлов, качество разное |
| [savage](https://github.com/joshnishikawa/savage) | open (см. repo) | ~76 совпадений из 300, стиль «hand-drawn» |
| Wikimedia Commons | разная | стиль пляшет, лицензии разные |
| Pixabay / Pexels | свои ToS | фото, не единый flashcard-стиль |
| Flaticon free | атрибуция / лимиты | часто нельзя без аккаунта/атрибуции в UI |
| Clker / CC0 clipart | CC0 | хаотичный стиль |

## Как обновлять картинки

```bash
python3 scripts/fetch_word_images.py
bash scripts/sync_words_into_app.sh
```
