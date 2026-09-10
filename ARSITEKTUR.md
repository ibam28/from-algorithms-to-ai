# 🏗️ Arsitektur

> Struktur teknis & keputusan desain proyek "From Algorithms to AI".
> File ini menjelaskan **bagaimana** proyek dibangun — folder, tech stack, design system, dan komponen.

---

## 1. Folder Structure

```
from-algorithms-to-ai/
│
│  ──── PLANNING & GOVERNANCE (file konteks kita berdua) ────
│
├── 📄 PRD.md                  ← Product Requirements Document
├── 📄 KERANGKA-BERPIKIR.md    ← Framework berpikir naratif
├── 📄 ARSITEKTUR.md           ← File ini
├── 📄 WORKFLOW.md             ← Cara kerja kolaboratif
├── 📄 ROADMAP.md              ← Tahapan & progress
│
│  ──── USER-FACING DELIVERABLES ────
│
├── 📄 README.md               ← GitHub landing (English)
├── 📄 LICENSE                 ← MIT
├── 📄 .gitignore
├── 📄 index.html              ← Landing page (Bahasa Indonesia)
├── 📄 slides.html             ← Reveal.js deck (single file)
│
├── 🌐 website/                ← Interactive SPA
│   ├── index.html
│   ├── css/
│   │   ├── style.css          ← Main stylesheet (dark theme)
│   │   └── sections.css       ← Section-specific styles
│   ├── js/
│   │   ├── app.js             ← SPA router + init
│   │   ├── components/
│   │   │   ├── viz-sorting.js
│   │   │   ├── viz-decision-tree.js
│   │   │   └── viz-relationship.js
│   │   └── ml-demo/
│   │       └── mnist.html
│   └── assets/
│       ├── diagrams/
│       └── screenshots/
│
├── 📚 docs/                   ← Konten tertulis (Markdown, ID)
│   ├── 01-algoritma.md
│   ├── 02-machine-learning.md
│   ├── 03-artificial-intelligence.md
│   └── 04-hubungan-ketiganya.md
│
└── 🎬 video/                  ← Video content (opsional)
    ├── script.md              ← Naskah narasi
    ├── storyboard.md          ← Visual per scene
    └── README.md              ← Cara record & publish
```

### Penamaan File Convention
- **Markdown:** lowercase, dash-separated, no space (`machine-learning.md`)
- **JS components:** kebab-case dengan prefix (`viz-sorting.js`)
- **CSS:** lowercase, no prefix (`style.css`)
- **HTML:** lowercase (`index.html`, `mnist.html`)

---

## 2. Tech Stack

| Layer | Pilihan | Versi | Sumber | Alasan |
|---|---|---|---|---|
| HTML | HTML5 | — | — | Standar |
| CSS | Vanilla CSS3 | — | — | Custom properties, no preprocessor |
| JS | Vanilla ES2022 | — | — | Modern, no transpiler needed |
| Slides | Reveal.js | 5.2.1 | CDN | Single file, pro look |
| Visualisasi | D3.js | 7.x | CDN | Industry standard untuk grafik |
| ML | TensorFlow.js | 4.x | CDN | Real ML in browser |
| Hosting | GitHub Pages | — | — | Free, auto-deploy |
| Versioning | Git + GitHub | — | — | Standar industri |
| Auth | gh CLI | — | local | Sudah configured (ibam28) |

### ❌ Sengaja TIDAK Dipakai

| No | Tech | Kenapa tidak |
|---|---|---|
| ❌ | React/Vue/Next.js | Overhead, target non-tech, bundle lebih besar |
| ❌ | TypeScript | Butuh build step, kontradiktif dengan prinsip "no build" |
| ❌ | Tailwind / CSS framework | Mau basic CSS — pembaca bisa baca |
| ❌ | Webpack/Vite/Parcel | Single file lebih sederhana, zero setup |
| ❌ | Backend/server | Semua client-side, static hosting cukup |
| ❌ | Database | Data hardcoded atau generated di browser |
| ❌ | Analytics | Privasi visitor, no tracking |

---

## 3. Design System

### 🎨 Color Palette (Dark Theme)

