# 🧠 Kerangka Berpikir

> Mental model & narasi utama proyek "From Algorithms to AI".
> File ini menjelaskan **kenapa** kita memilih journey Algorithms → ML → AI, dan bagaimana menjelaskannya ke audiens awam.

---

## 1. Narasi Inti: Journey, Bukan Definisi

Proyek ini **TIDAK dimulai** dari "AI adalah..." (terlalu ambisius, langsung membingungkan).

Proyek ini dimulai dari **"Algoritma"** — konsep yang sudah akrab — lalu membawa pelan-pelan ke **"AI"** lewat **"Machine Learning"** sebagai jembatan.

```
Algorithms (familiar)  →  Machine Learning (jembatan)  →  AI (menarik)
       📐                          🤖                          ✨
```

### Kenapa Journey Works (secara psikologis & marketing)

1. **Start from what people already know** — semua orang pernah dengar "algoritma" (TikTok, Instagram, Google)
2. **Setiap langkah terasa kecil** — tidak overwhelming
3. **ML dapat "ditempatkan"** dengan benar — bukan dipuja, bukan diremehkan
4. **AI terasa reachable** — bukan magic, bukan sekadar buzzword
5. **"From X to Y"** adalah formula judul yang proven works di YouTube/blog/LinkedIn

---

## 2. Branding Decision: "From Algorithms to AI"

### Kenapa branding ini, bukan yang lain?

Alternatif yang dipertimbangkan:

| Opsi | Plus | Minus |
|---|---|---|
| AI vs ML vs Algorithms | Informatif | Terlalu defensive, ada "vs" |
| Understanding AI | Generik | Tidak memorable |
| **From Algorithms to AI** ✅ | Journey feel, dua kata populer | — |
| AI Explained | Biasa | Banyak yang sudah pakai |

**Insight dari diskusi user:**
> "Kata ML kurang populer dibanding AI atau Algorithms — orang kurang tertarik"

→ **"From Algorithms to AI"** menangkap dua kata yang sudah menarik perhatian publik, dengan ML menjadi "jembatan" yang powerful tapi tidak dijual di depan. Strategi: Algorithms menarik orang masuk, AI membuat mereka ingin lanjut, ML adalah "hidden gem" yang mereka temukan di tengah.

---

## 3. Tiga Lensa Penjelasan

Kita perlu menjelaskan hubungan ini dengan **3 sudut pandang berbeda**, supaya audiens benar-benar paham:

### 🔵 Lensa 1: Hubungan (Venn / Konsentris)

```
┌──────────────────────────────────────┐
│           AI (paling luas)           │
│      "mesin bertindak cerdas"        │
│                                      │
│    ┌────────────────────────────┐    │
│    │       ML (subset)          │    │
│    │    "belajar dari data"     │    │
│    │                            │    │
│    │    ┌──────────────────┐    │    │
│    │    │   Algoritma      │    │    │
│    │    │   (alat utama)   │    │    │
│    │    └──────────────────┘    │    │
│    └────────────────────────────┘    │
└──────────────────────────────────────┘
```

**Pakai kapan:** Untuk menunjukkan bahwa tidak semua AI adalah ML, dan tidak semua Algoritma dipakai untuk AI.

### 🟢 Lensa 2: Journey (Perjalanan)

```
[Algorithms]  →  [Machine Learning]  →  [AI]
    📐                  🤖                  ✨
 familiar          belajar dari data    encompasses semua
```

**Pakai kapan:** Untuk narasi utama, urutan baca, branding repo.

### 🟡 Lensa 3: Counter-Examples (Untuk menunjukkan kedalaman)

Untuk audiens yang lebih kritis atau teknis:

