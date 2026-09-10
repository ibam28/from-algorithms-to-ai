# 03. Artificial Intelligence (AI)

> Mesin yang bertindak "cerdas" — "restoran pintar" dengan koki, pelayan, kasir, dan manajer yang semuanya adalah sistem AI.

📚 **Bagian dari seri:** [00. Beranda](../README.md) → [01. Algoritma](01-algoritma.md) → [02. Machine Learning](02-machine-learning.md) → **03. Artificial Intelligence** → [04. Hubungan Ketiganya](04-hubungan-ketiganya.md)

---

## 📌 Intinya (TL;DR)

| Pertanyaan | Jawaban Singkat |
|---|---|
| Apa itu AI? | Mesin yang melakukan tugas yang biasanya butuh kecerdasan manusia |
| AI = ML? | Tidak. AI *lebih luas* — ML adalah *salah satu cara* mencapai AI |
| AI = Robot? | Tidak juga. AI bisa berupa software tanpa fisik (mis. ChatGPT) |
| Kapan AI dimulai? | Konsepnya dari 1950-an, tapi popular naik-turun ("AI winter" & "AI summer") |

---

## 🤔 Apa Itu Artificial Intelligence?

### Definisi Sederhana

> **AI = mesin (biasanya komputer) yang melakukan tugas yang biasanya butuh kecerdasan manusia.**

Tugas itu bisa berupa: memahami bahasa, mengenali gambar, mengambil keputusan, merencanakan, belajar dari pengalaman.

### Definisi Teknis

Secara umum, AI adalah **bidang riset** yang bertujuan membuat sistem yang menunjukkan perilaku "cerdas". Definisi "cerdas" sendiri yang diperdebatkan — ada beberapa pendekatan:

| Pendekatan | Definisi "Cerdas" |
|---|---|
| **Thinking Humanly** | Berpikir seperti manusia (kognisi) |
| **Acting Humanly** | Bertindak seperti manusia (Turing Test) |
| **Thinking Rationally** | Berpikir logis (logika formal) |
| **Acting Rationally** | Bertindak rasional untuk capai tujuan (rational agent) |

Sebagian besar riset AI modern fokus di **Acting Rationally** — bikin sistem yang mengambil keputusan optimal.

### AI Bukan Ini

- ❌ Bukan robot pasti (AI bisa software murni, mis. ChatGPT)
- ❌ Bukan Terminator / sci-fi (AI saat ini jauh dari "general intelligence")
- ❌ Bukan "robot yang bisa berpikir seperti manusia" secara utuh
- ❌ Bukan magic — di belakangnya ada matematika, data, dan rekayasa

---

## 🍳 Analogi: Restoran Pintar

Kalau di [01. Algoritma](01-algoritma.md) kita analogikan *Algoritma* = **resep**, dan di [02. Machine Learning](02-machine-learning.md) *ML* = **koki yang belajar**, maka:

> **AI = sebuah restoran pintar secara keseluruhan.**

```
┌─────────────────────────────────────────────┐
│           RESTORAN PINTAR (AI)              │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │ 👨‍🍳 Koki yang belajar (ML)          │    │
│  │    → bikin menu berdasarkan          │    │
│  │      tren pelanggan                  │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │ 🗣️ Pelayan yang paham bahasa (NLP)   │    │
│  │    → catat pesanan suara, jawab FAQ  │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │ 👁️ Kasir yang kenali wajah (CV)      │    │
│  │    → pengenalan member, fraud detection│    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │ 📊 Manajer yang optimasi (Planning)  │    │
│  │    → prediksi jumlah pengunjung, atur staffing │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
```

**AI bukan satu sistem — AI adalah nama payung** untuk banyak subsistem yang bekerja sama.

---

## 🌳 Cabang-cabang AI

AI itu luas. Berikut cabang utamanya:

