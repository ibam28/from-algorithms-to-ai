/* ============================================================
   MNIST Demo — TensorFlow.js in browser
   - CNN dengan arsitektur dari ARSITEKTUR §7
   - Pointer Events untuk canvas (mouse + touch + pen)
   - Fallback CDN → synthetic data
   ============================================================ */

// =====================================================
//  STATE
// =====================================================
const state = {
  model: null,
  isTraining: false,
  isModelTrained: false,
  trainData: null,
  testData: null,
  canvasContext: null,
  isDrawing: false,
  brushSize: 14,
  presetSamples: null, // [{digit: 0, pixels: Float32Array(784)}, ...]
};

// =====================================================
//  TF.JS LOADER (lazy, with loading overlay)
// =====================================================
async function loadTFJS() {
  const overlay = document.getElementById('tfjs-loading-overlay');
  const message = document.getElementById('loading-message');

  if (window.tf) return window.tf;

  overlay.hidden = false;

  try {
    message.textContent = 'Memuat TensorFlow.js...';
    const tf = await import('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.20.0/dist/tf.min.js');
    message.textContent = 'TensorFlow.js siap!';
    overlay.hidden = true;
    console.info('[mnist] TF.js loaded, version:', tf.version.tfjs);
    return tf;
  } catch (err) {
    message.textContent = 'Gagal memuat TensorFlow.js';
    message.style.color = '#ff6b6b';
    throw err;
  }
}

// =====================================================
//  MNIST DATA LOADER (with fallback)
// =====================================================
async function loadMnistSubset(tf, numTrain = 5000, numTest = 1000) {
  try {
    console.info('[mnist] Attempting CDN fetch...');
    const data = await loadFromCDN(tf, numTrain, numTest);
    console.info('[mnist] CDN load success');
    return data;
  } catch (err) {
    console.warn('[mnist] CDN failed, using synthetic data:', err.message);
    return generateSyntheticData(tf, numTrain, numTest);
  }
}

async function loadFromCDN(tf, numTrain, numTest) {
  // Google's public MNIST for TF.js examples
  const BASE = 'https://storage.googleapis.com/learnjs-data/model-builder/';
  const [imagesRes, labelsRes] = await Promise.all([
    fetch(BASE + 'mnist_images.png'),
    fetch(BASE + 'mnist_labels_uint8'),
  ]);

  if (!imagesRes.ok || !labelsRes.ok) {
    throw new Error(`HTTP ${imagesRes.status}/${labelsRes.status}`);
  }

  const imagesBlob = await imagesRes.blob();
  const labelsBuf = new Uint8Array(await labelsRes.arrayBuffer());

  // Use a temp canvas to decode PNG
  const img = await createImageBitmap(imagesBlob);
  const W = img.width;
  const H = img.height;
  console.info(`[mnist] Images: ${W}x${H}, labels: ${labelsBuf.length}`);

  // Extract only what we need (subset)
  const totalImages = W / 28; // each image is 28x28 stacked horizontally
  if (Math.floor(totalImages) * 28 !== W || H !== 28) {
    throw new Error(`Unexpected PNG dimensions: ${W}x${H}`);
  }

  const trainImages = Math.min(numTrain, totalImages);
  const testImages = Math.min(numTest, totalImages - trainImages);

  // Read pixel data
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = (trainImages + testImages) * 28;
  tempCanvas.height = 28;
  const tempCtx = tempCanvas.getContext('2d');
  tempCtx.drawImage(img, 0, 0);
  const totalImgWidth = (trainImages + testImages) * 28;
  const fullData = tempCtx.getImageData(0, 0, totalImgWidth, 28);

  // Slice into train/test
  function extractImage(imageIdx, totalImages) {
    const pixels = new Float32Array(784);
    for (let j = 0; j < 784; j++) {
      // For pixel j: x = j % 28, y = Math.floor(j / 28)
      const x = j % 28;
      const y = Math.floor(j / 28);
      // Absolute position in the full sprite
      const absX = imageIdx * 28 + x;
      const dataIdx = (y * totalImages * 28 + absX) * 4;
      // R channel (grayscale)
      pixels[j] = fullData.data[dataIdx] / 255;
    }
    return pixels;
  }

  const trainXs = [];
  const trainYs = [];
  for (let i = 0; i < trainImages; i++) {
    trainXs.push(extractImage(i, trainImages + testImages));
    trainYs.push(labelsBuf[i]);
  }

  const testXs = [];
  const testYs = [];
  for (let i = 0; i < testImages; i++) {
    const idx = trainImages + i;
    testXs.push(extractImage(idx, trainImages + testImages));
    testYs.push(labelsBuf[trainImages + i]);
  }

  // Build tensors
  const trainXTensor = tf.tensor2d(trainXs, [trainImages, 784]).reshape([trainImages, 28, 28, 1]);
  const trainYTensor = tf.oneHot(tf.tensor1d(trainYs, 'int32'), 10);
  const testXTensor = tf.tensor2d(testXs, [testImages, 784]).reshape([testImages, 28, 28, 1]);
  const testYTensor = tf.oneHot(tf.tensor1d(testYs, 'int32'), 10);

  // Save a few preset samples for the preset digit picker
  const presetSamples = [];
  for (const digit of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
    // Find first sample with this digit
    for (let i = 0; i < testImages; i++) {
      if (testYs[i] === digit) {
        presetSamples.push({ digit, pixels: testXs[i] });
        break;
      }
    }
  }

  return {
    trainXs: trainXTensor,
    trainYs: trainYTensor,
    testXs: testXTensor,
    testYs: testYTensor,
    presetSamples,
    source: 'CDN (Google TF.js storage)',
  };
}