```css
/* Backgrounds */
--color-bg:           #0f1419   /* Background utama */
--color-bg-elevated:  #1a1f2e   /* Card/section */
--color-bg-card:      #232938   /* Elevated card */

/* Borders & Text */
--color-border:       #2d3548   /* Subtle separator */
--color-text:         #e6e9ef   /* Primary text */
--color-text-muted:   #9aa3b8   /* Secondary text */

/* Semantic Colors (konsisten di semua halaman) */
--color-algorithm:    #4f9eff   /* Biru — Algoritma */
--color-ml:           #ffb84d   /* Oranye — ML */
--color-ai:           #b56cff   /* Ungu — AI */

/* Utility */
--color-accent:       #4f9eff   /* Default accent (sama dengan algorithm) */
--color-success:      #4ade80   /* Hijau */
--color-error:        #ff6b6b   /* Merah */
```

**Kenapa 3 warna berbeda untuk Algoritma/ML/AI?**
- Setiap konsep punya warna konsisten di semua halaman
- User belajar "biru = Algoritma" → langsung recognize di mana pun
- Dark theme lebih mudah di mata untuk baca lama

### 📝 Typography

```css
--font-sans:  -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter',
              'Helvetica Neue', Arial, sans-serif;
--font-mono:  'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace;
```

**Skala:**
| Element | Size | Weight | Line-height |
|---|---|---|---|
| Hero title | 2.5rem–4rem (clamp) | 800 | 1.1 |
| H1 | 2rem–3rem | 700 | 1.2 |
| H2 | 1.5rem | 700 | 1.3 |
| Body | 1rem (16px) | 400 | 1.6 |
| Small | 0.9rem | 400 | 1.5 |
| Eyebrow | 0.8rem uppercase | 600 | 1.0 |

### 📏 Spacing Scale

```css
--space-xs: 0.5rem    /* 8px */
--space-sm: 1rem      /* 16px */
--space-md: 1.5rem    /* 24px */
--space-lg: 2.5rem    /* 40px */
--space-xl: 4rem      /* 64px */
```

### 🧩 Components

| Component | Class | Tujuan |
|---|---|---|
| Card | `.card`, `.card-primary` | Navigasi / highlight box |
| Button | `.btn`, `.btn-secondary` | Action trigger |
| Nav | `.website-nav` | SPA section navigation |
| Section | `.section`, `.section-header` | Content block |
| Analogy Box | `.analogy-box`, `.analogy-box-algorithm/ml/ai` | Highlight konsep |
| Viz Container | `.viz-container`, `.viz-canvas` | Wrapper visualisasi |
| Journey Step | `.journey-step`, `.journey-algorithms/ml/ai` | 3-step narrative |
| Eyebrow | `.landing-eyebrow` | Small label di atas title |

---

## 4. Routing & SPA Architecture

**Single Page Application** dengan 4 section di-scroll:

- `#section-algorithms`
- `#section-ml`
- `#section-ai`
- `#section-hubungan`

### Hash-based Routing
```js
// app.js (planned)
window.addEventListener('hashchange', router);
function router() {
  const section = location.hash.slice(1) || 'home';
  showSection(section);
}
```

### Scroll Spy (Active Nav State)
```js
// IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setActiveNav(entry.target.id);
    }
  });
}, { threshold: 0.5 });
```

**Kenapa hash routing, bukan history API?**
- Hash works tanpa server config (untuk GitHub Pages pakai path butuh fallback)
- Simpel, no library
- Mendukung deep link dari LinkedIn / email

---

## 5. Data Flow

Tidak ada backend. Semua data:

- **Hardcoded** di JS file (e.g. daftar algoritma, timeline AI)
- **Generated client-side** (e.g. array random untuk sorting viz)
- **Dimuat dari CDN** (e.g. TF.js MNIST dataset)

```
┌──────────────┐
│   Browser    │
│              │
│  ┌────────┐  │
│  │ HTML   │←── Static files dari GitHub Pages
│  │ CSS    │  │
│  │ JS     │  │
│  └────┬───┘  │
│       │      │
│       ↓      │
│  ┌────────┐  │
│  │ D3.js  │←── CDN (unpkg/jsdelivr)
│  │ TF.js  │  │
│  │ Reveal │  │
│  └────────┘  │
└──────────────┘
```

---

## 6. Visualisasi Strategy

