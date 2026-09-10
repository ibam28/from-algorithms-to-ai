# 📋 Product Requirements Document (PRD)

**Project:** From Algorithms to AI
**Repository:** `github.com/ibam28/from-algorithms-to-ai`
**Author:** Bambang Saputra Jaya ([@ibam28](https://github.com/ibam28))
**Status:** 🚧 In Progress
**Last updated:** 2026-09-10

---

## 1. Ringkasan

Proyek portfolio yang menjelaskan hubungan **Algoritma → Machine Learning → AI** untuk audiens awam (prioritas: rekruiter HR, hiring manager, orang awam umum), dengan demo interaktif yang **benar-benar berjalan di browser**.

Bukan sekadar teori — ada algoritma yang divisualisasikan, ML yang dilatih, model yang menebak gambar tanganmu.

---

## 2. Problem Statement (Masalah)

Rekruiter, hiring manager, dan orang awam **mencampuradukkan** istilah AI, ML, dan Algoritma. Sumber online terlalu jargon atau terlalu simplistik. Belum ada "satu sumber konsisten" yang:

- 🎨 **Visual & interaktif** (bukan dinding teks)
- ✅ **Teknis jujur** (bukan misleading marketing)
- 🔗 **Mudah di-share** di LinkedIn / GitHub
- 💻 **Bisa langsung dicoba** tanpa install apa-apa

---

## 3. Target Users (Audiens)

### 👤 Persona 1: HR Recruiter (Prioritas Utama)
- Tidak background teknis
- Screening CV untuk posisi AI/ML/Data
- Butuh memahami istilah untuk filter kandidat
- **Pain point:** Tidak bisa bedain buzzword vs skill asli di CV

### 👤 Persona 2: Hiring Manager (Teknis)
- Background engineering / science
- Ingin lihat kemampuan kandidat menjelaskan konsep
- **Pain point:** Jenuh dengan penjelasan copy-paste dari Medium / blog random

### 👤 Persona 3: Orang Awam Umum
- Penasaran AI tapi overwhelmed
- Butuh analogi yang relate dengan kehidupan sehari-hari
- **Pain point:** Penjelasan AI terlalu teknis / terlalu hype

---

## 4. Goals (Tujuan)

### 🎯 Project Goals
- Portfolio piece yang **Live di GitHub Pages**
- **3 deliverable:** Website interaktif + Slide deck + Video script
- **Demo ML** yang berjalan asli di browser (TensorFlow.js)
- **Memorable:** Orang ingat "From Algorithms to AI" setelah lihat 30 detik
- **Shareable** di LinkedIn dengan engagement tinggi

### 👨‍💻 Personal Goals (untuk @ibam28)
- Posisi dilirik sebagai **Full Stack + AI Engineer**
- Menunjukkan kemampuan: visualisasi, ML, code quality, dokumentasi
- Bahasa: **narrative EN default** (SEO-friendly) + **toggle ID** (switch bahasa di landing, SPA, slides, demo)

---

## 5. Success Metrics (Ukuran Sukses)

| Metric | Target |
|---|---|
| GitHub stars | 50+ dalam 3 bulan |
| LinkedIn post views | 1000+ dalam 1 minggu pertama |
| Demo ML load success rate | >95% (Chrome/Firefox/Safari modern) |
| Lighthouse score | >90 (Performance, Accessibility, Best Practices, SEO) |
| Page load time | <2 detik di 4G |
| Mobile responsive | Tested di 320px – 1920px |

---

## 6. Functional Requirements (Fitur)

### Wajib (MUST HAVE)
| ID | Fitur | Status |
|---|---|---|
| F1 | Landing page dengan navigasi ke 4 deliverable | ✅ |
| F2 | Section Algoritma dengan sorting visualizer interaktif | ✅ |
| F3 | Section Machine Learning dengan decision tree demo | ✅ |
| F4 | Section AI dengan timeline interaktif | ✅ |
| F5 | Section Hubungan dengan diagram konsentris klik | ✅ |
| F6 | Demo MNIST digit recognizer (TensorFlow.js) | ✅ |
| F7 | Slide deck 12 slide (Reveal.js) | ✅ |
| F8 | Video script narasi Bahasa Indonesia | ✅ |
| F9 | README.md profesional (English) | ✅ |
| F10 | Deploy ke GitHub Pages otomatis | ✅ (live: `ibam28.github.io/from-algorithms-to-ai`) |

### Opsional (NICE TO HAVE)
| ID | Fitur | Status |
|---|---|---|
| N1 | Video rekaman (Loom/OBS) | ⬜ |
| N2 | LinkedIn carousel PDF | ⬜ |
| N3 | Multi-language switcher (EN/ID) | ✅ (EN default + ID toggle, v1.0.0-Beta) |
| N4 | Comments/feedback form | ⬜ |
| N5 | Algoritma pathfinding (A*) visualizer | ⬜ |
| N6 | Spam classifier demo | ⬜ |

---

## 7. Non-Functional Requirements (Kualitas)

- **Performance:** Bundle total <200KB (exclude CDN libs), load <2s di 4G
- **Accessibility:** WCAG 2.1 AA compliant, keyboard navigable
- **Browser support:** Chrome/Firefox/Safari/Edge 2 versi terakhir
- **Mobile-friendly:** Responsive 320px – 1920px
- **No build step:** Bisa dibuka langsung dari file system
- **Offline-ready:** Aset di CDN, fallback graceful
- **SEO:** Meta tags + Open Graph untuk preview LinkedIn

---

## 8. Out of Scope (TIDAK dibuat)

Sengaja dikecualikan untuk menjaga fokus:

- ❌ Backend/server (semua client-side)
- ❌ Database (data hardcoded atau generated di browser)
- ❌ User authentication
- ❌ CMS untuk update konten
- ❌ Multi-bahasa lengkap (cukup ID naratif, EN tech) → sekarang: **EN default + ID toggle** di web/slides/demo; docs/ tetap ID
- ❌ Mobile native app
- ❌ Analytics/tracking (privasi)
- ❌ TypeScript / build tools

---

## 9. Constraints (Keterbatasan)

- **Waktu:** Proyek sampingan, bukan full-time
- **Budget:** $0 — hanya free tier (GitHub Pages, CDN)
- **Skill:** Built solo oleh @ibam28 + bantuan AI
- **Visibility:** Public repo (portofolio butuh terlihat publik)

---

## 10. Risks & Mitigations (Risiko)

| Risk | Dampak | Mitigasi |
|---|---|---|
| TF.js demo lambat di device lama | Medium | Fallback ke static image, warning |
| GitHub Pages down | Low | Static, jarang down; backup Netlify jika perlu |
| Konsep AI cepat outdated | Medium | Fokus ke fundamental, bukan tren sesaat |
| Konflik konsep dengan sumber lain | Low | Acknowledge multiple views, link reputable sources |
| LinkedIn algorithm membatasi reach | Medium | Post di jam prime (Senin–Rabu 08.00–10.00) |
| User (HR) tidak mau klik link | Medium | Hook di post harus kuat, value di preview LinkedIn |

---

## 11. References (Referensi)

- [DeepLearning.AI — Andrew Ng](https://www.deeplearning.ai/)
- [MIT 6.0001 — Intro to CS](https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/)
- [Google Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course)
- [TensorFlow.js docs](https://www.tensorflow.org/js)
- [D3.js Gallery](https://observablehq.com/@d3/gallery)

---

## 12. Glossary (Istilah)

| Istilah | Definisi Singkat |
|---|---|
| **Algoritma** | Langkah-langkah pasti untuk menyelesaikan masalah |
| **ML (Machine Learning)** | Subbidang AI di mana mesin belajar dari data, bukan dari aturan |
| **AI (Artificial Intelligence)** | Mesin yang melakukan tugas yang biasanya butuh kecerdasan manusia |
| **Deep Learning** | Subbidang ML yang pakai neural networks berlapis |
| **CNN** | Convolutional Neural Network — bagus untuk image |
| **MNIST** | Dataset klasik 70.000 gambar digit tulisan tangan |
| **SPA** | Single Page Application — satu halaman, navigasi via JS |
| **CDN** | Content Delivery Network — serve file dari server terdekat |

---

## 13. Change Log (Riwayat Perubahan)

| Tanggal | Perubahan | Oleh |
|---|---|---|
| 2026-09-10 | PRD initial, project kick-off | @ibam28 + AI |
| 2026-09-10 | Revised: realistic time estimates, perf strategy, a11y scope, OG image plan, mobile canvas touch | @ibam28 + AI |
| 2026-09-10 | Phase 2 docs selesai; user review menemukan konflik RL dengan KERANGKA §6 → RL didemote ke 1 paragraf, Tom Mitchell (1997), Arthur Samuel split (1952/1959), duplicate Spotify row + CAPTCHA typo + GPT/BERT fix | @ibam28 + AI |
| 2026-09-10 | KERANGKA-BERPIKIR §6 revisi: intro section yang misleading ("sengaja dikecualikan") diganti dengan framing netral tentang cakupan terbatas; MLOps row di-acknowledge ada di career section opt-in; tambah "Cara baca tabel" untuk cegah misinterpretasi di masa depan | @ibam28 + AI |
