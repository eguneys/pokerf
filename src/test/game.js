import { log, ok, deep_is, is, not } from 'testiz/browser';
import Game from '../game';

export default function GameTests() {
  current();
}


function current() {
  
  log('preflop first to act');

  let fen = '70s 50B 100b!10(5 10 .)~10!0';

  let game = new Game(fen);

  is('blinds', game.blinds(), 10);
  is('button', game.button(), 2);
  is('sb', game.smallBlind(), 0);
  is('bb', game.bigBlind(), 1);

  is('is preflop', game.preflop(), true);

  is('first to act', game.firstToAct(), 2);

  is('last to act', game.lastToAct(), 0);

  is('to act', game.toAct(), 2);
  deep_is('involved', game.involved(), [0, 1, 2]);

  is('middle pot', game.middlePot(), 0);

  

  // is('min raise', game.minRaise(), 20);
  // is('third pot raise', game.thirdPotRaise(), 10 + Math.floor(25 / 3));
  // is('half pot raise', game.thirdPotRaise(), 10 + Math.floor(25 / 2));
  // is('pot raise', game.halfPotRaise(), 35);
  // is('all in raise', game.allInRaise(), 100);

}