| Section | Visualization | Tech | Load Strategy | Complexity |
|---|---|---|---|---|
| Algoritma | Sorting visualizer (bubble vs merge) | Canvas API + D3 | Eager (penting untuk first impression) | Medium |
| ML | Decision tree trainer (growing tree) | D3 tree layout | Lazy (scroll trigger) | High |
| Hubungan | Concentric circles interaktif | D3 + SVG | Lazy (scroll trigger) | Medium |
| AI | Timeline 1950–2024 | D3 + SVG | Lazy (scroll trigger) | Low |
| ML Demo | MNIST CNN training + canvas drawing | TF.js + Canvas | **Lazy berat (lihat §7 & §8)** | High |

### Performance Pattern (Lazy Loading Visualisasi)

```js
// Lazy load visualisasi saat scroll mendekati viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      initVisualization(entry.target.id);
      observer.unobserve(entry.target);  // init sekali, tidak observe lagi
    }
  });
}, { rootMargin: '200px' });  // trigger 200px sebelum visible
```

### Honest Trade-off: Visualisasi & Aksesibilitas

3 dari 4 visualisasi utama bersifat **visual-temporal** — nilainya ada di animasi & interaksi, bukan di teks statis. Replikasi penuh untuk screen reader **tidak realistis**. Strategi kami:

- **Tetap kasih deskripsi statis** di bawah setiap viz (summary 1 paragraf + key insight)
- **ARIA labels** untuk state saat ini (mis. "Bubble sort, step 42, comparing index 5 and 6")
- **Tombol play/pause/step** keyboard-accessible (untuk sorting viz)
- **Alternatif teks** menjelaskan "what would user see" bukan "what is shown now"
- Untuk **MNIST demo**: kasih grid preset digit (0-9) sebagai fallback kalau canvas drawing tidak accessible

Target kami: **WCAG 2.1 AA compliant untuk konten naratif**, dan **best-effort untuk visualisasi** dengan honest disclosure di README.

---

## 7. ML Demo: MNIST Digit Recognizer

### Kenapa MNIST?

- ✅ Ikonik — dikenal di seluruh komunitas ML
- ✅ Cepat dilatih di browser (<2 menit untuk akurasi 95%+)
- ✅ Visual & satisfying — user gambar angka, model tebak
- ✅ Ringan — model kecil (~100KB setelah training)
- ✅ No external dataset needed — TF.js include di library-nya

### Arsitektur Mini ML Demo

```
┌─────────────────────────────────────────┐
│         mnist.html (TF.js)             │
│                                         │
│  1. Load TF.js library (LAZY — §8)     │
│  2. Build model:                        │
│     Conv2D(16) → MaxPool → Conv2D(32)  │
│     → Flatten → Dense(128) → Dense(10)  │
│  3. Load MNIST (60k train, 10k test)   │
│  4. Train 5 epochs (progress bar)       │
│  5. Show canvas (28x28 drawing)         │
│     — mouse + TOUCH events (§7.1)       │
│  6. Predict → show top-3 + confidence   │
└─────────────────────────────────────────┘
```

### Model Specs

| Layer | Output Shape | Params |
|---|---|---|
| Conv2D (16 filters, 3x3) | 26x26x16 | 160 |
| MaxPool (2x2) | 13x13x16 | 0 |
| Conv2D (32 filters, 3x3) | 11x11x32 | 4,640 |
| MaxPool (2x2) | 5x5x32 | 0 |
| Flatten | 800 | 0 |
| Dense (128) | 128 | 102,528 |
| Dense (10) | 10 | 1,290 |
| **Total** | — | **~108K params** |

Akurasi target: **>95%** setelah 5 epoch (realistic untuk CNN mini ini).

### 7.1 Canvas Drawing — Mouse + Touch Support

Canvas MNIST harus **bisa dipakai di mobile** (target responsive 320px+). Implementasi:

```js
// Pointer Events API — works untuk mouse, touch, dan pen
canvas.addEventListener('pointerdown', startDraw);
canvas.addEventListener('pointermove', draw);
canvas.addEventListener('pointerup', endDraw);
canvas.addEventListener('pointerleave', endDraw);
canvas.addEventListener('pointercancel', endDraw);

// Prevent default touch behavior (scroll/zoom) saat menggambar
canvas.style.touchAction = 'none';
```

