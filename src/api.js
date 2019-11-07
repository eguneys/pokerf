import * as lens from './lens';
import { configure } from './config';
import { readMove as fenReadMove } from './fen';

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
        const move = fenReadMove(o.uci);

        o.move = move;

        return play.beginMove(o);
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