function generateSyntheticData(tf, numTrain, numTest) {
  // Last-resort fallback: synthetic data that is "MNIST-like"
  // Won't give meaningful accuracy but lets demo flow work
  const trainXsArr = [];
  const trainYsArr = [];
  const testXsArr = [];
  const testYsArr = [];

  function makePattern(digit) {
    // Very crude patterns - just for flow demo
    const pixels = new Float32Array(784);
    for (let i = 0; i < 784; i++) {
      pixels[i] = Math.random() * 0.1; // mostly black
    }
    // Add some structure per digit (just for visualization)
    const center = 14 + (digit % 5) * 3;
    for (let y = 8; y < 20; y++) {
      for (let x = 8; x < 20; x++) {
        if (Math.random() > 0.5) {
          pixels[y * 28 + x] = 0.7 + Math.random() * 0.3;
        }
      }
    }
    return pixels;
  }

  const perDigit = Math.floor(numTrain / 10);
  const perDigitTest = Math.floor(numTest / 10);

  for (let d = 0; d < 10; d++) {
    for (let i = 0; i < perDigit; i++) {
      trainXsArr.push(makePattern(d));
      trainYsArr.push(d);
    }
    for (let i = 0; i < perDigitTest; i++) {
      testXsArr.push(makePattern(d));
      testYsArr.push(d);
    }
  }

  // Build tensors
  const trainXTensor = tf.tensor3d(trainXsArr, [trainXsArr.length, 28, 28]).reshape([trainXsArr.length, 28, 28, 1]);
  const trainYTensor = tf.oneHot(tf.tensor1d(trainYsArr, 'int32'), 10);
  const testXTensor = tf.tensor3d(testXsArr, [testXsArr.length, 28, 28]).reshape([testXsArr.length, 28, 28, 1]);
  const testYTensor = tf.oneHot(tf.tensor1d(testYsArr, 'int32'), 10);

  // No useful presets
  return {
    trainXs: trainXTensor,
    trainYs: trainYTensor,
    testXs: testXTensor,
    testYs: testYTensor,
    presetSamples: [],
    source: 'Synthetic fallback (CDN unavailable)',
  };
}

// =====================================================
//  MODEL BUILDER (per ARSITEKTUR §7)
// =====================================================
function buildModel(tf) {
  const model = tf.sequential();
  model.add(tf.layers.conv2d({
    inputShape: [28, 28, 1],
    kernelSize: 3,
    filters: 16,
    activation: 'relu',
  }));
  model.add(tf.layers.maxPooling2d({ poolSize: 2 }));
  model.add(tf.layers.conv2d({
    kernelSize: 3,
    filters: 32,
    activation: 'relu',
  }));
  model.add(tf.layers.maxPooling2d({ poolSize: 2 }));
  model.add(tf.layers.flatten());
  model.add(tf.layers.dense({ units: 128, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 10, activation: 'softmax' }));

  model.compile({
    optimizer: tf.train.adam(0.001),
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  });

  console.info('[mnist] Model built. Total params:',
    model.countParams());

  return model;
}

