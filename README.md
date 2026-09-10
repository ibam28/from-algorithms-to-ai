# From Algorithms to AI 🧠→✨

> A visual & interactive journey from **Algorithms** → **Machine Learning** → **AI** — explained for non-technical audiences.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://ibam28.github.io/from-algorithms-to-ai/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Made by @ibam28](https://img.shields.io/badge/made%20by-%40ibam28-orange)](https://github.com/ibam28)

---

## 📚 Project Documentation (Read These!)

These files describe the project's vision, architecture, and workflow. **Read in this order** if you're new:

| # | File | What it's for |
|---|---|---|
| 1 | [PRD.md](PRD.md) | What we're building & why |
| 2 | [KERANGKA-BERPIKIR.md](KERANGKA-BERPIKIR.md) | How we explain AI/ML/Algorithms |
| 3 | [ARSITEKTUR.md](ARSITEKTUR.md) | Technical architecture & design system |
| 4 | [WORKFLOW.md](WORKFLOW.md) | How collaborators work together |
| 5 | [ROADMAP.md](ROADMAP.md) | Phases, deliverables, and current status |

---

## 🎯 Why This Project Exists

Ask a recruiter, your non-tech friend, or even your manager: **"What's the difference between AI, Machine Learning, and Algorithms?"**

You'll get three different answers. Most will be wrong, mixed up, or use buzzwords.

This project fixes that — with **honest explanations, visual diagrams, and live demos that actually work in your browser**.

---

## ✨ What's Inside

| Section | What it does |
|---|---|
| 🌐 **[Interactive Website](website/index.html)** | 4 sections with algorithm visualizer, decision tree demo, and a real ML model running in your browser |
| 🎞️ **[Slide Deck](slides.html)** | 12-slide presentation (Reveal.js) — ready for interviews, internal sharing, or LinkedIn carousel |
| 🎬 **[Video Script](video/script.md)** | Narration script ready to record — for LinkedIn/YouTube content |
| ✅ **[Phase 7 Checklist](PHASE-7-CHECKLIST.md)** | Manual QA guide — Lighthouse, browsers, responsive, publish |
| 💼 **[LinkedIn Post](launch/linkedin-post.md)** | 3 post drafts + hooks, hashtags, timing, 24h engagement plan |
| 🎠 **[Carousel](launch/carousel.md)** | 8-slide carousel content + design notes + alt text |
| 📚 **[Documentation](docs/)** | Written deep-dives (Bahasa Indonesia) for offline reading |

### 🧪 Live Demos You Can Try Right Now

1. **Sorting Visualizer** — watch bubble sort vs merge sort run step-by-step
2. **Decision Tree Trainer** — see a tree grow as the model learns from data
3. **Relationship Explorer** — click concentric circles, see how AI/ML/Algorithms connect
4. **MNIST Digit Recognizer** — draw a digit on canvas, TensorFlow.js model predicts it (trained live in browser!)

---

## 🚀 How to Run

### Option 1 — Online (Easiest)

👉 **[ibam28.github.io/from-algorithms-to-ai](https://ibam28.github.io/from-algorithms-to-ai/)**

### Option 2 — Local

```bash
git clone https://github.com/ibam28/from-algorithms-to-ai.git
cd from-algorithms-to-ai
python3 -m http.server 8000
# open http://localhost:8000
```

### Option 3 — Open index.html Directly

Just double-click `index.html`. All dependencies (D3.js, Reveal.js, TensorFlow.js) load via CDN — zero installation needed.

---

## 🛠️ Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Slides | [Reveal.js](https://revealjs.com/) | Single HTML file, professional look, no build step |
| Website | Vanilla HTML + CSS + JS | Content-first, zero framework overhead |
| Visualization | [D3.js](https://d3js.org/) | Industry standard for interactive charts |
| ML Demo | [TensorFlow.js](https://www.tensorflow.org/js) | Real ML running in browser, no backend needed |
| Hosting | GitHub Pages | Free, auto-deploy from `main` branch |
| License | MIT | Free to use & modify |

> **Why not React/Vue/Next.js?**
> This targets non-technical recruiters — what matters is **load speed and clarity of content**, not the latest framework. The entire bundle is intentionally under 200KB.

---

## 📖 Content Structure

```
01. Algorithms           — "Recipes for solving problems"
                           Demo: sorting visualizer (bubble vs merge)

02. Machine Learning     — "A chef who learns from 10,000 attempts"
                           Demo: decision tree trainer

03. Artificial Intelligence — "The whole restaurant, not just the chef"
                           Timeline: 1950 (Turing) → 2024 (LLMs)

04. The Relationship     — AI ⊃ ML ⊃ Algorithms (but not always!)
                           Counter-example: Symbolic AI ≠ ML
```

Read the deep dives in [`docs/`](docs/) (Bahasa Indonesia).

---

## 💡 The Core Insight (For Recruiters)

If you remember nothing else, remember this:

```
┌────────────────────────────────────────┐
│              AI (goal)                 │
│         "smart machines"               │
│                                        │
│      ┌──────────────────────────┐      │
│      │      ML (method)         │      │
│      │   "learns from data"     │      │
│      │                          │      │
│      │   ┌──────────────────┐   │      │
│      │   │ Algorithms       │   │      │
│      │   │ (the tools)      │   │      │
│      │   └──────────────────┘   │      │
│      └──────────────────────────┘      │
└────────────────────────────────────────┘
```

- **AI** is the **goal**: build machines that act intelligently
- **Machine Learning** is **one approach** to achieve AI (not the only one)
- **Algorithms** are the **building blocks** — every ML method *is* an algorithm

This is the mental model the project aims to install.

---

## 👤 About the Author

**Bambang Saputra Jaya** — Full Stack Developer & AI Engineer

- 🌐 GitHub: [@ibam28](https://github.com/ibam28)
- 💼 LinkedIn: [linkedin.com/in/ibam28](https://linkedin.com/in/ibam28)
- 📧 Email: bamsiangin@gmail.com

### Why I Built This

I kept getting the same question from non-tech friends and family:
*"What is AI? How is it different from Machine Learning?"*

The answers online were either too jargon-heavy or too oversimplified — and often contradictory. So I built **one consistent source** that's visual, interactive, and technically honest.

---

## 🤝 Contributing

Found a conceptual error? Want to add a translation? Pull requests welcome:

1. Fork this repo
2. Create a branch (`git checkout -b fix/ai-ml-clarity`)
3. Commit your change (`git commit -m 'Clarify: AI vs ML relationship'`)
4. Push (`git push origin fix/ai-ml-clarity`)
5. Open a Pull Request

---

## 📜 License

MIT © 2026 Bambang Saputra Jaya. Free to use for learning, with attribution.

---

**⭐ If this helped you understand AI/ML better, give it a star — it really helps with GitHub visibility.**
