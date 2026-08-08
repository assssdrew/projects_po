# Project Handoff — English Vocabulary iPhone Widget for a 10-Year-Old

> Репозиторий: `projects/english-word-widget-kids/`  
> Соседний, но другой продукт (Scriptable, взрослый): `projects/vocab-iphone-widget/`

## Goal
Build an iPhone Home Screen widget for a 10-year-old that keeps English vocabulary visible every day.

Each card/widget should show:
1. English word or phrase
2. Easy pronunciation for a Russian-speaking child
3. Russian translation
4. A thematic image that reinforces the meaning

Initial content target: **300 unique words/phrases, 30 days, 10 words/day**.

The final product should be a coherent child-friendly learning app, not merely a word list.

---

## Target platform

### iPhone
- User's iPhone: **iOS 26.6**
- Desired implementation: native **SwiftUI + WidgetKit**
- Widget sizes planned: **Small and Medium**

### Windows PC
User's main computer is Windows. It can be used for:
- vocabulary/data preparation;
- image preparation;
- project/code preparation;
- packaging.

Windows cannot perform the normal native iOS build because Xcode is macOS-only.

### Available Mac
- MacBook Pro 13-inch, Late 2013
- Intel Core i5 2.4 GHz dual-core
- 8 GB RAM
- Intel Iris 1536 MB
- macOS Big Sur 11.7.11

This Mac can run old Xcode versions, but it is **not an appropriate final toolchain for iOS 26.6**. Xcode 13.2.1 works with Big Sur but uses an old iOS SDK. Final iOS 26 development requires a much newer Xcode/macOS environment.

Possible final build options:
1. newer Mac;
2. cloud Mac;
3. another modern Mac;
4. unsupported legacy macOS upgrade only if absolutely necessary (not recommended as first choice).

The user asked about costs: initial personal development/testing does not necessarily require Apple Developer Program membership. Paid membership becomes relevant for distribution/App Store and some signing/distribution scenarios.

---

# Completed stages

## 1. Product concept — DONE
Agreed:
- iPhone Home Screen widget;
- English word;
- pronunciation;
- Russian translation;
- image;
- automatic changes;
- daily vocabulary structure.

## 2. 300-word dataset — DONE / VERIFY
A project package was created:
`EnglishWordWidget_v2_300words.zip`

Described contents:
- 300 words;
- 30 days;
- 10 words/day;
- separate themes;
- `words.json`;
- English word;
- Russian pronunciation;
- translation;
- example sentence;
- visual symbol;
- Small + Medium widgets;
- English US Text-to-Speech in the app;
- automatic daily word logic.

**Use the actual `words.json` as the source of truth. Do not recreate the list from memory.**

## 3. Image plan for 300 words — DONE
Generated:
`EnglishWordWidget_image_plan_300.csv`

Known path:
`/mnt/data/EnglishWordWidget_image_plan_300.csv`

It maps each item to:
- id;
- day;
- theme;
- word;
- image concept;
- visual style;
- image search query.

Examples:
- wake up → child waking up in bed
- breakfast → child eating breakfast
- school → child entering school
- friend → two children together
- football → children playing football
- dog → friendly dog
- passport → passport
- mountain → green mountain
- tired → tired child resting
- hungry → hungry child at kitchen table

## 4. Image-integrated v3 package — REPORTED DONE, MUST VERIFY
Previous archive:
`EnglishWordWidget_v3_300words_images.zip`

It was described as containing:
- 300 image assets;
- assets in `Assets.xcassets`;
- IDs `word_001` … `word_300`;
- widget code changed from SF Symbols to images;
- approximately 0.9 MB.

**Important: audit this archive before trusting the previous claim.**
Verify:
- all 300 assets actually exist;
- asset names match IDs;
- image files are valid;
- Swift references match asset names;
- project structure is coherent;
- it can theoretically compile.

Previous responses may have overstated completion. Verification is mandatory.

---

# Visual direction

Preferred final style:
- colorful;
- simple;
- child-friendly;
- one clear object/action;
- minimal background clutter;
- no unnecessary text inside images;
- consistent illustration style across all 300 images.

The widget should visually resemble one educational flashcard system rather than 300 unrelated internet images.

The existing images were described as MVP-quality. Inspect them before calling them final.

---

# Intended technical architecture

