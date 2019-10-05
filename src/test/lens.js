import { log, ok, deep_is, is, not } from 'testiz/browser';
import * as lens from '../lens';
import { configure } from '../config';

export default function lensTests() {

  const config = {
    fen: '70b 50!0(. .)~10!0\n'
  };

  log('lens heads up before deal');

  let play = {};

  configure(play, config);

  deep_is('no involved', lens.involved(play), undefined);

  deep_is('all involved', lens.allInvolved(play), [0, 1]);
  is('button', lens.button(play), 0);
  is('SB', lens.smallBlind(play), 1);
  is('BB is button', lens.bigBlind(play), 0);


  log('lens heads up after deal');

  play = {};
  configure(play, config);
  
  lens.doDeal(play);

  deep_is('involved', lens.involved(play), [0, 1]);
  
}
