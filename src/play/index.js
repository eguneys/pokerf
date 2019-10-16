import * as Vnode from 'mithril/render/vnode';
import * as h from 'mithril/hyperscript';

import * as lens from '../lens';

import Colors from './colors';
import Background from './background';
import Seats from './seats';
import Deals from './deals';
import Actions from './actions';


export default function Play(anims) {

  let colors = this.colors = new Colors(this);

  let background = new Background(this);
  let seats = new Seats(this);
  let deals = new Deals(this);
  let actions = new Actions(this);

  this.init = data => {

    this.data = data;

    background.init();
    seats.init();
    deals.init();
    actions.init();
  };

  this.beginJoin = () => {
    seats.init();
  };

  this.beginLeave = () => {
    seats.init();
  };

  this.beginDeal = () => {
    actions.init();
    deals.init();
    return deals.beginDeal();
  };

  this.update = delta => {
    background.update(delta);
    seats.update(delta);
    deals.update(delta);
    actions.update(delta);
  };

  this.view = () => {
    return h('div.pokerf',
             [background.view(),
              deals.view(),
              actions.view(),
              seats.view()]);
  };
}
