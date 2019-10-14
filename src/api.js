import * as lens from './lens';
import { configure } from './config';

export default function Start(data, play) {

  this.play = (_) => play = _;

  this.api = () => {
    return {
      set(config) {
        configure(data, config);
      },
      deal(o) {
        lens.doDeal(data, o);

        return play.beginDeal();
      }
    };
  };
}
