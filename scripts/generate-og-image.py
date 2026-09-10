#!/usr/bin/env python3
"""
Generate Open Graph image (1200x630) untuk From Algorithms to AI.

Dipakai untuk preview LinkedIn / Twitter / WhatsApp saat link di-share.
Jalankan: python3 scripts/generate-og-image.py
Output:  website/assets/og-image.png
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

# ---------- Design tokens (samakan dengan website/css/style.css) ----------
W, H = 1200, 630
BG = "#0f1419"
TEXT = "#e6e9ef"
MUTED = "#9aa3b8"
ALGO = "#4f9eff"  # biru
ML = "#ffb84d"    # oranye
AI = "#b56cff"    # ungu

FONT_DIR = Path("/usr/share/fonts/truetype/noto")
OUT = Path(__file__).resolve().parent.parent / "website" / "assets" / "og-image.png"


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONT_DIR / name), size)


def lerp(c1: str, c2: str, t: float) -> tuple[int, int, int]:
    """Interpolasi linear antara dua warna hex."""
    a = tuple(int(c1.lstrip("#")[i : i + 2], 16) for i in (0, 2, 4))
    b = tuple(int(c2.lstrip("#")[i : i + 2], 16) for i in (0, 2, 4))
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))


def gradient_text(img: Image.Image, xy, text: str, fnt, stops) -> None:
    """
    Gambar teks dengan gradien horizontal.
    Caranya: render teks sebagai mask, lalu paste gradien lewat mask itu.
    """
    # Ukur teks
    tmp = ImageDraw.Draw(Image.new("RGB", (1, 1)))
    bbox = tmp.textbbox((0, 0), text, font=fnt)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]

    # Buat mask dari teks
    mask = Image.new("L", (tw + 4, th + 4), 0)
    ImageDraw.Draw(mask).text((2 - bbox[0], 2 - bbox[1]), text, font=fnt, fill=255)

    # Buat gradien dengan jumlah stop
    grad = Image.new("RGB", (tw + 4, th + 4))
    gd = ImageDraw.Draw(grad)
    n = len(stops) - 1
    for x in range(tw + 4):
        t = x / max(tw + 3, 1)
        seg = min(int(t * n), n - 1) if n > 0 else 0
        local = (t * n) - seg if n > 0 else 0
        color = lerp(stops[seg], stops[seg + 1], local) if n > 0 else stops[0]
        gd.line([(x, 0), (x, th + 4)], fill=color)

    img.paste(grad, xy, mask)


def main() -> None:
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)

    # --- Background: dua radial glow lembut (biru atas, ungu bawah) ---
    glow = Image.new("RGB", (W, H), BG)
    gd = ImageDraw.Draw(glow)
    for r, alpha in [(520, 14), (400, 12), (280, 10)]:
        gd.ellipse(
            [W // 2 - r, -r // 2, W // 2 + r, r // 2],
            fill=lerp(BG, ALGO, alpha / 100),
        )
        gd.ellipse(
            [W // 2 - r, H - r // 2, W // 2 + r, H + r // 2],
            fill=lerp(BG, AI, alpha / 100),
        )
    img = Image.blend(img, glow, 0.6)
    draw = ImageDraw.Draw(img)

    # --- Border halus ---
    draw.rounded_rectangle(
        [24, 24, W - 24, H - 24], radius=24, outline="#2d3548", width=2
    )

    center_x = W // 2

    # --- Eyebrow ---
    eyebrow = "PORTFOLIO PROJECT · 2026"
    f_eyebrow = font("NotoSans-Regular.ttf", 22)
    bb = draw.textbbox((0, 0), eyebrow, font=f_eyebrow)
    draw.text(
        (center_x - (bb[2] - bb[0]) // 2, 108),
        eyebrow,
        font=f_eyebrow,
        fill=MUTED,
    )

    # --- Judul dengan gradien (biru → oranye → ungu) ---
    f_title = font("NotoSans-Bold.ttf", 78)
    title = "From Algorithms to AI"
    bb = draw.textbbox((0, 0), title, font=f_title)
    tw = bb[2] - bb[0]
    gradient_text(img, (center_x - tw // 2, 158), title, f_title, [ALGO, ML, AI])
    draw = ImageDraw.Draw(img)

    # --- Garis journey: tiga node berwarna ---
    journey_y = 310
    nodes = [("ALGORITMA", ALGO), ("MACHINE LEARNING", ML), ("AI", AI)]
    f_node = font("NotoSans-Bold.ttf", 26)

    # Ukur total lebar untuk centering
    gap = 58
    widths = [draw.textbbox((0, 0), t, font=f_node)[2] for t, _ in nodes]
    total = sum(widths) + gap * 2 + 44 * 2  # 44 = lebar node circle
    x = center_x - total // 2

    for i, ((label, color), w) in enumerate(zip(nodes, widths)):
        # Lingkaran node
        r = 22
        draw.ellipse([x, journey_y - r, x + 2 * r, journey_y + r], fill=color)
        x += 2 * r + 14

        # Label
        draw.text((x, journey_y - 17), label, font=f_node, fill=TEXT)
        x += w

        # Panah antar-node
        if i < len(nodes) - 1:
            ax = x + 18
            draw.line([(ax, journey_y), (ax + 20, journey_y)], fill=MUTED, width=3)
            draw.polygon(
                [(ax + 20, journey_y - 7), (ax + 32, journey_y), (ax + 20, journey_y + 7)],
                fill=MUTED,
            )
            x += gap

    # --- Tagline ---
    f_tag = font("NotoSans-Regular.ttf", 27)
    tagline = "Penjelasan visual & interaktif untuk orang awam"
    bb = draw.textbbox((0, 0), tagline, font=f_tag)
    draw.text(
        (center_x - (bb[2] - bb[0]) // 2, 388), tagline, font=f_tag, fill=MUTED
    )

    f_tag2 = font("NotoSans-Regular.ttf", 24)
    tagline2 = "Demo ML asli yang berjalan di browser — bukan teori"
    bb = draw.textbbox((0, 0), tagline2, font=f_tag2)
    draw.text(
        (center_x - (bb[2] - bb[0]) // 2, 428), tagline2, font=f_tag2, fill=MUTED
    )

    # --- Footer: byline ---
    f_foot = font("NotoSans-Bold.ttf", 22)
    footer = "@ibam28  ·  Full Stack + AI Engineer"
    bb = draw.textbbox((0, 0), footer, font=f_foot)
    draw.text(
        (center_x - (bb[2] - bb[0]) // 2, 512), footer, font=f_foot, fill=TEXT
    )

    # Pastikan folder output ada
    OUT.parent.mkdir(parents=True, exist_ok=True)
    img.save(OUT, "PNG", optimize=True)

    size_kb = OUT.stat().st_size / 1024
    print(f"OK  {OUT}")
    print(f"    {W}x{H}px, {size_kb:.1f} KB")


if __name__ == "__main__":
    main()