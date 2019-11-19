import * as Vnode from 'mithril/render/vnode';
import * as h from 'mithril/hyperscript';

export default function Cards(play) {

  let flops = [new MiddleCard(this),
               new MiddleCard(this),
               new MiddleCard(this)],
      turn = new MiddleCard(this),
      river = new MiddleCard(this);

  this.init = () => {

    flops.forEach(_ => _.init({}));
    turn.init({});
    river.init({});
  };

  this.update = delta => {
    
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

function MiddleCard(cards) {

  let revealed,
      rank,
      suit;

  this.init = () => {
    revealed = false;
  };


  this.update = delta => {
    
  };

  this.beginReveal = (card) => {
    revealed = true;
    rank = card.rank;
    suit = card.suit;
    return Promise.resolve();
  };


  this.view = () => {
    let klass = '';

    if (revealed) {
      klass += [rank, suit].join('.');
    }
    
    return h('div.card.' + klass);
  };
  
}