### 1. Machine Learning (ML)
- **Apa:** Sistem yang belajar dari data
- **Contoh:** Filter spam, rekomendasi Netflix
- **Detail:** [02. Machine Learning](02-machine-learning.md)

### 2. Natural Language Processing (NLP)
- **Apa:** AI yang memahami & menghasilkan bahasa manusia
- **Contoh:** Google Translate, ChatGPT, Siri
- **Sub-teknik:** Sentiment analysis, machine translation, text generation

### 3. Computer Vision (CV)
- **Apa:** AI yang "melihat" dan memahami gambar/video
- **Contoh:** Face ID, Tesla Autopilot, medical imaging diagnosis
- **Sub-teknik:** Object detection, image segmentation, facial recognition

### 4. Robotics
- **Apa:** AI yang menggerakkan fisik (robot)
- **Contoh:** Boston Dynamics, robot vacuum, factory automation
- **Sub-teknik:** SLAM (Simultaneous Localization and Mapping), motion planning

### 5. Expert Systems / Knowledge Representation
- **Apa:** AI berbasis aturan dan basis pengetahuan (rule-based)
- **Contoh:** MYCIN (diagnosis medis 1970-an), sistem rekomendasi pajak
- **Penting:** Ini AI *tanpa* ML — menunjukkan bahwa AI ≠ ML

### 6. Planning & Reasoning
- **Apa:** AI yang merencanakan urutan aksi untuk capai tujuan
- **Contoh:** Game-playing AI (chess, Go), logistics optimization
- **Sub-teknik:** Search algorithms, constraint satisfaction

### 7. Speech Recognition & Generation
- **Apa:** AI yang mendengar & bicara
- **Contoh:** Siri, Alexa, Google Assistant
- **Overlap:** Sering dianggap bagian dari NLP

### Visualisasi Hubungan

```
                    Artificial Intelligence
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
    Machine           Symbolic AI          Robotics
    Learning          (rules, logic)
        │
   ┌────┼────┐
   │    │    │
   ▼    ▼    ▼
  NLP   CV  Speech
```

---

## 📜 Sejarah Singkat AI

### Timeline Penting

| Tahun | Peristiwa |
|---|---|
| **1950** | Alan Turing publishes "Computing Machinery and Intelligence" — proposes **Turing Test** |
| **1956** | Istilah "Artificial Intelligence" diciptakan di **Dartmouth Conference** |
| **1960s** | **ELIZA** (chatbot pertama) oleh Joseph Weizenbaum. **Symbolic AI** jaya |
| **1970s** | **AI Winter #1** — funding turun karena ekspektasi tidak terpenuhi |
| **1980s** | **Expert Systems** naik (XCON, MYCIN). **AI Winter #2** menyusul |
| **1997** | **Deep Blue** (IBM) kalahkan Garry Kasparov di catur |
| **2006** | **Deep Learning** muncul (Hinton, etc) |
| **2011** | **IBM Watson** menang di Jeopardy! |
| **2012** | **AlexNet** menang ImageNet, mulai revolusi deep learning |
| **2016** | **AlphaGo** (DeepMind) kalahkan Lee Sedol di Go |
| **2017** | Paper **"Attention is All You Need"** — Transformer lahir |
| **2020** | **GPT-3** released, era Large Language Models dimulai |
| **2022** | **ChatGPT** launched, public mulai kenal AI generatif |
| **2024** | LLM multimodal (vision + text + audio), open-source bangkit |

### Dua "AI Winter"

AI punya **siklus hype & kekecewaan**:

```
Hype (1956-1973) → Winter #1 (1974-1980) → Expert Systems (1980-1987) →
Winter #2 (1988-1993) → Statistical ML (1990s-2010) → DL Revolution (2012+)
```

**Pelajaran:** AI bukan hal baru — sudah 70+ tahun. Yang berubah adalah **komputasi** dan **data** yang memungkinkan ide lama akhirnya berjalan.

---

## 🌍 AI Modern di Kehidupan Sehari-hari

