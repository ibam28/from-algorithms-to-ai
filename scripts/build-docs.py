#!/usr/bin/env python3
"""Render docs/ and video/ Markdown into styled static HTML.

GitHub Pages serves .md files as raw text/markdown because .nojekyll turns
off Jekyll, so a directory link such as `docs/` returns 404 and a direct
.md link shows unrendered markup. This script renders every .md in docs/
and video/ to a styled .html page, rewrites intra-set .md links to .html,
and writes an index.html hub for each directory.

Usage, from the repository root:

    python3 scripts/build-docs.py
"""

from __future__ import annotations

import html
import re
import sys
from pathlib import Path

try:
    import markdown
except ImportError:
    sys.exit("python-markdown diperlukan: pip install markdown")

try:
    import pygments  # noqa: F401
    HAS_PYGMENTS = True
except ImportError:
    HAS_PYGMENTS = False

ROOT = Path(__file__).resolve().parent.parent
REPO = "https://github.com/ibam28/from-algorithms-to-ai"

SECTIONS = {
    "docs": {
        "icon": "📚",
        "heading": "Deep Dives",
        "intro": (
            "Empat penjelasan mendalam — versi tertulis dari setiap bagian situs. "
            "Ditulis dalam Bahasa Indonesia, bisa dibaca offline, dan gampang dibagikan."
        ),
        "home": "../index.html",
        "hub_label": "← Kembali ke beranda",
        "css": "docs.css",
    },
    "video": {
        "icon": "🎬",
        "heading": "Video Content",
        "intro": (
            "Naskah dan storyboard siap rekam untuk konten LinkedIn / YouTube — "
            "tiga durasi: 100 detik, 45 detik, dan 3 menit."
        ),
        "home": "../index.html",
        "hub_label": "← Kembali ke beranda",
        "css": "../docs/docs.css",
    },
}

PAGE_ICON = {
    "docs/01-algoritma.md": "📐",
    "docs/02-machine-learning.md": "🤖",
    "docs/03-artificial-intelligence.md": "✨",
    "docs/04-hubungan-ketiganya.md": "🔗",
    "video/README.md": "📖",
    "video/script.md": "🎙️",
    "video/storyboard.md": "🎞️",
}

PAGE_ACCENT = {
    "docs/01-algoritma.md": "algorithm",
    "docs/02-machine-learning.md": "ml",
    "docs/03-artificial-intelligence.md": "ai",
    "docs/04-hubungan-ketiganya.md": "success",
    "video/README.md": "accent",
    "video/script.md": "accent",
    "video/storyboard.md": "ml",
}

PAGE_TEMPLATE = """<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>__TITLE__ — From Algorithms to AI</title>
  <meta name="description" content="__DESC__" />
  <meta name="author" content="Bambang Saputra Jaya (@ibam28)" />
  <meta property="og:title" content="__TITLE__ — From Algorithms to AI" />
  <meta property="og:description" content="__DESC__" />
  <meta property="og:type" content="article" />
  <meta property="og:image" content="https://ibam28.github.io/from-algorithms-to-ai/website/assets/og-image.png" />
  <link rel="stylesheet" href="__CSS__" />
</head>
<body class="doc-page">
  <a href="#main" class="skip-link">Lewati ke konten utama</a>

  <nav class="doc-nav" aria-label="Navigasi halaman">
    <div class="doc-nav-inner">
      <a href="__HOME__" class="doc-nav-brand">🧠 From Algorithms to AI</a>
      <a href="__HUB__" class="doc-nav-back">__HUBLABEL__</a>
    </div>
  </nav>

  <main id="main" class="doc-main">
    <div class="doc-layout">
      <aside class="doc-toc" aria-label="Daftar isi">
        <p class="doc-toc-title">Daftar Isi</p>
__TOC__
      </aside>

      <article class="doc-body">
__BODY__
      </article>
    </div>
  </main>

  <footer class="doc-footer">
    <p>
      <a href="https://github.com/ibam28/from-algorithms-to-ai"><strong>From Algorithms to AI</strong></a>
      · oleh <a href="https://github.com/ibam28">@ibam28</a>
      · <a href="__HOME__">Beranda</a>
    </p>
  </footer>
</body>
</html>
"""

