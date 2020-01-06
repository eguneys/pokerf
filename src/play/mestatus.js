import * as h from 'mithril/hyperscript';

import * as lens from '../lens';

export default function MeStatus(play) {

  this.init = () => {
  };

  this.update = delta => {
    
  };

  const status = () => {
    let game = play.game();

    if (game.me()) {
      return game.meStatusStr();
    } else {
      return lens.status(play.data);
    }
  };

  const bounds = () => ({
    bottom: '5%',
    left: '50%'
  });
  
  this.view = () => {

    let content;

    return [
      h('div.mestatus', {
        style: {
          ...bounds()
        }
      }, play.trans(status()))
    ];
  };

}