// =====================================================
//  TRAINING
// =====================================================
async function trainModel(tf, epochs = 3) {
  const trainBtn = document.getElementById('train-btn');
  const statusEl = document.getElementById('training-status');
  const progressWrapper = document.getElementById('training-progress-wrapper');
  const progressBar = document.getElementById('progress-bar');
  const progressLabel = document.getElementById('progress-label');
  const epochCurrent = document.getElementById('epoch-current');
  const epochTotal = document.getElementById('epoch-total');
  const lossEl = document.getElementById('stat-loss');
  const accEl = document.getElementById('stat-acc');
  const speedEl = document.getElementById('stat-speed');
  const logEl = document.getElementById('training-log');
  const predictBtn = document.getElementById('predict-btn');
  const predictionStatus = document.getElementById('prediction-status');

  // UI updates
  trainBtn.disabled = true;
  state.isTraining = true;
  progressWrapper.hidden = false;
  document.getElementById('training-stats').hidden = false;
  logEl.innerHTML = '';
  statusEl.textContent = 'Memulai training...';
  epochTotal.textContent = epochs;

  const startTime = performance.now();

  await state.model.fit(state.trainData.trainXs, state.trainData.trainYs, {
    epochs,
    batchSize: 128,
    validationData: [state.trainData.testXs, state.trainData.testYs],
    callbacks: {
      onBatchEnd: async (batch, logs) => {
        const totalBatches = Math.ceil(state.trainData.trainXs.shape[0] / 128);
        const currentBatch = batch + 1;
        const epochProgress = currentBatch / totalBatches;
        const totalProgress = ((state.currentEpoch || 0) + epochProgress) / epochs;

        progressBar.style.width = `${(totalProgress * 100).toFixed(1)}%`;
        progressLabel.textContent = `${(totalProgress * 100).toFixed(0)}%`;

        const elapsed = (performance.now() - startTime) / 1000;
        const samplesProcessed = ((state.currentEpoch || 0) * state.trainData.trainXs.shape[0]) + currentBatch * 128;
        const speed = (samplesProcessed / elapsed).toFixed(0);
        speedEl.textContent = speed;
      },
      onEpochEnd: async (epoch, logs) => {
        state.currentEpoch = epoch + 1;
        epochCurrent.textContent = epoch + 1;
        lossEl.textContent = logs.loss.toFixed(4);
        accEl.textContent = (logs.acc * 100).toFixed(1) + '%';
        const valAcc = logs.val_acc ? ` | val_acc: ${(logs.val_acc * 100).toFixed(1)}%` : '';
        const valLoss = logs.val_loss ? `, val_loss: ${logs.val_loss.toFixed(4)}` : '';
        addLog(`Epoch ${epoch + 1}/${epochs} — loss: ${logs.loss.toFixed(4)}${valLoss}, acc: ${(logs.acc * 100).toFixed(1)}%${valAcc}`, 'epoch-end');
      },
    },
  });

  // Training complete
  state.isTraining = false;
  state.isModelTrained = true;
  trainBtn.disabled = false;
  trainBtn.textContent = '↻ Retrain';
  statusEl.textContent = `Selesai dalam ${((performance.now() - startTime) / 1000).toFixed(1)}s`;
  progressBar.style.width = '100%';
  progressLabel.textContent = '100%';
  addLog(`✓ Training complete! Model siap untuk prediksi.`, 'training-complete');

  // Enable predict button
  predictBtn.disabled = false;
  predictionStatus.textContent = 'Model siap! Gambar angka lalu klik Prediksi.';
}

function addLog(text, className = '') {
  const logEl = document.getElementById('training-log');
  const line = document.createElement('div');
  line.className = `log-line ${className}`;
  line.textContent = text;
  logEl.appendChild(line);
  logEl.scrollTop = logEl.scrollHeight;
}

