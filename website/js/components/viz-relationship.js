/* ============================================================
   Relationship Concentric Circles
   - SVG-based, no D3 needed
   - Click circles to see info panel update
   - Visual: Algoritma ⊂ ML ⊂ AI + Symbolic AI as separate area
   ============================================================ */

const CIRCLE_DATA = {
  algoritma: {
    label: 'Algoritma',
    color: '#4f9eff',
    title: '📐 Algoritma',
    desc: 'Langkah-langkah pasti untuk menyelesaikan masalah. Algoritma adalah alat fundamental yang dipakai banyak hal — termasuk di luar AI. Contoh: sortir array, cari rute, hash table.',
  },
  ml: {
    label: 'Machine Learning',
    color: '#ffb84d',
    title: '🤖 Machine Learning',
    desc: 'Subset AI di mana mesin belajar dari data, bukan dari aturan yang ditulis tangan. ML = banyak algoritma yang bekerja sama untuk menemukan pola. Contoh: filter spam, rekomendasi Netflix, prediksi harga.',
  },
  ai: {
    label: 'AI',
    color: '#b56cff',
    title: '✨ Artificial Intelligence',
    desc: 'Bidang riset untuk membuat mesin bertindak "cerdas". AI = ML + Symbolic AI + NLP + Computer Vision + Robotics + Planning. Contoh: self-driving car, ChatGPT, medical diagnosis.',
  },
  symbolic: {
    label: 'Symbolic AI',
    color: '#4ade80',
    title: '📋 Symbolic AI (di luar ML)',
    desc: 'AI berbasis aturan if-then yang ditulis tangan — bukan belajar dari data. Ini AI tanpa ML. Contoh: expert system MYCIN untuk diagnosis medis, sistem pakar pajak, logic programming.',
  },
};

export function initRelationship(container) {
  const svg = container.querySelector('#rel-svg');
  const infoTitle = container.querySelector('#rel-info-title');
  const infoDesc = container.querySelector('#rel-info-desc');

  if (!svg) {
    console.error('[relationship] Required element #rel-svg not found');
    return;
  }

  // Clear SVG
  while (svg.firstChild) svg.removeChild(svg.firstChild);

  const cx = 300;
  const cy = 200;

  // Defs (gradients)
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  defs.innerHTML = `
    <radialGradient id="grad-ai" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#b56cff" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#b56cff" stop-opacity="0.35"/>
    </radialGradient>
    <radialGradient id="grad-ml" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffb84d" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#ffb84d" stop-opacity="0.5"/>
    </radialGradient>
    <radialGradient id="grad-algo" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#4f9eff" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#4f9eff" stop-opacity="0.7"/>
    </radialGradient>
    <radialGradient id="grad-symbolic" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#4ade80" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#4ade80" stop-opacity="0.4"/>
    </radialGradient>
  `;
  svg.appendChild(defs);

  // Helper: create a circle
  function createCircle({ id, cx: cxx, cy: cyy, r, fill, stroke, strokeWidth, label, clickable, infoKey }) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'rel-group');
    g.dataset.infoKey = infoKey || '';

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('id', id);
    circle.setAttribute('cx', cxx);
    circle.setAttribute('cy', cyy);
    circle.setAttribute('r', r);
    circle.setAttribute('fill', fill);
    if (stroke) {
      circle.setAttribute('stroke', stroke);
      circle.setAttribute('stroke-width', strokeWidth || 1.5);
    }
    if (clickable) circle.classList.add('rel-circle');
    g.appendChild(circle);

    // Label
    if (label) {
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', cxx);
      text.setAttribute('y', cyy);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'central');
      text.classList.add('rel-label');
      text.style.fontSize = label.size || '14px';
      text.style.fill = label.color || 'white';
      const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
      tspan.setAttribute('x', cxx);
      tspan.textContent = label.text;
      text.appendChild(tspan);
      g.appendChild(text);
    }

    svg.appendChild(g);
    return g;
  }

  // Build circles: outer (AI) → mid (ML) → inner (Algoritma)
  // Symbolic AI as a smaller circle outside the main stack (in AI area but not in ML)
  createCircle({
    id: 'circle-ai',
    cx: cx,
    cy: cy,
    r: 180,
    fill: 'url(#grad-ai)',
    stroke: '#b56cff',
    strokeWidth: 2,
    label: { text: 'AI', size: '22px' },
    clickable: true,
    infoKey: 'ai',
  });

  createCircle({
    id: 'circle-ml',
    cx: cx,
    cy: cy,
    r: 120,
    fill: 'url(#grad-ml)',
    stroke: '#ffb84d',
    strokeWidth: 2,
    label: { text: 'ML', size: '18px' },
    clickable: true,
    infoKey: 'ml',
  });

  createCircle({
    id: 'circle-algo',
    cx: cx,
    cy: cy,
    r: 60,
    fill: 'url(#grad-algo)',
    stroke: '#4f9eff',
    strokeWidth: 2,
    label: { text: 'Algoritma', size: '11px' },
    clickable: true,
    infoKey: 'algoritma',
  });

  // Symbolic AI: separate circle (in AI but outside ML)
  createCircle({
    id: 'circle-symbolic',
    cx: cx + 130,
    cy: cy - 50,
    r: 35,
    fill: 'url(#grad-symbolic)',
    stroke: '#4ade80',
    strokeWidth: 1.5,
    label: { text: 'Symbolic AI', size: '9px' },
    clickable: true,
    infoKey: 'symbolic',
  });

  // Hover & click interactions
  svg.querySelectorAll('.rel-circle').forEach((circle) => {
    // infoKey lives on the parent <g>, not on the circle itself
    const getKey = () => circle.parentElement && circle.parentElement.dataset.infoKey;

    circle.addEventListener('mouseenter', () => {
      updateInfo(getKey());
    });
    circle.addEventListener('click', () => {
      updateInfo(getKey());
    });
    circle.setAttribute('tabindex', '0');
    circle.setAttribute('role', 'button');
    const initialKey = getKey();
    circle.setAttribute('aria-label', CIRCLE_DATA[initialKey]?.title || initialKey || '');
    circle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        updateInfo(getKey());
      }
    });
  });

  function updateInfo(key) {
    const data = CIRCLE_DATA[key];
    if (!data) return;
    if (infoTitle) {
      infoTitle.textContent = data.title;
      infoTitle.style.color = data.color;
    }
    if (infoDesc) infoDesc.textContent = data.desc;
  }

  // Initial info
  updateInfo('ai');

  console.info('[relationship] initialized');
}
