import * as Vnode from 'mithril/render/vnode';
import * as h from 'mithril/hyperscript';

import Pool from 'poolf';
import * as lens from '../lens';

import { fives } from './seatklass';

export default function Deals(play) {

  let deals = new Pool(() => new Deal(play, deals));

  this.init = data => {};

  this.beginDeal = () => {

    let involved = lens.involved(play.data);

    deals.releaseAll();

    involved.forEach(handIndex => {
      let seatIndex = lens.seatIndex(play.data, handIndex);

      deals.acquire(_ => _.init({
        seatIndex,
        handIndex
      }));
    });
  };

  this.update = delta => {
    deals.each(_ => _.update(delta));
  };
  
  this.view = () => {
      return h('div.overlay.deals', [
        h('div.hand.dealer', [
          h('div.card.back'),
          h('div.card.back'),
          h('div.card.back')
        ]),
        ...deals.map(_ => _.view())
      ]);
  };

}

function Deal(play, pool) {

  let props;

  let seatIndex,
      handIndex;

  this.init = (opts) => {

    seatIndex = opts.seatIndex;
    handIndex = opts.handIndex;

    props = fives[seatIndex];
  };

  this.update = delta => {
    
  };

  const bounds = () => ({
  });

  this.view = () => {
    let klass = props.klass;

    return h('div.hand.' + klass, {
      style: {
        ...bounds()
      }
    }, [
      h('div.card.back'),
      h('div.card.back')
    ]);
  };
}
