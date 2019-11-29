export function callUserFunction(f, ...args) {
  if (f) setTimeout(() => f(...args), 1);
}

export function withDelay(fn, delay, { onUpdate }) {
  let lastUpdate = 0;

  return (delta) => {
    lastUpdate += delta;
    if (lastUpdate >= delay) {
      fn();
      lastUpdate = 0;
    } else {
      if (onUpdate)
        onUpdate(lastUpdate / delay);
    }
  };
};

export function formatChips(chips) {
  return chips + '$';
}
