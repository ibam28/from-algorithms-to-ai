/* ============================================================
   Sorting Visualizer
   - Bubble Sort & Merge Sort
   - Canvas-based animation
   - Controls: algorithm, size, speed, start/pause/reset/shuffle
   - Status text for accessibility (live region)
   ============================================================ */

let state = null;

// i18n helper (falls back to raw key if engine not loaded yet)
const t = (key, vars) => (window.I18N ? window.I18N.t(key, vars) : key);

/**
 * Initialize sorting visualizer.
 * @param {HTMLElement} container - The figure element with id="viz-sorting"
 */
export function initSorting(container) {
  // Resolve elements
  const canvas = container.querySelector('#sorting-canvas');
  const algoSelect = container.querySelector('#sorting-algo');
  const sizeInput = container.querySelector('#sorting-size');
  const sizeVal = container.querySelector('#sorting-size-val');
  const speedInput = container.querySelector('#sorting-speed');
  const speedVal = container.querySelector('#sorting-speed-val');
  const startBtn = container.querySelector('#sorting-start');
  const pauseBtn = container.querySelector('#sorting-pause');
  const resetBtn = container.querySelector('#sorting-reset');
  const shuffleBtn = container.querySelector('#sorting-shuffle');
  const statusEl = container.querySelector('#sorting-status');
  const compEl = container.querySelector('#sorting-comparisons');
  const swapEl = container.querySelector('#sorting-swaps');

  if (!canvas) {
    console.warn('[sorting] Canvas element not found');
    return;
  }

  const ctx = canvas.getContext('2d');
  let array = [];
  let highlights = { indices: [], color: null };
  let isRunning = false;
  let isPaused = false;
  let comparisons = 0;
  let swaps = 0;
  let animationFrameId = null;
  let lastStepTime = 0;

  // ---------- Setup & Resize ----------
  function setupCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    draw();
  }

  function generateArray(size) {
    array = [];
    for (let i = 1; i <= size; i++) {
      array.push(Math.floor(Math.random() * 95) + 5); // 5-99
    }
    shuffle(array);
    comparisons = 0;
    swaps = 0;
    updateStats();
  }

  // ---------- Drawing ----------
  function draw() {
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Clear
    ctx.fillStyle = '#0f1419';
    ctx.fillRect(0, 0, width, height);

    if (array.length === 0) return;

    const barWidth = width / array.length;
    const maxVal = Math.max(...array);

    array.forEach((val, idx) => {
      const barHeight = (val / maxVal) * (height - 10);
      const x = idx * barWidth;
      const y = height - barHeight;

      // Color
      let color;
      if (highlights.indices.includes(idx)) {
        color = highlights.color;
      } else if (isRunning && idx === highlights.current) {
        color = '#ffb84d'; // current
      } else {
        color = '#4f9eff'; // default
      }

      ctx.fillStyle = color;
      ctx.fillRect(x + 1, y, Math.max(barWidth - 2, 1), barHeight);
    });
  }

  // ---------- Sleep helper ----------
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function getDelay() {
    // Speed 1 = slow (200ms), 100 = fast (0ms)
    const speed = parseInt(speedInput.value);
    return Math.max(0, 200 - speed * 2);
  }

  // ---------- Status & Stats ----------
  function setStatus(text) {
    if (statusEl) statusEl.textContent = text;
  }

  function updateStats() {
    if (compEl) compEl.textContent = comparisons.toLocaleString();
    if (swapEl) swapEl.textContent = swaps.toLocaleString();
  }

  // ---------- Pause-aware delay ----------
  async function stepDelay() {
    if (!isRunning) throw new Error('Stopped');
    while (isPaused && isRunning) {
      await sleep(50);
    }
    const delay = getDelay();
    if (delay > 0) {
      // Frame-throttled delay
      await new Promise((resolve) => {
        animationFrameId = requestAnimationFrame(() => {
          setTimeout(resolve, delay);
        });
      });
    }
    if (!isRunning) throw new Error('Stopped');
  }

  // ---------- Bubble Sort ----------
  async function bubbleSort() {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
      let swapped = false;
      for (let j = 0; j < n - i - 1; j++) {
        highlights.indices = [j, j + 1];
        highlights.color = '#ffb84d'; // comparing
        comparisons++;
        setStatus(t('sort.status.bubbleCompare', { i: j, j: j + 1, a: array[j], b: array[j + 1] }));
        updateStats();
        draw();
        await stepDelay();

        if (array[j] > array[j + 1]) {
          highlights.color = '#ff6b6b'; // swapping
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          swaps++;
          swapped = true;
          setStatus(t('sort.status.bubbleSwap', { i: j, j: j + 1 }));
          updateStats();
          draw();
          await stepDelay();
        }
      }
      if (!swapped) {
        setStatus(t('sort.status.bubbleNoSwap'));
        break;
      }
    }
    highlights.indices = [];
    draw();
    setStatus(t('sort.status.done', { c: comparisons.toLocaleString(), s: swaps.toLocaleString() }));
  }

  // ---------- Merge Sort ----------
  async function mergeSort(left = 0, right = array.length - 1) {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    await mergeSort(left, mid);
    await mergeSort(mid + 1, right);
    await merge(left, mid, right);
  }

  async function merge(left, mid, right) {
    const temp = [];
    let i = left;
    let j = mid + 1;

    while (i <= mid && j <= right) {
      highlights.indices = [i, j];
      highlights.color = '#ffb84d';
      comparisons++;
      setStatus(t('sort.status.mergeCompare', { i, j, a: array[i], b: array[j] }));
      updateStats();
      draw();
      await stepDelay();

      if (array[i] <= array[j]) {
        temp.push(array[i]);
        i++;
      } else {
        temp.push(array[j]);
        j++;
      }
    }

    while (i <= mid) {
      highlights.indices = [i];
      highlights.color = '#4ade80';
      temp.push(array[i]);
      i++;
      await stepDelay();
    }

    while (j <= right) {
      highlights.indices = [j];
      highlights.color = '#4ade80';
      temp.push(array[j]);
      j++;
      await stepDelay();
    }

    for (let k = 0; k < temp.length; k++) {
      array[left + k] = temp[k];
      highlights.indices = [left + k];
      highlights.color = '#4ade80'; // writing
      draw();
      await stepDelay();
    }
  }

  // ---------- Controls ----------
  function startSort() {
    if (isRunning) return;
    const algo = algoSelect.value;
    isRunning = true;
    isPaused = false;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    pauseBtn.textContent = t('sort.btn.pause');
    algoSelect.disabled = true;
    shuffleBtn.disabled = true;
    sizeInput.disabled = true;
    setStatus(t('sort.status.start', { algo: t('sort.algo.' + algo) }));

    (async () => {
      try {
        if (algo === 'bubble') {
          await bubbleSort();
        } else {
          await mergeSort();
        }
      } catch (err) {
        if (err.message !== 'Stopped') console.error('[sorting]', err);
      } finally {
        isRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        algoSelect.disabled = false;
        shuffleBtn.disabled = false;
        sizeInput.disabled = false;
        highlights.indices = [];
        draw();
      }
    })();
  }

  function pauseSort() {
    if (!isRunning) return;
    isPaused = !isPaused;
    pauseBtn.textContent = t(isPaused ? 'sort.btn.resume' : 'sort.btn.pause');
    setStatus(t(isPaused ? 'sort.status.paused' : 'sort.status.resumed'));
  }

  function resetSort() {
    isRunning = false;
    isPaused = false;
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    const size = parseInt(sizeInput.value);
    generateArray(size);
    highlights.indices = [];
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    pauseBtn.textContent = t('sort.btn.pause');
    algoSelect.disabled = false;
    shuffleBtn.disabled = false;
    sizeInput.disabled = false;
    setStatus(t('sort.status.reset'));
    draw();
  }

  function shuffleArray() {
    if (isRunning) return;
    generateArray(parseInt(sizeInput.value));
    setStatus(t('sort.status.shuffled'));
    draw();
  }

  // ---------- Event listeners ----------
  startBtn?.addEventListener('click', startSort);
  pauseBtn?.addEventListener('click', pauseSort);
  resetBtn?.addEventListener('click', resetSort);
  shuffleBtn?.addEventListener('click', shuffleArray);

  sizeInput?.addEventListener('input', () => {
    if (sizeVal) sizeVal.textContent = sizeInput.value;
    if (!isRunning) {
      generateArray(parseInt(sizeInput.value));
      draw();
    }
  });

  speedInput?.addEventListener('input', () => {
    if (speedVal) speedVal.textContent = speedInput.value;
  });

  algoSelect?.addEventListener('change', () => {
    if (!isRunning) {
      setStatus(t('sort.status.changed', { algo: t('sort.algo.' + algoSelect.value) }));
    }
  });

  window.addEventListener('resize', () => {
    setupCanvas();
  });

  // Re-render status + button labels when language changes (no restart needed)
  window.addEventListener('i18n:change', () => {
    pauseBtn.textContent = t(isPaused ? 'sort.btn.resume' : 'sort.btn.pause');
    // Re-run current status in the new language (safe: no side effects)
    if (isRunning) {
      if (algoSelect.value === 'bubble' && highlights.indices.length >= 2) {
        // Keep last compare message generic to avoid stale indices
        setStatus(t('sort.status.bubbleCompare', {
          i: highlights.indices[0] ?? 0,
          j: highlights.indices[1] ?? 1,
          a: array[highlights.indices[0]] ?? '?',
          b: array[highlights.indices[1]] ?? '?',
        }));
      } else {
        setStatus(t('sort.status.start', { algo: t('sort.algo.' + algoSelect.value) }));
      }
    } else {
      setStatus(t('sort.status.reset'));
    }
  });

  // ---------- Init ----------
  setupCanvas();
  generateArray(parseInt(sizeInput.value));

  // Save state for potential external access
  state = {
    start: startSort,
    reset: resetSort,
    getArray: () => [...array],
  };

  console.info('[sorting] initialized');
}
