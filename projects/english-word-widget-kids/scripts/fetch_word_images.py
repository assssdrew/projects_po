#!/usr/bin/env python3
"""Download free Fluent (MIT) / Twemoji (CC-BY) images for the 300-word kids set."""

from __future__ import annotations

import json
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WORDS_JSON = ROOT / "data" / "words.json"
OUT_DIR = ROOT / "data" / "images" / "words"
APP_ASSETS = ROOT / "app" / "EnglishWordKids" / "Resources" / "WordImages.xcassets"
FLUENT_INDEX = Path("/tmp/fluent_3d.json")
MANIFEST = ROOT / "data" / "images" / "words_manifest.json"
UA = {"User-Agent": "projects_po-english-word-widget/0.1 (educational)"}

# word -> Fluent UI Emoji asset folder name (exact)
FLUENT_MAP: dict[str, str] = {
    "breakfast": "Cooking",
    "school": "School",
    "friend": "People hugging",
    "play": "Jigsaw",
    "family": "Family",
    "mother": "Woman",
    "father": "Man",
    "brother": "Boy",
    "sister": "Girl",
    "parents": "Family man woman boy",
    "son": "Boy",
    "daughter": "Girl",
    "child": "Child",
    "together": "People holding hands",
    "teacher": "Teacher",
    "student": "Student",
    "book": "Closed book",
    "notebook": "Notebook",
    "pencil": "Pencil",
    "question": "Red question mark",
    "answer": "Speech balloon",
    "test": "Clipboard",
    "team": "People holding hands",
    "game": "Video game",
    "help": "Rescue worker’s helmet",
    "share": "Wrapped gift",
    "talk": "Speech balloon",
    "laugh": "Face with tears of joy",
    "fun": "Party popper",
    "go": "Person walking",
    "come": "Backhand index pointing left",
    "take": "Hand with fingers splayed",
    "give": "Open hands",
    "make": "Hammer and wrench",
    "get": "Inbox tray",
    "find": "Magnifying glass tilted left",
    "want": "Sparks",
    "need": "Exclamation mark",
    "like": "Thumbs up",
    "food": "Fork and knife with plate",
    "lunch": "Sandwich",
    "dinner": "Pot of food",
    "bread": "Bread",
    "rice": "Cooked rice",
    "meat": "Cut of meat",
    "fish": "Fish",
    "fruit": "Red apple",
    "vegetable": "Leafy green",
    "water": "Water wave",
    "milk": "Glass of milk",
    "juice": "Beverage box",
    "tea": "Teacup without handle",
    "sweet": "Shortcake",
    "salty": "Salt",
    "hot": "Hot beverage",
    "cold": "Cold face",
    "hungry": "Fork and knife",
    "thirsty": "Potable water",
    "house": "House",
    "room": "Door",
    "bedroom": "Bed",
    "kitchen": "Cook",
    "bathroom": "Toilet",
    "door": "Door",
    "window": "Window",
    "table": "Chair",
    "chair": "Chair",
    "bed": "Bed",
    "phone": "Mobile phone",
    "computer": "Laptop",
    "TV": "Television",
    "bag": "Handbag",
    "toy": "Teddy bear",
    "ball": "Soccer ball",
    "clothes": "T-shirt",
    "shoes": "Running shoe",
    "key": "Key",
    "happy": "Grinning face",
    "sad": "Crying face",
    "angry": "Angry face",
    "scared": "Fearful face",
    "excited": "Star-struck",
    "bored": "Sleeping face",
    "tired": "Sleepy face",
    "surprised": "Astonished face",
    "nervous": "Anxious face with sweat",
    "proud": "Relieved face",
    "football": "Soccer ball",
    "basketball": "Basketball",
    "tennis": "Tennis",
    "swimming": "Person swimming",
    "running": "Person running",
    "training": "Flexed biceps",
    "player": "Soccer ball",
    "coach": "Whistle",
    "win": "Trophy",
    "head": "Bust in silhouette",
    "face": "Slightly smiling face",
    "eye": "Eye",
    "ear": "Ear",
    "nose": "Nose",
    "mouth": "Mouth",
    "hand": "Raised hand",
    "leg": "Foot",
    "foot": "Foot",
    "hair": "Woman",
    "shirt": "Shirt",
    "T-shirt": "T-shirt",
    "trousers": "Jeans",
    "shorts": "Shorts",
    "jacket": "Coat",
    "socks": "Socks",
    "hat": "Top hat",
    "dress": "Dress",
    "wear": "T-shirt",
    "weather": "Sun behind cloud",
    "sunny": "Sun",
    "rainy": "Cloud with rain",
    "cloudy": "Cloud",
    "windy": "Leaf fluttering in wind",
    "warm": "Sun",
    "sky": "Sun behind large cloud",
    "rain": "Umbrella with rain drops",
    "tree": "Deciduous tree",
    "flower": "Sunflower",
    "grass": "Seedling",
    "river": "Water wave",
    "sea": "Water wave",
    "beach": "Beach with umbrella",
    "mountain": "Mountain",
    "forest": "National park",
    "animal": "Paw prints",
    "bird": "Bird",
    "dog": "Dog",
    "cat": "Cat",
    "horse": "Horse",
    "cow": "Cow",
    "elephant": "Elephant",
    "lion": "Lion",
    "tiger": "Tiger",
    "monkey": "Monkey",
    "rabbit": "Rabbit",
    "city": "Cityscape",
    "street": "Motorway",
    "road": "Motorway",
    "shop": "Department store",
    "park": "National park",
    "hospital": "Hospital",
    "restaurant": "Fork and knife with plate",
    "market": "Shopping cart",
    "building": "Office building",
    "car": "Automobile",
    "bus": "Bus",
    "train": "Train",
    "plane": "Airplane",
    "bicycle": "Bicycle",
    "motorbike": "Motorcycle",
    "taxi": "Oncoming taxi",
    "airport": "Airplane departure",
    "station": "Station",
    "ticket": "Ticket",
    "travel": "Airplane",
    "trip": "World map",
    "country": "Globe showing Europe-Africa",
    "hotel": "Hotel",
    "passport": "Passport control",
    "suitcase": "Luggage",
    "today": "Calendar",
    "tomorrow": "Tear-off calendar",
    "yesterday": "Calendar",
    "morning": "Sunrise",
    "afternoon": "Sun",
    "evening": "Sunset",
    "night": "Night with stars",
    "week": "Calendar",
    "month": "Spiral calendar",
    "year": "Calendar",
    "big": "Elephant",
    "small": "Mouse",
    "long": "Straight ruler",
    "short": "Straight ruler",
    "good": "Thumbs up",
    "bad": "Thumbs down",
    "new": "Sparkles",
    "old": "Older person",
    "easy": "Check mark button",
    "difficult": "Cross mark",
    "beautiful": "Sparkles",
    "interesting": "Light bulb",
    "boring": "Sleeping face",
    "funny": "Face with tears of joy",
    "fast": "Rabbit",
    "slow": "Turtle",
    "strong": "Flexed biceps",
    "weak": "Droplet",
    "clean": "Soap",
    # dirty: use Twemoji sponge (Fluent "Pile of poo" is unsuitable for kids)
    "say": "Speaking head",
    "tell": "Speech balloon",
    "ask": "Red question mark",
    "speak": "Speaking head",
    "listen": "Ear",
    "hear": "Ear",
    "read": "Open book",
    "write": "Memo",
    "understand": "Light bulb",
    "think": "Thinking face",
    "know": "Light bulb",
    "remember": "Brain",
    "forget": "Face with crossed-out eyes",
    "learn": "Graduation cap",
    "teach": "Teacher",
    "try": "Flexed biceps",
    "start": "Play button",
    "finish": "Chequered flag",
    "hello": "Waving hand",
    "goodbye": "Waving hand",
    "please": "Folded hands",
    "thanks": "Folded hands",
    "sorry": "Pensive face",
    "excuse me": "Raised hand",
    "welcome": "House with garden",
    "sure": "OK hand",
    "maybe": "Thinking face",
    "really": "Astonished face",
    "open": "Open file folder",
    "close": "Locked",
    "buy": "Shopping cart",
    "sell": "Shopping bags",
    "bring": "Package",
    "put": "Inbox tray",
    "keep": "Locked with key",
    "lose": "Disappointed face",
    "thing": "Package",
    "place": "Round pushpin",
    "person": "Person",
    "time": "Alarm clock",
    "day": "Sun",
    "way": "Motorway",
    "problem": "Warning",
    "idea": "Light bulb",
    "wake up": "Alarm clock",
    "get up": "Person getting out of bed",
    "wash": "Soap",
    "get dressed": "T-shirt",
    "lesson": "Books",
    "homework": "Memo",
    "class": "School",
    "subject": "Books",
    "Come here.": "Backhand index pointing left",
    "Wait a minute.": "Hourglass not done",
    "Let's go.": "Person running",
    "I don't know.": "Shrugging",
    "I don't understand.": "Thinking face",
    "Can you help me?": "Raised hand",
    "What is this?": "Red question mark",
    "Where is it?": "Round pushpin",
    "What happened?": "Exclamation mark",
    "Are you OK?": "OK hand",
    "what": "Red question mark",
    "who": "Bust in silhouette",
    "where": "Round pushpin",
    "when": "Alarm clock",
    "why": "Red question mark",
    "how": "Red question mark",
    "which": "Red question mark",
    "whose": "Bust in silhouette",
    "how much": "Money bag",
    "how many": "Input numbers",
    "I think so.": "Thinking face",
    "I don't think so.": "Face with rolling eyes",
    "I like it.": "Thumbs up",
    "I don't like it.": "Thumbs down",
    "I'm hungry.": "Fork and knife",
    "I'm tired.": "Sleepy face",
    "I'm ready.": "Check mark button",
    "I'm not ready.": "Hourglass not done",
    "It's OK.": "OK hand",
    "That's great!": "Star-struck",
}

