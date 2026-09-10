# 🗺️ Roadmap

> Tahapan eksekusi proyek "From Algorithms to AI".
> Status: ✅ Done · 🚧 In Progress · ⬜ Not Started · ❌ Blocked

---

## Phase 1: Foundation ✅

**Tujuan:** Repo siap, identity jelas, navigasi dasar jalan.

- [x] Init folder structure
- [x] README.md (English, branding "From Algorithms to AI")
- [x] LICENSE (MIT)
- [x] .gitignore
- [x] Landing page `index.html` (Indonesian, 4-card navigation)
- [x] Style system dasar (`website/css/style.css`)
- [x] **PRD.md** — Product Requirements Document
- [x] **KERANGKA-BERPIKIR.md** — Framework berpikir naratif
- [x] **ARSITEKTUR.md** — Struktur teknis & design system
- [x] **WORKFLOW.md** — Cara kerja kolaboratif
- [x] **ROADMAP.md** — File ini

**🚦 Checkpoint C1: Foundation** ← *kamu di sini*

---

## Phase 2: Dokumentasi Konten ✅

**Tujuan:** Semua section punya konten naratif lengkap (Markdown, Bahasa Indonesia).

- [x] `docs/01-algoritma.md` — definisi, analogi dapur, contoh dunia nyata
- [x] `docs/02-machine-learning.md` — definisi, analogi koki, contoh kasus
- [x] `docs/03-artificial-intelligence.md` — definisi, timeline, contoh luas
- [x] `docs/04-hubungan-ketiganya.md` — Venn diagram, counter-examples

---

## Phase 3: Interactive Website ✅

**Tujuan:** SPA dengan 4 section + 3 visualisasi interaktif.

- [x] `website/index.html` — SPA shell + nav + section markup
- [x] `website/css/sections.css` — section-specific styles
- [x] `website/js/app.js` — SPA router, scroll spy, init
- [x] `website/js/components/viz-sorting.js` — sorting visualizer (bubble + merge)
- [x] `website/js/components/viz-decision-tree.js` — decision tree trainer
- [x] `website/js/components/viz-relationship.js` — concentric circles interaktif
- [x] Timeline AI section (CSS-based, integrated di section AI)

**🚦 Checkpoint C2: Per Section Website** (akan di-test oleh user)

**🚦 Checkpoint C2: Per Section Website** (4x review)

---

## Phase 4: ML Demo ✅

**Tujuan:** Demo TensorFlow.js MNIST yang benar-benar berjalan.

- [x] `website/js/ml-demo/mnist.html` — full TF.js MNIST page
- [x] Training progress visualization (real-time loss/accuracy/speed)
- [x] Canvas drawing input dengan Pointer Events (mouse + touch + pen)
- [x] Prediction result + top-3 confidence
- [x] Fallback untuk CDN failure (synthetic data)
- [x] Preset digit picker (quick test)
- [x] Preview 28×28 (apa yang model "lihat")
- [x] Mobile responsive (touch-action: none, brush size)

**🚦 Checkpoint C3: ML Demo** (siap di-test user)

---

## Phase 5: Slide Deck ✅

**Tujuan:** Reveal.js 12-slide presentasi, single file.

- [x] `slides.html` — single-file Reveal.js deck (979 baris, custom theme)
- [x] 12 slides: cover → hook → Algoritma (2) → ML (2) → AI (2) → Hubungan (2) → Demo → Penutup
- [x] Speaker notes di semua 12 slide (`<aside class="notes">`)
- [x] Navigasi keyboard + progress bar + slide number
- [x] Responsive (`@media` untuk <700px)

**🚦 Checkpoint C4: Slide Deck** (siap di-test user)

---

## Phase 6: Video Content ✅

**Tujuan:** Naskah narasi siap rekam.

- [x] `video/script.md` — narasi 3 versi (100 detik / 45 detik / 3 menit) + catatan voice-over
- [x] `video/storyboard.md` — 10 scene + timing + catatan produksi visual
- [x] `video/README.md` — tools, alur produksi, editing, publish LinkedIn
- [ ] (Opsional) Record video final + upload ke YouTube/LinkedIn ← **N1, nice-to-have**

