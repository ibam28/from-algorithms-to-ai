# 🎬 Video — Cara Rekam & Publish

> Panduan praktis untuk merekam, mengedit, dan mempublikasikan video "From Algorithms to AI".
> Video ini **opsional** (nice-to-have N1 di PRD) — portfolio tetap kuat tanpa video.

---

## 1. Apa Isinya

| File | Fungsi |
|---|---|
| `script.md` | Naskah narasi — 3 versi: 100 detik (LinkedIn), 45 detik (Reels), 3 menit (YouTube) |
| `storyboard.md` | Peta visual per scene (10 scene untuk versi 100 detik) |
| `README.md` | File ini — panduan produksi |

---

## 2. Prasyarat

### Hardware

- **Mikrofon:** minimal headset, idealnya mic USB (Blue Yeti, Fifine, atau clip-on)
- **Layar:** resolusi minimal 1920×1080
- **Ruang:** sunyi, tanpa echo (hindari kamar kosong berdinding keras)

### Software (semua gratis)

| Kebutuhan | Rekomendasi |
|---|---|
| Rekam layar | **OBS Studio** (semua OS), atau GNOME Screencast (Linux), QuickTime (macOS) |
| Rekam suara | **Audacity** (terpisah) atau langsung di OBS |
| Editing | **DaVinci Resolve** (gratis, pro) atau **Shotcut** / **Kdenlive** |
| Subtitle | **Subtitle Edit** atau auto-caption YouTube lalu edit manual |
| Musik | **YouTube Audio Library** (bebas royalti) |
| Kompres video | **Handbrake** (kalau file terlalu besar) |

### Aset yang Perlu Disiapkan

1. **Rekaman slide deck** — buka `slides.html`, navigasi tiap slide, rekam penuh
2. **Rekaman demo MNIST** — buka `website/js/ml-demo/mnist.html`, latih model, gambar angka, tunjukkan prediksi
3. **Musik latar** — pilih 1 track ambient dari YouTube Audio Library

---

## 3. Alur Produksi

```
┌──────────────────┐
│ 1. Latihan naskah│  Baca keras 2×, catat waktu per baris
└────────┬─────────┘
         ▼
┌──────────────────┐
│ 2. Rekam layar   │  Slide deck (slides.html) + demo MNIST, terpisah
└────────┬─────────┘
         ▼
┌──────────────────┐
│ 3. Rekam suara   │  Voice-over mengikuti naskah, dengan timer
└────────┬─────────┘
         ▼
┌──────────────────┐
│ 4. Editing       │  Sinkronkan suara + visual, tambah musik + subtitle
└────────┬─────────┘
         ▼
┌──────────────────┐
│ 5. Export        │  MP4 H.264, 1080p, target <50MB untuk LinkedIn
└────────┬─────────┘
         ▼
┌──────────────────┐
│ 6. Publish       │  LinkedIn native upload (bukan link YouTube, kalau bisa)
└──────────────────┘
```

---

## 4. Tips Perekaman

### Rekaman Layar (Slide Deck)

1. Buka `slides.html` di Chrome, tekan **F11** (fullscreen)
2. Gunakan **panah kanan** untuk navigasi — jangan pakai mouse (lebih halus)
3. Rekam tiap slide selama **durasi narasi + 1 detik** buffer
4. Kalau perlu, rekam per-slide terpisah agar mudah di-cut

### Rekaman Layar (Demo MNIST)

1. Buka `website/js/ml-demo/mnist.html`
2. Zoom browser ke **110%** agar teks lebih jelas di video
3. Rekam dalam 3 bagian:
   - Klik "Mulai Training" → tunggu progress (percepat 1.5× di editing)
   - Gambar angka di canvas
   - Klik "Prediksi" → tunjukkan hasil + top-3 bars
4. Total durasi rekaman: ~30 detik mentah → dipotong jadi ~12 detik

### Rekaman Suara

1. Rekam dalam **satu take panjang** kalau memungkinkan (lebih natural)
2. Kalau salah, **jeda 2 detik** lalu ulangi kalimat — potong di editing
3. Jangan berhenti di tengah kalimat untuk memperbaiki — ulangi dari awal kalimat
4. Rekam 2 versi: normal + sedikit lebih lambat (pilih yang terbaik)

### Jeda & Napas

- Tarik napas **diam-diam** sebelum mulai bicara
- Beri jeda **0,5 detik** setelah kalimat kunci
- Jangan takut diam — silence justru membuat poin terasa

---

## 5. Editing — Urutan Kerja

