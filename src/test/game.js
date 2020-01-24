import { log, ok, deep_is, is, not } from 'testiz/browser';
import Game from '../game';

export default function GameTests() {
  // current();
  gameFlop();
  gamePreflop();
}

function current() {
  log('game river');
}

function gameFlop() {
  log('game flop');

  let fen = `F 2 0 0 20!30 0 1
  I 70 10 RR10
  I 50 20 RR20
  F 100 0 FO`;

  let game = new Game(fen);

  is('round', game.round(), 'flop');

  deep_is('all involved', game.allInvolved(), [0, 1]);

  deep_is('running pot', game.runningPot(), {
    involved: [0, 1],
    wager: 30
  });

  deep_is('last action 0', game.lastAction(0), {
    hash: 'RR',
    action: 'raise',
    to: 10
  });

  deep_is('last action 1', game.lastAction(1), {
    hash: 'RR',
    action: 'raise',
    to: 20
  });

  deep_is('last action 2', game.lastAction(2), {
    hash: 'FO',
    action: 'fold',
    to: 0
  });
}


function gamePreflop() {
  
  log('game preflop');

  let fen = `P 0 0 0 10!0 0 1 2
  I 100 0 .
  I 70 5 .
  I 50 10 .`;


  let game = new Game(fen);

  is('button', game.button(), 0);
  is('sb', game.smallBlind(), 1);
  is('bb', game.bigBlind(), 2);

  is('round', game.round(), 'preflop');

  is('to act', game.toAct(), 0);

  deep_is('all-involved', game.allInvolved(), [0, 1, 2]);

  deep_is('running pot', game.runningPot(), {
    involved: [0, 1, 2],
    wager: 0
  });

  is('last action 0', game.lastAction(0), null);

  deep_is('last action 1', game.lastAction(1), {
    action: 'smallBlind',
    to: 5
  });

  deep_is('last action 2', game.lastAction(2), {
    action: 'bigBlind',
    to: 10
  });

  // is('min raise', game.minRaise(), 20);
  // is('third pot raise', game.thirdPotRaise(), 10 + Math.floor(25 / 3));
  // is('half pot raise', game.thirdPotRaise(), 10 + Math.floor(25 / 2));
  // is('pot raise', game.halfPotRaise(), 35);
  // is('all in raise', game.allInRaise(), 100);

}
