# Прототип: слово на iPhone (пассивный виджет)

## Идея
Слово всегда на виду (домашний экран / блокировка).  
Без кнопок и без переходов в Scriptable для учёбы.

## Логика
- Показ: en + phonetic + ru
- Автосмена каждые **4 часа** (`ROTATE_HOURS`)
- ▶ Play — только редко: следующее / озвучка / история / сброс

## Файлы
- `projects/vocab-iphone-widget/WordOfDay.js` — короткий bootstrap
- `projects/vocab-iphone-widget/WordOfDayCore.js` — словарь + логика
- `notes/vocabulary_full.md` — исходный словарь