**Detail penting:**

| Aspek | Handling |
|---|---|
| Mouse events | `mousedown/mousemove/mouseup` (di-handle via Pointer Events) |
| Touch events | `touchstart/touchmove/touchend` (di-handle via Pointer Events) |
| Stylus/pen | Otomatis lewat Pointer Events |
| Multi-touch | Di-ignore (cuma track touch pertama) |
| Scroll conflict | `touch-action: none` di canvas |
| Coordinate scaling | `getBoundingClientRect()` untuk normalize koordinat |
| Performance | `requestAnimationFrame` untuk throttling |
| Visual feedback | Stroke smoothing (quadratic curve) |

**Mobile UX extras:**
- Tombol "Clear" besar (mudah ditekan dengan jempol)
- Slider "Brush size" (default 8px untuk mobile, 6px desktop)
- Visual hint: "Gambar angka di kotak ini"
- Fallback: tap preset digit dari grid 0-9 kalau canvas drawing terlalu sulit di mobile kecil

**Test device plan:**
- iOS Safari (iPhone)
- Android Chrome
- iPad Safari (large canvas)
- Desktop Chrome/Firefox/Safari/Edge

---

## 7.5 Open Graph Image (LinkedIn Preview)

**Penting:** LinkedIn & social media butuh gambar preview khusus saat share link. Tanpa ini, preview cuma jadi plain text / generic.

### Requirements

| Spec | Value |
|---|---|
| File | `assets/og-image.png` |
| Dimensions | **1200 × 630 px** (standar Open Graph) |
| File size | <500KB (idealnya <200KB) |
| Format | PNG dengan kompresi, atau JPG quality 85% |
| Safe area | Hindari area 100px tepi (di-crop di beberapa platform) |

### Content Design

Gambar harus:
- **Title besar:** "From Algorithms to AI"
- **Subtitle:** "Algoritma → Machine Learning → AI"
- **Visual:** 3 lingkaran konsentris dengan warna brand (biru/oranye/ungu)
- **Author badge:** "@ibam28 — Full Stack + AI Engineer"
- **Style:** Dark theme, konsisten dengan website

### Tools untuk Bikin

- **Canva** (easiest, template OG image banyak)
- **Figma** (kalau mau pixel-perfect control)
- **Python (Pillow)** — script otomatis kalau prefer code

### Integration

Tambah di `<head>` setiap HTML file:

```html
<meta property="og:image" content="https://ibam28.github.io/from-algorithms-to-ai/assets/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
```

### Validation

Setelah push, cek preview di:
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

**Status:** ⬜ Not started (PRIORITAS Phase 7 — sebelum launch LinkedIn)

---

## 8. Performance Strategy — REALISTIC LOAD PLAN

### The Problem

PRD target: **<2 detik load di 4G**, Lighthouse **Performance 95+**.

Realita:
- TF.js saja (minified): **~1.2 MB** (CDN, gzipped ~300KB tapi tetap significant)
- D3.js: ~280KB (gzipped ~90KB)
- Reveal.js 5.2.1: ~150KB
- **Total CDN libs:** ~1.6 MB unminified, ~540KB gzipped
- Pada 4G (~1-2 MB/s effective), **TF.js alone = 1-2 detik**

### Strategy: Aggressive Code-Splitting & Lazy Loading

**Initial page load (yang diukur Lighthouse):**
- HTML + CSS + minimal JS untuk SPA shell
- Nav, landing content, scroll detection
- **TIDAK** load: TF.js, MNIST demo, D3 visualisasi yang belum terlihat
- Target initial load: **<100KB total**

```html
<!-- index.html: hanya yang critical di head -->
<script defer src="website/js/app.js"></script>
<!-- TF.js dimuat LAZY oleh app.js saat MNIST section scroll -->
```

**Lazy load trigger — visualisasi (D3):**
```js
// Trigger 200px sebelum section masuk viewport
const vizObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.loaded) {
      loadD3IfNeeded().then(() => initViz(entry.target.id));
      entry.target.dataset.loaded = 'true';
      vizObserver.unobserve(entry.target);
    }
  });
}, { rootMargin: '200px' });

// D3 dimuat SEKALI, lalu di-cache untuk viz berikutnya
let d3Promise;
function loadD3IfNeeded() {
  if (!d3Promise) {
    d3Promise = import('https://cdn.jsdelivr.net/npm/d3@7/+esm');
  }
  return d3Promise;
}
```

