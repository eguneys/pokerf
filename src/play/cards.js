import * as Vnode from 'mithril/render/vnode';
import * as h from 'mithril/hyperscript';

import * as cardKlass from './cardklass';

import Pool from 'poolf';
import ipol from '../ipol';
import PMaker from '../pmaker';
import Ticker from '../ticker';
import * as V2 from '../vector2';

export default function Cards(play) {

  let flops = [new MiddleCard(this, cardKlass.Flop1()),
               new MiddleCard(this, cardKlass.Flop2()),
               new MiddleCard(this, cardKlass.Flop3())],
      turn = new MiddleCard(this, cardKlass.Turn()),
      river = new MiddleCard(this, cardKlass.River());

  const all = [
    ...flops,
    turn,
    river
  ];

  this.init = () => {

    flops.forEach(_ => _.init({}));
    turn.init({});
    river.init({});
  };

  this.update = delta => {
    flops.forEach(_ => _.update(delta));
    turn.update(delta);
    river.update(delta);
  };

  this.beginReveal = () => {
    const game = play.game();

    let flopCards = game.flopCards(),
        turnCard = game.turnCard(),
        riverCard = game.riverCard();

    let lp = Promise.resolve();

    if (flopCards) {
      lp = lp.then(() => Promise.all(flops.map((_, i) => 
        _.beginReveal(flopCards[i])
      )));
    }
    if (turnCard) {
      lp = lp.then(() => turn.beginReveal(turnCard));
    }
    if (riverCard) {
      lp = lp.then(() => river.beginReveal(riverCard));
    }

    return lp;
  };

  this.beginHighlight = (hand) => {

    hand.forEach(h => 
      all.filter(_ => _.cardEqual(h))
        .forEach(_ => _.beginHighlight()));
    
    return Promise.resolve();
  };
  
  this.view = (tBounds) => {
    return [
      ...flops.map(_ => _.view(tBounds)),
      turn.view(tBounds),
      river.view(tBounds)
    ];
  };

}

function MiddleCard(cards, cardKlass) {

  let delay = cardKlass.delay || 1000;

  let revealed,
      highlighted,
      rank,
      suit,
      hash;

  let ticker = new Ticker({ autoStart: false, delay });

  const revealAnim = new PMaker({
    name: 'Reveal Animation'
  });

  const highlightAnim = new PMaker({
    name: 'Highlight Animation'
  });

  this.init = () => {
    revealed = false;

    highlighted = false;

    hash = undefined;
    rank = undefined;
    suit = undefined;

    ticker.stop();

    revealAnim.reject();
    highlightAnim.reject();
  };


  this.update = delta => {
    ticker.update(delta);
  };

  this.beginReveal = (card) => {
    if (revealed) {
      return Promise.resolve();
    }
    hash = card.hash;
    rank = card.rank;
    suit = card.suit;
    ticker.beginDelay(() => {
      revealed = true;
      revealAnim.resolve();
    });
    return revealAnim.begin();
  };

  this.beginHighlight = () => {
    highlighted = true;

    ticker.beginDelay(() => {
      highlighted = false;
      highlightAnim.resolve();
    });

    return highlightAnim.begin();
  };

  this.cardEqual = (hand) => {
    return hash === hand.hash;
  };

  const borders = ({ tRatio, cardRatio }) => {

    let size = 14;

    let relW = size * cardRatio,
        relH = size * tRatio;

    return {
      ...cardKlass.position,
      height: relH + '%',
      width: relW + '%'
    };
  };


  this.view = (tBounds) => {

    let klass = highlighted?'glow':'';

    if (revealed) {
      klass += '.' + [rank, suit].join('.');
    }
    
    return h('div.middle.card.' + cardKlass.klass + '.' + klass, {
      style: { ...borders(tBounds) }
    });
  };
  
}
