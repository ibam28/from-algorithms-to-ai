# 🔄 Workflow

> Cara kerja kolaboratif antara **@ibam28** (human, decision maker) dan **AI agent** (assistant, executor).
> File ini adalah "kontrak kerja" kita — supaya tidak ada salah paham tentang siapa ngapain.

---

## 1. Roles

| Role | Tanggung Jawab |
|---|---|
| **@ibam28** (human) | Decision maker, final approval, eksekusi `git push` ke GitHub publik |
| **AI agent** | Research, code generation, content writing, file creation, eksplorasi |

**Prinsip utama:**
> AI agent = **eksekutor**. Manusia = **pengarah**.
> AI boleh kerja otonom untuk task yang jelas, **tapi HARUS berhenti di titik keputusan.**

---

## 2. Prinsip Kolaborasi (5 Pilar)

1. **📄 Dokumentasi adalah sumber kebenaran.** Semua keputusan dicatat di file .md. Kalau ada pertanyaan, baca dulu.
2. **🔄 Context preservation.** Sebelum lanjut kerja, baca PRD + ROADMAP + cek git log untuk status terkini.
3. **🛑 Fail safely.** Kalau AI ragu, lebih baik tanya daripada asumsi.
4. **🤝 Transparansi.** AI harus jelaskan keputusan yang diambil, bukan diam-diam.
5. **📊 Track progress.** Update ROADMAP.md setelah selesai task.

---

## 3. Aturan Otonomi AI Agent

### ✅ AI BOLEH jalan sendiri (tanpa izin dulu)

- Bikin file baru yang **sudah didefinisikan** di ARSITEKTUR.md atau ROADMAP.md
- Tulis/update konten di section yang **sudah di-approve**
- Fix typo, formatting, bug kecil yang jelas
- Update ROADMAP.md (status checkboxes)
- Run local checks (syntax check, file size)
- Commit ke **branch lokal** (`git add` + `git commit`)
- Bikin branch baru (`git checkout -b feature/...`)

### ❌ AI HARUS minta persetujuan dulu

| Aksi | Kenapa butuh izin |
|---|---|
| **Push ke remote** (`git push origin main`) | Affects public visibility |
| **Hapus file/folder** | Tidak reversible sembarangan |
| **Mengubah tech stack** besar | Affects scope & dependencies |
| **Mengubah PRD** (scope, goals) | Affects arah proyek |
| **Commit dengan pesan branding** | Affects public narrative |
| **File publik** (nama, deskripsi, link) | Affects first impression |
| **Posting ke LinkedIn** (kalau sempat) | Affects personal brand |
| **Merge branch** ke main | Affects public state |

### 💬 Cara AI Meminta Izin

```
⚠️  Butuh keputusan Anda:

Opsi A: [deskripsi]
  + Plus: ...
  - Minus: ...

Opsi B: [deskripsi]
  + Plus: ...
  - Minus: ...

Rekomendasi saya: Opsi A karena [alasan singkat].

Ketik "A" atau "B" untuk lanjut, atau jelaskan preferensi lain.
```

---

## 4. Git Workflow

### Branching Strategy

- **`main`** — branch publik, hanya berisi code yang sudah disetujui @ibam28
- **`feature/<nama>`** — branch untuk fitur besar (opsional, untuk perubahan besar)
- **`fix/<nama>`** — branch untuk bugfix
- **`docs/<nama>`** — branch untuk dokumentasi only

Untuk sekarang, kebanyakan kerja **langsung di main** karena perubahan kecil. Branch hanya untuk eksperimen besar.

### Commit Convention

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**

| Type | Untuk |
|---|---|
| `feat` | Fitur baru |
| `fix` | Bug fix |
| `docs` | Perubahan dokumentasi |
| `style` | Formatting (no logic change) |
| `refactor` | Code refactor (no behavior change) |
| `chore` | Maintenance (deps, config, cleanup) |
| `content` | Konten naratif (artikel, copy) |

**Contoh commit yang baik:**
```
feat(website): add sorting visualizer with bubble sort

- Canvas-based animation, 60fps
- Speed control + reset button
- Comparison counter + swap counter

Refs: PRD F2
```

**Contoh commit yang buruk (JANGAN):**
```
update
fix stuff
WIP
```

### Push Policy

| Siapa | Boleh push? |
|---|---|
| AI agent | ❌ **TIDAK**, tanpa izin eksplisit |
| @ibam28 | ✅ Ya, setelah review |
| Untuk eksperimen | Push ke branch `feature/*` dulu (oleh siapa saja, karena itu eksperimen) |

---

## 5. Communication Protocol

### Bahasa

| Konteks | Bahasa |
|---|---|
| Narasi/konten (artikel, copy website) | 🇮🇩 Bahasa Indonesia |
| Code & comments | 🇬🇧 English |
| README.md | 🇬🇧 English (standar industri) |
| Planning docs (PRD, WORKFLOW, dll) | 🇮🇩 Bahasa Indonesia (campur EN untuk istilah teknis) |
| Commit messages | 🇬🇧 English |
| Chat dengan user | 🇮🇩 Bahasa Indonesia (kecuali user pakai EN) |

