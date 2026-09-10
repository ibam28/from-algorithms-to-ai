/* ============================================================
   Decision Tree Trainer
   - Two datasets: Iris (3-class) & Play Tennis (binary)
   - Visualizes tree growing step-by-step (simulated ID3)
   - Pure SVG, no D3 needed
   ============================================================ */

// Pre-computed trees untuk demo (simplified ID3-style splits)
const DATASETS = {
  iris: {
    name: 'Iris',
    descKey: 'dt.dataset.iris.desc',
    tree: {
      type: 'split',
      feature: 'petal ≤ 2.45 cm',
      left: {
        type: 'leaf',
        class: 'setosa',
        samples: 50,
      },
      right: {
        type: 'split',
        feature: 'petal ≤ 4.95 cm',
        left: {
          type: 'split',
          feature: 'petal width ≤ 1.65 cm',
          left: {
            type: 'leaf',
            class: 'versicolor',
            samples: 47,
          },
          right: {
            type: 'leaf',
            class: 'virginica',
            samples: 4,
          },
        },
        right: {
          type: 'leaf',
          class: 'virginica',
          samples: 46,
        },
      },
    },
  },
  play: {
    name: 'Play Tennis',
    descKey: 'dt.dataset.play.desc',
    tree: {
      type: 'split',
      feature: 'Outlook?',
      branches: {
        'Sunny': {
          type: 'split',
          feature: 'Humidity?',
          branches: {
            'High': { type: 'leaf', class: 'No', samples: 3 },
            'Normal': { type: 'leaf', class: 'Yes', samples: 2 },
          },
        },
        'Overcast': { type: 'leaf', class: 'Yes', samples: 4 },
        'Rain': {
          type: 'split',
          feature: 'Wind?',
          branches: {
            'Weak': { type: 'leaf', class: 'Yes', samples: 3 },
            'Strong': { type: 'leaf', class: 'No', samples: 2 },
          },
        },
      },
    },
  },
};

const CLASS_COLORS = {
  // Iris
  setosa: '#4f9eff',
  versicolor: '#ffb84d',
  virginica: '#b56cff',
  // Play Tennis
  Yes: '#4ade80',
  No: '#ff6b6b',
};

// i18n helper (falls back to raw key if engine not loaded yet)
const t = (key, vars) => (window.I18N ? window.I18N.t(key, vars) : key);

