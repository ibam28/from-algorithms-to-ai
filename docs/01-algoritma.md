# 01. Algoritma

> Langkah-langkah pasti untuk menyelesaikan masalah — "resep masakan" dunia komputasi.

📚 **Bagian dari seri:** [00. Beranda](../README.md) → **01. Algoritma** → [02. Machine Learning](02-machine-learning.md) → [03. Artificial Intelligence](03-artificial-intelligence.md) → [04. Hubungan Ketiganya](04-hubungan-ketiganya.md)

---

## 📌 Intinya (TL;DR)

| Pertanyaan | Jawaban Singkat |
|---|---|
| Apa itu algoritma? | Langkah-langkah pasti untuk menyelesaikan masalah |
| Algoritma sama dengan koding? | Tidak. Koding adalah cara *menulis* algoritma |
| Algoritma hanya untuk komputer? | Tidak. Resep masakan, prosedur medis, semuanya algoritma |
| Algoritma bagian dari AI? | Algoritma adalah *alat* yang dipakai AI (dan banyak hal lain) |

---

## 🤔 Apa Itu Algoritma?

### Definisi Sederhana

> **Algoritma adalah urutan langkah-langkah yang jelas dan pasti untuk mencapai tujuan tertentu.**

Analoginya: **resep masakan**.

### Definisi Teknis

Dalam ilmu komputer, algoritma adalah:

1. **Well-defined** — setiap langkah tidak ambigu
2. **Finite** — pasti berhenti (bukan loop tanpa akhir)
3. **Effective** — bisa dieksekusi dengan sumber daya yang masuk akal
4. **Output-producing** — menghasilkan sesuatu dari input yang diberikan

**Formal:** sebuah algoritma adalah fungsi `f: Input → Output` yang untuk setiap input valid, menghasilkan output yang benar dalam waktu terbatas.

### Algoritma Bukan Ini

- ❌ Bukan kode program (kode adalah *ekspresi* algoritma dalam bahasa tertentu)
- ❌ Bukan flowchart saja (flowchart bisa *menggambarkan* algoritma)
- ❌ Bukan hanya untuk komputer (prosedur medis, resep, instruksi IKEA juga algoritma)
- ❌ Bukan hal baru (algoritma sudah ada sejak Euclid, 300 SM)

---

## 🍳 Analogi: Resep Masakan

Bayangkan kamu mau bikin nasi goreng:

```
Resep Nasi Goreng (Algoritma):
1. Panaskan minyak di wajan
2. Tumis bawang putih sampai harum (2 menit)
3. Masukkan nasi, aduk rata
4. Tambahkan kecap, garam, merica
5. Aduk 3 menit
6. Selesai → hidangkan
```

### Kenapa Ini Algorithms?

| Sifat Resep | Sifat Algoritma | Sama? |
|---|---|---|
| Langkah jelas (2 menit, 3 menit) | Langkah jelas & terukur | ✅ |
| Urutan penting (bawang dulu, nasi kemudian) | Urutan menentukan hasil | ✅ |
| Pasti selesai | Finite (berakhir) | ✅ |
| Bisa diulang dengan hasil sama | Deterministic | ✅ |
| Gagal kalau langkah salah | Error kalau input salah | ✅ |

### Yang BUKAN Algoritma

❌ "Masak sampai enak" — terlalu ambigu (enak = ? berapa lama ?)

✅ "Masak 3 menit dengan api sedang, aduk tiap 30 detik" — terukur, pasti selesai

**Pelajaran:** algoritma yang baik punya langkah *presisi*, bukan *intuisi*.

---

## 🔍 5 Sifat Algoritma yang Baik

### 1. **Input** — Ada data awal
```
Resep: butuh nasi, bawang, kecap → input
Algoritma: butuh array angka, file, request → input
```

### 2. **Output** — Menghasilkan sesuatu
```
Resep: nasi goreng jadi
Algoritma: array terurut, jalur terpendek, hasil klasifikasi
```

### 3. **Definite (Deterministic)** — Tidak ambigu
```
❌ "Tambahkan garam secukupnya"
✅ "Tambahkan 1 sendok teh garam"
```

