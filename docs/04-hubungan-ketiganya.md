# 04. Hubungan Algoritma × ML × AI

> Bagaimana ketiganya saling terkait, di mana mereka berbeda, dan kapan satu bukan bagian dari yang lain.

📚 **Bagian dari seri:** [00. Beranda](../README.md) → [01. Algoritma](01-algoritma.md) → [02. Machine Learning](02-machine-learning.md) → [03. Artificial Intelligence](03-artificial-intelligence.md) → **04. Hubungan Ketiganya**

---

## 📌 Intinya (TL;DR)

```
AI = tujuan besar ("mesin bertindak cerdas")
ML = salah satu cara mencapai AI ("belajar dari data")
Algoritma = alat dasar yang dipakai keduanya ("resep/langkah-langkah")
```

**Rumus penting (sebagian, tidak absolut):**

```
Machine Learning ⊂ Artificial Intelligence
Algoritma ∩ ML = banyak (ML pakai banyak algoritma)
Algoritma ∩ AI = banyak tapi tidak semua
ML ∩ Symbolic AI = ∅ (tidak overlap — beda pendekatan)
```

---

## 🎯 Visualisasi Hubungan

### Diagram Konsentris (Cara Paling Umum)

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│           🤖 Artificial Intelligence               │
│              (paling luas / payung)                 │
│                                                     │
│      ┌──────────────────────────────────────┐      │
│      │                                      │      │
│      │      🧠 Machine Learning             │      │
│      │         (subset dari AI)             │      │
│      │                                      │      │
│      │      ┌──────────────────────┐        │      │
│      │      │   📐 Algoritma       │        │      │
│      │      │   (alat utama)       │        │      │
│      │      └──────────────────────┘        │      │
│      │                                      │      │
│      └──────────────────────────────────────┘      │
│                                                     │
│      🔧 Symbolic AI (rule-based) ← juga AI, BUKAN ML│
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Cara baca:**
- AI = lingkaran paling luar (paling luas)
- ML = di dalam AI (subset)
- Algoritma = di dalam ML (ML pakai algoritma)
- Symbolic AI = di dalam AI tapi **di luar** ML (AI tanpa ML)

### Diagram Venn (Cara Alternatif)

```
        ┌──────────────┐
        │  Algoritma   │
        │  (banyak)    │
        └──────┬───────┘
               │ ∩ (irisan dengan ML)
        ┌──────▼───────┐
        │     ML       │─────── bukan Algoritma
        │  (subset AI) │       (mungkin), tapi ML
        └──────┬───────┘       selalu pakai algoritma
               │
        ┌──────▼───────┐
        │     AI       │
        │  (paling     │
        │   luas)      │
        └──────────────┘
```

**Cara baca:** Algoritma & ML overlap banyak. ML ⊂ AI. Tidak semua algoritma adalah ML, tapi ML selalu pakai algoritma.

---

## 🍳 Restoran Pintar (Recall)

Kita pakai analogi yang sama dari section sebelumnya:

| Konsep | Analogi Restoran |
|---|---|
| **AI** | Restoran pintar **sebagai keseluruhan** (koki + pelayan + kasir + manajer) |
| **ML** | **Koki** yang belajar dari 10.000 percobaan |
| **Algoritma** | **Resep** — langkah-langkah yang dijalankan koki |

**Hubungan:**

- Restoran pintar (AI) **pasti punya koki** (ML)? — Tidak, bisa juga ada restoran yang koki-nya cuma masak dari resep (algoritma biasa). Tapi restoran modern cenderung punya koki yang adaptif.
- Koki (ML) **pasti pakai resep** (algoritma)? — Ya, ML = banyak algoritma yang bekerja sama.
- Restoran (AI) **pasti punya koki** (ML)? — Tidak juga. Bisa juga ada restoran dengan **chef berpengalaman yang masak dari ingatan** (symbolic AI / rule-based).

---

## 🔬 Definisi Formal

### Algoritma

> Urutan langkah-langkah terdefinisi-eksplisit untuk menyelesaikan masalah atau komputasi.

- **Karakteristik:** well-defined, finite, effective
- **Contoh:** bubble sort, binary search, Dijkstra
- **Bidang:** ilmu komputer dasar, matematika

### Machine Learning