export function initDecisionTree(container) {
  const placeholder = container.querySelector('#dt-placeholder');
  const canvasWrapper = container.querySelector('#dt-canvas-wrapper');
  const datasetSelect = container.querySelector('#dt-dataset');
  const trainBtn = container.querySelector('#dt-train');
  const stepBtn = container.querySelector('#dt-step');
  const resetBtn = container.querySelector('#dt-reset');
  const statusEl = container.querySelector('#dt-status');
  const treeSvg = container.querySelector('#dt-tree');

  // Defensive: if required elements aren't present, abort with a console warning
  if (!treeSvg) {
    console.error('[decision-tree] Required element #dt-tree not found');
    return;
  }

  // Show canvas, hide placeholder
  if (placeholder) placeholder.style.display = 'none';
  if (canvasWrapper) canvasWrapper.hidden = false;

  let stepIndex = -1;
  let trainingInterval = null;

  function reset() {
    if (trainingInterval) {
      clearInterval(trainingInterval);
      trainingInterval = null;
    }
    stepIndex = -1;
    renderEmpty();
    if (trainBtn) trainBtn.disabled = false;
    if (stepBtn) stepBtn.disabled = false;
    if (statusEl) statusEl.textContent = t('dt.status.reset');
  }

  function _legacyFlattenTree(tree) {
    // NOTE: was an early implementation attempt; superseded by the recursive
    // `renderTree()` approach below. Kept for reference only — not called.
    return null;
  }

  function renderTree() {
    if (stepIndex < 0) {
      renderEmpty();
      return;
    }

    const tree = DATASETS[datasetSelect.value].tree;

    // Clear SVG
    while (treeSvg.firstChild) treeSvg.removeChild(treeSvg.firstChild);

    // Layout: walk tree, assign coordinates
    const nodes = [];
    const edges = [];
    let nodeId = 0;

    function visit(node, parentId, depth, xRange) {
      const id = `n${nodeId++}`;
      const x = (xRange[0] + xRange[1]) / 2;
      const yLevelGap = 80;
      const record = { id, node, parentId, depth, x, y: 40 + depth * yLevelGap };
      nodes.push(record);

      if (node.type === 'split') {
        if (node.branches) {
          const keys = Object.keys(node.branches);
          const width = xRange[1] - xRange[0];
          const childWidth = width / keys.length;
          keys.forEach((key, i) => {
            const childRange = [xRange[0] + i * childWidth, xRange[0] + (i + 1) * childWidth];
            const childX = (childRange[0] + childRange[1]) / 2;
            const child = visit(node.branches[key], id, depth + 1, childRange);
            edges.push({ from: id, to: child.id, label: key });
          });
        } else {
          // Binary
          const mid = x;
          const width = xRange[1] - xRange[0];
          const halfW = width / 2;
          const leftRange = [xRange[0], mid];
          const rightRange = [mid, xRange[1]];
          const leftChild = visit(node.left, id, depth + 1, leftRange);
          const rightChild = visit(node.right, id, depth + 1, rightRange);
          edges.push({ from: id, to: leftChild.id, label: t('dt.edge.yes') });
          edges.push({ from: id, to: rightChild.id, label: t('dt.edge.no') });
        }
      }
      return record;
    }

    visit(tree, null, 0, [0, 1]);

    // Determine SVG dimensions
    const maxDepth = Math.max(...nodes.map((n) => n.depth));
    const svgHeight = 40 + maxDepth * 80 + 60;
    const svgWidth = 800;
    treeSvg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);
    treeSvg.style.height = `${svgHeight}px`;

    // Scale x to SVG coords
    nodes.forEach((n) => {
      n.svgX = n.x * (svgWidth - 80) + 40;
      n.svgY = n.y;
    });

    // Reveal animation: only show nodes up to stepIndex
    const visibleCount = stepIndex + 1;
    const visibleNodeIds = new Set(nodes.slice(0, visibleCount).map((n) => n.id));

    // Draw edges first (so nodes overlay)
    edges.forEach((edge) => {
      const fromNode = nodes.find((n) => n.id === edge.from);
      const toNode = nodes.find((n) => n.id === edge.to);
      if (!fromNode || !toNode) return;
      if (!visibleNodeIds.has(edge.from) || !visibleNodeIds.has(edge.to)) return;

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', fromNode.svgX);
      line.setAttribute('y1', fromNode.svgY + 14);
      line.setAttribute('x2', toNode.svgX);
      line.setAttribute('y2', toNode.svgY - 14);
      line.classList.add('dt-link');
      treeSvg.appendChild(line);

      // Label
      const labelX = (fromNode.svgX + toNode.svgX) / 2;
      const labelY = (fromNode.svgY + toNode.svgY) / 2;

      const labelBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      labelBg.setAttribute('x', labelX - 18);
      labelBg.setAttribute('y', labelY - 8);
      labelBg.setAttribute('width', 36);
      labelBg.setAttribute('height', 16);
      labelBg.setAttribute('rx', 3);
      labelBg.classList.add('dt-label-bg');
      labelBg.style.fill = '#1a1f2e';
      labelBg.style.stroke = '#2d3548';
      labelBg.style.strokeWidth = '1';
      treeSvg.appendChild(labelBg);

      const labelText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      labelText.setAttribute('x', labelX);
      labelText.setAttribute('y', labelY);
      labelText.setAttribute('text-anchor', 'middle');
      labelText.setAttribute('dominant-baseline', 'central');
      labelText.classList.add('dt-label');
      labelText.textContent = edge.label;
      labelText.style.fontSize = '10px';
      treeSvg.appendChild(labelText);
    });

    // Draw nodes
    nodes.forEach((node, idx) => {
      if (idx > stepIndex) return;
      const isLeaf = node.node.type === 'leaf';
      const cx = node.svgX;
      const cy = node.svgY;

      // Node circle
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', cx);
      circle.setAttribute('cy', cy);
      circle.setAttribute('r', isLeaf ? 22 : 26);
      circle.classList.add(isLeaf ? 'dt-node-leaf' : 'dt-node');
      if (isLeaf) {
        circle.style.fill = CLASS_COLORS[node.node.class] || '#666';
        circle.style.stroke = CLASS_COLORS[node.node.class] || '#666';
      }
      treeSvg.appendChild(circle);

      // Label
      const labelText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      labelText.setAttribute('x', cx);
      labelText.setAttribute('y', cy);
      labelText.setAttribute('text-anchor', 'middle');
      labelText.setAttribute('dominant-baseline', 'central');
      labelText.classList.add('dt-label');
      labelText.style.fontWeight = '700';

      if (isLeaf) {
        labelText.textContent = node.node.class;
        labelText.style.fontSize = '11px';
      } else {
        // Split node: show feature
        const feature = node.node.feature;
        const truncated = feature.length > 10 ? feature.substring(0, 9) + '…' : feature;
        labelText.textContent = truncated;
        labelText.style.fontSize = '10px';
      }
      labelText.style.fill = isLeaf ? '#0f1419' : '#e6e9ef';
      treeSvg.appendChild(labelText);
    });

    // Update status
    if (statusEl) {
      const lastShown = nodes[stepIndex];
      if (!lastShown) {
        statusEl.textContent = '';
        return;
      }
      if (lastShown.node.type === 'split') {
        statusEl.textContent = t('dt.status.nodeSplit', { n: stepIndex + 1, feat: lastShown.node.feature });
      } else {
        statusEl.textContent = t('dt.status.leaf', { n: stepIndex + 1, cls: lastShown.node.class, samples: lastShown.node.samples });
      }
    }
  }

  function renderEmpty() {
    while (treeSvg.firstChild) treeSvg.removeChild(treeSvg.firstChild);
    treeSvg.setAttribute('viewBox', '0 0 800 100');
    treeSvg.style.height = '100px';
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', 400);
    text.setAttribute('y', 50);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', '#9aa3b8');
    text.textContent = t('dt.status.empty');
    treeSvg.appendChild(text);
  }

  function step() {
    const dataset = DATASETS[datasetSelect.value];
    const totalNodes = countNodes(dataset.tree);
    if (stepIndex >= totalNodes - 1) {
      if (statusEl) statusEl.textContent = t('dt.status.full');
      return;
    }
    stepIndex++;
    renderTree();
    if (trainBtn) trainBtn.disabled = false;
  }

  function countNodes(node) {
    if (node.type === 'leaf') return 1;
    let count = 1;
    if (node.branches) {
      Object.values(node.branches).forEach((child) => {
        count += countNodes(child);
      });
    } else {
      count += countNodes(node.left) + countNodes(node.right);
    }
    return count;
  }

  function startTraining() {
    if (trainingInterval) {
      clearInterval(trainingInterval);
      trainingInterval = null;
    }
    if (trainBtn) trainBtn.disabled = true;
    if (stepBtn) stepBtn.disabled = true;
    if (statusEl) statusEl.textContent = t('dt.status.start');

    // Kalau tree sudah lengkap, ulang dari akar supaya animasinya kelihatan
    const initialTotal = countNodes(DATASETS[datasetSelect.value].tree);
    if (stepIndex >= initialTotal - 1) stepIndex = -1;

    trainingInterval = setInterval(() => {
      const dataset = DATASETS[datasetSelect.value];
      const totalNodes = countNodes(dataset.tree);
      if (stepIndex >= totalNodes - 1) {
        clearInterval(trainingInterval);
        trainingInterval = null;
        if (trainBtn) trainBtn.disabled = false;
        if (stepBtn) stepBtn.disabled = false;
        if (statusEl) statusEl.textContent = t('dt.status.full');
        return;
      }
      stepIndex++;
      renderTree();
    }, 800);
  }

  // Event listeners
  trainBtn?.addEventListener('click', startTraining);
  stepBtn?.addEventListener('click', step);
  resetBtn?.addEventListener('click', reset);
  datasetSelect?.addEventListener('change', () => {
    reset();
    if (statusEl) {
      const ds = DATASETS[datasetSelect.value];
      statusEl.textContent = t('dt.status.dataset', { name: ds.name, desc: t(ds.descKey) });
    }
  });

  // Re-render tree + status when language changes (labels are dynamic)
  window.addEventListener('i18n:change', () => {
    if (stepIndex >= 0) {
      renderTree(); // redraw SVG edges/nodes + status in new language
    } else if (trainingInterval) {
      if (statusEl) statusEl.textContent = t('dt.status.start');
    } else {
      const ds = DATASETS[datasetSelect.value];
      if (statusEl) statusEl.textContent = t('dt.status.init', { name: ds.name });
    }
  });

  // Init
  reset();
  if (statusEl) {
    statusEl.textContent = t('dt.status.init', { name: DATASETS.iris.name });
  }

  console.info('[decision-tree] initialized');
}
