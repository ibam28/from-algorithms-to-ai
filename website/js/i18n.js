/* ============================================================
   From Algorithms to AI — i18n Engine (EN default + ID toggle)

   - Default language: English (EN). Indonesian (ID) is opt-in.
   - HTML text is authored in EN (good for SEO/no-JS). Elements
     that should switch carry data-i18n="key".
   - Dynamic JS strings use I18N.t('key', {vars}) and follow the
     current language automatically.
   - Persisted in localStorage ("faa2ai-lang"). Default: en.
   - Emits window "i18n:change" after every apply() so visualizer
     components can re-render.
   ============================================================ */

window.I18N = (function () {
  const STORAGE_KEY = 'faa2ai-lang';

  const dicts = {
    en: {
      // ---- landing (index.html) ----
      'lp.eyebrow': 'Portfolio Project · 2026',
      'lp.subtitle': '🧠 Algorithms &nbsp;→&nbsp; 🤖 Machine Learning &nbsp;→&nbsp; ✨ AI',
      'lp.tagline':
        'Visual &amp; interactive explanations for everyone — recruiters, hiring managers, and anyone who ever mixed up <strong>AI</strong>, <strong>Machine Learning</strong>, and <strong>Algorithms</strong>',
      'lp.card1.title': 'Interactive Website',
      'lp.card1.desc':
        '4 sections with algorithm visualizations, a decision tree trainer, and a real ML demo that runs right in your browser',
      'lp.card1.cta': 'Open Website →',
      'lp.card2.title': 'Slide Deck',
      'lp.card2.desc': '12-slide presentation — ready for interviews or sharing with your team',
      'lp.card2.cta': 'View Slides →',
      'lp.card3.title': 'Documentation',
      'lp.card3.desc': 'Complete written deep-dives — readable offline, linkable, shareable',
      'lp.card3.cta': 'Read Docs →',
      'lp.card4.title': 'Video Script',
      'lp.card4.desc': 'Narration script ready to record (optional) — for LinkedIn / YouTube content',
      'lp.card4.cta': 'View Script →',
      'lp.quick.title': 'TL;DR — The 30-Second Version',
      'lp.step1.title': '📐 Algorithms',
      'lp.step1.desc': 'A recipe — definite steps, predictable results.',
      'lp.step1.ex': 'Example: sorting numbers, fastest route on Google Maps.',
      'lp.step2.title': '🤖 Machine Learning',
      'lp.step2.desc': 'A chef who learns from 10,000 tries.',
      'lp.step2.ex': 'Example: Gmail spam filter, Netflix recommendations.',
      'lp.step3.title': '✨ AI',
      'lp.step3.desc': 'The whole smart restaurant — not just the chef.',
      'lp.step3.ex': 'Example: self-driving cars, ChatGPT.',
      'lp.quick.summary':
        '<strong>In short:</strong> AI is the big goal. Machine Learning is one way to get there. Algorithms are the tools both use',
      'lp.footer':
        'Built by <a href="https://github.com/ibam28"><strong>@ibam28</strong></a> · Full Stack Developer &amp; AI Engineer · <a href="https://github.com/ibam28/from-algorithms-to-ai">⭐ Star on GitHub</a>',

      // ---- website SPA (website/index.html) ----
      'st.nav.algo': '📐 Algorithms',
      'st.nav.ml': '🤖 ML',
      'st.nav.ai': '✨ AI',
      'st.nav.relation': '🔗 Relationship',
      'st.nav.back': '← Landing',
      'st.nav.backAria': 'Back to landing page',
      'st.hero.eyebrow': 'Interactive Walkthrough · 2026',
      'st.hero.tagline':
        'A visual journey from <strong>Algorithms</strong> (a recipe) → <strong>Machine Learning</strong> (a chef who learns) → <strong>AI</strong> (a smart restaurant)',
      'st.hero.note': 'Scroll down to explore. Every section has an interactive demo.',

      'st.s1.subtitle': 'Definite steps to solve a problem. The <em>recipe</em> of computing.',
      'st.s1.analogy.title': '🍳 Kitchen Analogy',
      'st.s1.analogy.text':
        'An algorithm is like a <strong>recipe</strong>: "Heat oil for 2 minutes, sauté the garlic, add the rice, stir for 3 minutes." Every step is clear, it always finishes, and you can repeat it with consistent results.',
      'st.s1.props.title': '5 Properties of a Good Algorithm',
      'st.s1.props.1': 'Input',
      'st.s1.props.1d': 'Some starting data is provided',
      'st.s1.props.2': 'Output',
      'st.s1.props.2d': 'Produces something',
      'st.s1.props.3': 'Definite',
      'st.s1.props.3d': 'Unambiguous, clear steps',
      'st.s1.props.4': 'Finite',
      'st.s1.props.4d': 'Always stops (no infinite loop)',
      'st.s1.props.5': 'Effective',
      'st.s1.props.5d': 'Runs with reasonable resources',
      'st.s1.demo.title': '🎮 Demo: Sorting Visualizer',
      'st.s1.demo.intro':
        'Watch two popular sorting algorithms run step by step. Compare <strong>bubble sort</strong> (simple but slow) with <strong>merge sort</strong> (more complex but fast).',
      'st.s1.algo': 'Algorithm:',
      'st.s1.size': 'Size:',
      'st.s1.speed': 'Speed:',
      'st.s1.status.ready': 'Ready. Click <strong>Start</strong> to begin.',
      'st.s1.stat.comp': 'Comparisons:',
      'st.s1.stat.swap': 'Swaps:',
      'st.s1.caption':
        '<strong>What is happening:</strong> A visualization of two sorting algorithms. Colored bars show the values being compared. Bubble sort compares adjacent elements, while merge sort splits the data in two and merges it back in order. For large datasets, merge sort is much faster.',
      'st.s1.learn': '📖 Read the full explanation →',

      'st.s2.subtitle':
        'Machines that <em>learn from data</em>, not from hand-written rules. The <em>chef who learns from 10,000 tries</em>.',
      'st.s2.analogy.title': '🍳 Kitchen Analogy',
      'st.s2.analogy.text':
        'If a regular algorithm is a chef who only cooks from recipes, <strong>ML</strong> is a chef who <strong>learns from thousands of attempts</strong>. Give them examples of dishes plus ratings, and they discover the "good recipe" pattern — and can invent new variations that are likely to taste great too.',
      'st.s2.vs.title': 'Difference from Traditional Programming',
      'st.s2.vs.h.aspect': 'Aspect',
      'st.s2.vs.h.trad': 'Traditional Programming',
      'st.s2.vs.h.ml': 'Machine Learning',
      'st.s2.vs.input': 'Input',
      'st.s2.vs.input.t': 'Data + Rules',
      'st.s2.vs.input.m': 'Data + Correct answers',
      'st.s2.vs.output': 'Output',
      'st.s2.vs.output.t': 'Answers',
      'st.s2.vs.output.m': 'Rules (a model)',
      'st.s2.vs.who': 'Who finds the pattern?',
      'st.s2.vs.who.t': 'The programmer',
      'st.s2.vs.who.m': 'The ML algorithm',
      'st.s2.vs.update': 'Updating rules',
      'st.s2.vs.update.t': 'Edit code manually',
      'st.s2.vs.update.m': 'Retrain with new data',
      'st.s2.demo.title': '🌳 Demo: Decision Tree Trainer',
      'st.s2.demo.intro':
        'A decision tree is one of the most intuitive ML algorithms — it makes decisions by asking "is condition A met? Yes → left branch, No → right branch". This demo shows a tree that <em>grows</em> as the model learns from data.',
      'st.s2.dataset': 'Dataset:',
      'st.s2.dataset.iris': 'Iris (flower classification)',
      'st.s2.dataset.play': 'Play Tennis (binary classification)',
      'st.s2.status.ready': 'Pick a dataset, then click <strong>Train</strong>.',
      'st.s2.caption':
        '<strong>What is happening:</strong> A decision tree splits data by yes/no questions. Each node is a question, each leaf is a prediction. A good tree separates different classes efficiently.',
      'st.s2.cta.title': '🚀 Want to Try ML Running in Your Browser?',
      'st.s2.cta.text':
        'Open the TensorFlow.js demo: <strong>train a CNN digit recognizer</strong> from scratch, then draw your own digits and watch the model predict in real time.',
      'st.s2.cta.btn': '🎯 Open MNIST Demo →',
      'st.s2.learn': '📖 Read the full explanation →',

      'st.s3.subtitle':
        'Machines that act "intelligently". The <em>smart restaurant</em> — chef, waiter, cashier, manager, all AI systems.',
      'st.s3.analogy.title': '🍳 Kitchen Analogy',
      'st.s3.analogy.text':
        'AI is not one thing — it is an <strong>umbrella</strong> name for many subsystems: 👨‍🍳 <strong>ML chef</strong> that adapts, 🗣️ <strong>NLP waiter</strong> that understands language, 👁️ <strong>CV cashier</strong> that recognizes faces, 📊 <strong>planning manager</strong> that optimizes. All working together.',
      'st.s3.timeline.title': '📅 AI Timeline: 1950 → 2024',
      'st.s3.timeline.intro':
        'AI has existed since the 1950s. It is nothing new — what changed is the <strong>computing power</strong> and <strong>data</strong> that finally let old ideas run.',
      'st.s3.tl.1950.t': 'Turing Test',
      'st.s3.tl.1950.d': 'Alan Turing publishes a paper proposing a way to test machine intelligence.',
      'st.s3.tl.1956.t': 'The Term "AI" Is Born',
      'st.s3.tl.1956.d': 'Dartmouth Conference — the term "Artificial Intelligence" is coined.',
      'st.s3.tl.1997.t': 'Deep Blue Beats Kasparov',
      'st.s3.tl.1997.d': "IBM's Deep Blue wins chess against the world champion — AI goes public.",
      'st.s3.tl.2012.t': 'Deep Learning Rises',
      'st.s3.tl.2012.d': 'AlexNet wins ImageNet — the deep learning revolution begins.',
      'st.s3.tl.2017.t': 'The Transformer Is Born',
      'st.s3.tl.2017.d': 'The "Attention Is All You Need" paper — the architecture behind the LLM era.',
      'st.s3.tl.2022.t': 'ChatGPT Launches',
      'st.s3.tl.2022.d': 'Generative AI reaches the mainstream public. A new era begins.',
      'st.s3.tl.caption':
        '<strong>Timeline:</strong> Not a straight line upward — there were several "AI Winters" where expectations were not met and funding dropped. But overall, AI capability kept rising with more data and compute.',
      'st.s3.branches.title': 'Branches of AI',
      'st.s3.branch.ml': 'Machine Learning',
      'st.s3.branch.ml.d': 'Systems that learn from data',
      'st.s3.branch.nlp': 'NLP',
      'st.s3.branch.nlp.d': 'Understand and generate human language',
      'st.s3.branch.cv': 'Computer Vision',
      'st.s3.branch.cv.d': '"See" and understand images',
      'st.s3.branch.robo': 'Robotics',
      'st.s3.branch.robo.d': 'AI that moves physical machines',
      'st.s3.branch.plan': 'Planning',
      'st.s3.branch.plan.d': 'Plan sequences of actions',
      'st.s3.branch.expert': 'Expert Systems',
      'st.s3.branch.expert.d': 'Rule-based AI',
      'st.s3.learn': '📖 Read the full explanation →',

      'st.s4.subtitle': 'How Algorithms, ML, and AI relate — and where they differ.',
      'st.s4.diagram.title': '🎯 Interactive Concentric Diagram',
      'st.s4.diagram.intro':
        'Click a circle to see the details. AI is the widest, Machine Learning is a subset, Algorithms are the tool both use.',
      'st.s4.rel.title': 'Pick a circle',
      'st.s4.rel.desc': 'Click AI, ML, or Algorithms to see details.',
      'st.s4.rel.svgAria': 'Concentric circles showing AI, ML, and Algorithms',
      'st.s4.rel.svgTitle': 'Algorithms ⊂ ML ⊂ AI (with Symbolic AI as AI without ML)',
      'st.s4.rel.caption':
        '<strong>Diagram:</strong> AI = outer circle (widest). ML = inside AI (subset). Algorithms = inside ML (the tool). Symbolic AI = inside AI but outside ML (AI without ML — rule-based).',
      'st.s4.cmp.title': '📊 Comparison Table',
      'st.s4.cmp.h.aspect': 'Aspect',
      'st.s4.cmp.h.algo': 'Algorithms',
      'st.s4.cmp.h.ml': 'Machine Learning',
      'st.s4.cmp.h.ai': 'AI',
      'st.s4.cmp.what': '<strong>What?</strong>',
      'st.s4.cmp.what.a': 'Definite steps',
      'st.s4.cmp.what.m': 'Learn from data',
      'st.s4.cmp.what.i': 'Machines acting "intelligently"',
      'st.s4.cmp.goal': '<strong>Goal</strong>',
      'st.s4.cmp.goal.a': 'Solve a problem',
      'st.s4.cmp.goal.m': 'Find patterns',
      'st.s4.cmp.goal.i': 'Intelligent behavior',
      'st.s4.cmp.ex': '<strong>Example</strong>',
      'st.s4.cmp.ex.a': 'Sorting an array',
      'st.s4.cmp.ex.m': 'Spam filter',
      'st.s4.cmp.ex.i': 'Self-driving car',
      'st.s4.cmp.year': '<strong>Since</strong>',
      'st.s4.cmp.year.a': '300 BC (Euclid)',
      'st.s4.cmp.year.m': '1950s',
      'st.s4.cmp.year.i': '1950s',
      'st.s4.callout.title': '💡 One Sentence to Remember',
      'st.s4.callout.text':
        '<strong>AI = the goal, ML = one of the ways, Algorithms = the tool both use.</strong>',
      'st.s4.learn': '📖 Read the full explanation →',

      'st.footer':
        'Built by <a href="https://github.com/ibam28"><strong>@ibam28</strong></a> · Full Stack Developer &amp; AI Engineer · <a href="../index.html">← Back to landing</a>',
      'st.footer.tech': 'Built with vanilla JS, HTML, CSS · Zero framework · Open source (MIT)',
      'st.skip': 'Skip to main content',

      // ---- relationship component (dynamic panel) ----
      'rel.ai.title': '✨ AI — The Umbrella',
      'rel.ai.desc': 'The widest circle: any machine that acts "intelligently". Includes ML, NLP, computer vision, robotics, planning, and expert systems.',
      'rel.ml.title': '🤖 Machine Learning — A Subset',
      'rel.ml.desc': 'Inside AI: systems that learn from data instead of hand-written rules. Deep learning is a part of ML.',
      'rel.algo.title': '📐 Algorithms — The Tool',
      'rel.algo.desc': 'Inside ML: the definite steps that make ML work (optimization, sorting, search). Not every algorithm is AI.',
      'rel.symbolic.title': '🧩 Symbolic AI — AI Without ML',
      'rel.symbolic.desc': 'Inside AI but outside ML: rule-based expert systems with if-then rules written by humans.',

      // ---- decision tree component (dynamic) ----
      'dt.status.ready': 'Pick a dataset, then click <strong>Train</strong>.',
      'dt.status.grow': 'Training in progress… node added.',
      'dt.status.done': 'Training complete — the tree is finished!',
      'dt.dataset.iris': 'Iris (flower classification)',
      'dt.dataset.play': 'Play Tennis (binary classification)',

      // ---- sorting component (dynamic statuses) ----
      'sort.status.ready': 'Ready. Click <strong>Start</strong> to begin.',
      'sort.status.bubbleCompare':
        'Bubble sort: comparing index {i} and {j} (value {a} vs {b})',
      'sort.status.bubbleSwap': 'Bubble sort: swapping index {i} and {j}',
      'sort.status.bubbleNoSwap': 'Bubble sort: no swaps — the array is already sorted!',
      'sort.status.done': 'Done! {c} comparisons, {s} swaps.',
      'sort.status.mergeCompare':
        'Merge sort: comparing index {i} ({a}) and {j} ({b})',
      'sort.status.start': 'Starting {algo} sort…',
      'sort.status.paused': 'Paused.',
      'sort.status.resumed': 'Resumed.',
      'sort.status.reset': 'Reset. Click Start to run again.',
      'sort.status.shuffled': 'Array shuffled. Click Start to begin.',
      'sort.status.changed':
        'Algorithm changed to {algo}. Click Start.',
      'sort.algo.bubble': 'Bubble Sort',
      'sort.algo.merge': 'Merge Sort',

      // ---- app.js (viz loader errors/placeholders) ----
      'app.viz.failed': 'Visualization "{name}" failed to load.',
      'app.viz.retry': 'Try Again',

      // ---- mnist.html + mnist.js ----
      'mn.nav.train': '🏋️ Train',
      'mn.nav.draw': '✏️ Draw',
      'mn.nav.predict': '🎯 Predict',
      'mn.nav.back': '← Website',
      'mn.nav.backAria': 'Back to main website',
      'mn.hero.eyebrow': 'Live ML Demo · TensorFlow.js',
      'mn.hero.title': 'MNIST Digit Recognizer',
      'mn.hero.text':
        'A real CNN (Convolutional Neural Network) that <strong>runs entirely in your browser</strong>. No server, no API calls — all the machine learning happens on your device.',
      'mn.hero.note':
        '⏱️ Estimate: ~30 seconds of training on a modern laptop, ~1-2 minutes on a phone. After training, draw any digit on the canvas and watch the model predict.',
      'mn.s1.subtitle':
        'The model is trained from the MNIST dataset (subset of 5,000 images) right in your browser.',
      'mn.s1.model.title': 'Model Architecture',
      'mn.s1.model.total': 'Total: ~108K parameters',
      'mn.s1.train.btn': '▶ Start Training',
      'mn.s1.train.status': 'Model not trained yet',
      'mn.s1.stat.epoch': 'Epoch',
      'mn.s1.stat.loss': 'Loss',
      'mn.s1.stat.acc': 'Accuracy',
      'mn.s1.stat.speed': 'Sample/sec',
      'mn.s2.subtitle': 'Draw a digit 0-9 on the canvas. Mouse, finger, or stylus — all supported.',
      'mn.s2.canvasAria': 'Digit drawing area. Use mouse, finger, or stylus to draw.',
      'mn.s2.clear': '🗑️ Clear',
      'mn.s2.brush': 'Brush:',
      'mn.s2.hint': '💡 Tip: draw the digit in the middle, not too small and not too big.',
      'mn.s2.preset.summary': 'Or pick a preset digit (for quick testing)',
      'mn.s2.preset.note':
        'Presets take a sample from the MNIST test set — a slight "cheat" that shows how the model performs on data similar to its training.',
      'mn.s3.subtitle': 'The model analyzes the image and guesses which digit you drew.',
      'mn.s3.predict': '🎯 Predict',
      'mn.s3.status.notrained': 'Train the model first in section 1',
      'mn.s3.result.label': 'Model Prediction:',
      'mn.s3.top.title': 'Top 3 Likelihoods:',
      'mn.s3.insight.summary': 'What does the model "see"?',
      'mn.s3.insight.text': 'This is the 28×28 version of your drawing (the model input):',
      'mn.s3.insight.note':
        'Note: the model was trained with white digits on a black background — the opposite of your canvas. We invert automatically before predicting.',
      'mn.info.title': 'ℹ️ About This Demo',
      'mn.info.li1': '<strong>Training happens in the browser</strong> — not on a server. Your data never leaves your device.',
      'mn.info.li2': '<strong>Subset of 5,000 of 60,000</strong> training images is used to keep the demo fast.',
      'mn.info.li3': '<strong>Typical accuracy:</strong> 90-95% on the subset (full MNIST: 98%+ with more epochs).',
      'mn.info.li4': '<strong>Limitation:</strong> first visit downloads TF.js (~1.2 MB), training ~30 seconds.',
      'mn.info.back': '← Back to the ML explanation',
      'mn.footer':
        'Built by <a href="https://github.com/ibam28"><strong>@ibam28</strong></a> · Serverless TensorFlow.js demo · <a href="../../website/index.html">← Main page</a>',
      'mn.loading.message': 'Loading TensorFlow.js…',
      'mn.loading.ready': 'TensorFlow.js ready!',
      'mn.loading.failed': 'Failed to load TensorFlow.js',
      'mn.loading.sub': '~1.2 MB · requires an internet connection on first visit',

      // ---- slides.html (visible slide text) ----
      'sl.s1.eyebrow': 'Portfolio Project · 2026',
      'sl.s1.journey': '📐 Algorithms &nbsp;→&nbsp; 🤖 Machine Learning &nbsp;→&nbsp; ✨ AI',
      'sl.s1.tagline':
        'Visual explanations for everyone — no jargon, no hype.<br />We start from what you already know, then walk gently into AI.',
      'sl.s1.byline': 'by <strong>@ibam28</strong> · Full Stack + AI Engineer',
      'sl.s2.eyebrow': 'Opening question',
      'sl.s2.title': '"AI", "Machine Learning", "Algorithms" — what\'s the difference?',
      'sl.s2.intro':
        'These three terms are used interchangeably, but they mean different things. As a result, many people are confused — and some are even scared of AI.',
      'sl.s2.c1.t': 'Algorithms',
      'sl.s2.c1.d': 'Definite steps to solve a problem.',
      'sl.s2.c2.t': 'Machine Learning',
      'sl.s2.c2.d': 'How computers <em>learn from data</em> instead of being given rules.',
      'sl.s2.c3.t': 'AI',
      'sl.s2.c3.d': 'The widest umbrella: machines that act "intelligently".',
      'sl.s2.outro': 'We\'ll explore each one — starting with what\'s most familiar.',
      'sl.s3.eyebrow': 'Part 1 · Algorithms',
      'sl.s3.title': 'An algorithm is like a recipe',
      'sl.s3.quote':
        '<span class="quote-mark">"</span>Definite steps: <strong>stir 5 minutes</strong>, <strong>bake at 180°C</strong>, <strong>wait 20 minutes</strong>. Follow the order, and the result is predictable.',
      'sl.s3.step1': 'Input: the ingredients',
      'sl.s3.step2': 'Process: clear, ordered steps',
      'sl.s3.step3': 'Output: a predictable meal',
      'sl.s3.point': '<strong>Key point:</strong> algorithms are not just for computers. Recipes, routes, counting change — those are algorithms too.',
      'sl.s4.eyebrow': 'Part 1 · Algorithms',
      'sl.s4.title': 'You use algorithms every day',
      'sl.s4.intro': 'Without realizing it, algorithms run a lot of your life.',
      'sl.s4.c1.t': 'TikTok / Instagram',
      'sl.s4.c1.d': 'A ranking algorithm picks which videos appear in your feed.',
      'sl.s4.c2.t': 'Google Maps',
      'sl.s4.c2.d': 'Computes the fastest route across thousands of possible paths.',
      'sl.s4.c3.t': 'Spotify',
      'sl.s4.c3.d': 'Shuffles songs with a fair random rule.',
      'sl.s4.c4.t': 'Banking',
      'sl.s4.c4.d': 'Sorts transactions, calculates interest, flags anomalies.',
      'sl.s5.eyebrow': 'Part 2 · Machine Learning',
      'sl.s5.title': 'ML is a chef who learns from 10,000 tries',
      'sl.s5.quote':
        '<span class="quote-mark">"</span>This chef <strong>doesn\'t read recipes</strong>. They cook, try, fail, improve — thousands of times. Eventually they just know: "if the batter is like this, bake it this long".',
      'sl.s5.c1.t': 'A regular algorithm',
      'sl.s5.c1.d': 'Given <strong>rules</strong> → follows them → result.',
      'sl.s5.c2.t': 'Machine Learning',
      'sl.s5.c2.d': 'Given <strong>data + answers</strong> → discovers its own rules → result.',
      'sl.s5.point': '<strong>This is the core difference:</strong> rules vs data.',
      'sl.s6.eyebrow': 'Part 2 · Machine Learning',
      'sl.s6.title': 'You already use ML every day',
      'sl.s6.intro': 'Unlike regular algorithms, ML <em>learns</em> from patterns instead of fixed rules.',
      'sl.s6.c1.t': 'Spam filter',
      'sl.s6.c1.d': 'Learns from millions of emails: which are spam, which are not.',
      'sl.s6.c2.t': 'Movie recommendations',
      'sl.s6.c2.d': 'Learns from what you watch and from people like you.',
      'sl.s6.c3.t': 'Fraud detection',
      'sl.s6.c3.d': 'Learns normal transaction patterns, then flags suspicious ones.',
      'sl.s6.c4.t': 'House price prediction',
      'sl.s6.c4.d': 'Learns from thousands of sales: location, size, year, price.',
      'sl.s7.eyebrow': 'Part 3 · AI',
      'sl.s7.title': 'AI is a smart restaurant',
      'sl.s7.quote':
        '<span class="quote-mark">"</span>If ML is the <strong>chef</strong> who learns to cook, AI is the <strong>whole restaurant</strong>: the chef + a waiter who understands orders + a cashier who recognizes faces + a manager who schedules.',
      'sl.s7.c1.t': '🤖 Chef',
      'sl.s7.c1.d': 'ML — learns from data',
      'sl.s7.c2.t': '💬 Waiter',
      'sl.s7.c2.d': 'NLP — understands human language',
      'sl.s7.c3.t': '👁️ Cashier',
      'sl.s7.c3.d': 'Computer Vision — recognizes images',
      'sl.s7.point': '<strong>AI is the widest umbrella.</strong> ML is one path to AI — not the only one.',
      'sl.s8.eyebrow': 'Part 3 · AI',
      'sl.s8.title': 'AI isn\'t new — it\'s 70+ years old',
      'sl.s8.i1': '<span class="year">1950</span> Alan Turing proposes the "Turing Test" — can a machine fool a human?',
      'sl.s8.i2': '<span class="year">1956</span> Dartmouth Conference — the term "Artificial Intelligence" is officially born.',
      'sl.s8.i3': '<span class="year">1997</span> Deep Blue (IBM) beats world chess champion Garry Kasparov.',
      'sl.s8.i4': '<span class="year">2012</span> AlexNet wins ImageNet in a landslide — the <em>deep learning</em> era begins.',
      'sl.s8.i5': '<span class="year">2017</span> The <em>Transformer</em> architecture is introduced — the foundation of modern language models.',
      'sl.s8.i6': '<span class="year">2022</span> ChatGPT brings generative AI to millions of regular people in weeks.',
      'sl.s9.eyebrow': 'Part 4 · Relationship',
      'sl.s9.title': 'So how do the three relate?',
      'sl.s9.ring.ai': 'AI',
      'sl.s9.ring.ml': 'ML',
      'sl.s9.ring.algo': 'Algorithms',
      'sl.s9.leg.ai': '<strong>AI</strong> — widest: machines acting "intelligently"',
      'sl.s9.leg.ml': '<strong>Machine Learning</strong> — subset of AI: learns from data',
      'sl.s9.leg.algo': '<strong>Algorithms</strong> — the tool ML uses to work',
      'sl.s9.leg.sym': '<strong style="color: var(--c-success);">Symbolic AI</strong> — inside AI, outside ML (human-written if-then rules).',
      'sl.s9.point': '<strong>Not a straight line — a hierarchy:</strong> Algorithms ⊂ ML ⊂ AI.',
      'sl.s10.eyebrow': 'Part 4 · Relationship',
      'sl.s10.title': 'To avoid misunderstanding',
      'sl.s10.intro': 'Three counter-examples showing we aren\'t oversimplifying.',
      'sl.s10.h1': 'Example',
      'sl.s10.h2': 'Proves',
      'sl.s10.r1c1': '<strong>Symbolic AI</strong> (expert system, rule-based)',
      'sl.s10.r1c2': 'AI <strong>can exist without ML</strong> — rules written by humans, not learned.',
      'sl.s10.r2c1': '<strong>Quantum algorithm</strong> (Shor\'s algorithm)',
      'sl.s10.r2c2': 'Algorithms <strong>can exist without AI</strong> — pure math tools.',
      'sl.s10.r3c1': '<strong>Classic linear regression</strong>',
      'sl.s10.r3c2': 'A statistical algorithm <strong>used by ML</strong>, but ML is much more than that.',
      'sl.s10.point': 'This is why we use a <strong>hierarchy</strong>, not just a list.',
      'sl.s11.eyebrow': 'Try it yourself',
      'sl.s11.title': 'All of this runs in your browser',
      'sl.s11.intro':
        'No server. No secret API. You can train a real ML model right from your phone or laptop — and see the results yourself.',
      'sl.s11.demo': '<strong style="color: var(--c-ml);">MNIST demo:</strong> train a CNN that recognizes digits, then draw any digit and watch it predict.',
      'sl.s12.eyebrow': 'Closing',
      'sl.s12.title': 'Four things to take home',
      'sl.s12.i1': '<strong>AI = the goal, ML = one of the ways, Algorithms = the tool.</strong>',
      'sl.s12.i2': '<strong>ML learns from data</strong> — not from rules written by humans.',
      'sl.s12.i3': '<strong>Algorithms aren\'t just for computers</strong> — a recipe is an algorithm too.',
      'sl.s12.i4': '<strong>ML isn\'t magic</strong> — behind it are math, statistics, and data.',
      'sl.s12.thanks': 'Thank you.<br /><strong>Bambang Saputra Jaya</strong> · @ibam28 · Full Stack + AI Engineer',
      'sl.s12.repo': 'Repo: <code>github.com/ibam28/from-algorithms-to-ai</code>',

      // ---- mnist dynamic (mnist.js) ----
      'mn.tfjs.loading': 'Loading TensorFlow.js…',
      'mn.tfjs.ready': 'TensorFlow.js ready!',
      'mn.tfjs.failed': 'Failed to load TensorFlow.js',
      'mn.train.start': '▶ Start Training',
      'mn.training.start': 'Starting training…',
      'mn.source.cdn': 'CDN (Google TF.js storage)',
      'mn.source.synthetic': 'Synthetic fallback (CDN unavailable)',
      'mn.training.done': 'Model ready! Draw a digit, then click Predict.',
      'mn.training.time': 'Done in {s}s',
      'mn.train.retrain': '↻ Retrain',
      'mn.train.loading': '⏳ Loading...',
      'mn.train.training': '⏳ Training...',
      'mn.log.loadDataset': 'Loading MNIST dataset…',
      'mn.log.datasetSource': 'Dataset loaded from: {source}',
      'mn.log.samples': 'Train: {train} samples | Test: {test} samples',
      'mn.log.buildModel': 'Building CNN model…',
      'mn.log.error': 'Error: {msg}',
      'mn.log.epoch': 'Epoch {epoch}/{total} — loss: {loss}{valLoss}, acc: {acc}%{valAcc}',
      'mn.log.complete': '✓ Training complete! The model is ready to predict.',
      'mn.predict.working': 'Predicting…',
      'mn.predict.done': 'Done. Try another digit!',
      'mn.predict.notrained': 'Train the model first!',
      'mn.predict.confidence': '{pct}% confidence',
      'mn.predict.hint': 'Click Predict to see the result.',
      'mn.preset.unavailable': 'Preset not available (CDN may have failed). Please draw manually.',
      'mn.preset.loaded': 'Preset digit {digit} loaded. Click Predict.',

      // ---- decision tree dynamic (extra) ----
      'dt.edge.yes': 'Yes',
      'dt.edge.no': 'No',
      'dt.status.reset': 'Reset. Click Train or Step to build the tree.',
      'dt.status.start': 'Training started…',
      'dt.status.nodeSplit': 'Node {n}: split on "{feat}"',
      'dt.status.leaf': 'Leaf {n}: prediction "{cls}" ({samples} samples)',
      'dt.status.full': 'Tree complete! The model is trained.',
      'dt.status.empty': 'The tree will appear here after training…',
      'dt.status.dataset': 'Dataset: {name}. {desc}. Click Train.',
      'dt.status.init': 'Dataset: {name}. Click Train or Step to build the tree.',
      'dt.dataset.iris.desc': 'Iris flower classification based on petal length',
      'dt.dataset.play.desc': 'Whether it is fit to play tennis based on weather conditions',

      // ---- sorting dynamic ----
      'sort.btn.pause': '⏸ Pause',
      'sort.btn.resume': '▶ Resume',
    },

    id: {
      // ---- landing ----
      'lp.eyebrow': 'Portfolio Project · 2026',
      'lp.subtitle': '🧠 Algoritma &nbsp;→&nbsp; 🤖 Machine Learning &nbsp;→&nbsp; ✨ AI',
      'lp.tagline':
        'Penjelasan visual &amp; interaktif untuk orang awam — rekruiter, hiring manager, dan siapa pun yang pernah bingung bedanya <strong>AI</strong>, <strong>Machine Learning</strong>, sama <strong>Algoritma</strong>',
      'lp.card1.title': 'Website Interaktif',
      'lp.card1.desc':
        '4 section dengan visualisasi algoritma, decision tree, dan demo ML yang berjalan langsung di browser-mu',
      'lp.card1.cta': 'Buka Website →',
      'lp.card2.title': 'Slide Deck',
      'lp.card2.desc': '12 slide presentasi — siap pakai untuk interview atau sharing ke tim',
      'lp.card2.cta': 'Lihat Slide →',
      'lp.card3.title': 'Dokumentasi',
      'lp.card3.desc': 'Penjelasan tertulis lengkap — bisa dibaca offline, mudah dibagikan',
      'lp.card3.cta': 'Baca Docs →',
      'lp.card4.title': 'Video Script',
      'lp.card4.desc': 'Naskah narasi siap rekam (opsional) — untuk konten LinkedIn / YouTube',
      'lp.card4.cta': 'Lihat Script →',
      'lp.quick.title': 'TL;DR — Versi 30 Detik',
      'lp.step1.title': '📐 Algoritma',
      'lp.step1.desc': 'Resep masakan — langkah-langkah pasti.',
      'lp.step1.ex': 'Contoh: sortir angka, cari rute tercepat di Google Maps.',
      'lp.step2.title': '🤖 Machine Learning',
      'lp.step2.desc': 'Koki yang belajar dari 10.000 percobaan.',
      'lp.step2.ex': 'Contoh: filter spam Gmail, rekomendasi Netflix.',
      'lp.step3.title': '✨ AI',
      'lp.step3.desc': 'Seluruh restoran pintar, bukan cuma koki-nya.',
      'lp.step3.ex': 'Contoh: mobil self-driving, ChatGPT.',
      'lp.quick.summary':
        '<strong>Hubungan singkatnya:</strong> AI adalah tujuan besarnya. Machine Learning adalah salah satu caranya. Algoritma adalah alat yang dipakai keduanya.',
      'lp.footer':
        'Dibuat oleh <a href="https://github.com/ibam28"><strong>@ibam28</strong></a> · Full Stack Developer &amp; AI Engineer · <a href="https://github.com/ibam28/from-algorithms-to-ai">⭐ Star di GitHub</a>',

      // ---- website SPA ----
      'st.nav.algo': '📐 Algoritma',
      'st.nav.ml': '🤖 ML',
      'st.nav.ai': '✨ AI',
      'st.nav.relation': '🔗 Hubungan',
      'st.nav.back': '← Landing',
      'st.nav.backAria': 'Kembali ke landing page',
      'st.hero.eyebrow': 'Interactive Walkthrough · 2026',
      'st.hero.tagline':
        'Perjalanan visual dari <strong>Algoritma</strong> (resep masakan) → <strong>Machine Learning</strong> (koki yang belajar) → <strong>AI</strong> (restoran pintar)',
      'st.hero.note': 'Scroll ke bawah untuk eksplorasi. Setiap section punya demo interaktif.',

      'st.s1.subtitle': 'Langkah-langkah pasti untuk menyelesaikan masalah. <em>Resep masakan</em> dunia komputasi.',
      'st.s1.analogy.title': '🍳 Analogi Dapur',
      'st.s1.analogy.text':
        'Algoritma itu seperti <strong>resep masakan</strong>: "Panaskan minyak 2 menit, tumis bawang putih, masukkan nasi, aduk 3 menit." Setiap langkah jelas, pasti selesai, dan bisa diulang dengan hasil yang konsisten.',
      'st.s1.props.title': '5 Sifat Algoritma yang Baik',
      'st.s1.props.1': 'Input',
      'st.s1.props.1d': 'Ada data awal yang diberikan',
      'st.s1.props.2': 'Output',
      'st.s1.props.2d': 'Menghasilkan sesuatu',
      'st.s1.props.3': 'Definite',
      'st.s1.props.3d': 'Tidak ambigu, langkah jelas',
      'st.s1.props.4': 'Finite',
      'st.s1.props.4d': 'Pasti berhenti (bukan loop tanpa akhir)',
      'st.s1.props.5': 'Effective',
      'st.s1.props.5d': 'Bisa dijalankan dengan sumber daya masuk akal',
      'st.s1.demo.title': '🎮 Demo: Sorting Visualizer',
      'st.s1.demo.intro':
        'Lihat dua algoritma sorting populer berjalan step-by-step. Bandingkan <strong>bubble sort</strong> (sederhana tapi lambat) dengan <strong>merge sort</strong> (lebih kompleks tapi cepat).',
      'st.s1.algo': 'Algoritma:',
      'st.s1.size': 'Ukuran:',
      'st.s1.speed': 'Kecepatan:',
      'st.s1.status.ready': 'Siap. Klik <strong>Start</strong> untuk memulai.',
      'st.s1.stat.comp': 'Perbandingan:',
      'st.s1.stat.swap': 'Pertukaran:',
      'st.s1.caption':
        '<strong>Apa yang terjadi:</strong> Visualisasi dua algoritma sorting. Bar berwarna menunjukkan nilai yang sedang dibandingkan. Bubble sort bekerja dengan membandingkan elemen bersebelahan, sedangkan merge sort membagi data jadi dua dan menggabungkan secara terurut. Untuk dataset besar, merge sort jauh lebih cepat.',
      'st.s1.learn': '📖 Baca penjelasan lengkap →',

      'st.s2.subtitle':
        'Mesin yang <em>belajar dari data</em>, bukan dari aturan yang ditulis tangan. <em>Koki yang belajar dari 10.000 percobaan</em>.',
      'st.s2.analogy.title': '🍳 Analogi Dapur',
      'st.s2.analogy.text':
        'Kalau algoritma biasa = koki yang cuma bisa masak dari resep, <strong>ML</strong> = koki yang <strong>belajar dari ribuan percobaan</strong>. Dia diberikan contoh-contoh masakan + ratingnya, lalu dia sendiri menemukan pola "resep enak" — dan bisa bikin variasi baru yang kemungkinan besar juga enak.',
      'st.s2.vs.title': 'Bedanya dengan Programming Tradisional',
      'st.s2.vs.h.aspect': 'Aspek',
      'st.s2.vs.h.trad': 'Programming Tradisional',
      'st.s2.vs.h.ml': 'Machine Learning',
      'st.s2.vs.input': 'Input',
      'st.s2.vs.input.t': 'Data + Aturan',
      'st.s2.vs.input.m': 'Data + Jawaban benar',
      'st.s2.vs.output': 'Output',
      'st.s2.vs.output.t': 'Jawaban',
      'st.s2.vs.output.m': 'Aturan (model)',
      'st.s2.vs.who': 'Siapa cari pola?',
      'st.s2.vs.who.t': 'Programmer',
      'st.s2.vs.who.m': 'Algoritma ML',
      'st.s2.vs.update': 'Update aturan',
      'st.s2.vs.update.t': 'Edit kode manual',
      'st.s2.vs.update.m': 'Training ulang dengan data baru',
      'st.s2.demo.title': '🌳 Demo: Decision Tree Trainer',
      'st.s2.demo.intro':
        'Decision tree adalah salah satu algoritma ML yang paling intuitif — dia membuat keputusan dengan bertanya "kondisi A terpenuhi? Ya → cabang kiri, Tidak → cabang kanan". Demo ini menunjukkan pohon keputusan yang <em>tumbuh</em> saat model belajar dari data.',
      'st.s2.dataset': 'Dataset:',
      'st.s2.dataset.iris': 'Iris (klasifikasi bunga)',
      'st.s2.dataset.play': 'Play Tennis (klasifikasi biner)',
      'st.s2.status.ready': 'Pilih dataset lalu klik <strong>Train</strong>.',
      'st.s2.caption':
        '<strong>Apa yang terjadi:</strong> Decision tree membagi data berdasarkan pertanyaan ya/tidak. Setiap node adalah pertanyaan, setiap daun adalah prediksi. Pohon yang baik memisahkan kelas berbeda secara efisien.',
      'st.s2.cta.title': '🚀 Ingin Coba ML yang Berjalan di Browser?',
      'st.s2.cta.text':
        'Buka demo TensorFlow.js: <strong>train CNN digit recognizer</strong> dari nol, lalu gambar angka-mu sendiri dan lihat prediksi model secara real-time.',
      'st.s2.cta.btn': '🎯 Buka MNIST Demo →',
      'st.s2.learn': '📖 Baca penjelasan lengkap →',

      'st.s3.subtitle':
        'Mesin yang bertindak "cerdas". <em>Restoran pintar</em> — koki, pelayan, kasir, manajer, semuanya adalah sistem AI.',
      'st.s3.analogy.title': '🍳 Analogi Dapur',
      'st.s3.analogy.text':
        'AI bukan cuma satu hal — dia nama <strong>payung</strong> untuk banyak subsistem: 👨‍🍳 <strong>koki ML</strong> adaptif, 🗣️ <strong>pelayan NLP</strong> yang paham bahasa, 👁️ <strong>kasir CV</strong> yang kenali wajah, 📊 <strong>manajer planning</strong> yang optimal. Semua bekerja sama.',
      'st.s3.timeline.title': '📅 Timeline AI: 1950 → 2024',
      'st.s3.timeline.intro':
        'AI sudah ada sejak 1950-an. Bukan hal baru — yang berubah adalah <strong>komputasi</strong> dan <strong>data</strong> yang memungkinkan ide lama akhirnya berjalan.',
      'st.s3.tl.1950.t': 'Turing Test',
      'st.s3.tl.1950.d': 'Alan Turing publishes paper yang mengusulkan cara menguji kecerdasan mesin.',
      'st.s3.tl.1956.t': 'Istilah "AI" Lahir',
      'st.s3.tl.1956.d': 'Dartmouth Conference — istilah "Artificial Intelligence" diciptakan.',
      'st.s3.tl.1997.t': 'Deep Blue Kalahkan Kasparov',
      'st.s3.tl.1997.d': "IBM's Deep Blue menang catur melawan juara dunia — AI publik.",
      'st.s3.tl.2012.t': 'Deep Learning Naik',
      'st.s3.tl.2012.d': 'AlexNet menang ImageNet — revolusi deep learning dimulai.',
      'st.s3.tl.2017.t': 'Transformer Lahir',
      'st.s3.tl.2017.d': 'Paper "Attention is All You Need" — arsitektur untuk era LLM.',
      'st.s3.tl.2022.t': 'ChatGPT Launched',
      'st.s3.tl.2022.d': 'AI generatif masuk ke publik mainstream. Era baru dimulai.',
      'st.s3.tl.caption':
        '<strong>Timeline:</strong> Bukan linier naik — ada beberapa "AI Winter" di mana ekspektasi tidak terpenuhi dan funding turun. Tapi secara umum, kemampuan AI meningkat dengan ketersediaan data & komputasi.',
      'st.s3.branches.title': 'Cabang-cabang AI',
      'st.s3.branch.ml': 'Machine Learning',
      'st.s3.branch.ml.d': 'Sistem yang belajar dari data',
      'st.s3.branch.nlp': 'NLP',
      'st.s3.branch.nlp.d': 'Memahami & menghasilkan bahasa manusia',
      'st.s3.branch.cv': 'Computer Vision',
      'st.s3.branch.cv.d': '"Melihat" dan memahami gambar',
      'st.s3.branch.robo': 'Robotics',
      'st.s3.branch.robo.d': 'AI yang menggerakkan fisik',
      'st.s3.branch.plan': 'Planning',
      'st.s3.branch.plan.d': 'Merencanakan urutan aksi',
      'st.s3.branch.expert': 'Expert Systems',
      'st.s3.branch.expert.d': 'AI berbasis aturan (rule-based)',
      'st.s3.learn': '📖 Baca penjelasan lengkap →',

      'st.s4.subtitle': 'Gimana Algoritma, ML, dan AI saling terkait — dan di mana mereka tidak sama.',
      'st.s4.diagram.title': '🎯 Diagram Konsentris Interaktif',
      'st.s4.diagram.intro':
        'Klik salah satu lingkaran untuk melihat detailnya. AI adalah yang paling luas, Machine Learning subset-nya, Algoritma alat yang dipakai keduanya.',
      'st.s4.rel.title': 'Pilih salah satu lingkaran',
      'st.s4.rel.desc': 'Klik AI, ML, atau Algoritma untuk lihat detail.',
      'st.s4.rel.svgAria': 'Lingkaran konsentris yang menunjukkan AI, ML, dan Algoritma',
      'st.s4.rel.svgTitle': 'Algoritma ⊂ ML ⊂ AI (dengan Symbolic AI sebagai AI tanpa ML)',
      'st.s4.rel.caption':
        '<strong>Diagram:</strong> AI = lingkaran terluar (paling luas). ML = di dalam AI (subset). Algoritma = di dalam ML (alat). Symbolic AI = di dalam AI tapi di luar ML (AI tanpa ML — rule-based).',
      'st.s4.cmp.title': '📊 Tabel Perbandingan',
      'st.s4.cmp.h.aspect': 'Aspek',
      'st.s4.cmp.h.algo': 'Algoritma',
      'st.s4.cmp.h.ml': 'Machine Learning',
      'st.s4.cmp.h.ai': 'AI',
      'st.s4.cmp.what': '<strong>Apa?</strong>',
      'st.s4.cmp.what.a': 'Langkah-langkah pasti',
      'st.s4.cmp.what.m': 'Belajar dari data',
      'st.s4.cmp.what.i': 'Mesin bertindak "cerdas"',
      'st.s4.cmp.goal': '<strong>Tujuan</strong>',
      'st.s4.cmp.goal.a': 'Selesaikan masalah',
      'st.s4.cmp.goal.m': 'Temukan pola',
      'st.s4.cmp.goal.i': 'Perilaku cerdas',
      'st.s4.cmp.ex': '<strong>Contoh</strong>',
      'st.s4.cmp.ex.a': 'Sortir array',
      'st.s4.cmp.ex.m': 'Filter spam',
      'st.s4.cmp.ex.i': 'Self-driving car',
      'st.s4.cmp.year': '<strong>Tahun mulai</strong>',
      'st.s4.cmp.year.a': '300 SM (Euclid)',
      'st.s4.cmp.year.m': '1950-an',
      'st.s4.cmp.year.i': '1950-an',
      'st.s4.callout.title': '💡 Satu Kalimat untuk Diingat',
      'st.s4.callout.text':
        '<strong>AI = tujuan, ML = salah satu cara, Algoritma = alat yang dipakai keduanya.</strong>',
      'st.s4.learn': '📖 Baca penjelasan lengkap →',

      'st.footer':
        'Dibuat oleh <a href="https://github.com/ibam28"><strong>@ibam28</strong></a> · Full Stack Developer &amp; AI Engineer · <a href="../index.html">← Kembali ke landing</a>',
      'st.footer.tech': 'Dibangun dengan vanilla JS, HTML, CSS · Zero framework · Source terbuka (MIT)',
      'st.skip': 'Lompat ke konten utama',

      // ---- relationship ----
      'rel.ai.title': '✨ AI — Payung Terluas',
      'rel.ai.desc': 'Lingkaran terluar: mesin apa pun yang bertindak "cerdas". Termasuk ML, NLP, computer vision, robotics, planning, dan expert systems.',
      'rel.ml.title': '🤖 Machine Learning — Subset',
      'rel.ml.desc': 'Di dalam AI: sistem yang belajar dari data, bukan dari aturan tulisan tangan. Deep learning adalah bagian dari ML.',
      'rel.algo.title': '📐 Algoritma — Alatnya',
      'rel.algo.desc': 'Di dalam ML: langkah-langkah pasti yang membuat ML bekerja (optimasi, sorting, search). Tidak semua algoritma adalah AI.',
      'rel.symbolic.title': '🧩 Symbolic AI — AI Tanpa ML',
      'rel.symbolic.desc': 'Di dalam AI tapi di luar ML: expert system berbasis aturan if-then yang ditulis manusia.',

      // ---- decision tree ----
      'dt.status.ready': 'Pilih dataset lalu klik <strong>Train</strong>.',
      'dt.status.grow': 'Training berjalan… node bertambah.',
      'dt.status.done': 'Training selesai — tree lengkap!',
      'dt.dataset.iris': 'Iris (klasifikasi bunga)',
      'dt.dataset.play': 'Play Tennis (klasifikasi biner)',

      // ---- sorting ----
      'sort.status.ready': 'Siap. Klik <strong>Start</strong> untuk memulai.',
      'sort.status.bubbleCompare':
        'Bubble sort: membandingkan index {i} dan {j} (nilai {a} vs {b})',
      'sort.status.bubbleSwap': 'Bubble sort: menukar index {i} dan {j}',
      'sort.status.bubbleNoSwap': 'Bubble sort: tidak ada pertukaran — array sudah terurut!',
      'sort.status.done': 'Selesai! {c} perbandingan, {s} pertukaran.',
      'sort.status.mergeCompare': 'Merge sort: membandingkan index {i} ({a}) dan {j} ({b})',
      'sort.status.start': 'Memulai {algo} sort...',
      'sort.status.paused': 'Dijeda.',
      'sort.status.resumed': 'Dilanjutkan.',
      'sort.status.reset': 'Reset. Klik Start untuk memulai lagi.',
      'sort.status.shuffled': 'Array di-shuffle. Klik Start untuk memulai.',
      'sort.status.changed': 'Algoritma diganti ke {algo}. Klik Start.',
      'sort.algo.bubble': 'Bubble Sort',
      'sort.algo.merge': 'Merge Sort',

      // ---- app.js ----
      'app.viz.failed': 'Visualisasi "{name}" gagal dimuat.',
      'app.viz.retry': 'Coba Lagi',

      // ---- mnist ----
      'mn.nav.train': '🏋️ Train',
      'mn.nav.draw': '✏️ Gambar',
      'mn.nav.predict': '🎯 Prediksi',
      'mn.nav.back': '← Website',
      'mn.nav.backAria': 'Kembali ke website utama',
      'mn.hero.eyebrow': 'Live ML Demo · TensorFlow.js',
      'mn.hero.title': 'Pengenal Digit MNIST',
      'mn.hero.text':
        'Real CNN (Convolutional Neural Network) yang <strong>berjalan sepenuhnya di browser-mu</strong>. Tidak ada server, tidak ada API call — semua machine learning terjadi di perangkat-mu.',
      'mn.hero.note':
        '⏱️ Estimasi: training ~30 detik di laptop modern, ~1-2 menit di HP. Setelah training, gambar angka apapun di kanvas dan lihat prediksi model.',
      'mn.s1.subtitle':
        'Model dilatih dari dataset MNIST (subset 5.000 gambar) langsung di browser.',
      'mn.s1.model.title': 'Arsitektur Model',
      'mn.s1.model.total': 'Total: ~108K parameter',
      'mn.s1.train.btn': '▶ Mulai Training',
      'mn.s1.train.status': 'Model belum dilatih',
      'mn.s1.stat.epoch': 'Epoch',
      'mn.s1.stat.loss': 'Loss',
      'mn.s1.stat.acc': 'Accuracy',
      'mn.s1.stat.speed': 'Sample/sec',
      'mn.s2.subtitle': 'Gambar digit 0-9 di kanvas. Pakai mouse, jari, atau stylus — semua didukung.',
      'mn.s2.canvasAria': 'Area menggambar digit. Pakai mouse, jari, atau stylus untuk menggambar.',
      'mn.s2.clear': '🗑️ Clear',
      'mn.s2.brush': 'Brush:',
      'mn.s2.hint': '💡 Tips: gambar angka di tengah, jangan terlalu kecil atau terlalu besar.',
      'mn.s2.preset.summary': 'Atau pilih preset digit (untuk testing cepat)',
      'mn.s2.preset.note':
        'Preset ini mengambil sample dari test set MNIST — jadi "cheat" sedikit, menunjukkan kemampuan model pada data yang mirip training.',
      'mn.s3.subtitle': 'Model menganalisis gambar dan menebak digit mana yang kamu gambar.',
      'mn.s3.predict': '🎯 Prediksi',
      'mn.s3.status.notrained': 'Latih model dulu di section 1',
      'mn.s3.result.label': 'Prediksi Model:',
      'mn.s3.top.title': 'Top 3 Kemungkinan:',
      'mn.s3.insight.summary': 'Apa yang model "lihat"?',
      'mn.s3.insight.text': 'Ini adalah versi 28×28 dari gambar-mu (input model):',
      'mn.s3.insight.note':
        'Catatan: Model dilatih dengan digit putih di latar hitam — kebalikan dari kanvas-mu. Kami invert otomatis sebelum prediksi.',
      'mn.info.title': 'ℹ️ Tentang Demo Ini',
      'mn.info.li1': '<strong>Training terjadi di browser</strong> — bukan di server. Data tidak meninggalkan perangkat-mu.',
      'mn.info.li2': '<strong>Subset 5.000 dari 60.000</strong> gambar training dipakai untuk mempercepat demo.',
      'mn.info.li3': '<strong>Akurasi tipikal:</strong> 90-95% pada subset (full MNIST: 98%+ dengan epochs lebih banyak).',
      'mn.info.li4': '<strong>Limitasi:</strong> download TF.js ~1.2MB pertama kali, training ~30 detik.',
      'mn.info.back': '← Kembali ke penjelasan ML',
      'mn.footer':
        'Dibuat oleh <a href="https://github.com/ibam28"><strong>@ibam28</strong></a> · Demo TensorFlow.js tanpa server · <a href="../../website/index.html">← Halaman utama</a>',
      'mn.loading.message': 'Memuat TensorFlow.js...',
      'mn.loading.ready': 'TensorFlow.js siap!',
      'mn.loading.failed': 'Gagal memuat TensorFlow.js',
      'mn.loading.sub': '~1.2 MB · butuh koneksi internet pertama kali',

      // ---- slides ----
      'sl.s1.eyebrow': 'Portfolio Project · 2026',
      'sl.s1.journey': '📐 Algoritma &nbsp;→&nbsp; 🤖 Machine Learning &nbsp;→&nbsp; ✨ AI',
      'sl.s1.tagline':
        'Penjelasan visual untuk orang awam — tanpa jargon, tanpa hype.<br />Kita mulai dari yang paling familiar, lalu berjalan pelan-pelan ke AI.',
      'sl.s1.byline': 'oleh <strong>@ibam28</strong> · Full Stack + AI Engineer',
      'sl.s2.eyebrow': 'Pertanyaan pembuka',
      'sl.s2.title': '"AI", "Machine Learning", "Algoritma" — bedanya apa?',
      'sl.s2.intro':
        'Tiga istilah ini sering dipakai bergantian, padahal artinya berbeda. Akibatnya banyak orang bingung — dan sebagian jadi takut sama AI.',
      'sl.s2.c1.t': 'Algoritma',
      'sl.s2.c1.d': 'Langkah-langkah pasti untuk menyelesaikan masalah.',
      'sl.s2.c2.t': 'Machine Learning',
      'sl.s2.c2.d': 'Cara komputer <em>belajar dari data</em> alih-alih diberi aturan.',
      'sl.s2.c3.t': 'AI',
      'sl.s2.c3.d': 'Payung paling luas: mesin yang bertindak "cerdas".',
      'sl.s2.outro': 'Kita akan jelajahi satu per satu — mulai dari yang paling akrab.',
      'sl.s3.eyebrow': 'Bagian 1 · Algoritma',
      'sl.s3.title': 'Algoritma itu seperti resep masakan',
      'sl.s3.quote':
        '<span class="quote-mark">"</span>Langkah-langkah pasti: <strong>aduk 5 menit</strong>, <strong>panggang 180°C</strong>, <strong>tunggu 20 menit</strong>. Ikuti urutannya, hasilnya bisa diprediksi.',
      'sl.s3.step1': 'Input: bahan-bahan',
      'sl.s3.step2': 'Proses: langkah yang jelas dan berurutan',
      'sl.s3.step3': 'Output: makanan yang bisa diprediksi',
      'sl.s3.point': '<strong>Poin kunci:</strong> algoritma bukan cuma untuk komputer. Resep, rute perjalanan, cara menghitung kembalian — semuanya algoritma.',
      'sl.s4.eyebrow': 'Bagian 1 · Algoritma',
      'sl.s4.title': 'Kamu pakai algoritma setiap hari',
      'sl.s4.intro': 'Tanpa sadar, algoritma mengatur banyak hal di hidupmu.',
      'sl.s4.c1.t': 'TikTok / Instagram',
      'sl.s4.c1.d': 'Algoritma ranking memilih video apa yang muncul di feed-mu.',
      'sl.s4.c2.t': 'Google Maps',
      'sl.s4.c2.d': 'Menghitung rute tercepat lewat ribuan kemungkinan jalan.',
      'sl.s4.c3.t': 'Spotify',
      'sl.s4.c3.d': 'Mengacak lagu (shuffle) dengan aturan yang adil.',
      'sl.s4.c4.t': 'Bank',
      'sl.s4.c4.d': 'Mengurutkan transaksi, menghitung bunga, mendeteksi anomali.',
      'sl.s5.eyebrow': 'Bagian 2 · Machine Learning',
      'sl.s5.title': 'ML itu koki yang belajar dari 10.000 percobaan',
      'sl.s5.quote':
        '<span class="quote-mark">"</span>Koki ini <strong>tidak membaca resep</strong>. Dia memasak, mencoba, gagal, memperbaiki — ribuan kali. Lama-lama dia tahu sendiri: "kalau adonannya begini, harus dipanggang segini".',
      'sl.s5.c1.t': 'Algoritma biasa',
      'sl.s5.c1.d': 'Diberi <strong>aturan</strong> → mengikuti aturan → hasil.',
      'sl.s5.c2.t': 'Machine Learning',
      'sl.s5.c2.d': 'Diberi <strong>data + jawaban</strong> → menemukan aturannya sendiri → hasil.',
      'sl.s5.point': '<strong>Inilah pembeda utamanya:</strong> aturan vs data.',
      'sl.s6.eyebrow': 'Bagian 2 · Machine Learning',
      'sl.s6.title': 'Kamu juga sudah pakai ML setiap hari',
      'sl.s6.intro': 'Bedanya dengan algoritma biasa: ML <em>belajar</em> dari pola, bukan dari aturan tetap.',
      'sl.s6.c1.t': 'Filter spam email',
      'sl.s6.c1.d': 'Belajar dari jutaan email: mana yang spam, mana yang bukan.',
      'sl.s6.c2.t': 'Rekomendasi film',
      'sl.s6.c2.d': 'Belajar dari tontonanmu dan orang lain yang mirip kamu.',
      'sl.s6.c3.t': 'Deteksi fraud',
      'sl.s6.c3.d': 'Belajar pola transaksi normal, lalu menandai yang mencurigakan.',
      'sl.s6.c4.t': 'Prediksi harga rumah',
      'sl.s6.c4.d': 'Belajar dari ribuan transaksi: lokasi, luas, tahun, harga.',
      'sl.s7.eyebrow': 'Bagian 3 · AI',
      'sl.s7.title': 'AI itu restoran pintar',
      'sl.s7.quote':
        '<span class="quote-mark">"</span>Kalau ML adalah <strong>koki</strong> yang belajar memasak, AI adalah <strong>seluruh restoran</strong>: koki + pelayan yang paham pesanan + kasir yang kenali wajah + manajer yang atur jadwal.',
      'sl.s7.c1.t': '🤖 Koki',
      'sl.s7.c1.d': 'ML — belajar dari data',
      'sl.s7.c2.t': '💬 Pelayan',
      'sl.s7.c2.d': 'NLP — paham bahasa manusia',
      'sl.s7.c3.t': '👁️ Kasir',
      'sl.s7.c3.d': 'Computer Vision — kenali gambar',
      'sl.s7.point': '<strong>AI = payung paling luas.</strong> ML adalah salah satu cara untuk mencapai AI — bukan satu-satunya.',
      'sl.s8.eyebrow': 'Bagian 3 · AI',
      'sl.s8.title': 'AI bukan hal baru — sudah 70+ tahun',
      'sl.s8.i1': '<span class="year">1950</span> Alan Turing mengusulkan "Turing Test" — bisakah mesin menipu manusia?',
      'sl.s8.i2': '<span class="year">1956</span> Konferensi Dartmouth — istilah "Artificial Intelligence" resmi lahir.',
      'sl.s8.i3': '<span class="year">1997</span> Deep Blue (IBM) mengalahkan juara catur dunia Garry Kasparov.',
      'sl.s8.i4': '<span class="year">2012</span> AlexNet menang besar di kompetisi ImageNet — era <em>deep learning</em> dimulai.',
      'sl.s8.i5': '<span class="year">2017</span> Arsitektur <em>Transformer</em> diperkenalkan — fondasi model bahasa modern.',
      'sl.s8.i6': '<span class="year">2022</span> ChatGPT membawa AI generatif ke jutaan orang awam dalam hitungan minggu.',
      'sl.s9.eyebrow': 'Bagian 4 · Hubungan',
      'sl.s9.title': 'Jadi, bagaimana ketiganya berhubungan?',
      'sl.s9.ring.ai': 'AI',
      'sl.s9.ring.ml': 'ML',
      'sl.s9.ring.algo': 'Algoritma',
      'sl.s9.leg.ai': '<strong>AI</strong> — paling luas: mesin bertindak "cerdas"',
      'sl.s9.leg.ml': '<strong>Machine Learning</strong> — subset AI: belajar dari data',
      'sl.s9.leg.algo': '<strong>Algoritma</strong> — alat yang dipakai ML untuk bekerja',
      'sl.s9.leg.sym': '<strong style="color: var(--c-success);">Symbolic AI</strong> — di dalam AI, tapi di luar ML (aturan if-then buatan manusia).',
      'sl.s9.point': '<strong>Bukan garis lurus — tapi hirarki:</strong> Algoritma ⊂ ML ⊂ AI.',
      'sl.s10.eyebrow': 'Bagian 4 · Hubungan',
      'sl.s10.title': 'Supaya tidak salah paham',
      'sl.s10.intro': 'Tiga counter-example yang menunjukkan kita tidak menyederhanakan berlebihan.',
      'sl.s10.h1': 'Contoh',
      'sl.s10.h2': 'Membuktikan',
      'sl.s10.r1c1': '<strong>Symbolic AI</strong> (expert system, rule-based)',
      'sl.s10.r1c2': 'AI <strong>bisa tanpa ML</strong> — aturan ditulis manusia, bukan dipelajari.',
      'sl.s10.r2c1': '<strong>Algoritma kuantum</strong> (Shor\'s algorithm)',
      'sl.s10.r2c2': 'Algoritma <strong>bisa tanpa AI</strong> — alat murni matematika.',
      'sl.s10.r3c1': '<strong>Linear regression</strong> klasik',
      'sl.s10.r3c2': 'Algoritma statistik yang <strong>dipakai ML</strong>, tapi ML bukan cuma itu.',
      'sl.s10.point': 'Ini alasan kita pakai <strong>hirarki</strong>, bukan sekadar daftar.',
      'sl.s11.eyebrow': 'Coba sendiri',
      'sl.s11.title': 'Semua ini berjalan di browser-mu',
      'sl.s11.intro':
        'Tidak ada server. Tidak ada API rahasia. Kamu bisa latih model ML asli langsung dari HP atau laptop — dan lihat sendiri hasilnya.',
      'sl.s11.demo': '<strong style="color: var(--c-ml);">Demo MNIST:</strong> latih CNN pengenal angka, lalu gambar angka apa pun dan lihat prediksinya.',
      'sl.s12.eyebrow': 'Penutup',
      'sl.s12.title': 'Empat hal untuk dibawa pulang',
      'sl.s12.i1': '<strong>AI = tujuan, ML = salah satu cara, Algoritma = alat.</strong>',
      'sl.s12.i2': '<strong>ML belajar dari data</strong> — bukan dari aturan yang ditulis manusia.',
      'sl.s12.i3': '<strong>Algoritma bukan cuma untuk komputer</strong> — resep masakan pun algoritma.',
      'sl.s12.i4': '<strong>ML bukan magic</strong> — di baliknya ada matematika, statistik, dan data.',
      'sl.s12.thanks': 'Terima kasih.<br /><strong>Bambang Saputra Jaya</strong> · @ibam28 · Full Stack + AI Engineer',
      'sl.s12.repo': 'Repo: <code>github.com/ibam28/from-algorithms-to-ai</code>',

      // ---- mnist dynamic (mnist.js) ----
      'mn.tfjs.loading': 'Memuat TensorFlow.js...',
      'mn.tfjs.ready': 'TensorFlow.js siap!',
      'mn.tfjs.failed': 'Gagal memuat TensorFlow.js',
      'mn.train.start': '▶ Mulai Training',
      'mn.training.start': 'Memulai training...',
      'mn.source.cdn': 'CDN (penyimpanan Google TF.js)',
      'mn.source.synthetic': 'Fallback sintetis (CDN tidak tersedia)',
      'mn.training.done': 'Model siap! Gambar angka lalu klik Prediksi.',
      'mn.training.time': 'Selesai dalam {s}s',
      'mn.train.retrain': '↻ Retrain',
      'mn.train.loading': '⏳ Loading...',
      'mn.train.training': '⏳ Training...',
      'mn.log.loadDataset': 'Memuat dataset MNIST...',
      'mn.log.datasetSource': 'Dataset dimuat dari: {source}',
      'mn.log.samples': 'Train: {train} samples | Test: {test} samples',
      'mn.log.buildModel': 'Membangun model CNN...',
      'mn.log.error': 'Error: {msg}',
      'mn.log.epoch': 'Epoch {epoch}/{total} — loss: {loss}{valLoss}, acc: {acc}%{valAcc}',
      'mn.log.complete': '✓ Training complete! Model siap untuk prediksi.',
      'mn.predict.working': 'Memprediksi...',
      'mn.predict.done': 'Selesai. Coba gambar digit lain!',
      'mn.predict.notrained': 'Latih model dulu!',
      'mn.predict.confidence': '{pct}% confidence',
      'mn.predict.hint': 'Klik Prediksi untuk melihat hasil.',
      'mn.preset.unavailable': 'Preset belum tersedia (mungkin CDN gagal). Silakan gambar manual.',
      'mn.preset.loaded': 'Preset digit {digit} dimuat. Klik Prediksi.',

      // ---- decision tree dynamic (extra) ----
      'dt.edge.yes': 'Ya',
      'dt.edge.no': 'Tidak',
      'dt.status.reset': 'Reset. Klik Train atau Step untuk membangun tree.',
      'dt.status.start': 'Training dimulai...',
      'dt.status.nodeSplit': 'Node {n}: split berdasarkan "{feat}"',
      'dt.status.leaf': 'Leaf {n}: prediksi "{cls}" ({samples} samples)',
      'dt.status.full': 'Tree lengkap! Model sudah dilatih.',
      'dt.status.empty': 'Tree akan muncul di sini setelah training...',
      'dt.status.dataset': 'Dataset: {name}. {desc}. Klik Train.',
      'dt.status.init': 'Dataset: {name}. Klik Train atau Step untuk membangun tree.',
      'dt.dataset.iris.desc': 'Klasifikasi jenis bunga iris berdasarkan petal length',
      'dt.dataset.play.desc': 'Klasifikasi apakah layak main tennis berdasarkan kondisi cuaca',

      // ---- sorting dynamic ----
      'sort.btn.pause': '⏸ Pause',
      'sort.btn.resume': '▶ Lanjut',
    },
  };

  let currentLang = 'en';

  function t(key, vars) {
    const table = dicts[currentLang] || dicts.en;
    let s = table[key] !== undefined ? table[key] : (dicts.en[key] !== undefined ? dicts.en[key] : key);
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        s = s.split('{' + k + '}').join(String(v));
      }
    }
    return s;
  }

  function apply() {
    document.documentElement.lang = currentLang;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      const s = t(key);
      if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = s;
      } else {
        el.textContent = s;
      }
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      const key = el.getAttribute('data-i18n-aria');
      if (key) el.setAttribute('aria-label', t(key));
    });
    // Toggle buttons highlight
    document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
      const isActive = btn.getAttribute('data-lang-btn') === currentLang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });
    window.dispatchEvent(new CustomEvent('i18n:change', { detail: { lang: currentLang } }));
  }

  function setLang(lang) {
    if (lang !== 'en' && lang !== 'id') lang = 'en';
    currentLang = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* private mode */ }
    apply();
  }

  function getLang() {
    return currentLang;
  }

  // Init: read saved preference (default EN)
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'id') currentLang = 'id';
  } catch (e) { /* ignore */ }

  // Wire toggle buttons once DOM is ready; then apply
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
        btn.addEventListener('click', () => setLang(btn.getAttribute('data-lang-btn')));
      });
      apply();
    });
  } else {
    document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
      btn.addEventListener('click', () => setLang(btn.getAttribute('data-lang-btn')));
    });
    apply();
  }

  return { t, setLang, getLang, apply, dicts };
})();