// =====================================================
//  CANVAS DRAWING (Pointer Events per ARSITEKTUR §7.1)
// =====================================================
function setupCanvas() {
  const canvas = document.getElementById('draw-canvas');
  const ctx = canvas.getContext('2d');
  state.canvasContext = ctx;

  // Fill black background
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let lastX = 0;
  let lastY = 0;

  function getCoords(e) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    };
  }

  function startDraw(e) {
    e.preventDefault();
    state.isDrawing = true;
    const { x, y } = getCoords(e);
    lastX = x;
    lastY = y;
    drawDot(x, y);
  }

  function drawDot(x, y) {
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(x, y, state.brushSize / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawMove(e) {
    if (!state.isDrawing) return;
    e.preventDefault();
    const { x, y } = getCoords(e);
    // Smooth stroke with quadratic curve
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = state.brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.quadraticCurveTo(lastX, lastY, (lastX + x) / 2, (lastY + y) / 2);
    ctx.stroke();
    lastX = x;
    lastY = y;
  }

  function endDraw(e) {
    if (!state.isDrawing) return;
    state.isDrawing = false;
    e.preventDefault();
  }

  // Pointer Events (handles mouse + touch + pen)
  canvas.addEventListener('pointerdown', startDraw);
  canvas.addEventListener('pointermove', drawMove);
  canvas.addEventListener('pointerup', endDraw);
  canvas.addEventListener('pointerleave', endDraw);
  canvas.addEventListener('pointercancel', endDraw);

  // Prevent context menu on long press (mobile)
  canvas.addEventListener('contextmenu', (e) => e.preventDefault());

  // Clear button
  document.getElementById('clear-btn').addEventListener('click', () => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    document.getElementById('prediction-result').hidden = true;
    document.getElementById('prediction-status').textContent =
      'Klik Prediksi untuk melihat hasil.';
  });

  // Brush size
  const brushInput = document.getElementById('brush-size');
  const brushVal = document.getElementById('brush-size-val');
  brushInput.addEventListener('input', () => {
    state.brushSize = parseInt(brushInput.value);
    brushVal.textContent = brushInput.value;
  });
}

// =====================================================
//  PREDICTION
// =====================================================
async function predictFromCanvas() {
  if (!state.isModelTrained) {
    alert('Latih model dulu!');
    return;
  }

  const tf = window.tf;
  const canvas = document.getElementById('draw-canvas');
  const resultEl = document.getElementById('prediction-result');
  const digitEl = document.getElementById('predicted-digit');
  const confEl = document.getElementById('predicted-confidence');
  const top3El = document.getElementById('top-3');
  const previewCanvas = document.getElementById('preview-canvas');
  const statusEl = document.getElementById('prediction-status');

  statusEl.textContent = 'Memprediksi...';
  resultEl.hidden = false;

  // 1. Resize 280x280 canvas to 28x28
  const smallCanvas = document.createElement('canvas');
  smallCanvas.width = 28;
  smallCanvas.height = 28;
  const smallCtx = smallCanvas.getContext('2d');
  smallCtx.drawImage(canvas, 0, 0, 28, 28);

  // 2. Get image data and invert (MNIST = white on black, our canvas is same but normalize)
  const imageData = smallCtx.getImageData(0, 0, 28, 28);
  const pixels = new Float32Array(784);
  for (let i = 0; i < 784; i++) {
    // Red channel (grayscale), already in 0-255 range
    pixels[i] = imageData.data[i * 4] / 255;
  }

  // 3. Build tensor
  const inputTensor = tf.tensor3d(pixels, [28, 28, 1]).reshape([1, 28, 28, 1]);

  // 4. Predict
  const prediction = state.model.predict(inputTensor);
  const probabilities = await prediction.data();

  // 5. Cleanup tensors
  inputTensor.dispose();
  prediction.dispose();

  // 6. Top 3
  const indexed = Array.from(probabilities).map((p, i) => ({ digit: i, prob: p }));
  indexed.sort((a, b) => b.prob - a.prob);
  const top3 = indexed.slice(0, 3);

  // 7. Render results
  const top = top3[0];
  digitEl.textContent = top.digit;
  confEl.textContent = `${(top.prob * 100).toFixed(1)}% confidence`;

  top3El.innerHTML = '';
  top3.forEach((item, idx) => {
    const rank = idx + 1;
    const div = document.createElement('div');
    div.className = 'top-3-item';
    div.innerHTML = `
      <span class="top-3-rank">#${rank}</span>
      <span class="top-3-digit">${item.digit}</span>
      <div class="top-3-bar-container">
        <div class="top-3-bar ${idx === 0 ? 'top-1' : ''}" style="width: ${item.prob * 100}%"></div>
      </div>
      <span class="top-3-percent">${(item.prob * 100).toFixed(1)}%</span>
    `;
    top3El.appendChild(div);
  });

  // 8. Update preview (show what model sees)
  const previewCtx = previewCanvas.getContext('2d');
  const previewData = previewCtx.createImageData(28, 28);
  for (let i = 0; i < 784; i++) {
    const v = Math.floor(pixels[i] * 255);
    previewData.data[i * 4] = v;
    previewData.data[i * 4 + 1] = v;
    previewData.data[i * 4 + 2] = v;
    previewData.data[i * 4 + 3] = 255;
  }
  // Scale up to 112x112
  const scaledCanvas = document.createElement('canvas');
  scaledCanvas.width = 28;
  scaledCanvas.height = 28;
  scaledCanvas.getContext('2d').putImageData(previewData, 0, 0);
  previewCtx.imageSmoothingEnabled = false;
  previewCtx.drawImage(scaledCanvas, 0, 0, 112, 112);

  statusEl.textContent = 'Selesai. Coba gambar digit lain!';
}

