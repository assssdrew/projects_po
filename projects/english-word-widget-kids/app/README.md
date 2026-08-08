# App

## prototypes/

Ранние экраны приложения (ещё не полный Xcode-проект):

| Файл | Что делает |
|------|------------|
| `ContentView+List.swift` | `List` по `WordStore.words`: symbol + word + pronunciation + translation |
| `ContentView+FlashcardTTS.swift` | одна карточка, AVSpeech en-US, Prev/Next, example |

Оба варианта используют **SF Symbols** (`Image(systemName:)`), не тематические картинки.

Зависимости, которых пока нет в репо:
- `WordStore` / модель слова
- `words.json` в бандле
- WidgetKit-таргет
- ассеты `word_001`…`word_300`

Не смешивать с Scriptable-кодом из `projects/vocab-iphone-widget/`.
