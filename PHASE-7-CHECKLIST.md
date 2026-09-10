# ✅ Phase 7 — Checklist Polish & Publish

> Panduan manual untuk hal-hal yang **tidak bisa** diverifikasi otomatis.
> Jalankan berurutan. Setiap langkah punya "kriteria lulus" yang jelas.

---

## 0. Sebelum Mulai

```bash
cd /home/alsa/AI/deepseek-harness/Harness-LinkedIn
python3 -m http.server 8000
```

Buka `http://localhost:8000/` — biarkan tab ini terbuka sepanjang checklist.

**Alat yang perlu siap:**
- Chrome/Edge (untuk Lighthouse — paling akurat)
- Firefox
- Safari (kalau ada Mac) — atau skip, catat sebagai tidak ditest
- Browser DevTools (F12)

---

## 1. Lighthouse Audit

### Cara

1. Buka `http://localhost:8000/` di **Chrome Incognito** (biar extension tidak mengganggu)
2. F12 → tab **Lighthouse**
3. Setelan: **Mode: Navigation**, **Device: Mobile**, **Categories: semua**
4. Klik **Analyze page load**

### Kriteria Lulus

| Metrik | Target | Landing |
|---|---|---|
| Performance | ≥ 90 | |
| Accessibility | ≥ 95 | |
| Best Practices | ≥ 95 | |
| SEO | ≥ 95 | |

Ulangi untuk `http://localhost:8000/website/` (target Performance ≥ 90, sedikit lebih rendah karena lazy-load).

### Kalau Gagal

| Gejala | Kemungkinan penyebab | Fix |
|---|---|---|
| Performance < 90 | Font/render blocking | Cek `font-display: swap` |
| Accessibility < 95 | Kontras warna | Cek `--color-text-muted` vs `--color-bg` |
| SEO < 95 | Meta description hilang | Sudah ada, cek tidak duplikat |
| Best Practices < 95 | Console error | Cek tab Console |

**Catat skor di sini:**

```
Landing:    Perf ___  A11y ___  BP ___  SEO ___
Website:    Perf ___  A11y ___  BP ___  SEO ___
```

---

## 2. Test 4 Browser

Untuk **setiap** browser, buka dan jalankan:

| # | Aksi | Kriteria lulus |
|---|---|---|
| 1 | Buka `http://localhost:8000/` | Landing page tampil, 4 kartu terlihat |
| 2 | Klik "Website Interaktif" | Pindah ke `/website/`, nav muncul |
| 3 | Scroll ke **Algoritma** → klik **Start** | Bar sorting beranimasi, warna berganti |
| 4 | Ganti ke **Merge Sort** → Start | Animasi berbeda dari bubble sort |
| 5 | Scroll ke **ML** → klik **Train** | Tree tumbuh node-per-node, status update |
| 6 | Klik lingkaran **AI / ML / Algoritma** di Hubungan | Panel info berganti teks |
| 7 | Klik **"Buka MNIST Demo"** | Halaman demo terbuka |
| 8 | Klik **"Mulai Training"** | Progress bar jalan, loss/accuracy update |
| 9 | Gambar angka di canvas → **Prediksi** | Hasil + top-3 muncul |
| 10 | Buka `http://localhost:8000/slides.html` | Slide 1 tampil, panah kanan pindah slide |

**Ceklis:**

| Browser | Versi | Semua 10 langkah lolos? | Catatan |
|---|---|---|---|
| Chrome | | ☐ | |
| Firefox | | ☐ | |
| Safari | | ☐ | |
| Edge | | ☐ | |

### Yang Sering Beda Antar Browser

- **Safari**: `aspect-ratio` pada canvas — cek tidak gepeng
- **Firefox**: `backdrop-filter` — mungkin tidak render blur
- **Touch**: kalau ada HP, test gambar di canvas MNIST (Pointer Events)

---

## 3. Test Responsive (320px – 1920px)

### Cara

F12 → klik ikon **Toggle device toolbar** (Ctrl+Shift+M) → ubah lebar.

### Lebar yang Wajib Ditest

| Lebar | Perangkat | Yang dicek |
|---|---|---|
| 320px | iPhone SE lama | Nav tidak tumpang tindih, teks tidak terpotong |
| 375px | iPhone standar | Canvas MNIST masih bisa digambar |
| 768px | Tablet portrait | Grid 3 kolom jadi 1-2 kolom |
| 1024px | Tablet landscape | Layout mulai lega |
| 1440px | Laptop | Tidak ada ruang kosong berlebih |
| 1920px | Monitor besar | Konten tidak melebar tak terbatas |

**Ceklis:**

| Lebar | Landing | Website | Slides | MNIST | Catatan |
|---|---|---|---|---|---|
| 320px | ☐ | ☐ | ☐ | ☐ | |
| 375px | ☐ | ☐ | ☐ | ☐ | |
| 768px | ☐ | ☐ | ☐ | ☐ | |
| 1024px | ☐ | ☐ | ☐ | ☐ | |
| 1440px | ☐ | ☐ | ☐ | ☐ | |
| 1920px | ☐ | ☐ | ☐ | ☐ | |

