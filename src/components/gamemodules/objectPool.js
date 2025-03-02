const createObjectPool = (factory, bounds, initialSize = 50) => {
  const active = new Set();
  const inactive = new Set();
  const outOfBounds = new Map();
  // FIX: There is an error after a while
  // Pre-populate pool
  for (let i = 0; i < initialSize; i++) {
    inactive.add(factory());
  }

  const cleanup = () => {
    const now = Date.now();
    outOfBounds.forEach((timestamp, object) => {
      if (now - timestamp > 1000) {
        outOfBounds.delete(object);
        active.delete(object);
        inactive.add(object);
      }
    });
  };

  return {
    acquire() {
      cleanup();
      const object =
        inactive.size > 0 ? inactive.values().next().value : factory();

      inactive.delete(object);
      active.add(object);
      return object;
    },

    release(object) {
      outOfBounds.delete(object);
      active.delete(object);
      inactive.add(object);
    },

    checkBounds(object) {
      if (!bounds(object)) {
        if (!outOfBounds.has(object)) {
          outOfBounds.set(object, Date.now());
        }
      } else {
        outOfBounds.delete(object);
      }
    },

    getActive() {
      cleanup();
      return Array.from(active);
    },
  };
};

export default createObjectPool;