### 4. **Finite** — Pasti berhenti
```
❌ "Aduk terus sampai berhenti"
✅ "Aduk selama 3 menit"
```

### 5. **Effective** — Bisa dijalankan
```
❌ "Bikin nasi goreng dari nol"
✅ "Panaskan minyak, masukkan bahan, dst."
```

---

## 📚 Jenis-jenis Algoritma Populer

### 🔢 Sorting Algorithms (Mengurutkan Data)

| Algoritma | Cara Kerja | Cepat? | Cocok Untuk |
|---|---|---|---|
| **Bubble Sort** | Bandingkan 2 angka bersebelahan, tukar kalau salah urut | Lambat | Belajar, dataset kecil |
| **Merge Sort** | Bagi data jadi 2, urutkan masing-masing, gabung | Cepat | Dataset besar |
| **Quick Sort** | Pilih "pivot", pisahkan data lebih besar/kecil | Sangat cepat | General purpose |
| **Heap Sort** | Pakai struktur tree khusus | Cepat | Sistem real-time |

**Lihat visualisasinya di [website → Section Algoritma](../website/index.html#section-algorithms).**

### 🔎 Searching Algorithms (Mencari Data)

| Algoritma | Cara Kerja | Cepat? | Perlu Data Terurut? |
|---|---|---|---|
| **Linear Search** | Cek satu per satu dari awal | Lambat untuk data besar | Tidak |
| **Binary Search** | Bagi 2, cari di separuh yang relevan | Sangat cepat | Ya |

### 🕸️ Graph Algorithms (Jaringan)

- **Dijkstra** — rute terpendek (dipakai Google Maps)
- **BFS / DFS** — telusuri graf (breadth/depth-first search)
- **A*** — pathfinding (dipake game, robot)

### 🧠 Dynamic Programming

- Bagi masalah besar jadi sub-masalah kecil
- Simpan hasil sub-masalah supaya tidak hitung ulang
- Contoh: Fibonacci, longest common subsequence

### 🦘 Greedy

- Ambil keputusan terbaik *saat ini*, tanpa mikir ke depan
- Cepat tapi tidak selalu optimal
- Contoh: coin change, Huffman coding

### 🔁 Recursive

- Fungsi yang memanggil dirinya sendiri
- Powerful untuk masalah tree & divide-and-conquer
- Contoh: traversal folder, factorial

---

## 🌍 Algoritma di Kehidupan Sehari-hari

Kamu mungkin tidak sadar, algoritma bekerja di belakang layar **setiap hari**:

| Situasi | Algoritma yang Bekerja |
|---|---|
| Buka Google Maps, cari rute | Dijkstra / A* untuk rute terpendek |
| Scroll TikTok / Instagram | Recommendation algorithm (tapi ada ML juga) |
| Google Search | PageRank + ratusan algoritma ranking |
| Auto-correct di HP | Edit distance algorithm |
| Spotify "Discover Weekly" | Collaborative filtering (campuran ML + algoritma — lihat [02. ML](02-machine-learning.md)) |
| Antrean di bank | Queue algorithm |
| Microwave timer | Algoritma sederhana (hitung mundur) |
| Navigasi GPS | Graph algorithm real-time |

**Insight:** Algoritma itu **bukan hal futuristik** — itu bagian dari infrastruktur modern.

---

## 💻 Algoritma & Programming

### Pseudocode: Cari Angka Terbesar

```text
ALGORITHM findMax(array):
  IF array is empty:
    RETURN null
  
  max ← array[0]
  FOR each element in array:
    IF element > max:
      max ← element
  
  RETURN max
```

### Implementasi JavaScript

```javascript
function findMax(arr) {
  if (arr.length === 0) return null;
  
  let max = arr[0];
  for (const element of arr) {
    if (element > max) {
      max = element;
    }
  }
  return max;
}

console.log(findMax([3, 1, 4, 1, 5, 9, 2, 6])); // 9
```

### Implementasi Python

```python
def find_max(arr):
    if not arr:
        return None
    
    max_val = arr[0]
    for element in arr:
        if element > max_val:
            max_val = element
    return max_val

print(find_max([3, 1, 4, 1, 5, 9, 2, 6]))  # 9
```

**Perhatikan:** algoritma-nya **sama**. Yang beda cuma **bahasa**. Algoritma = konsep, bahasa = cara mengekspresikan.

---

## 🧪 Fakta Menarik

### 1. Algoritma sudah ada 2.300+ tahun

**Euclidean Algorithm** (cari FPB dua angka) ditemukan tahun **300 SM** oleh Euclid. Masih dipakai sampai sekarang di mana-mana (kriptografi, misalnya).

### 2. Sorting 1 juta angka: perbedaan dramatis

| Algoritma | Waktu (perkiraan di laptop modern) |
|---|---|
| Bubble Sort | ~2 jam |
| Merge Sort | ~0.5 detik |
| Quick Sort | ~0.3 detik |

*(Asumsi: laptop 100 juta operasi/detik)*

Pemilihan algoritma yang tepat bisa **ribuan kali lebih cepat**.

### 3. Tidak ada algoritma "terbaik untuk semua"

Disebut **"No Free Lunch Theorem"** — tidak ada algoritma yang terbaik untuk semua jenis masalah. Yang ada: **algoritma yang tepat untuk masalah tertentu**.

---

## ⚠️ Algoritma Punya Batasan

Algoritma **tidak bisa**:

- ❌ Belajar dari data baru (untuk itu perlu ML)
- ❌ Menangani situasi yang tidak pernah diprogram sebelumnya
- ❌ Beradaptasi sendiri kalau dunia berubah

Misalnya: algoritma filter spam lama akan **gagal** kalau pola spam berubah, karena dia hanya tahu pola yang sudah ditulis di kode. Solusinya? [Machine Learning](02-machine-learning.md).

---

## ❓ Pertanyaan yang Sering Ditanya

**Q: Algoritma sama dengan AI?**
A: Tidak. Algoritma adalah *alat*, AI adalah *tujuan*. AI *memakai* algoritma, tapi tidak semua algoritma adalah AI.

**Q: Algoritma sama dengan coding?**
A: Tidak juga. Algoritma = *ide/langkah*. Coding = *cara menulis* ide itu dalam bahasa pemrograman.

**Q: Saya bukan programmer, perlu tahu algoritma?**
A: Ya, minimal paham konsepnya. Kamu pakai algoritma setiap hari (Maps, Search, Social Media). Paham cara kerjanya bikin kamu jadi *pengguna teknologi yang lebih cerdas*.

**Q: Algoritma tertua yang masih dipakai?**
A: Euclidean Algorithm (300 SM) untuk cari FPB. Masih dipakai di cryptography dan computer algebra systems.

**Q: Bedanya algoritma dengan formula matematika?**
A: Formula = *ekspresi* hubungan (mis. `a² + b² = c²`). Algoritma = *prosedur* langkah demi langkah. Pythagoras menemukan formula, Euclid menemukan algoritma.

---

## 📖 Baca Juga

- **[02. Machine Learning →](02-machine-learning.md)** — bagaimana mesin *belajar* dari data (bukan cuma dijalankan dari aturan)
- **[03. Artificial Intelligence →](03-artificial-intelligence.md)** — tujuan besar yang dicapai sebagian lewat ML
- **[04. Hubungan Ketiganya →](04-hubungan-ketiganya.md)** — gimana ketiganya saling terkait
- **[🌐 Lihat Visualisasi Interaktif →](../website/index.html#section-algorithms)** — sorting visualizer di browser

---

## 📚 Referensi

- *Introduction to Algorithms* — Cormen, Leiserson, Rivest, Stein (CLRS). Textbook klasik.
- [MIT 6.0001 — Intro to CS](https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/) — kursus gratis dari MIT
- [Khan Academy — Algorithms](https://www.khanacademy.org/computing/computer-science/algorithms) — visualisasi interaktif gratis
- *The Art of Computer Programming* — Donald Knuth. Referensi definitif (advanced).

---

*Dibuat oleh [@ibam28](https://github.com/ibam28) · Konten ini bagian dari proyek [From Algorithms to AI](../README.md) · Lisensi MIT*
