import * as Vnode from 'mithril/render/vnode';
import * as h from 'mithril/hyperscript';

import Colors from './colors';
import Seats from './seats';
import Deals from './deals';
import Background from './background';

export default function Play() {

  let colors = this.colors = new Colors(this);

  let background = new Background(this);
  let seats = new Seats(this);
  let deals = new Deals(this);

  this.update = delta => {
    background.update(delta);
    seats.update(delta);
  };
  
  this.view = () => {

    return h('div.pokerf',
             [Vnode(background),
              Vnode(deals),
              Vnode(seats)]);

  };
  
}
