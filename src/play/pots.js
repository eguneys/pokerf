import * as Vnode from 'mithril/render/vnode';
import * as h from 'mithril/hyperscript';

export default function Pots(play) {

  let amount;

  let colBg;

  this.init = () => {

    let game = play.game();

    colBg = play.colors.potBg.copy();

    amount = game.allPotsWager();

  };

  this.beginCollect = () => {
    amount = play.game().allPotsWager();
    return Promise.resolve();
  };

  this.update = delta => {
    
  };

  const bounds = () => ({
    top: '26%',
    left: '50%'
  });
  
  this.view = () => {
    return h('div.overlay.pots', h('div.pot', {
      style: {
        ...bounds()
      }
    }, [h('div.header', {
      style: {
        color: 'white',
        background: colBg.css()
      }
    }, 'P'),
        h('div.amount', amount)
       ]));

  };

}