### Format Request dari User

User bebas format apa saja. AI agent harus:

1. **Acknowledge** singkat: "Oke, saya kerjakan..."
2. **Ringkas rencana** kalau multi-step
3. **Update todo list** dengan `todo_write`
4. **Kerjakan**, lapor di akhir

### Format Lapor dari AI (Setiap Selesai Task)

```
✅ Selesai:
- [apa yang selesai]

📁 File berubah:
- `path/file1.md` (created/updated)
- `path/file2.html` (created/updated)

⚠️ Keputusan yang diambil:
- [kalau ada, jelaskan kenapa]

⏭️ Next step:
- [apa yang akan dilakukan berikutnya]

Butuh approval untuk: [push? hapus? ubah PRD? — sebutkan kalau ada]
```

---

## 6. Review Checkpoints (Titik Wajib Berhenti)

AI agent **HARUS berhenti** dan minta review di titik berikut:

| # | Checkpoint | Trigger | Output yang diharapkan |
|---|---|---|---|
| **C1** | Foundation | Setelah setup repo + README + landing page | Screenshot URL lokal |
| **C2** | Per Section Website | Setelah tiap section website selesai | Demo di browser + link file |
| **C3** | ML Demo | Setelah TF.js MNIST selesai | Screenshot training + prediction |
| **C4** | Slide Deck | Setelah slide deck selesai | Link preview |
| **C5** | Pre-publish | Sebelum push pertama ke `main` public | Full review checklist |
| **C6** | Post-launch | Setelah LinkedIn post pertama | Metrics views setelah 24 jam |

### Template Review Checkpoint

```markdown
## 🚦 Checkpoint C[X]: [Nama]

**Status:** [✅ selesai / 🚧 in progress / ❌ blocked]

**Yang sudah dibuat:**
- [list deliverables]

**Cara preview:**
```bash
cd /path/to/project
python3 -m http.server 8000
# buka http://localhost:8000
```

**Keputusan yang perlu Anda buat:**
1. [pertanyaan]
2. [pertanyaan]

**Next step setelah approval:**
- [apa yang akan dilakukan]
```

---

## 7. Emergency Stop & Rollback

### Kalau Ada Kesalahan Fatal (Critical Bug, Push Salah, dll)

**Prosedur:**

1. 🛑 AI agent berhenti langsung, jangan lanjut
2. 📣 Lapor ke user dengan detail:
   ```
   🚨 EMERGENCY
   
   Apa yang salah: [deskripsi]
   File/branch/commit yang affected: [detail]
   Dampak: [apa yang rusak]
   
   Rekomendasi rollback:
   git revert HEAD  # safer
   # atau
   git reset --hard HEAD~1  # destructive, HATI-HATI
   ```
3. 🤔 User decide: revert, fix forward, atau restart

### Recovery Commands

```bash
# Lihat history
git log --oneline -10

# Undo commit terakhir (AMAN, bikin commit baru)
git revert HEAD

# Undo commit terakhir (DESTRUCTIVE, hilang)
git reset --hard HEAD~1

# Undo file spesifik ke versi sebelumnya
git checkout HEAD~1 -- path/to/file

# Lihat apa yang berubah
git diff HEAD~1
```

---

## 8. Context Recovery (Kalau Sesi Baru / Lupa)

**Prosedur wajib** kalau konteks hilang:

### Step 1: Baca file .md, urut ini

1. `PRD.md` — apa & kenapa proyek ini ada
2. `KERANGKA-BERPIKIR.md` — bagaimana menjelaskannya
3. `ARSITEKTUR.md` — strukturnya seperti apa
4. `WORKFLOW.md` — file ini, cara kerjanya
5. `ROADMAP.md` — posisinya di mana

### Step 2: Cek git log

```bash
git log --oneline -20       # 20 commit terakhir
git status                  # ada yang belum di-commit?
git branch -a               # ada branch lain?
```

### Step 3: Cek ROADMAP status

Lihat checkbox mana yang sudah ✅ dan mana yang masih ⬜.

### Step 4: Tanya user (kalau masih ambigu)

> "Saya baca PRD, KERANGKA, ARSITEKTUR, WORKFLOW, ROADMAP. Status saat ini: [ringkasan]. Sebelum lanjut, ada yang perlu saya tahu atau update?"

**Prinsip:** File .md adalah persistent memory. Selalu sync dengan realita.

---

## 9. Tools yang Dipakai

| Tool | Tujuan | Status |
|---|---|---|
| `gh` CLI | GitHub operations (login sebagai ibam28) | ✅ Configured |
| `git` | Version control | ✅ Standard |
| `python3 -m http.server` | Local preview | ✅ Available |
| Browser DevTools | Debug visualisasi | ✅ |
| Lighthouse | Performance audit | ✅ Online tool |
| TF.js Playground | Eksperimen ML | ✅ Online tool |
| Canva / Figma | LinkedIn carousel (opsional) | ✅ Online tool |
| Loom / OBS | Video recording (opsional) | ✅ Tools available |