HUB_TEMPLATE = """<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>__TITLE__ — From Algorithms to AI</title>
  <meta name="description" content="__DESC__" />
  <meta name="author" content="Bambang Saputra Jaya (@ibam28)" />
  <meta property="og:title" content="__TITLE__ — From Algorithms to AI" />
  <meta property="og:description" content="__DESC__" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://ibam28.github.io/from-algorithms-to-ai/website/assets/og-image.png" />
  <link rel="stylesheet" href="__CSS__" />
</head>
<body class="doc-page hub-page">
  <a href="#main" class="skip-link">Lewati ke konten utama</a>

  <nav class="doc-nav" aria-label="Navigasi halaman">
    <div class="doc-nav-inner">
      <a href="__HOME__" class="doc-nav-brand">🧠 From Algorithms to AI</a>
      <a href="__HOME__" class="doc-nav-back">← Kembali ke beranda</a>
    </div>
  </nav>

  <main id="main" class="doc-main">
    <header class="hub-hero">
      <p class="hub-eyebrow">__ICON__ From Algorithms to AI</p>
      <h1 class="hub-title">__TITLE__</h1>
      <p class="hub-intro">__INTRO__</p>
    </header>

    <div class="hub-grid">
__CARDS__
    </div>
  </main>

  <footer class="doc-footer">
    <p>
      <a href="https://github.com/ibam28/from-algorithms-to-ai"><strong>From Algorithms to AI</strong></a>
      · oleh <a href="https://github.com/ibam28">@ibam28</a>
      · <a href="__HOME__">Beranda</a>
    </p>
  </footer>
</body>
</html>
"""


def markdown_engine() -> markdown.Markdown:
    """Build a Markdown renderer with the extensions these docs rely on."""
    extensions = ["tables", "fenced_code", "toc", "attr_list", "sane_lists", "md_in_html"]
    extension_configs = {"toc": {"permalink": False}}
    if HAS_PYGMENTS:
        extensions.append("codehilite")
        extension_configs["codehilite"] = {"guess_lang": False, "css_class": "highlight"}
    return markdown.Markdown(extensions=extensions, extension_configs=extension_configs)


def first_heading(text: str) -> str:
    """Return the document title from its leading H1."""
    for line in text.splitlines():
        if line.startswith("# "):
            return line[2:].strip()
    return "Dokumen"


def first_quote(text: str) -> str:
    """Return the lead blockquote as a plain-text description."""
    for line in text.splitlines():
        if line.startswith(">"):
            plain = re.sub(r"[*_`\[\]]", "", line.lstrip("> ").strip())
            return plain
    for line in text.splitlines():
        if line.strip() and not line.startswith("#"):
            return re.sub(r"[*_`\[\]]", "", line.strip())[:180]
    return ""


def reading_minutes(text: str) -> int:
    """Estimate reading time at 200 words per minute."""
    return max(1, round(len(text.split()) / 200))


def collect_headings(tokens, out, max_level: int = 3) -> None:
    """Flatten the toc_tokens tree into (level, id, name) rows."""
    for token in tokens:
        if 2 <= token["level"] <= max_level:
            out.append((token["level"], token["id"], token["name"]))
        collect_headings(token.get("children", []), out, max_level)


def build_toc(tokens) -> str:
    """Render the sidebar table of contents."""
    rows = []
    collect_headings(tokens, rows)
    if not rows:
        return '        <a class="toc-l2" href="#main">Konten</a>'
    lines = []
    for level, anchor, name in rows:
        label = html.escape(re.sub(r"<[^>]+>", "", name))
        lines.append(f'        <a class="toc-l{level}" href="#{anchor}">{label}</a>')
    return "\n".join(lines)