**Lazy load trigger — TF.js + MNIST (BERAT):**
```js
// Trigger saat user benar-benar masuk section MNIST (bukan cuma lewat)
const mnistObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.tfjLoaded) {
      loadTFJS().then(() => initMNISTDemo());
      entry.target.dataset.tfjLoaded = 'true';
      mnistObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });  // 30% section terlihat = user serius
```

**Reveal.js (slides.html):**
- Dimuat hanya saat user buka `slides.html` (terpisah dari main site)
- Tidak membebani initial load

### Trade-off yang Diterima

| Aspek | Trade-off |
|---|---|
| User scroll cepat ke section MNIST | Ada delay ~1-2 detik saat TF.js load (placeholder "Loading ML model...") |
| Internet lambat saat MNIST section | Loading lebih lama, mungkin timeout — kasih fallback ke static demo |
| Device lama | TF.js training mungkin lambat — tampilkan warning, kasih opsi skip |

### Measurement Strategy

- Lighthouse di **landing page only** (yang dimuat pertama)
- Performance untuk visualisasi berat diukur terpisah (saat user interaksi)
- Real User Monitoring (RUM) tidak dipakai — terlalu overkill untuk portfolio

### Performance Budget

| Resource | Budget | Strategy |
|---|---|---|
| Initial JS | <50KB gzipped | No framework, defer non-critical |
| Initial CSS | <30KB gzipped | Critical CSS inline, rest lazy |
| D3 (lazy) | 90KB gzipped | Loaded on scroll, cached after first |
| TF.js (lazy) | 300KB gzipped | Loaded only at MNIST section |
| Total initial | <100KB | ✅ Within 4G budget |

### Target Lighthouse Scores (revised)

| Metric | Landing | Website (after scroll) | MNIST Demo |
|---|---|---|---|
| Performance | 95+ | 90+ (degraded by viz load) | N/A (interactive demo) |
| Accessibility | 95+ | 90+ | 85+ (canvas inherent limitation) |
| Best Practices | 95+ | 95+ | 95+ |
| SEO | 95+ | 95+ | N/A |

---

## 9. Browser Support

| Browser | Min Version | Status |
|---|---|---|
| Chrome | 90+ | ✅ Full support |
| Firefox | 88+ | ✅ Full support |
| Safari | 14+ | ✅ Full support |
| Edge | 90+ | ✅ Full support |

**Polyfill tidak dipakai** — audiens target pakai browser modern.

---

## 10. Accessibility (a11y) — HONEST SCOPE

### Komitmen Inti

Kami **commit ke WCAG 2.1 AA** untuk **konten naratif** (text, headings, links, navigation, forms). Untuk **visualisasi interaktif** yang inherently visual-temporal, kami berikan **best-effort accessibility** dengan disclosure jujur — bukan janji replikasi penuh yang tidak bisa ditepati.

### ✅ Yang Kami Kerjakan (komitmen)

| Area | Standard |
|---|---|
| Semantic HTML | `<main>`, `<nav>`, `<section>`, `<article>`, `<header>` |
| Heading hierarchy | Logical h1 → h2 → h3, no skipped levels |
| Color contrast | Min 4.5:1 untuk teks normal, 3:1 untuk large text (WCAG AA) |
| Keyboard navigation | Tab order logis, semua interaktif reachable |
| Focus indicator | Visible `:focus-visible` ring |
| Skip-to-content link | "Skip to main content" di paling atas page |
| ARIA labels | Pada landmark, button icon-only, status updates |
| Form labels | Semua input punya `<label>` |
| Alt text | Untuk semua `<img>` (decorative pakai `alt=""`) |
| Slide deck | Arrow keys + space navigasi, escape exit fullscreen |

### 🎯 Best-Effort untuk Visualisasi (realistic)

3 dari 4 visualisasi utama bersifat **visual-temporal** — sorting animation, decision tree yang tumbuh, concentric circles interaktif. Replikasi screen reader experience **tidak mungkin secara jujur**. Yang kami lakukan:

