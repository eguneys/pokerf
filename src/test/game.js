import { log, ok, deep_is, is, not } from 'testiz/browser';
import Game from '../game';

export default function GameTests() {
  // current();
  gameFlop();
  gamePreflop();
}

function current() {
  log('game river');

  let fen = `70s 50B 100 100 100b!10(5 10 . . .)~10!0
C C C`;

  let game = new Game(fen);
}

function gameFlop() {
  log('game flop');

  let fen = `70s 50B 100b!20(20 40 10)~10!1
F R20 R10
H C C`;

  let game = new Game(fen);

  is('blinds', game.blinds(), 10);
  is('button', game.button(), 2);
  is('sb', game.smallBlind(), 0);
  is('bb', game.bigBlind(), 1);

  is('round', game.round(), 'flop');

  is('is preflop', game.preflop(), false);
  is('is flop', game.preflop(), true);
  is('is turn', game.turn(), false);

  is('last to act', game.lastToAct(), 1);

  is('to act', game.toAct(), 2);

  deep_is('involved', game.involved(), [0, 1]);

  is('middle pot', game.middlePot(), 30);

  deep_is('recent action 0', game.recentAction(0), {
    action: 'raise',
    amount: 10,
    to: 20
  });

  deep_is('recent action 1', game.recentAction(1), {
    action: 'raise',
    amount: 20,
    to: 40
  });

  is('recent action 2', game.recentAction(2), {
    action: 'fold'
  });

  // is('min raise', game.minRaise(), 20);
  // is('third pot raise', game.thirdPotRaise(), 10 + Math.floor(25 / 3));
  // is('half pot raise', game.thirdPotRaise(), 10 + Math.floor(25 / 2));
  // is('pot raise', game.halfPotRaise(), 35);
  // is('all in raise', game.allInRaise(), 100);
  
}


function gamePreflop() {
  
  log('game preflop');

  let fen = '70s 50B 100b!10(5 10 .)~10!0';

  let game = new Game(fen);

  is('blinds', game.blinds(), 10);
  is('button', game.button(), 2);
  is('sb', game.smallBlind(), 0);
  is('bb', game.bigBlind(), 1);

  is('round', game.round(), 'preflop');

  is('is preflop', game.preflop(), true);

  is('last to act', game.lastToAct(), 0);

  is('to act', game.toAct(), 2);

  deep_is('involved', game.involved(), [0, 1, 2]);

  is('middle pot', game.middlePot(), 0);

  deep_is('recent action 0', game.recentAction(0), {
    action: 'smallBlind',
    amount: 5,
    to: 5
  });

  deep_is('recent action 1', game.recentAction(1), {
    action: 'bigBlind',
    amount: 10,
    to: 10
  });

  is('recent action 2', game.recentAction(2), undefined);

  // is('min raise', game.minRaise(), 20);
  // is('third pot raise', game.thirdPotRaise(), 10 + Math.floor(25 / 3));
  // is('half pot raise', game.thirdPotRaise(), 10 + Math.floor(25 / 2));
  // is('pot raise', game.halfPotRaise(), 35);
  // is('all in raise', game.allInRaise(), 100);

}