> Sub-bidang AI yang fokus pada sistem yang belajar dari data, bukan dari aturan eksplisit.

- **Karakteristik:** generalization dari pola, prediksi probabilistik
- **Contoh:** neural network, decision tree, linear regression
- **Bidang:** statistik + ilmu komputer

### Artificial Intelligence

> Bidang riset yang bertujuan membuat sistem yang melakukan tugas yang biasanya butuh kecerdasan manusia.

- **Karakteristik:** persepsi, reasoning, learning, planning
- **Contoh:** self-driving car, medical diagnosis AI, game-playing AI
- **Bidang:** computer science + cognitive science + philosophy + neuroscience

---

## 📊 Tabel Perbandingan

| Aspek | Algoritma | Machine Learning | Artificial Intelligence |
|---|---|---|---|
| **Apa?** | Langkah-langkah pasti | Belajar dari data | Mesin bertindak "cerdas" |
| **Tujuan** | Solve masalah spesifik | Temukan pola di data | Capai perilaku cerdas |
| **Input** | Data + aturan | Data + label (supervised) | Bervariasi |
| **Output** | Hasil sesuai aturan | Model prediksi | Aksi / keputusan |
| **Contoh** | Sortir array | Filter spam | Mobil self-driving |
| **Tahun mulai** | 300 SM (Euclid) | 1950-an (Samuel) | 1950-an (Turing) |
| **Bidang** | CS dasar | AI + statistik | Multi-disiplin |
| **Ukuran sukses** | Correctness, efficiency | Accuracy, generalization | Behavior quality |

---

## ⚠️ Counter-Examples (Penting!)

Bagian ini menunjukkan **mengapa diagram sederhana tidak selalu benar**. Kalau kamu paham ini, kamu pahami nuansa yang banyak orang miss.

### 1. Symbolic AI ≠ ML (Tapi Dua-duanya AI)

**Symbolic AI** (1950-1990an): pakai **aturan if-then** yang ditulis tangan, bukan belajar dari data.

```python
# Symbolic AI — aturan ditulis manual, BUKAN ML
def diagnose(fever, cough, fatigue):
    if fever and cough and fatigue:
        return "Possible flu"
    elif fever and not cough:
        return "Possible infection"
    else:
        return "Need more data"
```

**Ini AI tanpa ML.** Mengerti bahasa? Tidak. Reasoning pakai aturan? Ya. Tapi tidak belajar dari data.

**Pelajaran:** AI ⊃ ML, dan AI juga ⊃ Symbolic AI. ML bukan satu-satunya cara.

### 2. Algoritma Kuantum ≠ AI

**Shor's algorithm** (1994): algoritma untuk factoring bilangan besar. Sangat powerful, tapi bukan AI.

**Quantum sorting algorithms**: ada, juga bukan AI.

**Pelajaran:** Algoritma ∩ AI = banyak, tapi tidak semua algoritma dipakai untuk AI.

### 3. Statistik Klasik ≠ ML

**Linear regression** dipakai di statistik sejak abad ke-19. Tapi **ML modern** juga pakai linear regression.

Apakah linear regression = ML? **Tergantung konteks:**
- Kalau kamu *train* di data → bisa dianggap ML
- Kalau kamu *fit* manual dengan rumus → statistik klasik

**Pelajaran:** Batas ML dan statistik klasik itu blurry. Bukan discrete, lebih ke spektrum.

### 4. Algoritma Sorting Tradisional vs ML Sorting?

Sorting angka **tidak butuh ML**. Algoritma tradisional (quick sort, merge sort) jauh lebih cepat & akurat.

Tapi ML *bisa* dipakai untuk sorting yang lebih kompleks (mis. mengurutkan foto berdasarkan "keindahan") — karena gak ada rumus pasti untuk "keindahan".

**Pelajaran:** ML bukan selalu solusi terbaik. Untuk masalah dengan aturan jelas, algoritma biasa menang.

### 5. Game AI ≠ selalu ML

AI di game catur klasik (1997 Deep Blue) pakai **search algorithms + rules**, bukan ML. Baru akhir-akhir ini AlphaZero pakai **reinforcement learning** (ML).

**Pelajaran:** "AI" di game belum tentu ML.

---

## 🎯 Cara Membedakan dengan Tepat

