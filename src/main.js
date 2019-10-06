import Loop from 'loopz';
import MRender from './mrender';
import Play from './play';

import { configure } from './config';

import start from './api';

export function app(element, config, loop) {

  if (!loop) {
    loop = fn => new Loop(fn, 60).start();
  }

  let data = {};

  configure(data, config);

  let mrender = new MRender(element);
  let play = new Play();

  play.init(data);


  loop(delta => {
    play.update(delta);
    mrender.render(play.component);
  });

  if (module.hot) {
    module.hot.accept('./play', function() {
      try {
        play = new Play();
        play.init(data);
      } catch (e) {
        console.log(e);
      }
    });
  }

  return start(play, data);
}
