import * as h from 'mithril/hyperscript';

export default function MeStatus(play) {

  this.init = () => {
  };

  this.update = delta => {
    
  };

  const status = () => {
    let game = play.game();

    if (game.me()) {
      return game.meStatus();
    } else {
      return null;
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
      }, status())
    ];
  };

}