# word -> emoji character for Twemoji fallback
EMOJI_MAP: dict[str, str] = {
    "wake up": "⏰",
    "get up": "🛏️",
    "wash": "🧼",
    "get dressed": "👕",
    "breakfast": "🍳",
    "school": "🏫",
    "lesson": "📚",
    "homework": "📝",
    "friend": "👫",
    "play": "🎮",
    "family": "👨‍👩‍👧‍👦",
    "mother": "👩",
    "father": "👨",
    "brother": "👦",
    "sister": "👧",
    "parents": "👨‍👩‍👧",
    "son": "👦",
    "daughter": "👧",
    "child": "🧒",
    "together": "🤝",
    "teacher": "👩‍🏫",
    "student": "🧑‍🎓",
    "class": "🏫",
    "subject": "📘",
    "book": "📖",
    "notebook": "📓",
    "pencil": "✏️",
    "question": "❓",
    "answer": "💬",
    "test": "📋",
    "team": "👥",
    "game": "🎲",
    "help": "🆘",
    "share": "🎁",
    "talk": "🗣️",
    "laugh": "😂",
    "fun": "🎉",
    "go": "🚶",
    "come": "👈",
    "take": "🖐️",
    "give": "🤲",
    "make": "🛠️",
    "get": "📥",
    "find": "🔍",
    "want": "✨",
    "need": "❗",
    "like": "👍",
    "food": "🍽️",
    "lunch": "🥪",
    "dinner": "🍲",
    "bread": "🍞",
    "rice": "🍚",
    "meat": "🥩",
    "fish": "🐟",
    "fruit": "🍎",
    "vegetable": "🥬",
    "water": "💧",
    "milk": "🥛",
    "juice": "🧃",
    "tea": "🍵",
    "sweet": "🍰",
    "salty": "🧂",
    "hot": "🥵",
    "cold": "🥶",
    "hungry": "😋",
    "thirsty": "🥤",
    "house": "🏠",
    "room": "🚪",
    "bedroom": "🛏️",
    "kitchen": "👩‍🍳",
    "bathroom": "🚽",
    "door": "🚪",
    "window": "🪟",
    "table": "🪑",
    "chair": "🪑",
    "bed": "🛏️",
    "phone": "📱",
    "computer": "💻",
    "TV": "📺",
    "bag": "👜",
    "toy": "🧸",
    "ball": "⚽",
    "clothes": "👕",
    "shoes": "👟",
    "key": "🔑",
    "happy": "😄",
    "sad": "😢",
    "angry": "😠",
    "scared": "😨",
    "excited": "🤩",
    "bored": "😑",
    "tired": "😴",
    "surprised": "😲",
    "nervous": "😰",
    "proud": "😌",
    "football": "⚽",
    "basketball": "🏀",
    "tennis": "🎾",
    "swimming": "🏊",
    "running": "🏃",
    "training": "💪",
    "player": "⚽",
    "coach": "🧢",
    "win": "🏆",
    "head": "🙂",
    "face": "😊",
    "eye": "👁️",
    "ear": "👂",
    "nose": "👃",
    "mouth": "👄",
    "hand": "✋",
    "leg": "🦵",
    "foot": "🦶",
    "hair": "💇",
    "shirt": "👔",
    "T-shirt": "👕",
    "trousers": "👖",
    "shorts": "🩳",
    "jacket": "🧥",
    "socks": "🧦",
    "hat": "🎩",
    "dress": "👗",
    "wear": "👕",
    "weather": "🌤️",
    "sunny": "☀️",
    "rainy": "🌧️",
    "cloudy": "☁️",
    "windy": "💨",
    "warm": "🌞",
    "sky": "🌌",
    "rain": "☔",
    "tree": "🌳",
    "flower": "🌻",
    "grass": "🌱",
    "river": "🏞️",
    "sea": "🌊",
    "beach": "🏖️",
    "mountain": "⛰️",
    "forest": "🌲",
    "animal": "🐾",
    "bird": "🐦",
    "dog": "🐶",
    "cat": "🐱",
    "horse": "🐴",
    "cow": "🐮",
    "elephant": "🐘",
    "lion": "🦁",
    "tiger": "🐯",
    "monkey": "🐵",
    "rabbit": "🐰",
    "city": "🏙️",
    "street": "🛣️",
    "road": "🛤️",
    "shop": "🛍️",
    "park": "🏞️",
    "hospital": "🏥",
    "restaurant": "🍽️",
    "market": "🛒",
    "building": "🏢",
    "car": "🚗",
    "bus": "🚌",
    "train": "🚆",
    "plane": "✈️",
    "bicycle": "🚲",
    "motorbike": "🏍️",
    "taxi": "🚕",
    "airport": "🛫",
    "station": "🚉",
    "ticket": "🎫",
    "travel": "✈️",
    "trip": "🗺️",
    "country": "🌍",
    "hotel": "🏨",
    "passport": "🛂",
    "suitcase": "🧳",
    "today": "📅",
    "tomorrow": "📆",
    "yesterday": "🗓️",
    "morning": "🌅",
    "afternoon": "☀️",
    "evening": "🌇",
    "night": "🌃",
    "week": "📅",
    "month": "🗓️",
    "year": "🎆",
    "big": "🐘",
    "small": "🐭",
    "long": "📏",
    "short": "📐",
    "good": "👍",
    "bad": "👎",
    "new": "🆕",
    "old": "🧓",
    "easy": "✅",
    "difficult": "❌",
    "beautiful": "✨",
    "interesting": "💡",
    "boring": "😐",
    "funny": "😂",
    "fast": "🐇",
    "slow": "🐢",
    "strong": "💪",
    "weak": "🫠",
    "clean": "🧼",
    "dirty": "🧽",  # preferred over Fluent "Pile of poo"
    "say": "🗣️",
    "tell": "💬",
    "ask": "❓",
    "speak": "🗣️",
    "listen": "👂",
    "hear": "👂",
    "read": "📖",
    "write": "✍️",
    "understand": "💡",
    "think": "🤔",
    "know": "💡",
    "remember": "🧠",
    "forget": "😵",
    "learn": "🎓",
    "teach": "👩‍🏫",
    "try": "💪",
    "start": "▶️",
    "finish": "🏁",
    "hello": "👋",
    "goodbye": "👋",
    "please": "🙏",
    "thanks": "🙏",
    "sorry": "😔",
    "excuse me": "🙋",
    "welcome": "🏡",
    "sure": "👌",
    "maybe": "🤷",
    "really": "😮",
    "open": "📂",
    "close": "🔒",
    "buy": "🛒",
    "sell": "🛍️",
    "bring": "📦",
    "put": "📥",
    "keep": "🔐",
    "lose": "😞",
    "thing": "📦",
    "place": "📍",
    "person": "🧑",
    "time": "⏰",
    "day": "☀️",
    "way": "➡️",
    "problem": "⚠️",
    "idea": "💡",
    "Come here.": "👈",
    "Wait a minute.": "⏳",
    "Let's go.": "🏃",
    "I don't know.": "🤷",
    "I don't understand.": "🤔",
    "Can you help me?": "🙋",
    "What is this?": "❓",
    "Where is it?": "📍",
    "What happened?": "❗",
    "Are you OK?": "👌",
    "what": "❓",
    "who": "👤",
    "where": "📍",
    "when": "⏰",
    "why": "❓",
    "how": "❓",
    "which": "❓",
    "whose": "👤",
    "how much": "💰",
    "how many": "🔢",
    "I think so.": "🤔",
    "I don't think so.": "🙄",
    "I like it.": "👍",
    "I don't like it.": "👎",
    "I'm hungry.": "🍽️",
    "I'm tired.": "😴",
    "I'm ready.": "✅",
    "I'm not ready.": "⏳",
    "It's OK.": "👌",
    "That's great!": "🤩",
}