| Aplikasi | Cabang AI | Bagaimana Cara Kerjanya |
|---|---|---|
| **ChatGPT / Claude / Gemini** | NLP + LLM | Prediksi kata berikutnya, dilatih dari internet |
| **Google Search** | NLP + ML | Pahami query, ranking jutaan halaman |
| **Tesla Autopilot** | CV + ML | Kenali objek, prediksi pergerakan |
| **Spotify / Netflix rekomendasi** | ML | Collaborative filtering + content-based |
| **Face ID (iPhone)** | CV | Kenali wajah dari kamera 3D |
| **Google Translate** | NLP (Neural MT) | Sequence-to-sequence model |
| **Siri / Alexa / Google Assistant** | Speech + NLP | Dengar → pahami → jawab |
| **Bank fraud detection** | ML + Anomaly detection | Cari pola transaksi aneh |
| **Cuaca prediksi** | ML (time series) | Prediksi dari data historis |
| **Medical diagnosis (imaging)** | CV | Deteksi tumor dari X-ray/MRI |
| **Spam filter Gmail** | ML (supervised) | Klasifikasi email dari konten + pengirim |
| **Smart home (Nest, dll)** | ML + IoT | Belajar pola penghuni |

**Insight:** Kalau kamu pakai teknologi modern, **AI jalan di belakangnya**.

---

## 💻 Contoh Kode AI Sederhana

### Chatbot Rule-Based (AI tanpa ML!)

```python
def simple_chatbot(message):
    message = message.lower()
    
    if "halo" in message or "hai" in message:
        return "Halo! Ada yang bisa saya bantu?"
    elif "jam berapa" in message:
        return "Maaf, saya tidak bisa akses waktu saat ini."
    elif "terima kasih" in message:
        return "Sama-sama! Senang membantu."
    else:
        return "Maaf, saya belum paham. Bisa ulangi?"

# Test
print(simple_chatbot("Halo, siapa kamu?"))
# Output: Halo! Ada yang bisa saya bantu?
```

**Ini AI?** Ya! Ini AI klasik (*symbolic AI*), bukan ML. AI ≠ ML, ingat.

### AI dengan ML: Klasifikasi Sederhana

```python
from sklearn.tree import DecisionTreeClassifier

# Data: [panjang, lebar] → [spesies iris]
X = [[1.4, 0.2], [1.3, 0.2], [5.1, 1.8], [4.9, 1.8]]
y = ['setosa', 'setosa', 'virginica', 'virginica']

# Training
model = DecisionTreeClassifier()
model.fit(X, y)

# Prediksi
new_flower = [[4.7, 1.4]]
prediction = model.predict(new_flower)
print(f"Prediksi spesies: {prediction[0]}")
# Output: Prediksi spesies: virginica
```

---

## 🧪 Fakta Menarik

### 1. Turing Test belum pernah "dimenangkan" dengan jelas

Tes asli Turing (1950): bisa ngobrol 5 menit dengan manusia lewat teks, apakah AI bisa mengelabui? Sampai sekarang **belum ada AI yang consensus** lulus Turing Test secara ketat. ChatGPT sudah dekat tapi masih ketahuan.

### 2. AI tertua di produksi: CAPTCHA

CAPTCHA ("Completely Automated Public Turing test to tell Computers and Humans Apart") pakai AI sejak 2000an untuk bedain manusia vs bot.

### 3. AI pernah kalah dari manusia di game paling dasar

AlphaGo 2016 dianggap milestone, tapi **game Atari** jauh lebih sederhana — DeepMind sudah menaklukkan itu sejak 2013.

### 4. AI tidak harus "pintar" untuk berguna

Kalkulator = AI? Secara definisi, **ya**. Itu mesin yang melakukan tugas yang biasanya butuh manusia (hitung). Tapi kita jarang menyebut kalkulator "AI" karena persepsi kita sudah bergeser.

