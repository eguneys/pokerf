import {
  readCards as fenReadCards } from './fen2';

import {
  readPossibleMoves as fenReadPossibleMoves } from './fen';

export const meStatus = { 'WN': 'waitForNextHand',
                          'WO': 'waitForOtherPlayers',
                          'I': 'involved' };

export function readMe(me) {
  return {
    status: me.status,
    statusStr: meStatus[me.status],
    side: me.side,
    hand: me.hand?fenReadCards(me.hand):null,
    possibleMoves: fenReadPossibleMoves(me.possibleMoves)
  };

}
