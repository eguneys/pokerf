import * as h from 'mithril/hyperscript';

import { cardEqual } from '../fen2';

import * as lens from '../lens';
import Game from '../game';

import Colors from './colors';
import Background from './background';
import Seats from './seats';
import Deals from './deals';
import Actions from './actions';
import Pots from './pots';
import Cards from './cards';
import Holes from './holes';
import RankMessage from './rankmessage';

import MeStatus from './mestatus';

import MeControls from './mecontrols';

export default function Play(anims) {

  let colors = this.colors = new Colors(this);

  let background = new Background(this);
  let seats = new Seats(this);
  let deals = new Deals(this);
  let actions = new Actions(this);

  let pots = new Pots(this);
  let cards = new Cards(this);
  let holes = new Holes(this);
  let rankMessage = new RankMessage(this);

  let meStatus = new MeStatus(this);
  let meControls = new MeControls(this);

  let game;

  this.init = data => {

    this.data = data;

    game = new Game(lens.fen(data), lens.me(data));

    background.init();
    seats.init();
    deals.init();
    actions.init();
    pots.init();
    cards.init();
    holes.init();
    rankMessage.init();
    meStatus.init();
    meControls.init();
  };

  this.game = () => game;

  this.beginJoin = () => {
    seats.init();
  };

  this.beginLeave = () => {
    seats.init();
  };

  this.beginDeal = (data) => {

    this.init(data);

    return deals.beginDeal();
  };

  this.beginMove = (o) => {
    let { prevToAct } = game.doMove(o);

    seats.updateStack(prevToAct);

    return actions.beginMove();
  };

  this.updateStack = (stackIndex) => {
    seats.updateStack(stackIndex);
  };

  this.addStack = (stackIndex, amount) => {
    seats.addStack(stackIndex, amount);
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
      .then(pots.beginDistribute(false));
  };

  this.beginShowdown = (o) => {
    game.doShowdown(o);

    return actions.beginCollect()
      .then(pots.beginCollect)
      .then(holes.beginReveal)
      .then(cards.beginReveal)
      .then(pots.beginDistribute(true));
  };

  this.beginRankMessage = (involved) => {
    let hands = game.hands();

    let { rank } = hands[involved[0]];

    return rankMessage.beginShow(rank);
  };

  this.beginHighlightCards = (involved) => {

    let middle = game.middle();
    let hands = game.hands();

    return Promise.all(involved.map(i => {
      let { hole, hand } = hands[i];

      return Promise.all([
        cards.beginHighlight(hand),
        holes.beginHighlight(i, hand)
      ]);      
    }));
  };

  this.beginClock = (o) => {
    seats.beginClock(o);
  };

  this.stopClock = () => {
    seats.stopClock();
  };

  this.update = delta => {
    background.update(delta);
    seats.update(delta);
    deals.update(delta);
    actions.update(delta);
    pots.update(delta);
    cards.update(delta);
    holes.update(delta);
    rankMessage.update(delta);
    meStatus.update(delta);
    meControls.update(delta);
  };

  const tableStyle = () => ({
    top: '10%',
    left: '10%',
    width: '80%',
    height: '70%'
  });

  this.view = (bounds) => {
    let tWidth = bounds.width * 0.8,
        tHeight = bounds.height * 0.7;

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
        ...seats.view(tBounds),
        ...deals.view(),
        ...cards.view(tBounds),
        ...holes.view(tBounds),
        ...rankMessage.view(),
        ...actions.view(),
        ...pots.view()]),

      ...meStatus.view(),
      ...meControls.view()
    ]);
  };
}
