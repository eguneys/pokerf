import * as Vnode from 'mithril/render/vnode';
import * as h from 'mithril/hyperscript';

import Pool from 'poolf';
import ipol from '../ipol';
import PMaker from '../pmaker';
import Ticker from '../ticker';
import * as V2 from '../vector2';

export default function Cards(play) {

  let flops = [new MiddleCard(this, 1000),
               new MiddleCard(this, 1000),
               new MiddleCard(this, 1000)],
      turn = new MiddleCard(this),
      river = new MiddleCard(this);

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
  
  this.view = () => {
    return h('div.overlay.cards', [
      h('div.middle', [
        ...flops.map(_ => _.view()),
        turn.view(),
        river.view()
      ])
    ]);
  };

}

function MiddleCard(cards, delay = 1500) {

  let revealed,
      rank,
      suit;

  let ticker = new Ticker({ autoStart: false, delay });

  const revealAnim = new PMaker({
    name: 'Reveal Animation'
  });

  this.init = () => {
    revealed = false;

    revealAnim.reject();
  };


  this.update = delta => {
    ticker.update(delta);
  };

  this.beginReveal = (card) => {
    rank = card.rank;
    suit = card.suit;
    ticker.beginDelay(() => {
      revealed = true;
      revealAnim.resolve();
    });
    return revealAnim.begin();
  };


  this.view = () => {
    let klass = '';

    if (revealed) {
      klass += [rank, suit].join('.');
    }
    
    return h('div.card.' + klass);
  };
  
}
