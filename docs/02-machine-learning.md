# 02. Machine Learning

> Mesin yang belajar dari data, bukan dari aturan yang ditulis tangan — "koki yang belajar dari 10.000 percobaan".

📚 **Bagian dari seri:** [00. Beranda](../README.md) → [01. Algoritma](01-algoritma.md) → **02. Machine Learning** → [03. Artificial Intelligence](03-artificial-intelligence.md) → [04. Hubungan Ketiganya](04-hubungan-ketiganya.md)

---

## 📌 Intinya (TL;DR)

| Pertanyaan | Jawaban Singkat |
|---|---|
| Apa itu Machine Learning? | Sub-bidang AI di mana mesin *belajar* dari data, bukan dari aturan |
| Bedanya dengan algoritma biasa? | Algoritma biasa = aturan ditulis manual. ML = aturan *ditemukan sendiri* dari data |
| ML = AI? | Tidak. ML adalah *salah satu cara* mencapai AI. Masih ada cara lain |
| Butuh data banyak? | Ya, ML butuh data untuk belajar — makin banyak (yang berkualitas), makin bagus |

---

## 🤔 Apa Itu Machine Learning?

### Definisi Sederhana

> **Machine Learning = program yang belajar dari contoh, bukan dari instruksi.**

Kamu kasih banyak contoh, mesin cari polanya sendiri. Habis itu, dia bisa menebak pola baru yang mirip.

### Definisi Teknis

> *"A computer program is said to learn from experience E with respect to some class of tasks T and performance measure P, if its performance at tasks in T, as measured by P, improves with experience E."*
>
> — **Tom Mitchell** (1997, *Machine Learning*, McGraw-Hill)

Artinya: program ML adalah program yang **kinerjanya meningkat** seiring makin banyak *pengalaman* (data) yang dia dapat, dalam *tugas* tertentu, diukur dengan *metrik* tertentu.

### ML vs Programming Tradisional

| Aspek | Programming Tradisional | Machine Learning |
|---|---|---|
| **Input** | Data + Aturan | Data + Jawaban yang benar |
| **Output** | Jawaban | Aturan (model) |
| **Siapa yang cari pola?** | Programmer | Algoritma ML |
| **Update aturan** | Edit kode manual | Training ulang dengan data baru |
| **Contoh** | "Kalau email ada kata 'gratis', tandai spam" | "Ini 10.000 email, 5.000 spam, 5.000 bukan. Cari polanya." |

**Perbedaan kunci:** programmer *menulis* aturan vs algoritma ML *menemukan* aturan.

---

## 🍳 Analogi: Koki yang Belajar dari 10.000 Percobaan

Bayangkan dua cara bikin koki:

### Koki Programmer (Algoritma Biasa)

Kamu kasih **resep detail**:
```
IF air mendidih:
  Masukkan mie
  Tunggu 3 menit
  Tiriskan
  Sajikan
```

Koki cuma bisa masak mie. Kalau disuruh masak pasta, dia **gagal** karena gak ada resepnya.

### Koki ML (Belajar dari Data)

Kamu kasih **contoh hasil masak orang lain** + rating-nya:
- Resep A → rasa 2/5
- Resep B → rasa 8/5
- Resep C → rasa 9/5
- ... (10.000 contoh)

Koki **belajar sendiri** pola "resep enak" dari data. Habis itu, dia bisa bikin **resep baru** yang belum pernah ada di training, dan masih mungkin enak.

**Analogi ini menjelaskan 3 sifat utama ML:**

1. **Butuh banyak data** — kayak koki perlu 10.000 percobaan
2. **Generalisasi** — bisa apply ke situasi baru yang mirip
3. **Bisa salah** — kalau datanya jelek, hasilnya jelek (Garbage In, Garbage Out)

---

## 🔄 Cara Kerja ML (Simplified)

```
┌──────────────┐
│  Data        │  ← Email spam/non-spam, foto kucing, harga rumah
└──────┬───────┘
       ↓
┌──────────────┐
│ Preprocessing│  ← Bersih-bersih, normalisasi, label
└──────┬───────┘
       ↓
┌──────────────┐
│  Training    │  ← Algoritma ML cari pola dari data
│ (belajar)    │
└──────┬───────┘
       ↓
┌──────────────┐
│   Model      │  ← "Otak" yang sudah belajar
│ (hasil)      │
└──────┬───────┘
       ↓
┌──────────────┐
│  Inference   │  ← Pakai model untuk prediksi data baru
│ (pakai)      │
└──────────────┘
```

**Training = sekolah. Inference = ujian.**

Training butuh waktu & data banyak. Inference biasanya cepat & murah.

---

## 📚 3 Tipe Utama Machine Learning

### 1. Supervised Learning (Belajar Terarah)

```
Data: [Input] + [Label/Jawaban yang benar]
Tujuan: Model belajar mapping Input → Label
```

