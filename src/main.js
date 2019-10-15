import Loop from 'loopz';
import MRender from './mrender';
import Play from './play';

import { configure } from './config';

import Start from './api';

export function app(element, config, loop) {

  if (!loop) {
    loop = fn => new Loop(fn, 60).start();
  }

  let data = {
    events: {}
  };

  configure(data, config);

  let mrender = new MRender(element);
  let play = new Play();
  let start = new Start(data, play);

  play.init(data);


  loop(delta => {
    play.update(delta);
    mrender.render(play.view());
  });

  if (module.hot) {
    module.hot.accept('./play', function() {
      try {
        play = new Play();
        play.init(data);
        start.play(play);

      } catch (e) {
        console.log(e);
      }
    });
  }

  return start.api();
}
