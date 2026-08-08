# Image coverage (WikiVoc strategy)

## Reality check

На Wikimedia Commons у WikiVoc сейчас **очень маленький** каталог (~20 vocabulary SVG).  
Прямых совпадений с нашим курсом 300 слов почти нет.

Поэтому стратегия такая:

| Слой | Что используем |
|------|----------------|
| Есть ясный смысл | WikiVoc SVG (`visual.mode = wikivoc`) |
| Остальное | SF Symbol (`visual.mode = sf_symbol`) |

Текущие цифры после сборки: см. `image_coverage.json`.

## Уже сопоставлено (консервативно)

| Слово | WikiVoc файл |
|-------|----------------|
| idea / interesting / know | `WikiVoc-lightbulb.svg` |
| bathroom | `WikiVoc-toilet.svg` |
| fruit | `WikiVoc-banana.svg` |
| animal | `WikiVoc-otter.svg` |

Остальные скачанные WikiVoc SVG лежат в `images/wikivoc/` как референс стиля (axe, egg, watch…), но к карточкам не привязаны насильно.

## Как расширять покрытие

1. **Генерировать в стиле WikiVoc** по их шаблону промпта (белый фон, flat / super deformed) для недостающих слов из `image_plan_300.csv`.  
2. Класть новые файлы как `word_001.svg`… и менять `visual.mode` в `words.json`.  
3. Не подменять чужими случайными картинками из Google — стиль и лицензия разъедутся.
