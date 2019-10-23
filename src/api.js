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
      deal(o) {
        lens.doDeal(data, o);

        return play.beginDeal(o);
      },
      move(uci) {
        const move = fenReadMove(uci);
        lens.doMove(data, move);

        return play.beginMove();
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