def http_get(url: str, retries: int = 5) -> bytes:
    last: Exception | None = None
    for i in range(retries):
        try:
            req = urllib.request.Request(url, headers=UA)
            with urllib.request.urlopen(req, timeout=60) as r:
                return r.read()
        except Exception as e:  # noqa: BLE001
            last = e
            time.sleep(1.5 * (i + 1))
    raise RuntimeError(f"GET failed {url}: {last}")


def emoji_codepoint(emoji: str) -> str:
    # Twemoji file names use lowercase hex codepoints joined by '-'
    # strip VS16 FE0F when alone after base for many files
    cps = [f"{ord(c):x}" for c in emoji]
    name = "-".join(cps)
    return name


def twemoji_urls(emoji: str) -> list[str]:
    code = emoji_codepoint(emoji)
    # try with and without fe0f
    codes = [code]
    if code.endswith("-fe0f"):
        codes.append(code[: -len("-fe0f")])
    if "-fe0f-" in code:
        codes.append(code.replace("-fe0f-", "-"))
    urls = []
    for c in codes:
        urls.append(f"https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/72x72/{c}.png")
        urls.append(f"https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/{c}.svg")
    return urls


def load_fluent_index() -> dict[str, str]:
    if FLUENT_INDEX.exists():
        return json.loads(FLUENT_INDEX.read_text())
    raw = http_get("https://api.github.com/repos/microsoft/fluentui-emoji/git/trees/main?recursive=1")
    tree = json.loads(raw)["tree"]
    pngs = {}
    for t in tree:
        p = t["path"]
        if p.startswith("assets/") and p.endswith("_3d.png"):
            parts = p.split("/")
            if len(parts) >= 4:
                pngs[parts[1]] = p
    FLUENT_INDEX.write_text(json.dumps(pngs, indent=2), encoding="utf-8")
    return pngs