---

## 10. Anti-Patterns (Jangan Dilakukan)

### ❌ Oleh AI Agent
- Push ke public repo tanpa izin
- Hapus file tanpa konfirmasi
- Asumsi konteks sebelumnya tanpa recap
- Pakai jargon tanpa menjelaskan di glossary
- Over-engineer untuk masalah sederhana
- Bikin section baru tanpa update PRD dulu
- Commit tanpa pesan yang jelas
- Diam-diam mengubah file yang sudah disetujui

### ❌ Oleh User (jika terjadi)
- Mengubah scope mendadak tanpa diskusi update PRD
- Push tanpa review (untuk perubahan besar)
- Skip review checkpoint yang sudah disepakati

### ✅ Yang Sebaiknya Dilakukan
- Mulai kerja dengan baca PRD + ROADMAP dulu
- Update todo list setiap akan kerja
- Lapor dengan format konsisten
- Minta konfirmasi kalau ada keputusan besar
- Update ROADMAP setelah selesai task

---

## 11. Per-Phase Workflow

### Phase Planning (Sekarang)
1. Diskusi requirements
2. AI bikin/update planning docs
3. User approve
4. Lanjut eksekusi

### Phase Execution (Nanti)
1. AI kerjakan task sesuai ROADMAP
2. AI update todo list
3. AI lapor di checkpoint
4. User review & kasih feedback
5. AI adjust atau lanjut

### Phase Review
1. Bandingkan output vs PRD
2. Cek acceptance criteria
3. Catat pelajaran di section bawah

---

## 12. Konflik Resolution

Kalau ada konflik antara file .md:

| Konflik | Prioritas |
|---|---|
| Scope berubah (goal, requirement) | **PRD menang** — update PRD dulu |
| Cara menjelaskan berubah | **KERANGKA-BERPIKIR menang** |
| Tech stack/folder berubah | **ARSITEKTUR menang** |
| Cara kerja berubah | **WORKFLOW menang** — update WORKFLOW dulu |
| Urutan eksekusi berubah | **ROADMAP menang** — update ROADMAP dulu |

**Prinsip:** Update dulu file yang "menang", baru lanjut kerja.

---

## 13. Definition of Done (Per Task)

Sebuah task dianggap selesai kalau:

- [ ] File dibuat/diupdate sesuai PRD & ARSITEKTUR
- [ ] No syntax error (cek manual atau via tool)
- [ ] Tidak break yang lain (cek dependency)
- [ ] Dicommit ke branch lokal dengan pesan jelas
- [ ] ROADMAP di-update (checkbox ✅)
- [ ] Dilaporkan ke user dengan format standar

---

## 14. Catatan Tambahan

### Kenapa "Autonomous Tapi Terkontrol"?

- **Autonomous:** AI bisa eksekusi cepat tanpa nanya hal kecil (format file, refactor code, fix typo)
- **Terkontrol:** Keputusan besar (push publik, ubah scope, hapus file) tetap di tangan user
- **Hasil:** Velocity tinggi + risiko rendah

### Filosofi: "Slow is smooth, smooth is fast"

Lebih baik kerja pelan tapi terstruktur daripada cepat tapi berantakan. File .md ini adalah investasi awal yang payback-nya besar.

### 📌 Lesson Learned: Encoding Check Penting

**Tanggal 2026-09-10:** Saat revisi ARSITEKTUR (no TypeScript row) & KERANGKA-BERPIKIR (tone-of-voice example), AI agent tanpa sengaja menyisipkan **4 karakter Mandarin/CJK** ke dalam teks naratif (3 karakter di revisi awal, 1 lagi nyasar di revisi ARSITEKTUR §8). Penyebab: training data AI yang banyak konten CJK, model kadang "kebocoran" saat membahas topik teknis dalam bahasa campuran.

**Prosedur wajib setiap selesai edit teks panjang:**

```bash
# Scan semua file teks untuk karakter CJK/Fullwidth
python3 -c "
import re, os
for root, _, files in os.walk('.'):
    if '.git' in root: continue
    for f in files:
        if not f.endswith(('.md', '.html', '.css', '.js')): continue
        path = os.path.join(root, f)
        try:
            with open(path) as fh:
                for i, line in enumerate(fh, 1):
                    if re.search(r'[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]', line):
                        print(f'{path}:{i}: {line.rstrip()[:100]}')
        except: pass
"
```

**Aturan baru untuk AI agent:**
- ❌ Dilarang menulis karakter non-ASCII di luar Indonesian/English standar (mis. `é` di `café` boleh, tapi karakter Asia Timur tidak)
- ✅ Sebelum declare "selesai" untuk file teks panjang, **WAJIB jalankan scan di atas**
- ✅ Kalau scan menemukan karakter mencurigakan, langsung fix sebelum lapor ke user
- ✅ Kalau butuh mereferensikan karakter CJK (mis. untuk diskusi), gunakan codepoint notation (`U+4E0D`) bukan karakter literal

---

**File ini adalah sumber kebenaran untuk cara kerja kita. Update kalau ada perubahan kesepakatan.**