Native iOS:
- Swift
- SwiftUI
- WidgetKit
- local JSON vocabulary data
- local image assets

Conceptual flow:

`words.json`
→ choose word according to day/schedule
→ find matching image asset
→ render English + pronunciation + Russian translation + image
→ WidgetKit displays it

### App vs widget
Main app can provide:
- richer interaction;
- TTS;
- learning controls;
- progress;
- vocabulary browsing.

Widget should primarily display information. Do not assume unrestricted audio playback from the widget. A practical solution is tapping the widget to open the app, where the child can hear pronunciation.

---

# Current/future learning logic

Initial requirement:
- 30 days;
- 10 words/day;
- automatic changes.

The previous version was described as changing automatically once per day, but the final implementation should be reviewed.

Recommended model:
- each day has 10 target words;
- widget displays one word at a time;
- WidgetKit timeline controls scheduled updates;
- avoid assuming unlimited arbitrary refreshes.

Future learning enhancement:
- repeat previously learned words;
- prioritize difficult words;
- simple “I know / repeat” controls;
- eventually spaced repetition.

This repetition/mastery system is **NOT confirmed complete**.

---

# What remains

## 1. Audit the v3 package
First priority.

Inspect:
- project files;
- `words.json`;
- 300 assets;
- asset IDs;
- Swift/SwiftUI/WidgetKit source;
- build settings;
- image references.

## 2. Finalize image quality
If necessary, regenerate images into one consistent visual style.

## 3. Finalize widget UI
Suggested hierarchy:

### Small
- image
- English word
- Russian translation

### Medium
- image
- English word
- pronunciation
- Russian translation

Optional:
- Day 7 / 30
- progress indicator

Avoid overcrowding.

## 4. Implement robust scheduling
Define:
- daily 10-word set;
- widget rotation;
- timeline entries;
- fallback behavior;
- date handling;
- what happens after Day 30.

## 5. Improve main app
At minimum:
- today's 10 words;
- tap a word to hear pronunciation;
- mark “I know it”;
- repeat word;
- browse all 300 words by day.

## 6. Add simple local progress
Initial version can use local storage.
Possible future:
- spaced repetition;
- mastery score;
- review queue.

## 7. Build on a modern Mac
Need a Mac capable of running current Xcode and the iOS 26 SDK.

## 8. Real-device test
Test on the user's iPhone:
- installation;
- Small widget;
- Medium widget;
- image loading;
- English/Russian text;
- pronunciation;
- automatic changes;
- timeline updates;
- widget tap → app;
- iOS 26.6 compatibility.

---

# Desired final result

## Main iPhone app
A small English-learning app containing:
- 300 vocabulary items;
- 30 daily groups;
- 10 words/day;
- English;
- easy pronunciation;
- Russian translation;
- examples/context where useful;
- thematic illustration;
- pronunciation audio;
- learning progress;
- repetition.

## Home Screen widget
Always visible on the iPhone Home Screen.

Displays:
- English word;
- Russian pronunciation;
- Russian translation;
- relevant image.

Changes automatically according to the learning schedule.

Tapping it opens the main app.

## Visual result
The product should be:
- clean;
- colorful;
- simple;
- immediately understandable for a 10-year-old;
- consistent;
- not overloaded.

---

# Existing files

- `EnglishWordWidget_v2_300words.zip`
- `EnglishWordWidget_image_plan_300.csv`
- `EnglishWordWidget_v3_300words_images.zip`

The image plan CSV is known to exist at:
`/mnt/data/EnglishWordWidget_image_plan_300.csv`

Do not invent sandbox links to archives unless their exact paths are verified in the current runtime.

---

# Working style / continuation instructions

The user explicitly wants the assistant to move through the stages without repeatedly asking for approval.

Therefore:
- continue to the next logical stage when requirements are clear;
- avoid repeated “should I proceed?” questions;
- give concrete progress;
- if blocked, explain the blocker and give the next action.

The user wants practical execution rather than abstract discussion.

---

# Critical handoff warning

Earlier responses stated that the v3 package was implemented and contained 300 images. **That claim must be verified before relying on it.**

The next agent should prioritize:
1. inspect actual files;
2. identify what truly exists;
3. fix incomplete parts;
4. only then claim completion.

The ultimate objective is not a ZIP file. It is a **real, installable iPhone application with a working WidgetKit widget on iOS 26.6**.