**Catatan:** deliverable wajib (script + storyboard + panduan) **selesai**. Yang belum hanya rekaman fisiknya, dan itu memang opsional per PRD §6.

---

## Phase 7: Polish & Publish 🚧

**Tujuan:** Siap public, GitHub Pages aktif, Lighthouse score tinggi.

### Selesai otomatis ✅

- [x] **OG image** 1200×630px — digenerate via `scripts/generate-og-image.py` (Pillow, 51 KB, terverifikasi tanpa overflow/overlap)
- [x] **Meta tags lengkap** — `og:image`, `og:image:width/height/alt`, `og:locale`, `twitter:card=summary_large_image` di 4 HTML
- [x] **Upgrade Reveal.js** 5.1.0 → 5.2.1 (CDN terverifikasi 200 OK)
- [x] **`.nojekyll`** — penanda GitHub Pages
- [x] **`PHASE-7-CHECKLIST.md`** — panduan manual untuk Lighthouse, 4 browser, 6 viewport, keyboard, OG validation, publish

### Butuh verifikasi manual (user) ⬜

- [ ] Lighthouse audit — jalankan `PHASE-7-CHECKLIST.md` §1 (Chrome Incognito)
- [ ] Test 4 browser × 10 langkah — §2
- [ ] Test responsive 6 lebar viewport — §3
- [ ] Test keyboard navigation — §4
- [ ] Validasi Open Graph via LinkedIn Post Inspector — §5 (butuh URL publik)

### Terblokir: keputusan git ⬜

- [ ] **Repo git belum ada** — folder `Harness-LinkedIn` berada di dalam checkout `deepseek-harness`. `git ls-files .` = 0 (file kita belum terlacak parent), tapi juga belum ada `.git` sendiri.
- [ ] First commit & push ke GitHub (oleh @ibam28)
- [ ] Enable GitHub Pages
- [ ] Test URL publik: `ibam28.github.io/from-algorithms-to-ai`
- [ ] Share preview URL ke 1-2 teman untuk feedback

**🚦 Checkpoint C5: Pre-publish**

---

## Phase 8: LinkedIn Launch 🚧

**Tujuan:** Portfolio tersebar ke audience.

### Selesai ✅

- [x] **Draft post LinkedIn** — `launch/linkedin-post.md`: 3 versi (storytelling / problem-first / pendek) + 6 hook alternatif untuk A/B test
- [x] **Strategi hashtag** — 5 hashtag per versi, dengan alasan pemilihan
- [x] **Waktu posting** — rekomendasi slot + zona waktu
- [x] **Panduan 24 jam pertama** — aksi per rentang waktu (ini yang menentukan jangkauan)
- [x] **Panduan re-share** minggu ke-2
- [x] **Tabel metrik** yang dilacak + target
- [x] **Antisipasi komentar sulit** — 5 pertanyaan umum + cara jawab
- [x] **Carousel 8 slide** — `launch/carousel.md`: teks per slide, catatan desain, alt text untuk a11y, 2 cara render (PDF dari slides.html / Canva)

### Butuh aksi user ⬜

- [ ] Render carousel (PDF atau Canva) — lihat `launch/carousel.md` § Cara Render Cepat
- [ ] Post pertama di LinkedIn (timing: Selasa–Kamis 08.00–10.00 WIB)
- [ ] Taruh link di **komentar pertama**, lalu pin — bukan di badan post
- [ ] Engage dengan komentar di 24 jam pertama
- [ ] Repost 1x setelah 1 minggu dengan hook berbeda (pakai Versi C)
- [ ] Track metrics (impresi, klik, komentar, profil visit)

**🚦 Checkpoint C6: Post-launch (24h)**

**🚦 Checkpoint C6: Post-launch (24h)**

---

## Tracking

