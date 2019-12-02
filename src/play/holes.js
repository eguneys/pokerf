import * as Vnode from 'mithril/render/vnode';
import * as h from 'mithril/hyperscript';

import Pool from 'poolf';

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
          seatIndex: lens.seatIndex(play.data, index),
          ...cards
        }));

      }
    });

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

  let props;

  this.init = (opts) => {

    hole = opts.hole;

    seatIndex = opts.seatIndex;

    props = fives[seatIndex];
  };

  this.update = delta => {
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

  this.view = (tBounds) => {

    let hole1Klass = cardKlass(hole[0]),
        hole2Klass = cardKlass(hole[1]);


    let klass = props.klass;

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
