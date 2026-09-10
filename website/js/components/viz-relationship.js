/* ============================================================
   Relationship Concentric Circles
   - SVG-based, no D3 needed
   - Click circles to see info panel update
   - Visual: Algoritma ⊂ ML ⊂ AI + Symbolic AI as separate area
   ============================================================ */

const CIRCLE_DATA = {
  algoritma: {
    label: 'Algoritma',
    labelKey: 'rel.algo.title',
    color: '#4f9eff',
    titleKey: 'rel.algo.title',
    descKey: 'rel.algo.desc',
  },
  ml: {
    label: 'Machine Learning',
    labelKey: 'rel.ml.title',
    color: '#ffb84d',
    titleKey: 'rel.ml.title',
    descKey: 'rel.ml.desc',
  },
  ai: {
    label: 'AI',
    labelKey: 'rel.ai.title',
    color: '#b56cff',
    titleKey: 'rel.ai.title',
    descKey: 'rel.ai.desc',
  },
  symbolic: {
    label: 'Symbolic AI',
    labelKey: 'rel.symbolic.title',
    color: '#4ade80',
    titleKey: 'rel.symbolic.title',
    descKey: 'rel.symbolic.desc',
  },
};

// i18n helper (falls back to raw key if engine not loaded yet)
const t = (key, vars) => (window.I18N ? window.I18N.t(key, vars) : key);

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
      tspan.textContent = label.key ? t(label.key) : label.text;
      text.appendChild(tspan);
      g.appendChild(text);
      // Simpan referensi untuk update bahasa
      g.dataset.labelKey = label.key || '';
      g._labelTspan = tspan;
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
    label: { text: 'AI', size: '22px', key: 'rel.ai.title' },
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
    label: { text: 'Machine Learning', size: '13px', key: 'rel.ml.title' },
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
    label: { text: 'Algorithms', size: '11px', key: 'rel.algo.title' },
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
    label: { text: 'Symbolic AI', size: '9px', key: 'rel.symbolic.title' },
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
    circle.setAttribute('aria-label', t(CIRCLE_DATA[initialKey]?.titleKey || initialKey) || initialKey || '');
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
      infoTitle.textContent = t(data.titleKey);
      infoTitle.style.color = data.color;
    }
    if (infoDesc) infoDesc.textContent = t(data.descKey);
  }

  // Initial info
  updateInfo('ai');

  // Re-render labels + panel when language changes
  window.addEventListener('i18n:change', () => {
    svg.querySelectorAll('g[data-label-key]').forEach((g) => {
      const key = g.dataset.labelKey;
      const tspan = g._labelTspan;
      if (key && tspan) tspan.textContent = t(key);
    });
    // Re-apply current info (title/desc follow language)
    const active = document.querySelector('.rel-circle:focus') || null;
    const currentKey = active ? (active.parentElement && active.parentElement.dataset.infoKey) : null;
    updateInfo(currentKey || 'ai');
  });

  console.info('[relationship] initialized');
}
