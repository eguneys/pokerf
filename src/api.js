import { configure } from './config';

export default function start(play, data) {
  return {
    set(config) {
      configure(data, config);
    },
    deal(o) {
      return play.deal(o);
    }
  };
}
