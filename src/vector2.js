export function sub(v1, v2) {
  return [v1[0] - v2[0],
          v1[1] - v2[1]];
}

export function addScale(v1, v2, scale) {
  return [v1[0] + v2[0] * scale,
          v1[1] + v2[1] * scale];
}