### Algoritma atau ML?

```
Ada aturan eksplisit yang bisa ditulis tangan?
├── Ya → Algoritma
└── Tidak, harus belajar dari data → ML
```

### ML atau Symbolic AI?

```
Sistem belajar dari contoh atau trial-error?
├── Ya → ML
└── Tidak, semua aturan hardcoded → Symbolic AI (masih AI!)
```

### ML atau AI?

```
Tugas yang dilakukan butuh "kecerdasan" mirip manusia?
├── Ya, tapi hanya satu tugas sempit (klasifikasi, prediksi) → ML
└── Ya, multiple tasks kompleks (planning + vision + language) → AI
    (mungkin pakai ML sebagai komponen)
```

---

## 📈 Hierarki yang Lebih Dalam

Kalau kamu ingin lebih detail, ini hierarki lengkap:

```
Artificial Intelligence
├── Machine Learning
│   ├── Supervised Learning
│   │   ├── Classification
│   │   └── Regression
│   ├── Unsupervised Learning
│   │   ├── Clustering
│   │   └── Dimensionality Reduction
│   ├── Reinforcement Learning
│   └── Self-Supervised Learning
│       └── Foundation Models (LLM, vision-language models)
├── Deep Learning (subset ML yang pakai deep neural networks)
│   ├── CNN (Convolutional) — untuk gambar
│   ├── RNN / LSTM — untuk sequence
│   ├── Transformer — untuk bahasa (LLM, multimodal models)
│   └── GAN — untuk generate (gambar, musik)
├── Symbolic AI / GOFAI
│   ├── Expert Systems
│   ├── Logic Programming
│   └── Planning Systems
├── Search & Optimization
│   ├── A*, Dijkstra
│   └── Genetic Algorithms
└── Robotics & Control Systems
```

**Yang sering bikin bingung:**
- **Deep Learning ⊂ Machine Learning** (bukan di luar)
- **Foundation Models / LLM ⊂ Self-Supervised Learning ⊂ ML**
- **Symbolic AI ⊂ AI** (tapi ⊄ ML)

---

## 🌍 Contoh Konkret: Satu Use Case, Tiga Layer

**Sistem rekomendasi Netflix:**

```
┌─────────────────────────────────────────────────────┐
│  LAYER 3: AI (sistem rekomendasi secara keseluruhan)│
│                                                     │
│  • Homepage yang personalized                       │
│  • Mixed: content-based + collaborative            │
│  • A/B testing terus-menerus                        │
│  • Cold start handling                              │
└─────────────────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│  LAYER 2: ML (model prediksi)                        │
│                                                     │
│  • Matrix factorization (apa yang user X suka)      │
│  • Neural network untuk content embedding           │
│  • Deep learning untuk thumbnail selection          │
└─────────────────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│  LAYER 1: Algoritma (infrastruktur komputasi)        │
│                                                     │
│  • Sorting untuk ranking hasil                      │
│  • Graph algorithms untuk "teman juga suka"         │
│  • Hashing untuk fast lookup                        │
│  • Database query optimization                     │
└─────────────────────────────────────────────────────┘
```

**Pelajaran:** AI modern = ML + algoritma + integrasi sistem. Bukan salah satu saja.

---

## ⚠️ Miskonsepsi Umum

| Miskonsepsi | Faktanya |
|---|---|
| "AI = ML" | Tidak. ML subset AI. Symbolic AI juga AI. |
| "ML = deep learning" | Tidak. DL subset ML. Ada banyak ML klasik (SVM, Random Forest). |
| "Algoritma = AI" | Tidak. Algoritma lebih fundamental, dipakai banyak hal. |
| "AI selalu robot" | Tidak. AI bisa software murni (ChatGPT, filter spam). |
| "AI akan sadar besok" | Tidak. Narrow AI sangat jauh dari general AI (AGI). |
| "ML pasti akurat" | Tidak. Tergantung data. Bisa bias dan salah. |
| "Algoritma = kode program" | Tidak. Algoritma = konsep, kode = ekspresi. |
| "ML baru" | Tidak. Sudah dari 1950-an. Yang baru: skala data & komputasi. |

---

## 🧭 Peta Karir di Bidang Ini

Kalau kamu mau masuk ke salah satu bidang:

