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
import Cards from './cards';


export default function Play(anims) {

  let colors = this.colors = new Colors(this);

  let background = new Background(this);
  let seats = new Seats(this);
  let deals = new Deals(this);
  let actions = new Actions(this);

  let pots = new Pots(this);

  let cards = new Cards(this);

  let game;

  this.init = data => {

    this.data = data;

    game = new Game(lens.fen(data));

    background.init();
    seats.init();
    deals.init();
    actions.init();
    pots.init();
    cards.init();
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
    cards.init();
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
      .then(pots.beginCollect)
      .then(cards.beginReveal);
  };

  this.beginOneWin = (o) => {
    game.doOneWin(o);

    return actions.beginCollect()
      .then(pots.beginCollect)
      .then(pots.beginDistribute);
  };

  this.beginShowdown = (o) => {
    game.doShowdown(o);

    return actions.beginCollect()
      .then(pots.beginCollect)
      .then(cards.beginReveal)
      .then(pots.beginDistribute);
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
    cards.update(delta);
  };

  const tableStyle = () => ({
    top: '10%',
    left: '10%',
    width: '80%',
    height: '70%'
  });

  this.view = () => {
    let tWidth = 10 * 0.8,
        tHeight = 6 * 0.7;

    let tRatio = tWidth / tHeight;

    let cardWidth = 63,
        cardHeight = 88,
        cardRatio = cardWidth / cardHeight;

    let tBounds = { tRatio, cardRatio };

    return h('div.pokerf', [
      ...background.pokerView(),
      h('div.table', {
        style: tableStyle()
      }, [
        ...background.view(),
        ...seats.view(),
        ...deals.view(),
        ...cards.view(tBounds),
        ...actions.view(),
        ...pots.view()])
    ]);
  };
}
