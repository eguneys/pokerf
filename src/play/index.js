import * as Vnode from 'mithril/render/vnode';
import * as h from 'mithril/hyperscript';

import * as lens from '../lens';
import Game from '../game';

import Colors from './colors';
import Background from './background';
import Seats from './seats';
import Deals from './deals';
import Actions from './actions';
import Pots from './pots';


export default function Play(anims) {

  let colors = this.colors = new Colors(this);

  let background = new Background(this);
  let seats = new Seats(this);
  let deals = new Deals(this);
  let actions = new Actions(this);

  let pots = new Pots(this);

  let game;

  this.init = data => {

    this.data = data;

    game = new Game(lens.fen(data));

    background.init();
    seats.init();
    deals.init();
    actions.init();
    pots.init();
  };

  this.game = () => game;

  this.beginJoin = () => {
    seats.init();
  };

  this.beginLeave = () => {
    seats.init();
  };

  this.beginDeal = (o) => {

    game.doDeal(o);

    actions.init();
    deals.init();
    pots.init();
    return deals.beginDeal();
  };

  this.beginMove = (o) => {
    game.doMove(o);

    return actions.beginMove();    
  };

  this.beginNextTurn = (o) => {
    game.doNextTurn(o);

    return Promise.resolve();
  };

  this.beginNextRound = (o) => {
    game.doNextRound(o);

    return actions.beginCollect()
      .then(pots.beginCollect);
  };

  this.beginClock = (o) => {
    seats.beginClock(o);
  };

  this.update = delta => {
    background.update(delta);
    seats.update(delta);
    deals.update(delta);
    actions.update(delta);
    pots.update(delta);
  };

  this.view = () => {
    return h('div.pokerf',
             [background.view(),
              deals.view(),
              actions.view(),
              pots.view(),
              seats.view()]);
  };
}
