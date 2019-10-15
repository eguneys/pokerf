export function callUserFunction(f, ...args) {
  if (f) setTimeout(() => f(...args), 1);
}
