/* ============================================================
   From Algorithms to AI — SPA Controller
   - Scroll spy (active nav state)
   - Smooth scroll untuk hash links
   - Lazy-load orchestrator untuk visualisasi
   - TF.js placeholder (akan dipakai Phase 4)
   ============================================================ */

// ---------- Cache untuk lazy-loaded modules ----------
const moduleCache = {};

// ---------- i18n helper (fallback ke raw key) ----------
const t = (key, vars) => (window.I18N ? window.I18N.t(key, vars) : key);

// ---------- D3 lazy loader ----------
function loadD3() {
  if (!moduleCache.d3) {
    moduleCache.d3 = import('https://cdn.jsdelivr.net/npm/d3@7/+esm')
      .then((mod) => {
        console.info('[viz] D3.js loaded');
        return mod;
      })
      .catch((err) => {
        console.error('[viz] D3.js failed to load:', err);
        throw err;
      });
  }
  return moduleCache.d3;
}

// ---------- TF.js lazy loader (untuk Phase 4 — MNIST demo) ----------
function loadTFJS() {
  if (!moduleCache.tfjs) {
    moduleCache.tfjs = import('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.20.0/dist/tf.min.js')
      .then(() => {
        console.info('[viz] TensorFlow.js loaded');
        return window.tf;
      })
      .catch((err) => {
        console.error('[viz] TensorFlow.js failed to load:', err);
        throw err;
      });
  }
  return moduleCache.tfjs;
}

// ---------- Visualisasi registry ----------
const vizRegistry = {
  'sorting': {
    loader: () => import('./components/viz-sorting.js'),
    needsD3: false,
    init: (mod, container) => mod.initSorting(container),
  },
  'decision-tree': {
    loader: () => import('./components/viz-decision-tree.js'),
    needsD3: false,
    init: (mod, container) => mod.initDecisionTree(container),
  },
  'relationship': {
    loader: () => import('./components/viz-relationship.js'),
    needsD3: false,
    init: (mod, container) => mod.initRelationship(container),
  },
  // 'timeline' is pure CSS/HTML — no JS init needed
};

// ---------- IntersectionObserver: lazy load viz saat masuk viewport ----------
const vizObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.vizLoaded) {
        const vizName = entry.target.dataset.viz;
        if (vizName && vizRegistry[vizName]) {
          loadVisualization(entry.target, vizName);
        } else if (vizName === 'timeline') {
          // Timeline is static CSS — just mark loaded
          entry.target.dataset.vizLoaded = 'true';
        }
        vizObserver.unobserve(entry.target);
      }
    });
  },
  { rootMargin: '200px' },
);

// ---------- Visualisasi loader ----------
async function loadVisualization(container, vizName) {
  const config = vizRegistry[vizName];
  if (!config) {
    console.warn(`[viz] No registry entry for "${vizName}"`);
    return;
  }

  // Mark as loading for accessibility (screen readers)
  container.dataset.vizState = 'loading';

  try {
    // Resolve dependencies
    if (config.needsD3) await loadD3();

    // Load module
    const mod = await config.loader();

    // Initialize
    await config.init(mod, container);

    container.dataset.vizLoaded = 'true';
    container.dataset.vizState = 'loaded';
    console.info(`[viz] "${vizName}" initialized`);
  } catch (err) {
    console.error(`[viz] "${vizName}" failed:`, err);
    container.dataset.vizState = 'error';
    showVizError(container, vizName, err);
  }
}

function showVizError(container, vizName, err) {
  const placeholder = container.querySelector('.viz-placeholder');
  if (placeholder) {
    placeholder.innerHTML = `
      <div class="viz-placeholder-icon">⚠️</div>
      <p class="viz-placeholder-text">
        ${t('app.viz.failed', { name: vizName })}
      </p>
      <button class="btn viz-retry-btn">${t('app.viz.retry')}</button>
      <p style="font-size: 0.8rem; margin-top: 8px; opacity: 0.6;">
        ${err.message || 'Unknown error'}
      </p>
    `;
    placeholder.querySelector('.viz-retry-btn')?.addEventListener('click', () => {
      container.dataset.vizLoaded = '';
      container.dataset.vizState = '';
      loadVisualization(container, vizName);
    });
  }
}

// ---------- Scroll spy untuk nav active state ----------
const navLinks = document.querySelectorAll('.website-nav-links a');
const sections = document.querySelectorAll('main section[id]');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          const isActive = link.getAttribute('href') === `#${id}`;
          link.classList.toggle('active', isActive);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' },
);

// ---------- Smooth scroll untuk anchor links ----------
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.length <= 1) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update URL without jumping
      history.pushState(null, '', href);
    });
  });
}

// ---------- Manual load button untuk viz ----------
function setupManualLoadButtons() {
  document.querySelectorAll('.viz-load-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const figure = e.target.closest('figure[data-viz]');
      if (!figure) return;
      const vizName = figure.dataset.viz;
      if (vizName) {
        loadVisualization(figure, vizName);
      }
    });
  });
}

// ---------- Init ----------
function init() {
  console.info('[app] Initializing SPA...');

  // Observe sections for scroll spy
  sections.forEach((section) => navObserver.observe(section));

  const vizFigures = document.querySelectorAll('figure[data-viz]');

  if (typeof IntersectionObserver === 'function') {
    vizFigures.forEach((figure) => vizObserver.observe(figure));
  } else {
    // Fallback: browser tanpa IntersectionObserver — muat semua viz langsung
    console.warn('[app] IntersectionObserver unavailable — loading all viz eagerly');
    vizFigures.forEach((figure) => {
      const vizName = figure.dataset.viz;
      if (vizName && vizRegistry[vizName]) loadVisualization(figure, vizName);
    });
  }

  // Setup interactions
  setupSmoothScroll();
  setupManualLoadButtons();

  console.info('[app] SPA ready');
}

// Run when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Expose untuk debugging
window.__DSH_VIZ__ = {
  loadVisualization,
  loadD3,
  loadTFJS,
  registry: vizRegistry,
};
