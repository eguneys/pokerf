import Loop from 'loopz';
import MRender from './mrender';
import Play from './play';

export function app(element, config, loop) {

  if (!loop) {
    loop = fn => new Loop(fn, 60).start();
  }

  let mrender = new MRender(element);
  let play = new Play();


  loop(delta => {
    play.update(delta);
    mrender.render(play);
  });

  if (module.hot) {
    module.hot.accept('./play', function() {
      try {
        play = new Play();
      } catch (e) {
        console.log(e);
      }
    });
  }
}
