#!/usr/bin/env python3
"""Download Fluent (MIT) / Twemoji (CC-BY) images using curriculum hints."""

from __future__ import annotations

import json
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WORDS_JSON = ROOT / "data" / "words.json"
HINTS_JSON = ROOT / "data" / "image_hints_v2.json"
OUT_DIR = ROOT / "data" / "images" / "words"
APP_ASSETS = ROOT / "app" / "EnglishWordKids" / "Resources" / "WordImages.xcassets"
FLUENT_INDEX = Path("/tmp/fluent_3d.json")
MANIFEST = ROOT / "data" / "images" / "words_manifest.json"
UA = {"User-Agent": "projects_po-english-word-widget/0.1 (educational)"}


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
    return "-".join(f"{ord(c):x}" for c in emoji)


def twemoji_urls(emoji: str) -> list[str]:
    code = emoji_codepoint(emoji)
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
        for k, v in index.items():
            if k.lower() == folder.lower():
                rel = v
                break
    if not rel:
        return False
    url = "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/" + urllib.parse.quote(rel, safe="/")
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
    hints = json.loads(HINTS_JSON.read_text(encoding="utf-8")) if HINTS_JSON.exists() else {}
    fluent_index = load_fluent_index()
    manifest = []
    stats = {"fluent": 0, "twemoji": 0, "none": 0, "reused": 0}

    for item in payload["words"]:
        wid = int(item["id"])
        word = item["word"]
        asset_id = item["asset_id"]
        dest = OUT_DIR / f"{asset_id}.png"
        source = None
        detail = None
        hint = hints.get(word, {})

        # Reuse existing PNG if still valid and word unchanged mapping already downloaded
        folder = hint.get("fluent")
        emoji = hint.get("emoji")

        if folder and download_fluent(folder, dest, fluent_index):
            source = "fluent"
            detail = folder
            stats["fluent"] += 1
        elif emoji and download_twemoji(emoji, dest):
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
                "is_review": item.get("is_review", False),
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


if __name__ == "__main__":
    main()
