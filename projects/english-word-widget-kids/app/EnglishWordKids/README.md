# EnglishWordKids (Xcode)

Native SwiftUI app + WidgetKit extension.

## Open on a Mac

1. Для **установки на iPhone с iOS 26** нужен современный Mac + актуальный Xcode.
2. Старый Xcode 13 (Big Sur) может **открыть** проект после downgrade формата, но **не соберёт** под iOS 26.
3. Открой `EnglishWordKids.xcodeproj` (File → Open), не создавай новый App.
4. Signing → Team для `EnglishWordKids` и `EnglishWordKidsWidget`.
5. Run на iPhone → Home Screen → Add Widget → **Слово дня**.

## Что внутри

| Target | Роль |
|--------|------|
| `EnglishWordKids` | приложение: Сегодня / Карточка / Все дни + TTS |
| `EnglishWordKidsWidget` | Home Screen виджет Small + Medium |

Общий код: `Shared/` (`WordStore`, `WordSchedule`, модели).  
Словарь: `Resources/words.json` (копия из `../../data/words.json`).

## Расписание

- Курс: 30 дней, цикл с якоря `2026-01-01`
- Внутри дня: ротация 10 слов каждые **2 часа**
- После дня 30 — снова с 1

## Синхронизация словаря

Из корня детского проекта:

```bash
bash scripts/sync_words_into_app.sh
```

Пересборка `project.pbxproj` (если менял список файлов):

```bash
python3 scripts/generate_xcodeproj.py
```

После перегенерации проверь shared scheme (UUID target’ов меняются).

## Ограничения этой среды

Собрать `.ipa` / установить на iPhone отсюда нельзя — нет macOS/Xcode.  
Исходники готовы к открытию на Mac.
