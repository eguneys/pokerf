import { readPlay as fenReadPlay } from './fen';

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

export function involved(data) {
  return data.play.involved;
}

export function allInvolved(data) {
  return data.play.stacks.map((_, i) => i);
}

export function deal(data) {
  return data.play.deal;
}

export function blinds(data) {
  return data.play.blinds;
}

export function blindsPosted(data) {
  return data.play.deal.blindsPosted;
}

export function button(data) {
  return data.play.deal.button;
}

export function smallBlind(data) {
  return data.play.deal.smallBlind;
}

export function bigBlind(data) {
  return data.play.deal.bigBlind;
}

export function nextToAct(data) {
  return data.play.deal.nextToAct;
}

export function doDeal(data, o) {
  data.play = fenReadPlay(o.fen);
  data.play.involved = allInvolved(data);
  data.seatIndexes = o.seatIndexes;
}

export function doLeave(data, o) {
  data.seats[o.seatIndex] = null;
}

export function doJoin(data, o) {
  data.seats[o.seatIndex] = o.seat;
}
