import * as lens from './lens';
import { configure } from './config';

export default function Start(data, play) {

  this.play = (_) => play = _;

  this.api = () => {
    return {
      set(config) {
        configure(data, config);
      },
      setClock(o) {
        lens.doClock(data, o);

        return play.beginClock(o);
      },
      deal(o) {
        lens.doDeal(data, o);

        return play.beginDeal(o);
      },
      move(o) {
        return play.beginMove(o);
      },
      nextTurn(o) {
        return play.beginNextTurn(o);        
      },
      nextRound(o) {
        return play.beginNextRound(o);
      },
      oneWin(o) {
        play.stopClock();
        return play.beginOneWin(o);
      },
      showdown(o) {
        play.stopClock();
        return play.beginShowdown(o);
      },
      leave(o) {
        lens.doLeave(data, o);

        return play.beginLeave();
      },
      join(o) {
        lens.doJoin(data, o);
        return play.beginJoin();
      }
    };
  };
}