def download_fluent(folder: str, dest: Path, index: dict[str, str]) -> bool:
    rel = index.get(folder)
    if not rel:
        # case-insensitive search
        for k, v in index.items():
            if k.lower() == folder.lower():
                rel = v
                break
    if not rel:
        return False
    url = "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/" + urllib.parse.quote(
        rel, safe="/"
    )
    dest.write_bytes(http_get(url))
    return dest.stat().st_size > 100


def download_twemoji(emoji: str, dest: Path) -> bool:
    try:
        import cairosvg  # type: ignore
    except Exception:
        cairosvg = None

    for url in twemoji_urls(emoji):
        try:
            data = http_get(url)
        except Exception:
            continue
        if url.endswith(".png") and data[:8].startswith(b"\x89PNG"):
            dest.write_bytes(data)
            return True
        if url.endswith(".svg") and cairosvg is not None and data.lstrip().startswith(b"<"):
            cairosvg.svg2png(bytestring=data, write_to=str(dest), output_width=256)
            return dest.exists() and dest.stat().st_size > 100
    return False


def write_imageset(asset_id: str, png_bytes: bytes) -> None:
    iset = APP_ASSETS / f"{asset_id}.imageset"
    iset.mkdir(parents=True, exist_ok=True)
    (iset / f"{asset_id}.png").write_bytes(png_bytes)
    (iset / "Contents.json").write_text(
        json.dumps(
            {
                "images": [
                    {"filename": f"{asset_id}.png", "idiom": "universal", "scale": "1x"},
                    {"idiom": "universal", "scale": "2x"},
                    {"idiom": "universal", "scale": "3x"},
                ],
                "info": {"author": "xcode", "version": 1},
            },
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    APP_ASSETS.mkdir(parents=True, exist_ok=True)
    (APP_ASSETS / "Contents.json").write_text(
        json.dumps({"info": {"author": "xcode", "version": 1}}, indent=2) + "\n",
        encoding="utf-8",
    )

    payload = json.loads(WORDS_JSON.read_text(encoding="utf-8"))
    fluent_index = load_fluent_index()
    manifest = []
    stats = {"fluent": 0, "twemoji": 0, "none": 0}

    for item in payload["words"]:
        wid = int(item["id"])
        word = item["word"]
        asset_id = item["asset_id"]
        dest = OUT_DIR / f"{asset_id}.png"
        source = None
        detail = None

        folder = FLUENT_MAP.get(word)
        if folder and download_fluent(folder, dest, fluent_index):
            source = "fluent"
            detail = folder
            stats["fluent"] += 1
        else:
            emoji = EMOJI_MAP.get(word)
            if emoji and download_twemoji(emoji, dest):
                source = "twemoji"
                detail = emoji
                stats["twemoji"] += 1
            else:
                source = None
                stats["none"] += 1

        if source:
            png_bytes = dest.read_bytes()
            write_imageset(asset_id, png_bytes)
            item["visual"] = {
                "mode": "image",
                "sf_symbol": item["visual"].get("sf_symbol", "textformat"),
                "image_file": f"WordImages.xcassets/{asset_id}.imageset/{asset_id}.png",
                "wikivoc_file": None,
                "image_source": source,
                "image_detail": detail,
            }
        else:
            item["visual"] = {
                "mode": "sf_symbol",
                "sf_symbol": item["visual"].get("sf_symbol", "textformat"),
                "image_file": None,
                "wikivoc_file": None,
                "image_source": None,
                "image_detail": None,
            }

        manifest.append(
            {
                "id": wid,
                "word": word,
                "asset_id": asset_id,
                "source": source,
                "detail": detail,
                "file": f"{asset_id}.png" if source else None,
            }
        )
        print(f"{asset_id:10} {word:22} -> {source or 'NONE':8} {detail or ''}")
        time.sleep(0.05)

    payload["visual_strategy"] = "fluent_3d_then_twemoji_then_sf_symbol"
    payload["attribution"] = {
        "fluent_ui_emoji": {
            "source": "https://github.com/microsoft/fluentui-emoji",
            "license": "MIT",
            "credit": "Fluent Emoji by Microsoft (MIT)",
        },
        "twemoji": {
            "source": "https://github.com/jdecked/twemoji",
            "license": "CC-BY 4.0 (graphics), MIT (code)",
            "credit": "Twemoji graphics © Twitter/jdecked, CC-BY 4.0",
        },
    }
    WORDS_JSON.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    MANIFEST.write_text(json.dumps({"stats": stats, "items": manifest}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    app_words = ROOT / "app" / "EnglishWordKids" / "Resources" / "words.json"
    app_words.write_text(WORDS_JSON.read_text(encoding="utf-8"), encoding="utf-8")

    print("STATS", stats)
    print("Wrote", WORDS_JSON, MANIFEST, APP_ASSETS)


if __name__ == "__main__":
    main()