| Minat | Mulai Belajar | Tools |
|---|---|---|
| **Algoritma** | Struktur data, algoritma dasar, kompleksitas | Python, C++, LeetCode |
| **ML Engineering** | scikit-learn, TensorFlow, deployment | Python, TF/PyTorch, Docker |
| **AI Research** | Matematika, deep learning, paper reading | PyTorch, JAX, paper repo |
| **AI Product** | Domain expertise + pakai AI tools | LLM API, no-code ML |
| **Data Science** | Statistik, SQL, ML dasar | Python, R, SQL, Tableau |
| **MLOps** | Deployment, monitoring, infrastructure | Kubernetes, MLflow, AWS |

**Insight:** Banyak jalan masuk. Tidak harus PhD.

---

## 🎓 Ringkasan Satu Kalimat Tiap Konsep

| Konsep | Definisi 1 Kalimat |
|---|---|
| **Algoritma** | Langkah-langkah pasti untuk menyelesaikan masalah, ibarat resep masakan. |
| **Machine Learning** | Program yang belajar dari contoh, bukan dari aturan, ibarat koki yang belajar dari ribuan percobaan. |
| **Artificial Intelligence** | Mesin yang bertindak "cerdas", ibarat restoran pintar yang punya koki adaptif, pelayan paham bahasa, kasir kenal wajah, dan manajer yang optimal. |

**Hubungan:**

```
Algoritma → fondasi (dipakai banyak hal)
ML → pakai algoritma untuk belajar dari data
AI → mungkin pakai ML (atau symbolic) untuk bertindak cerdas
```

---

## ❓ FAQ Final

**Q: Kalau saya hanya ingat satu hal, ingat apa?**
A: **AI = tujuan, ML = salah satu cara, Algoritma = alat yang dipakai keduanya.**

**Q: Mana yang paling penting untuk dipelajari dulu?**
A: **Algoritma**. Semua ML & AI dibangun di atas algoritma. Paham algoritma = paham fondasi.

**Q: Apakah AI/ML akan gantikan software engineering?**
A: Tools AI akan *menggantikan* beberapa tugas (boilerplate code, testing), tapi *membuat* software engineer **lebih produktif**. Permintaan engineer mungkin bergeser, bukan hilang.

**Q: Kenapa diagram "AI ⊃ ML ⊃ Algoritma" tidak 100% akurat?**
A: Karena (a) Algoritma tidak *hanya* untuk ML — banyak algoritma di luar ML, dan (b) AI juga pakai Symbolic AI yang bukan ML. Diagram itu berguna untuk first-glance understanding, tapi counter-examples perlu diingat untuk akurasi.

**Q: Deep Learning = AI?**
A: Deep Learning ⊂ ML ⊂ AI. Deep Learning adalah subset khusus yang pakai neural network berlapis banyak. Sangat cocok untuk data tidak terstruktur (gambar, teks, audio).

---

## 📖 Rangkai Series

Kamu sudah baca semua 4 bagian! 🎉

1. **[01. Algoritma](01-algoritma.md)** — fondasi
2. **[02. Machine Learning](02-machine-learning.md)** — belajar dari data
3. **[03. Artificial Intelligence](03-artificial-intelligence.md)** — bertindak cerdas
4. **[04. Hubungan Ketiganya](04-hubungan-ketiganya.md)** — gimana semuanya nyambung

**Langkah selanjutnya:**
- 🌐 **Lihat visualisasi interaktif di [website](../website/index.html)**
- 🎞️ **Lihat [slide deck](../slides.html) untuk presentasi**

---

## 📚 Referensi Tambahan

- [DeepLearning.AI — AI for Everyone](https://www.deeplearning.ai/courses/ai-for-everyone/) — kursus Andrew Ng untuk non-technical
- [Google — Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course)
- [Distill.pub](https://distill.pub/) — visualisasi ML yang indah & akurat
- *The Hundred-Page Machine Learning Book* — Andriy Burkov. Ringkas tapi komprehensif.
- *AI Superpowers* — Kai-Fu Lee. Perspektif AI dari Asia.

---

*Dibuat oleh [@ibam28](https://github.com/ibam28) · Konten ini bagian dari proyek [From Algorithms to AI](../README.md) · Lisensi MIT*