**Contoh:**
- Email + label spam/not-spam → model bisa filter spam
- Foto + label kucing/anjing → model bisa klasifikasi
- Data rumah + harga → model bisa prediksi harga

**Algoritma populer:** Linear Regression, Logistic Regression, Decision Tree, Random Forest, Neural Network, SVM

**Analogi:** Belajar dengan **guru yang kasih kunci jawaban**.

### 2. Unsupervised Learning (Belajar Sendiri)

```
Data: [Input] saja (tanpa label)
Tujuan: Model cari struktur/pola sendiri
```

**Contoh:**
- Data customer → segmentasi (kelompokin customer mirip)
- Artikel berita → topik-topik yang muncul
- Anomali deteksi → cari yang "aneh"

**Algoritma populer:** K-Means, DBSCAN, PCA, Autoencoder

**Analogi:** Belajar **tanpa guru** — kamu sendiri yang cari pengelompokan.

### 3. Reinforcement Learning (RL) — Tipe Lanjutan

> **Catatan:** RL dibahas singkat di sini karena bisa overwhelming untuk first contact. Untuk deep-dive (AlphaGo, robotics, game AI), lihat sumber bacaan di akhir dokumen.

```
Data: Aksi → Hasil (reward atau punishment)
Tujuan: Model belajar policy yang maximize reward
```

**Singkatnya:** agent belajar dengan coba-coba — aksi yang menghasilkan reward diulang, yang menghasilkan punishment dihindari. Analogi: anak kecil belajar naik sepeda (jatuh = belajar, jalan = belajar terus). Contoh terkenal: AlphaGo (game), self-driving car (salah satu tekniknya).

**Kenapa tidak dibahas mendalam di sini:** RL adalah topik besar sendiri — beda mindset dari supervised/unsupervised, butuh konteks *environment* dan *reward function* yang kompleks. Untuk audiens yang baru kenal ML, **dua tipe sebelumnya sudah cukup untuk ~80% pemahaman**.

### Mana yang Paling Populer?

Sebagian besar aplikasi dunia nyata = **Supervised Learning** (karena paling matang dan paling bisa dijelaskan).

---

## 🌍 ML di Kehidupan Sehari-hari

| Situasi | ML yang Bekerja |
|---|---|
| Gmail filter spam | Supervised (dari contoh spam/not-spam) |
| Netflix/YouTube rekomendasi | Supervised (dari riwayat tontonan + rating) |
| Google Maps prediksi macet | Time series + supervised |
| Face ID di iPhone | Supervised (dari foto wajah kamu, repeatedly) |
| Google Translate | Neural machine translation |
| ChatGPT | Large language model (supervised + RLHF) |
| Tesla Autopilot | Computer vision + reinforcement learning |
| Spotify Discover Weekly | Collaborative filtering (unsupervised + supervised) |
| Bank fraud detection | Anomaly detection (unsupervised) + supervised |
| Prediksi harga rumah | Supervised regression |

**Insight:** Kalau kamu pakai smartphone, **ML jalan setiap menit**.

---

## 💻 Contoh ML dalam Kode (Sederhana)

### Prediksi Harga Rumah dengan Linear Regression

```python
# pip install scikit-learn
from sklearn.linear_model import LinearRegression

# Data: [luas rumah (m²), harga (juta)]
X = [[50], [70], [100], [120], [150]]  # Luas
y = [500, 700, 1000, 1200, 1500]        # Harga

# Training
model = LinearRegression()
model.fit(X, y)

# Inference
predicted = model.predict([[90]])  # Rumah 90 m²
print(f"Prediksi harga rumah 90 m²: Rp {predicted[0]:.0f} juta")
# Output: Prediksi harga rumah 90 m²: Rp 900 juta
```

### Real Implementation (TensorFlow.js — di Browser!)

Lihat di [🌐 website ML Demo →](../website/js/ml-demo/mnist.html) — gambar angka, model TF.js yang dilatih di browser akan menebak.

---

## 🧪 Istilah-istilah ML yang Perlu Kamu Tahu

| Istilah | Artinya | Analogi |
|---|---|---|
| **Training** | Proses model belajar dari data | Sekolah |
| **Inference** | Pakai model yang sudah jadi untuk prediksi | Ujian |
| **Model** | Hasil training — "otak" yang sudah pintar | Lulusan sekolah |
| **Features** | Variabel input yang dipakai model | Bahan masakan |
| **Labels** | Jawaban benar (untuk supervised) | Kunci jawaban |
| **Dataset** | Kumpulan data | Buku pelajaran |
| **Epoch** | 1 putaran training (lihat semua data 1x) | 1 tahun ajaran |
| **Overfitting** | Model terlalu hafal data training, gagal di data baru | Anak yang bisa jawab soal latihan tapi gagal ujian |
| **Underfitting** | Model terlalu simpel, gak belajar pola | Anak yang gak belajar sama sekali |
| **Accuracy** | Persentase prediksi benar | Nilai ujian |
| **Loss** | Seberapa salah prediksi model | "Denda" tiap salah jawab |
| **Neural Network** | Model terinspirasi dari otak manusia | Jaringan neuron tiruan |
| **Deep Learning** | Neural network dengan banyak layer | Otak dengan banyak lapisan |