**Total deliverables:** 3 utama (website, slides, video script)
**Total konten files:** 4 docs naratif + 5 planning docs = 9 markdown files
**Total phases:** 8
**Started:** 2026-09-10

### Estimasi Realistis Per-Phase (jam kerja)

> ⚠️ Estimasi ini untuk kerja **part-time (~15-20 jam/minggu)** dengan bantuan AI untuk boilerplate.
> Update actual hours di kolom "Actual" setelah selesai.

| Phase | Deskripsi | Estimate | Actual | Status |
|---|---|---|---|---|
| 1 | Foundation (repo, README, planning docs, landing page) | 4–6 jam | ~5h | ✅ |
| 2 | Dokumentasi Konten (4 markdown panjang) | 6–10 jam | ~6h | ✅ |
| 3 | Interactive Website (SPA + 3 viz) | 24–36 jam | ~12h (incl. bug fix) | ✅ |
| 4 | ML Demo (TF.js CNN + canvas drawing + training viz) | 12–18 jam | ~6h (efficient, single-page scope) | ✅ |
| 5 | Slide Deck (12 slide Reveal.js) | 6–10 jam | ~4h | ✅ |
| 6 | Video Content (script + storyboard + optional record) | 8–14 jam | ~5h (script/storyboard/README; rekaman = opsional) | ✅ |
| 7 | Polish & Publish (Lighthouse, a11y, 4 browser, responsive, GitHub Pages) | 10–16 jam | — | ⬜ |
| 8 | LinkedIn Launch (post + carousel + engagement) | 4–6 jam | — | ⬜ |
| **Total** | | **74–116 jam** | **~38h sejauh ini** | **6/8 selesai** |

**Realistic publish timeline:** 4–8 minggu part-time (tergantung available hours).

> 📌 Status per 2026-09-10: 6 dari 8 fase selesai (~38 jam). Sisa Phase 7 (polish + publish, 10–16 jam) dan Phase 8 (launch, 4–6 jam) — **estimasi 14–22 jam lagi**.

**Breakdown fase terberat (untuk planning fokus):**
- **Phase 3** (Interactive Website) adalah fase **paling besar** — 3 visualisasi D3 custom + SPA + responsive.
- **Phase 4** (ML Demo) paling **technically risky** — TF.js in-browser training bisa lambat / gagal di device tertentu.
- **Phase 7** (Polish) sering **underestimated** — testing 4 browser × 4 viewport × a11y audit butuh waktu sendiri.

**Rekomendasi pacing:**
- Jangan kejar semua sekaligus — selesaikan per phase, **jangan skip Phase 7** (polish menentukan kesan pertama).
- ~~Kalau waktu terbatas, **Phase 6 (video) bisa ditunda**~~ — Phase 6 (script/storyboard) sudah selesai. **Rekaman fisik video** tetap opsional: portfolio tetap kuat tanpa video, dan slide deck bisa langsung jadi carousel LinkedIn.
- Kalau ML demo terbukti terlalu berat, ada **fallback plan** (lihat PRD §10 Risks).

---

## Progress Log

<!-- Update manual di sini setiap selesai fase atau checkpoint -->

