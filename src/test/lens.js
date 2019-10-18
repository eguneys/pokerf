import { log, ok, deep_is, is, not } from 'testiz/browser';
import * as lens from '../lens';
import { configure } from '../config';

export default function lensTests() {

  const config = {
    fen: '70b 50!0(. .)~10!0\n',
    seatIndexes: [3, 4]
  };

  log('lens heads up before deal');

  let play = {};

  configure(play, config);

  is('seat index', lens.seatIndex(play, 0), 3);

  deep_is('no involved', lens.involved(play), undefined);

  deep_is('all involved', lens.allInvolved(play), [0, 1]);
  is('button', lens.button(play), 0);
  is('blinds not posted', lens.blindsPosted(play), false);
  is('SB', lens.smallBlind(play), -1);
  is('BB', lens.bigBlind(play), -1);
  is('next to act', lens.nextToAct(play), -1);

  log('lens heads up after deal');

  play = {};
  configure(play, config);
  
  let deal = {
    fen: '70bB 50sn!0(5 10)~10!0\n'
  };

  lens.doDeal(play, deal);

  deep_is('involved', lens.involved(play), [0, 1]);
  ok('blinds posted', lens.blindsPosted(play));
  is('button', lens.button(play), 0);
  is('SB', lens.smallBlind(play), 1);
  is('BB', lens.bigBlind(play), 0);
  is('next to act', lens.nextToAct(play), 1);
}