---

## ⚠️ Keterbatasan Machine Learning

ML **tidak bisa**:

- ❌ **Bekerja tanpa data** — kualitas & kuantitas data menentukan hasil
- ❌ **Menjamin akurasi 100%** — selalu ada error rate
- ❌ **Jujur kalau dataset bias** — model akan belajar biasnya (contoh: facial recognition bias ke warna kulit tertentu)
- ❌ **Jelaskan kenapa** mengambil keputusan tertentu (untuk beberapa model — *black box*)
- ❌ **Bekerja kalau data distribution berubah drastis** — mis. COVID mengubah pola belanja, model lama jadi kacau

**ML itu powerful, tapi bukan sulap.**

---

## 🧠 Fakta Menarik

### 1. Bahasa bukan "machine learning" untuk hal yang sama

Yang kita sebut "ML" di Barat, di China disebut dalam bahasa Mandarin dengan terjemahan literal "mesin belajar" (pinyin: *jīqī xuéxí*) — artinya sama: mesin belajar.

### 2. ML tertua: 1950-an

**Arthur Samuel** bikin program *checkers* tahun **1952** yang belajar dari bermain sendiri. Istilah **"machine learning"** ia perkenalkan secara resmi dalam paper-nya tahun **1959** — *"Some Studies in Machine Learning Using the Game of Checkers"* (IBM Journal).

### 3. ML ≠ semua tentang Neural Network

Sebelum deep learning naik (2012+), ML didominasi oleh algoritma klasik (SVM, Random Forest). Untuk data kecil-sedang, **algoritma klasik masih sering lebih bagus** daripada deep learning.

### 4. Data lebih penting dari algoritma

> "Better data beats better algorithms."
>
> — sering dikutip dari banyak ML practitioners

Model bagus dengan data jelek = hasil jelek. Model simpel dengan data bagus = hasil bagus.

---

## ❓ Pertanyaan yang Sering Ditanya

**Q: ML sama dengan AI?**
A: Tidak. ML *subset* dari AI. AI adalah *tujuan*, ML adalah *salah satu cara*. Lihat [04. Hubungan Ketiganya](04-hubungan-ketiganya.md).

**Q: ML sama dengan Deep Learning?**
A: Deep Learning *subset* dari ML. DL pakai neural network berlapis banyak (deep). Lihat [03. Artificial Intelligence](03-artificial-intelligence.md).

**Q: Saya perlu jago matematika buat belajar ML?**
A: Tergantung level. Buat *pakai* ML yang sudah jadi (scikit-learn, TF.js) → tidak harus jago matematika. Buat *membuat* algoritma ML baru atau riset → perlu linear algebra, calculus, statistics.

**Q: ML bisa bikin saya jadi miliarder?**
A: Bisa, tapi bukan karena ML-nya — karena **masalah yang kamu solve**. ML itu alat. Alat secanggih apapun gak berguna kalau gak solve masalah nyata.

**Q: ML akan ganti programmer?**
A: Sampai 2026, ML bantu programmer tapi belum bisa replace. Kode yang kompleks, architectural decisions, dan pemahaman konteks masih butuh manusia. Yang berubah: programmer pakai ML sebagai "pair programmer" (mis. Copilot, Claude Code).

**Q: ML butuh internet?**
A: Untuk training di cloud biasanya ya. Untuk inference bisa jalan offline (mis. di HP, embedded device). ML demo di website ini berjalan **100% di browser tanpa server**.

---

## 📖 Baca Juga

- **[01. Algoritma ←](01-algoritma.md)** — konsep dasar langkah-langkah yang dipakai ML juga
- **[03. Artificial Intelligence →](03-artificial-intelligence.md)** — konteks lebih luas
- **[04. Hubungan Ketiganya →](04-hubungan-ketiganya.md)** — gimana ML + Algoritma + AI saling terkait
- **[🌐 Lihat ML Demo Interaktif →](../website/js/ml-demo/mnist.html)** — gambar angka, model tebak

---

## 📚 Referensi

- *Hands-On Machine Learning* — Aurélien Géron (paling recommended buat praktisi)
- [Google Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course) — gratis, dengan visualisasi
- [Andrew Ng — Machine Learning Specialization](https://www.coursera.org/specializations/machine-learning-introduction) — kursus paling legendaris
- *Pattern Recognition and Machine Learning* — Christopher Bishop (advanced, teoritis)
- [TensorFlow.js docs](https://www.tensorflow.org/js) — untuk ML di browser
- [Scikit-learn](https://scikit-learn.org/) — library ML paling populer di Python

---

*Dibuat oleh [@ibam28](https://github.com/ibam28) · Konten ini bagian dari proyek [From Algorithms to AI](../README.md) · Lisensi MIT*
