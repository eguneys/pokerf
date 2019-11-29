export function eventFlag(data) {
  return data.events.flag;
}

export function eventSit(data) {
  return data.events.sit;
}

export function clock(data) {
  return data.clock;
}

export function seats(data) {
  return data.seats;
}

export function seatIndex(data, handIndex) {
  return data.seatIndexes[handIndex];
}

export function handIndex(data, seatIndex) {
  return data.seatIndexes.indexOf(seatIndex);
}

export function fen(data) {
  return data.fen;
}

export function doDeal(data, o) {
  data.seatIndexes = o.seatIndexes;
  data.fen = o.fen;
}

export function doClock(data, o) {
  data.clock = o;
}

export function doMove(data, move) {
  
}

export function doLeave(data, o) {
  data.seats[o.seatIndex] = null;
}

export function doJoin(data, o) {
  data.seats[o.seatIndex] = o.seat;
}