### 5. AI ≠ Singularity

Singularity = hipotesis AI melampaui manusia secara keseluruhan. **Masih fiksi** sampai 2026. AI saat ini **sangat narrow** — bagus di satu tugas, gagal di tugas lain.

---

## ⚠️ Keterbatasan & Risiko AI Saat Ini

| Masalah | Penjelasan |
|---|---|
| **Hallucination** | AI generatif kadang "mengarang" fakta yang tidak ada |
| **Bias** | Model mewarisi bias dari data training |
| **Black Box** | Susah dijelaskan kenapa model ambil keputusan tertentu |
| **Data Privacy** | Butuh data banyak → potensi leak privasi |
| **Job Displacement** | Otomasi bisa ganti pekerjaan tertentu |
| **Environmental** | Training model besar butuh energi sangat banyak |
| **Misinformation** | Deepfake, AI-generated text untuk disinformasi |

**AI bukan sulap. Powerful, tapi butuh governance & etika.**

---

## ❓ Pertanyaan yang Sering Ditanya

**Q: AI akan gantikan manusia?**
A: Untuk tugas *spesifik*, sebagian ya (mis. translate sederhana, data entry). Untuk *general intelligence* yang bisa ganti manusia secara keseluruhan — masih jauh (kalau bisa).

**Q: AI sadar / punya consciousness?**
A: Sampai 2026, **tidak ada bukti** AI saat ini sadar. Dia sangat pandai meniru, tapi "memahami" dalam arti sadar masih diperdebatkan.

**Q: Bedanya AI kuat (Strong AI) vs AI lemah (Weak AI)?**
A: **Strong AI (AGI)** = AI yang punya kecerdasan umum seperti manusia (masih hipotesis). **Weak AI (Narrow AI)** = AI yang jago di tugas spesifik (semua AI saat ini, termasuk ChatGPT).

**Q: AI perlu internet?**
A: Untuk training di cloud, biasanya ya. Untuk inference, bisa offline (di HP, embedded). ChatGPT perlu internet karena dia di server OpenAI. Tapi model seperti LLaMA bisa jalan offline di laptop.

**Q: Saya awam, perlu khawatir AI?**
A: Tidak perlu takut, tapi **perlu paham**. AI mengubah dunia kerja dan informasi. Yang bertahan: orang yang paham cara pakai AI sebagai alat.

**Q: Indonesia sudah pakai AI?**
A: Sudah, dan cukup banyak:
- **Gojek / Grab**: routing, pricing, fraud detection
- **Tokopedia / Shopee**: rekomendasi produk, search
- **Bank BCA / Mandiri**: fraud detection, chatbot CS
- **Halodoc / Alodokter**: triage gejala
- **Ruangguru**: adaptive learning

---

## 📖 Baca Juga

- **[01. Algoritma ←](01-algoritma.md)** — konsep dasar
- **[02. Machine Learning ←](02-machine-learning.md)** — pendekatan utama AI modern
- **[04. Hubungan Ketiganya →](04-hubungan-ketiganya.md)** — gimana semuanya terhubung
- **[🌐 Website Interaktif →](../website/index.html#section-ai)** — lebih banyak visual

---

## 📚 Referensi

- *Artificial Intelligence: A Modern Approach* (AIMA) — Stuart Russell & Peter Norvig. Textbook standar.
- [DeepLearning.AI](https://www.deeplearning.ai/) — kursus Andrew Ng
- *Life 3.0* — Max Tegmark. Buku tentang implikasi AI untuk umat manusia.
- [AI Index Report](https://aiindex.stanford.edu/) — laporan tahunan tentang tren AI global
- *The Alignment Problem* — Brian Christian. Tentang bagaimana memastikan AI selaras dengan nilai manusia.

---

*Dibuat oleh [@ibam28](https://github.com/ibam28) · Konten ini bagian dari proyek [From Algorithms to AI](../README.md) · Lisensi MIT*