| Contoh | Apa yang ditunjukkan |
|---|---|
| **Symbolic AI** (rule-based expert systems) | AI tanpa ML — AI ≠ ML |
| **Quantum algorithms** (Shor's algorithm) | Algoritma tanpa AI — Algoritma ≠ AI |
| **Linear regression** (statistik klasik) | Algoritma yang dipakai ML, tapi ML ≠ cuma regresi |

**Pakai kapan:** Di docs/ atau section "Hubungan" — untuk menunjukkan kita paham nuansa, bukan simplifikasi kosong.

---

## 4. Analogi: Dapur Restoran

| Konsep | Analogi | Kenapa dapur? |
|---|---|---|
| **Algoritma** | Resep masakan — langkah-langkah pasti (5 menit aduk, 180°C) | Universal, semua orang masak/makan |
| **Machine Learning** | Koki yang belajar dari 10.000 percobaan | Proses belajar, improvisasi |
| **AI** | Restoran pintar — koki ML + pelayan NLP + kasir computer vision + manajer planning | Hierarki jelas, scalable |

### Kenapa Dapur, Bukan Analogi Lain?

| Analogi lain | Kenapa tidak |
|---|---|
| Otak & neuron | Terlalu tech-forward, audiences takut |
| Matahari & planet | Terlalu abstrak |
| **Dapur & restoran** ✅ | Relatable, ada hierarki, ada chemistry manusia |

---

## 5. Insight Kunci yang Harus Tersampaikan

Setiap visitor, setelah 5 menit eksplorasi, harus pulang dengan membawa 4 insight ini:

1. **AI = tujuan, ML = salah satu cara, Algoritma = alat**
2. **ML belajar dari data, bukan dari aturan** — ini pembeda utama dengan symbolic AI
3. **Algoritma bukan cuma untuk komputer** — resep masakan juga algoritma
4. **ML bukan magic** — di belakangnya ada matematika + statistik + data

### Insight Bonus (kalau waktu memungkinkan)

5. Deep Learning ⊂ ML ⊂ AI (hierarki yang lebih dalam)
6. "No Free Lunch" — tidak ada algoritma yang terbaik untuk semua masalah
7. AI butuh data berkualitas, bukan cuma banyak data

---

## 6. Apa yang TIDAK Dijelaskan di Level Ini

> Daftar di bawah ini menjelaskan **topik yang kita batasi cakupannya** untuk menjaga fokus audiens awam. "Di mana" menjelaskan apakah topik itu **tidak dibahas sama sekali** (—), **hanya disinggung sekilas** (brief mention), atau **ditunda untuk iterasi masa depan** (future section).

| Topik | Kenapa tidak | Di mana (kalau nanti) |
|---|---|---|
| Matematika gradient descent | Terlalu dalam | docs/02-machine-learning.md (advanced section) |
| Backpropagation detail | Bisa intimidating | Optional, hanya di code comment |
| Nama model spesifik (GPT-4, BERT) | Cepat outdated | Cukup contoh kategori (LLM, vision model) |
| AI ethics & bias | Topik besar sendiri | Mungkin section terpisah di masa depan |
| Reinforcement learning | Overload untuk first contact | docs/02 — 1 paragraf singkat di akhir ML types (bukan full section) |
| MLOps / deployment pipeline | Bukan untuk audiens awam | — (kecuali untuk career section di 04, yang opt-in untuk hiring manager) |

**Cara baca tabel:**
- Kolom "Kenapa tidak" = alasan edukatif, bukan hard rule
- Kolom "Di mana" = **bisa kosong** (`—`) artinya tidak direncanakan, **bisa singkat** artinya ada acknowledge tanpa deep-dive, **bisa future** artinya ditunda tapi masuk roadmap
- **PRINSIP UTAMA:** kalau di docs nanti kita bahas topik yang tertulis `—` di kolom ini, berarti KERANGKA ini harus di-update dulu (lihat WORKFLOW §12)

---

## 7. Tone of Voice

### Karakter Suara Proyek Ini

- 🤝 **Friendly, bukan condescending** — kita teman yang menjelaskan, bukan guru yang menggurui
- 😄 **Humor sesekali** — boleh lucu, tapi tidak berlebihan (analogi dapur boleh ada humor)
- ✅ **Teknis jujur** — tidak oversimplify sampai misleading (jangan bilang "AI itu robot pintar")
- 🎨 **Visual-first** — paragraf pendek, banyak diagram, banyak demo
- 🇮🇩 **Bahasa Indonesia** untuk naratif
- 🇬🇧 **English** untuk istilah teknis (industry standard, lebih credible untuk rekruiter)

### Contoh Kalimat yang Tepat

✅ "ML itu seperti koki yang belajar dari 10.000 percobaan — dia tidak baca resep, dia belajar dari hasil masakannya."

❌ "Machine learning adalah subset dari artificial intelligence yang menggunakan statistical methods untuk..."

### Contoh Nada untuk Audiens Berbeda

| Audiens | Nada |
|---|---|
| HR Recruiter | Hangat, simple, banyak emoji, no jargon |
| Hiring Manager | Lebih precise, boleh istilah, fokus ke "what it shows about my skills" |
| Orang awam | Storytelling, banyak analogi, slow-paced |

---

## 8. Output yang Diharapkan dari Pengunjung

Setelah eksplorasi, visitor harus bisa:

1. ✍️ Menjelaskan ke teman bedanya AI, ML, Algoritma (30 detik)
2. 🧠 Mengenali kapan sesuatu "ML" vs "AI generik"
3. 👀 Melihat portfolio piece @ibam28 dan tertarik kontak lebih lanjut
4. 🔗 Share ke LinkedIn karena kontennya bagus (marketing organik)

---

## 9. Anti-Patterns (Hindari)

❌ **Jargon tanpa penjelasan** — "CNN dengan arsitektur ResNet-50..." tanpa konteks
❌ **Definisi textbook** — copy-paste dari Wikipedia
❌ **Hype berlebihan** — "AI akan mengubah dunia..." (cliché)
❌ **Falsely simple** — "AI = robot" (misleading)
❌ **Too academic** — paragraf 500 kata tanpa visual
❌ **Apologetic** — "maaf kalau penjelasan saya kurang jelas" (tidak perlu)

---

## 10. Referensi Naratif

Untuk konsistensi, kalau butuh materi tambahan:

- **Buku:** "Gödel, Escher, Bach" (Douglas Hofstadter) — palindrom thinking tentang intelligence
- **Video:** 3Blue1Brown "But what is a neural network" — visualisasi neural net terbaik
- **Channel:** Welch Labs — visualisasi AI thinking
- **Kursus:** Andrew Ng "AI for Everyone" — definisi yang tepat untuk non-tech

---

**File ini adalah sumber kebenaran untuk narasi & branding. Kalau ada konflik dengan PRD, PRD yang menang (PRD lebih ke scope, ini lebih ke cara menjelaskan).**
