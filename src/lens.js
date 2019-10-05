export function involved(data) {
  return data.play.involved;
}

export function allInvolved(data) {
  return data.play.stacks.map((_, i) => i);
}

export function deal(data) {
  return data.play.deal;
}

export function button(data) {
  return data.play.deal.button;
}

export function smallBlind(data) {
  return nextToAct(data, button(data));
}

export function bigBlind(data) {
  return nextToAct(data, smallBlind(data));
}

export function nextToAct(data, from) {
  return (from + 1) % allInvolved(data).length;
}

export function doDeal(data) {
  data.play.involved = allInvolved(data);
}