| Visualisasi | A11y Approach |
|---|---|
| **Sorting viz** | Keyboard controls (Play/Pause/Step/Reset), ARIA live region announcing current step ("Comparing index 5 and 6"), text summary di bawah canvas menjelaskan apa yang terjadi |
| **Decision tree** | Static SVG fallback dengan `<title>` dan `<desc>` untuk setiap node, text representation "Tree: root → left child (X<0.5) → ..." |
| **Relationship circles** | SVG `<title>` di setiap circle, keyboard navigation antar circle, text equivalent "Algoritma ⊂ ML ⊂ AI" |
| **MNIST canvas** | Grid preset digit 0-9 sebagai alternative input, ARIA description untuk hasil prediksi |

### 📝 Pola Implementasi

```html
<!-- Setiap viz dibungkus dengan figure + figcaption -->
<figure class="viz-container">
  <canvas id="sorting-viz" aria-label="Sorting visualization"
          role="img" aria-describedby="sorting-desc"></canvas>
  <figcaption id="sorting-desc">
    <strong>Sedang terjadi:</strong> Bubble sort, langkah 42 dari 100.
    Membandingkan elemen index 5 (nilai 8) dengan index 6 (nilai 3).
    <a href="#sorting-explanation">Baca penjelasan lengkap →</a>
  </figcaption>
</figure>
```

### ❌ Yang TIDAK Kami Klaim

- ❌ "100% screen reader equivalent" untuk visualisasi animasi
- ❌ "Blind user mendapat pengalaman yang sama"
- ❌ WCAG AAA (cukup AA)
- ❌ Full keyboard-only untuk drag interactions (canvas drawing pakai mouse/touch primarily)

### 🧪 Testing Plan

- **Automated:** axe-core via Lighthouse (95+ score)
- **Manual keyboard:** Tab through entire site tanpa mouse
- **Screen reader:** VoiceOver (macOS/iOS), NVDA (Windows) untuk spot-check konten naratif
- **Visualisasi:** Best-effort, di-test minimal 1 screen reader untuk konfirmasi approach works

### 📣 Public Disclosure

Kami akan tulis honest note di README:

> "Visualisasi interaktif proyek ini bersifat inherently visual. Untuk konten naratif, kami mengikuti WCAG 2.1 AA. Untuk visualisasi, kami menyediakan text summary dan keyboard alternatives, tapi **tidak bisa mereplikasi penuh pengalaman visual** untuk assistive technology. Jika Anda menemukan barrier, silakan buka Issue di GitHub."

---

## 11. Deployment

```
Developer (AI agent + @ibam28)
        ↓ git push origin main
GitHub Repository (ibam28/from-algorithms-to-ai)
        ↓ GitHub Pages auto-detect
Static Site Host
        ↓
https://ibam28.github.io/from-algorithms-to-ai/
```

### Setup GitHub Pages

1. Repo Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main`, folder: `/` (root)
4. Save → tunggu ~1 menit → URL aktif

**Tidak pakai GitHub Actions** untuk saat ini — terlalu overkill untuk static site. Push manual ke `main` cukup.

### Custom Domain (future)
Kalau nanti ada domain sendiri:
- Beli domain (mis. `fromalgorithmsto.ai`)
- Tambah CNAME file di root
- Settings → Pages → Custom domain

---

## 12. Security Considerations

- ❌ **No backend** = no server-side vulnerabilities
- ❌ **No user input** yang di-simpan = no data leak
- ❌ **No external API calls** = no API key leak
- ✅ **CDN scripts** dimuat via SRI (planned, optional)
- ✅ **No tracking** = privacy-friendly

---

## 13. Future Architecture (v2.0, kalau ada waktu)

- [ ] PWA (Progressive Web App) — installable, offline-first
- [ ] Service Worker untuk cache agresif
- [ ] Multi-language switcher (EN/ID)
- [ ] Algoritma pathfinding (A*, Dijkstra) visualizer
- [ ] Spam classifier (Naive Bayes) demo
- [ ] Image classifier (Teachable Machine) demo
- [ ] Comments/feedback via GitHub Issues
- [ ] Dark/light theme toggle
- [ ] Share button per section (native share API)

---

**File ini adalah sumber kebenaran untuk keputusan teknis. Kalau ada konflik dengan PRD, PRD menang untuk scope; file ini menang untuk teknis.**
