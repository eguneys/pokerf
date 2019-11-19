import { readPlay as fenReadPlay,
         readPots as fenReadPots } from './fen';
import { makeAction } from './fen';

export default function Game(fen) {

  let play;

  const init = (fen) => {
    if (fen) {
      play = fenReadPlay(fen);
    }
  };

  init(fen);

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

  this.doDeal = (o) => {
    init(o.fen);
  };

  this.doMove = (o) => {
    let { toAct,
          newStack,
          newWager,
          move } = o;

    let prevToAct = play.toAct,
        actStack = play.stacks[play.toAct];

    move.to = newWager;
    
    actStack.stack = newStack;
    actStack.lastAction = move;
    actStack.recentWager = newWager;

  };

  this.doNextTurn = (o) => {
    let { toAct } = o;

    play.toAct = toAct;
  };

  this.doNextRound = (o) => {
    let { toAct, pots, middle } = o;

    play.toAct = toAct;

    play.pots = fenReadPots(pots);
  };

}
