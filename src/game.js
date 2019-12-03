import {
  readMe as tableReadMe } from './table';

import {
  readHands as fenReadHands,
  readMiddle as fenReadMiddle } from './fen2';

import {
  readMove as fenReadMove,
  readPlay as fenReadPlay,
  readPots as fenReadPots,
  readPotDistribution as fenReadPotDistribution,
  readRole as fenReadRole } from './fen';
import { makeAction } from './fen';

import * as lens from './lens';

export default function Game(fen, sMe) {

  let me;

  let middle;
  let play;

  let winners;

  let hands;

  const init = (fen, sMe) => {

    if (fen) {
      play = fenReadPlay(fen);
    } else {
      play = null;
    }

    if (sMe) {
      me = tableReadMe(sMe);
    } else {
      me = null;
    }

    middle = null;

    winners = null;

    hands = [];
  };

  init(fen, sMe);

  this.me = () => !!me;
  this.meStatus = () => me.status;
  this.meHand = () => me.hand;
  this.meHandIndex = () => me.handIndex;
  this.meInvolved = () => this.me() &&
    this.meStatus() === 'involved';
  this.meTurn = () => this.meInvolved() &&
    this.toAct() === this.meHandIndex();

  this.playing = () => !!play;
  this.winners = () => winners;
  this.hands = () => hands;
  this.middle = () => [
    ...this.flopCards(),
    this.turnCard(),
    this.riverCard()
  ];

  this.flopCards = () => middle.flop;
  this.turnCard = () => middle.turn;
  this.riverCard = () => middle.river;

  this.blinds = () => play.blinds;
  this.round = () => play.round;
  this.button = () => play.button;
  this.toAct = () => play.toAct;
  this.allowRaiseUntil = () => play.allowRaiseUntil;
  this.lastFullRaise = () => play.lastFullRaise;

  this.handIndexes = () => play.stacks.map((_, i) => i);

  this.stack = (stackIndex) => play.stacks[stackIndex].stack;
  this.recentWager = (stackIndex) => play.stacks[stackIndex].wager;
  this.lastAction = (stackIndex) => {
    if (!play.stacks[stackIndex].lastAction) {
      if (this.smallBlind() === stackIndex) {
        play.stacks[stackIndex].lastAction = makeAction('smallBlind', this.recentWager(stackIndex));
      } else if (this.bigBlind() === stackIndex) {
        play.stacks[stackIndex].lastAction = makeAction('bigBlind', this.recentWager(stackIndex));
      }
    }

    return play.stacks[stackIndex].lastAction;
  };

  this.smallBlind = () => (this.button() + 1) % play.stacks.length;
  this.bigBlind = () => (this.smallBlind() + 1) % play.stacks.length;

  const involvedRole = role => role === 'involved' || role === 'oldallin' || role === 'newallin';

  this.allInvolved = () => play.stacks.filter(_ => involvedRole(_.role)).map(_=>_.stackIndex);

  this.runningPot = () => play.pots.running;

  this.sidePots = () => play.pots.sides;

  this.allPots = () => [
    this.runningPot(),
    ...this.sidePots()];

  this.allPotsWager = () => this.allPots()
    .map(_ => _.wager)
    .reduce((acc, _) => acc + _, 0);

  this.doMove = (o) => {
    let { toAct,
          newRole,
          newStack,
          newWager, 
          uci } = o;

    let prevToAct = play.toAct,
        actStack = play.stacks[play.toAct];

    let move = fenReadMove(uci);
    move.to = parseInt(newWager);
    
    actStack.stack = parseInt(newStack);
    actStack.lastAction = move;
    actStack.recentWager = parseInt(newWager);
    actStack.role = fenReadRole(newRole);

    return {
      prevToAct
    };
  };

  this.doNextTurn = (o) => {
    let { toAct } = o;

    play.toAct = toAct;
  };

  this.doNextRound = (o) => {
    let { toAct, pots, middle: sMiddle } = o;

    play.toAct = toAct;

    play.pots = fenReadPots(pots);

    middle = fenReadMiddle(sMiddle);
  };

  this.doOneWin = (o) => {
    let { winners: sWinners } = o;

    let { pots, stacks } = sWinners;

    winners = fenReadPotDistribution(pots);
    
  };

  this.doShowdown = (o) => {
    let { winners: sWinners, middle: sMiddle, hands: sHands } = o;

    let { pots, stacks } = sWinners;

    hands = fenReadHands(sHands);

    winners = fenReadPotDistribution(pots);
    
    middle = fenReadMiddle(sMiddle);
  };

}