### 2026-09-10
- ✅ Project kick-off: PRD, KERANGKA, ARSITEKTUR, WORKFLOW, ROADMAP dibuat
- ✅ Foundation: README, LICENSE, .gitignore, landing page, CSS dasar
- ✅ Phase 1 selesai 100% (revised docs: realistic estimates, perf strategy, OG image, mobile touch, a11y, fix encoding)
- ✅ **Phase 2 selesai**: 4 docs naratif di `docs/` (Algoritma, ML, AI, Hubungan) — total ~3.000 baris markdown
- 🔄 Lesson learned terealisasi: scan menangkap 5 karakter CJK yang bocor di docs baru, semua sudah difix
- 🔄 **Phase 2 revisi** (post user review): RL didemote dari full section ke 1 paragraf (sinkron dengan KERANGKA §6); Tom Mitchell year 1998→1997; Arthur Samuel split 1952/1959; duplicate Spotify row + CAPTCHA typo + GPT/BERT fix
- 🔄 **Phase 2 revisi #2** (consistency check): KERANGKA-BERPIKIR §6 intro di-rewrite karena misleading ("sengaja dikecualikan" → framing cakupan terbatas); MLOps row di-explain; tambah "Cara baca tabel" guidance
- ✅ **Phase 3 selesai**: SPA shell + 4 section, sorting visualizer (bubble+merge Canvas), decision tree (SVG, 2 datasets), relationship concentric circles (SVG), AI timeline (CSS). Lazy-load via IntersectionObserver, ARIA labels, keyboard navigable. Zero D3 (semua native SVG/Canvas/CSS). Test HTTP server semua asset 200 OK.
- ✅ **Phase 4 selesai**: TF.js MNIST demo page standalone. CNN training in-browser (5000 samples, 3 epochs). Canvas drawing dengan Pointer Events (mouse+touch+pen, touch-action:none). Real-time progress bar + epoch stats + speed. Top-3 prediction dengan confidence bars. Preview 28×28 input. Preset digit picker. Fallback ke synthetic data kalau CDN gagal. CDN Google terverifikasi accessible (10MB images, CORS enabled, ~2.5s download).
- 🐛 **Phase 3/4 bug fix** (laporan user: Decision Tree "Training dimulai..." lalu diam; Relationship tidak render):
  - **Root cause DT**: `renderTree()` di-guard oleh `if (!currentTree)` tapi `currentTree` tidak pernah di-set (selalu `null` dari `reset()`). Akibatnya tiap tick interval → `renderTree()` bail → `renderEmpty()` → reset `stepIndex = -1` → loop selamanya tanpa output. Fix: hapus state mati `currentTree`/`nodesToShow`, guard pakai `stepIndex < 0`.
  - **Bug DT #2**: `visit()` me-return `nodes[nodes.length - 1]` (node terakhir yang dibuat, bukan child saat ini) sehingga `edges` salah relasi. Fix: simpan `record` per-node dan return itu.
  - **Bug DT #3**: koordinat x di-scale dua kali (`visit(..., [40,760])` lalu `n.x * (svgWidth-80) + 40`). Fix: `visit(..., [0,1])` sebagai rentang ternormalisasi.
  - **Bug DT #4**: klik Train saat tree sudah lengkap = langsung "selesai" tanpa animasi. Fix: reset `stepIndex = -1` kalau sudah di ujung.
  - **Bug REL**: `circle.addAttribute?.(...)` (method tidak ada) + `CIRCLE_DATA[key]` pakai `key` yang undefined di scope forEach → `aria-label` jadi string `"undefined"`. Fix: helper `getKey()` + hapus dead call.
  - **Defensive**: null-guard `trainBtn`/`stepBtn` di `reset()`/`step()`/`startTraining()`; early-return kalau `#dt-tree`/`#rel-svg` tidak ada; fallback eager-load kalau `IntersectionObserver` tidak tersedia.
  - **Verifikasi**: mock-DOM functional test — DT render 7 node progresif (1.5s→6.8s) dengan status per-node; REL render 4 grup lingkaran dan klik tiap lingkaran meng-update info panel. Kedua test PASS.
  - ✅ **Konfirmasi user (2026-09-10)**: Decision Tree Trainer bekerja — "Training selesai! Tree lengkap." muncul dan node tumbuh progresif. Root cause analysis valid.
  - ✅ **Konfirmasi user (2026-09-10)**: Diagram Konsentris juga bekerja — klik tiap lingkaran meng-update info panel.
