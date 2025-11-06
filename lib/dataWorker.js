// lib/dataWorker.js
self.onmessage = (e) => {
  const { batchSize, interval } = e.data;

  const loop = () => {
    const now = Date.now();
    const categories = ['A', 'B', 'C', 'D'];
    const points = Array.from({ length: batchSize }, (_, i) => ({
      id: crypto.randomUUID(),
      timestamp: now + i,
      value: Math.sin(now / 500) * 50 + Math.random() * 50,
      category: categories[Math.floor(Math.random() * categories.length)],
    }));

    self.postMessage(points);
    setTimeout(loop, interval);
  };

  loop();
};
