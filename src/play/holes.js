import * as Vnode from 'mithril/render/vnode';
import * as h from 'mithril/hyperscript';

import { cardEqual } from '../fen2';

import Pool from 'poolf';
import PMaker from '../pmaker';
import Ticker from '../ticker';

import { fives } from './seatklass';

import * as lens from '../lens';

export default function Holes(play) {

  let holes = new Pool(() => new Hole(play, holes));

  this.init = () => {

    holes.releaseAll();
  };

  this.update = delta => {
    holes.each(_ => _.update(delta));
  };

  this.beginReveal = () => {
    const game = play.game();

    let holeCards = game.hands();

    game.handIndexes().forEach(index => {
      let cards = holeCards[index];
      if (cards) {

        holes.acquire(_ => _.init({
          handIndex: index,
          seatIndex: lens.seatIndex(play.data, index),
          ...cards
        }));

      }
    });

  };

  this.beginHighlight = (handIndex, cards) => {

    let cHole = holes.find(_ => _.handIndex === handIndex);

    return cHole.beginHighlight(cards);
  };
  
  this.view = (tBounds) => {
    return [
      ...holes.flatMap(_ => _.view(tBounds))
    ];
  };

}

function Hole(play, pool) {

  let hole;
  
  let seatIndex;
  let handIndex;

  let highlightFirst,
      highlightSecond;

  let props;

  let ticker = new Ticker({ autoStart: false, delay: 1000 });

  const highlightAnim = new PMaker({
    name: 'Reveal Animation'
  });

  this.init = (opts) => {

    hole = opts.hole;

    handIndex = opts.handIndex;
    seatIndex = opts.seatIndex;

    props = fives[seatIndex];

    this.handIndex = handIndex;

    highlightFirst = false;
    highlightSecond = false;

    highlightAnim.reject();
  };

  this.update = delta => {
    ticker.update(delta);
  };

  const bounds = ({ tRatio, cardRatio }) => {
    
    let size = 12;

    let relW = size * cardRatio,
        relH = size * tRatio;

    return {
      ...props.position,
      width: relW + '%',
      height: relH + '%'
    };
  };

  const cardKlass = (card) => {
    return [card.rank, card.suit].join('.');
  };

  this.beginHighlight = (cards) => {

    cards.forEach(card => {
      if (cardEqual(card, hole[0])) {
        highlightFirst = true;
      } else if (cardEqual(card, hole[1])) {
        highlightSecond = true;
      }
    });

    ticker.beginDelay(() => {
      highlightFirst = false;
      highlightSecond = false;

      highlightAnim.resolve();
    });

    return highlightAnim.begin();
  };

  this.view = (tBounds) => {

    let hole1Klass = cardKlass(hole[0]),
        hole2Klass = cardKlass(hole[1]);


    let klass = props.klass;

    if (highlightFirst) {
      hole1Klass += '.glow';
    }
    if (highlightSecond) {
      hole2Klass += '.glow';
    }


    return [
      h('div.hole.card.first.' + klass + '.' + hole1Klass, {
        style: {
          ...bounds(tBounds)
        }
      }),
      h('div.hole.card.second.' + klass + '.' + hole2Klass, {
        style: {
          ...bounds(tBounds)
        }
      })];
  };

}