- ✅ **Phase 5 selesai**: `slides.html` — 979 baris, Reveal.js 5.1.0 via CDN, 12 slide + speaker notes lengkap. Custom theme selaras design token website (biru/oranye/ungu). Navigasi keyboard, progress bar, slide number, responsive <700px.
- ✅ **Phase 6 selesai**: `video/script.md` (433 baris, 3 versi: 100 detik / 45 detik / 3 menit + catatan voice-over), `video/storyboard.md` (271 baris, 10 scene + timing + catatan produksi visual), `video/README.md` (206 baris, tools + alur produksi + editing + publish LinkedIn). Rekaman fisik = opsional (N1).
- 🚧 **Phase 7 dimulai**: OG image digenerate (`scripts/generate-og-image.py` → `website/assets/og-image.png`, 1200×630, 51 KB, terverifikasi programatik tanpa overflow/overlap). Meta tags OG + Twitter Card lengkap di 4 HTML. Reveal.js di-upgrade 5.1.0 → 5.2.1. `.nojekyll` ditambahkan. Panduan manual `PHASE-7-CHECKLIST.md` ditulis.
- ⚠️ **Blocker git (temuan audit)**: folder ini bukan repo git mandiri — berada di dalam checkout `deepseek-harness` (remote `deepseek-ai/deepseek-harness`). `git ls-files .` = 0, jadi belum ada file kita yang masuk parent repo, tapi juga belum ada `.git` sendiri. Repo `ibam28/from-algorithms-to-ai` belum dibuat di GitHub. **Perlu keputusan user** sebelum push.
- 🔍 **Audit pasca-Phase 6**: menemukan `video/script.md` gagal tertulis di turn sebelumnya (rujukan dari 4 file menunjuk ke file yang tidak ada) — sudah diperbaiki. Ditemukan juga duplikat baris `Checkpoint C3` di ROADMAP dan status F2–F8 di PRD yang belum di-update — keduanya sudah dibersihkan.

---

## Next Action (Segera)

**Semua konten selesai (7/8 fase).** Yang tersisa adalah **aksi manual user**:

1. **Push ke GitHub** — repo sudah siap di `/home/alsa/projects/from-algorithms-to-ai` (git sudah di-init, commit lokal sudah dibuat). Buat repo GitHub, push, aktifkan Pages. Perintah lengkap ada di `PHASE-7-CHECKLIST.md` §6.
2. **Jalankan `PHASE-7-CHECKLIST.md`** — Lighthouse (§1), 4 browser (§2), responsive (§3), keyboard (§4). Ini yang menentukan kesan pertama.
3. **Validasi OG preview** — setelah URL publik aktif, cek via LinkedIn Post Inspector (`PHASE-7-CHECKLIST.md` §5).
4. **Post ke LinkedIn** — pakai `launch/linkedin-post.md`, taruh link di komentar pertama.

Catatan arsitektur yang masih berlaku:
- Visualisasi dimuat saat scroll via IntersectionObserver (fallback eager-load kalau API tidak ada) — lihat ARSITEKTUR §6
- TF.js + MNIST demo dimuat lazy saat section terlihat (ARSITEKTUR §8)
- Canvas drawing pakai Pointer Events untuk touch (ARSITEKTUR §7.1)
- OG image dibikin di Phase 7 (jalan terakhir sebelum publish)

---

## Risk & Blocker Tracking

| Risk | Severity | Mitigation | Status |
|---|---|---|---|
| MNIST training terlalu lambat di browser | Medium | Kurangi epoch, fallback ke pretrained model | ⬜ |
| Visualisasi D3.js terlalu kompleks | Medium | Mulai simple, iterate | ⬜ |
| Slide deck 12 slide terlalu banyak/kurang | Low | Adjust setelah review | ⬜ |
| LinkedIn algorithm membatasi reach | Medium | Jam prime + hashtag relevan | ⬜ |

---

## Done Criteria (Project Complete)

Proyek dianggap **SELESAI** ketika:

- [ ] Semua Phase 1–7 ✅
- [ ] Phase 8 minimal Phase 1 (post LinkedIn pertama)
- [ ] GitHub Pages URL live dan functional
- [ ] Lighthouse score semua >90
- [ ] Mobile responsive tested
- [ ] Update README dengan link live
- [ ] User (@ibam28) declare "launched"

---

**File ini adalah single source of truth untuk status & progress. Update setiap selesai task.**
