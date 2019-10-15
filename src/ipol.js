export function interpolator2(a, b = a.slice()) {
  return {
    update(dt) {
      a.forEach((_, i) => a[i] = interpolate(a[i], b[i], dt));
    },
    target(x = b) {
      b = x;
      return b;
    },
    settled(threshold = 0.01) {
      return a.every((_, i) => Math.abs(_ - b[i]) < threshold);
    },
    value(x = a) {
      a = x;
      return a;
    }
  };  
}

export default function interpolator(a, b = a) {
  let v = 0;

  const value = () => a + (b - a) * v;

  const settle = () => v = 1;
  const reset = () => v = 0;
  const resetIfDifferent = () => {
    if (a !== b) {
      reset();
    } else {
      settle();
    }
  };

  return {
    update(dt) {
      v += dt;
      if (v > 1) {
        v = 1;
      }
    },
    settled(threshold = 1) {
      return v === 1;
    },
    progress(max = 1) {
      return v;
    },
    both(x, y = x) {
      a = x;
      b = y;
      resetIfDifferent();
    },
    target(x) {
      if (x) {
        b = x;
        resetIfDifferent();
      }
      return b;
    },
    value(x) {
      if (x) {
        a = x;
        resetIfDifferent();
      }
      return value();
    }
  };
}

export function interpolate(a, b, dt = 0.2) {
  return a + (b - a) * dt;
}