1. **Import** semua rekaman (layar + suara) ke timeline
2. **Align** suara dengan visual (scene 1 mulai bersamaan)
3. **Cut** jeda panjang, sisakan 0,3–0,5s antar-scene
4. **Percepat** bagian training demo MNIST (1.5×–2×)
5. **Tambah** musik latar (volume 15–20% di bawah suara)
6. **Zoom** 5–10% pada bagian "aturan vs data" (scene 4) agar menonjol
7. **Tambah** subtitle (wajib — banyak yang nonton tanpa suara)
8. **Export** MP4 H.264, 1080p, bitrate 8–10 Mbps

### Timeline Contoh (versi 100 detik)

```
0:00 ─── Scene 1 (Title)          ─── 6s
0:06 ─── Scene 2 (Resep)          ─── 8s
0:14 ─── Scene 3 (App)            ─── 6s
0:20 ─── Scene 4 (Aturan vs Data) ─── 10s  ← paling penting
0:30 ─── Scene 5 (Contoh ML)      ─── 8s
0:38 ─── Scene 6 (Konsentris)     ─── 10s
0:48 ─── Scene 7 (Timeline)       ─── 10s
0:58 ─── Scene 8 (Tiga Kartu)     ─── 10s
1:08 ─── Scene 9 (Demo MNIST)     ─── 14s
1:22 ─── Scene 10 (Penutup)       ─── 8s
1:30 ─── END
```

---

## 6. Publish ke LinkedIn

### Kenapa Upload Native (bukan link YouTube)

LinkedIn **memprioritaskan video native** di algoritma feed. Video yang diupload langsung dapat jangkauan 3–5× lebih besar dibanding link ke platform lain.

### Spesifikasi Video LinkedIn

| Aspek | Nilai |
|---|---|
| Format | MP4 |
| Resolusi | 1080×1080 (square) atau 1920×1080 (landscape) |
| Rasio | 1:1, 4:5, atau 16:9 — **1:1 paling optimal untuk mobile** |
| Durasi | 30 detik – 3 menit (100 detik = ideal) |
| Ukuran file | <200MB |
| Caption | **Wajib** — 80% orang menonton tanpa suara |

### Format Caption LinkedIn

```
AI, Machine Learning, dan Algoritma sering dipakai bergantian — padahal beda.

Video 100 detik ini menjelaskan ketiganya tanpa jargon:
📐 Algoritma = resep (langkah pasti)
🤖 ML = koki yang belajar dari percobaan
✨ AI = restoran pintar (payung paling luas)

Kalau kamu mau coba ML asli yang berjalan di browser-mu — bukan cuma teori — saya bikin demo live-nya. Link di komentar 👇

Dibuat oleh @ibam28 · Full Stack + AI Engineer

#AI #MachineLearning #Algoritma #Programming #BelajarAI
```

### Waktu Posting Terbaik

- **Selasa–Kamis, 08:00–10:00** waktu lokal audiens target
- Hindari weekend (engagement turun)
- Hindari jam 12:00–13:00 (orang istirahat, scroll cepat)

---

## 7. Ceklis Sebelum Publish

- [ ] Video sudah ditonton ulang 2× tanpa suara — apakah tetap jelas?
- [ ] Subtitle sinkron dan tidak typo
- [ ] Musik tidak menutupi suara
- [ ] Durasi < 2 menit (untuk LinkedIn)
- [ ] Caption sudah disiapkan (copy-paste siap)
- [ ] Link repo sudah benar dan bisa diakses
- [ ] Thumbnail (kalau ada) menarik — biasanya frame pertama
- [ ] Upload sebagai **native video**, bukan link
- [ ] Tag orang/relevan (kalau ada, jangan spam)
- [ ] Siap balas komentar dalam 1 jam pertama (boost engagement)

---

## 8. Kalau Tidak Sempat Bikin Video

**Tidak masalah.** Video adalah nice-to-have. Portfolio tetap kuat tanpa video karena:

- Website interaktif sudah jadi bukti skill
- Slide deck bisa jadi **carousel LinkedIn** (PDF upload)
- Docs naratif menunjukkan kemampuan menulis & menyederhanakan

**Alternatif cepat:** ubah `slides.html` jadi PDF (print → save as PDF, ukuran landscape), lalu upload sebagai **carousel LinkedIn**. Selesai dalam 10 menit.

---

**File ini fleksibel.** Kalau ada tools yang lebih nyaman, pakai itu. Yang penting pesannya tersampaikan dan konsisten dengan narasi di `script.md` dan `storyboard.md`.