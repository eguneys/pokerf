import * as Vnode from 'mithril/render/vnode';
import * as h from 'mithril/hyperscript';

import * as lens from '../lens';

import Colors from './colors';
import Seats from './seats';
import Deals from './deals';
import Background from './background';

export default function Play() {

  let colors = this.colors = new Colors(this);

  let background = new Background(this);
  let seats = new Seats(this);
  let deals = new Deals(this);

  this.deal = (o) => {

    lens.doDeal(this.data, o);

    return deals.beginDeal();
  };

  this.init = data => {

    this.data = data;

    background.init();
    seats.init();
    deals.init();
  };

  this.update = delta => {
    background.update(delta);
    seats.update(delta);
    deals.update(delta);
  };

  this.view = () => {
    return h('div.pokerf',
             [background.view(),
              deals.view(),
              seats.view()]);
  };
}
