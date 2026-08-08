# App

## prototypes/

| Файл | Назначение |
|------|------------|
| `WordStore.swift` | читает `words.json` из бандла; даёт `symbol` для старых ContentView |
| `ContentView+FlashcardTTS.swift` | карточка + TTS (база app UI) |
| `ContentView+List.swift` | список словаря |

В Xcode нужно добавить в target: `data/words.json` (+ позже WikiVoc SVG при `visual.mode == wikivoc`).

Полного `.xcodeproj` в репо пока нет.