**Yang paling rawan:**
- Sorting canvas di 320px — apakah masih proporsional?
- MNIST canvas — apakah `touch-action: none` bekerja (tidak scroll saat menggambar)?
- Slides — apakah `.concentric` diagram masih muat?

---

## 4. Keyboard & Screen Reader (Best-Effort)

> Sesuai ARSITEKTUR §10: narasi konten = komitmen WCAG 2.1 AA. Visualisasi = best-effort dengan limitasi yang diakui.

### Test Keyboard

Tekan **Tab** berulang dari awal halaman:

| # | Fokus harus sampai | Kriteria |
|---|---|---|
| 1 | Skip link | Muncul saat difokus, Enter melompat ke konten |
| 2 | Nav links | Tiap link fokus terlihat (outline) |
| 3 | Kartu landing | Bisa di-Enter |
| 4 | Tombol Start/Pause sorting | Bisa di-Enter |
| 5 | Lingkaran Hubungan | Tab masuk, Enter mengubah info |
| 6 | Tombol di MNIST | Semua reachable |

**Ceklis:** ☐ Tidak ada "focus trap" · ☐ Outline terlihat jelas · ☐ Urutan logis

### Test Screen Reader (opsional)

- **Linux**: Orca (`orca --replace`)
- **macOS**: VoiceOver (Cmd+F5)
- **Windows**: NVDA

Yang dicek: heading terbaca berurutan, `aria-live` mengumumkan status sorting, tombol punya label.

---

## 5. Validasi Open Graph

OG image sudah digenerate (`website/assets/og-image.png`, 1200×630). Sekarang verifikasi preview-nya.

### LinkedIn Post Inspector

1. Buka https://www.linkedin.com/post-inspector/
2. Masukkan URL — **harus URL publik dulu** (lihat langkah 6)
3. Kalau belum publik, skip dulu, ulangi setelah GitHub Pages aktif

### Twitter/X Card Validator

1. Buka https://cards-dev.twitter.com/validator
2. Masukkan URL publik

### Cek Manual (tanpa tool)

Buka `view-source:` halaman, pastikan:

```
og:image      → .../website/assets/og-image.png  (harus 200 OK)
og:image:width  → 1200
og:image:height → 630
og:title        → ada, tidak kosong
og:description  → ada, < 200 karakter
twitter:card    → summary_large_image
```

**Ceklis:** ☐ `og:image` 200 OK · ☐ Dimensi 1200×630 · ☐ Semua HTML punya tags lengkap

---

## 6. Publish ke GitHub

> ⚠️ **Butuh keputusan:** folder ini belum jadi repo git sendiri. Lihat catatan di ROADMAP.

### Langkah

```bash
# 1. Inisialisasi repo di folder ini
git init
git branch -M main

# 2. Commit pertama
git add .
git commit -m "feat: From Algorithms to AI — portfolio interaktif"

# 3. Buat repo di GitHub
gh repo create from-algorithms-to-ai --public --source=. --push

# 4. Aktifkan GitHub Pages
gh api -X POST "repos/ibam28/from-algorithms-to-ai/pages" \
  -f "source[branch]=main" -f "source[path]=/"
```

### Setelah Publish

Tunggu 1–2 menit, lalu buka:

```
https://ibam28.github.io/from-algorithms-to-ai/
```

**Ceklis:**
- ☐ Landing page terbuka
- ☐ `/website/` terbuka, visualisasi jalan
- ☐ `/slides.html` terbuka
- ☐ `/website/js/ml-demo/mnist.html` — training jalan
- ☐ OG image bisa diakses (buka URL image langsung)
- ☐ Ulangi LinkedIn Post Inspector dengan URL publik

---

## 7. Minta Feedback

Kirim URL ke **1–2 orang** — idealnya satu teknis, satu non-teknis.

**Pertanyaan yang ditanyakan:**
1. Dalam 30 detik, apa yang kamu paham dari halaman ini?
2. Bagian mana yang paling membingungkan?
3. Apakah tombol demo terasa jelas fungsinya?
4. Kalau kamu recruiter, apakah halaman ini bikin kamu tertarik?

Catat jawabannya — itu bahan perbaikan Phase 8.

---

## Ringkasan Ceklis

```
☐ Lighthouse landing ≥ 90/95/95/95
☐ Lighthouse website ≥ 90/90/95/95
☐ 4 browser × 10 langkah
☐ 6 lebar viewport
☐ Keyboard navigation
☐ OG preview valid
☐ GitHub Pages aktif
☐ URL publik bisa diakses
☐ Feedback dari 2 orang
```

Setelah semua ☐ → **Phase 8: LinkedIn Launch**.