// =====================================================
//  PRESET DIGIT LOADER
// =====================================================
function setupPresetDigits() {
  document.querySelectorAll('.preset-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const digit = parseInt(btn.dataset.digit);
      const sample = state.trainData?.presetSamples?.find((s) => s.digit === digit);
      if (!sample) {
        alert('Preset belum tersedia (mungkin CDN gagal). Silakan gambar manual.');
        return;
      }
      renderPresetToCanvas(sample.pixels);
      document.getElementById('prediction-status').textContent =
        `Preset digit ${digit} dimuat. Klik Prediksi.`;
    });
  });
}

function renderPresetToCanvas(pixels) {
  const canvas = document.getElementById('draw-canvas');
  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(28, 28);
  for (let i = 0; i < 784; i++) {
    const v = Math.floor(pixels[i] * 255);
    imageData.data[i * 4] = v;
    imageData.data[i * 4 + 1] = v;
    imageData.data[i * 4 + 2] = v;
    imageData.data[i * 4 + 3] = 255;
  }
  // Scale 28x28 to 280x280
  const smallCanvas = document.createElement('canvas');
  smallCanvas.width = 28;
  smallCanvas.height = 28;
  smallCanvas.getContext('2d').putImageData(imageData, 0, 0);
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(smallCanvas, 0, 0, 280, 280);
}

// =====================================================
//  MAIN INIT
// =====================================================
async function init() {
  console.info('[mnist-demo] Initializing...');

  // Setup UI
  setupCanvas();
  setupPresetDigits();

  const trainBtn = document.getElementById('train-btn');
  const predictBtn = document.getElementById('predict-btn');

  // Load TF.js lazily when user clicks Train
  trainBtn.addEventListener('click', async () => {
    if (state.isTraining) return;

    trainBtn.disabled = true;
    trainBtn.textContent = '⏳ Loading...';

    try {
      const tf = await loadTFJS();

      // Load data if not yet loaded
      if (!state.trainData) {
        addLog('Memuat dataset MNIST...');
        state.trainData = await loadMnistSubset(tf, 5000, 1000);
        addLog(`Dataset dimuat dari: ${state.trainData.source}`);
        addLog(`Train: ${state.trainData.trainXs.shape[0]} samples | Test: ${state.trainData.testXs.shape[0]} samples`);
      }

      // Build model if not yet built
      if (!state.model) {
        addLog('Membangun model CNN...');
        state.model = buildModel(tf);
      }

      // Train
      trainBtn.textContent = '⏳ Training...';
      state.currentEpoch = 0;
      await trainModel(tf, 3);
    } catch (err) {
      console.error('[mnist-demo]', err);
      addLog(`Error: ${err.message}`, 'epoch-end');
      trainBtn.disabled = false;
      trainBtn.textContent = '▶ Mulai Training';
    }
  });

  predictBtn.addEventListener('click', predictFromCanvas);

  console.info('[mnist-demo] UI ready. Click Train to start.');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Expose for debugging
window.__MNIST_DEMO__ = { state, predictFromCanvas };