def rewrite_links(rendered: str) -> str:
    """Point .md links at their generated .html sibling."""

    def replace(match: re.Match) -> str:
        href = match.group(1)
        if href.startswith(("http://", "https://", "mailto:", "#")):
            return match.group(0)
        path, _, fragment = href.partition("#")
        if not path.endswith(".md"):
            return match.group(0)
        tail = f"#{fragment}" if fragment else ""
        if path.endswith("README.md") and path.startswith("../"):
            return f'href="{REPO}#readme{tail}"'
        return f'href="{path[:-3]}.html{tail}"'

    return re.sub(r'href="([^"]+)"', replace, rendered)


def render_page(md_path: Path, section: str) -> dict:
    """Render one Markdown file and return its metadata plus HTML."""
    text = md_path.read_text(encoding="utf-8")
    engine = markdown_engine()
    body = rewrite_links(engine.convert(text))

    key = f"{section}/{md_path.name}"
    return {
        "name": md_path.name,
        "stem": md_path.stem,
        "title": first_heading(text),
        "desc": first_quote(text),
        "minutes": reading_minutes(text),
        "icon": PAGE_ICON.get(key, "📄"),
        "accent": PAGE_ACCENT.get(key, "accent"),
        "body": body,
        "toc": build_toc(engine.toc_tokens),
    }


def write_page(page: dict, section: str, config: dict, out_dir: Path) -> None:
    """Write a single rendered document."""
    target = out_dir / f"{page['stem']}.html"
    content = (
        PAGE_TEMPLATE.replace("__TITLE__", html.escape(page["title"]))
        .replace("__DESC__", html.escape(page["desc"]))
        .replace("__CSS__", config["css"])
        .replace("__HOME__", config["home"])
        .replace("__HUB__", "index.html")
        .replace("__HUBLABEL__", config["hub_label"])
        .replace("__TOC__", page["toc"])
        .replace("__BODY__", page["body"])
    )
    target.write_text(content, encoding="utf-8")
    print(f"  ✓ {target.relative_to(ROOT)}")


def write_hub(pages: list, section: str, config: dict, out_dir: Path) -> None:
    """Write the directory index that lists every rendered document."""
    cards = []
    for page in pages:
        cards.append(
            '      <a class="hub-card hub-card--{accent}" href="{stem}.html">\n'
            '        <div class="hub-card-icon">{icon}</div>\n'
            '        <h2 class="hub-card-title">{title}</h2>\n'
            '        <p class="hub-card-desc">{desc}</p>\n'
            '        <span class="hub-card-meta">{minutes} menit baca →</span>\n'
            "      </a>".format(
                accent=page["accent"],
                stem=page["stem"],
                icon=page["icon"],
                title=html.escape(page["title"]),
                desc=html.escape(page["desc"]),
                minutes=page["minutes"],
            )
        )
    content = (
        HUB_TEMPLATE.replace("__TITLE__", html.escape(config["heading"]))
        .replace("__DESC__", html.escape(config["intro"]))
        .replace("__INTRO__", html.escape(config["intro"]))
        .replace("__ICON__", config["icon"])
        .replace("__CSS__", config["css"])
        .replace("__HOME__", config["home"])
        .replace("__CARDS__", "\n".join(cards))
    )
    (out_dir / "index.html").write_text(content, encoding="utf-8")
    print(f"  ✓ {(out_dir / 'index.html').relative_to(ROOT)}")


def main() -> None:
    print(f"Markdown engine: python-markdown {markdown.__version__}"
          f"{' + pygments' if HAS_PYGMENTS else ' (tanpa syntax highlight)'}")
    for section, config in SECTIONS.items():
        out_dir = ROOT / section
        sources = sorted(p for p in out_dir.glob("*.md"))
        if not sources:
            print(f"  ! {section}/ tidak berisi .md — dilewati")
            continue
        print(f"\n{section}/")
        pages = [render_page(path, section) for path in sources]
        for page in pages:
            write_page(page, section, config, out_dir)
        write_hub(pages, section, config, out_dir)
    print("\nSelesai.")


if __name__ == "__main__":
    main()