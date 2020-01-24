export function eventSitoutNextHand(data) {
  return data.events.sitoutNextHand;
}

export function eventFlag(data) {
  return data.events.flag;
}

export function eventSit(data) {
  return data.events.sit;
}

export function eventMove(data) {
  return data.events.move;
}

export function clock(data) {
  return data.clock;
}

export function seats(data) {
  return data.seats;
}

export function nbSeats(data) {
  return seats(data).length;
}

export function seatIndex(data, handIndex) {
  return data.seatIndexes[handIndex];
}

export function handIndex(data, seatIndex) {
  if (!data.seatIndexes) {
    return -1;
  }
  return data.seatIndexes.indexOf(seatIndex);
}

export function stakes(data) {
  return data.stakes;
}

export function stakesUnit(data) {
  return parseFloat(data.stakes.unit);
}

export function stakesCurrency(data) {
  return data.stakes.currency;
}

export function formatChips(data, blinds) {
  let value = stakesUnit(data) * blinds;
  let currency = stakesCurrency(data);

  let rounded = Math.round(value * 10000) / 10000;

  return `${rounded}${currency}`;
}

export function fen(data) {
  return data.fen;
}

export function me(data) {
  return data.me;
}

export function status(data) {
  return data.status;
}

export function trans(data) {
  return data.trans;
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

export function doMeJoin(data, o) {

}
