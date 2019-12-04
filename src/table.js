import {
  readCards as fenReadCards } from './fen2';

import {
  readPossibleMoves as fenReadPossibleMoves } from './fen';

export const meStatus = { 'WN': 'waitForNextHand',
                          'WO': 'waitForOtherPlayers',
                          'I': 'involved' };

export function readMe(me) {
  return {
    status: meStatus[me.status],
    hand: me.hand?fenReadCards(me.hand):null,
    handIndex: me.handIndex,
    possibleMoves: fenReadPossibleMoves(me.possibleMoves)
  };

}
