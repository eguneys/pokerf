import * as Vnode from 'mithril/render/vnode';
import * as h from 'mithril/hyperscript';

import * as mu from 'mutilz';
import Pool from 'poolf';
import ipol from '../ipol';
import PMaker from '../pmaker';
import * as V2 from '../vector2';

import * as lens from '../lens';

import { fives } from './seatklass';

const handStyle = () => ({
  height: '8%',
  width: '3%'
});

export default function Deals(play) {

  let deals = new Pool(() => new Deal(play, deals));

  let button = new Button(play);
  
  this.init = () => {
    let game = play.game();

    button.init({button: game.button()});

    deals.releaseAll();

    let involved = game.allInvolved();

    involved.forEach(handIndex => {
      deals.acquire(_ => _.init({
        handIndex
      }));
    });
  };

  this.beginDeal = () =>
  deals.reduce((acc, deal) => {
    deal.preBeginDeal();
    return acc.then(() => deal.beginDeal());
  } , Promise.resolve());



  this.update = delta => {
    deals.each(_ => _.update(delta));
  };

  this.view = () => {
    return [
      button.view(),
      h('div.hand.dealer', {
        style: {
          ...handStyle()
        }
      },[
        h('div.card.back'),
        h('div.card.back'),
        h('div.card.back')
      ]),
      ...deals.map(_ => _.view())
    ];
  };

}

function Deal(play, pool) {

  const dealAnim = new PMaker({
    name: "Deal Animation"
  });

  const iDeal1 = new ipol(0.0),
        iDeal2 = new ipol(0.0);
  let shouldDealSecond = false;

  let rotate1,
      rotate2;

  let props;

  let seatIndex,
      handIndex;

  let speed = 0.8;

  this.init = (opts) => {
    handIndex = opts.handIndex;
    seatIndex = lens.seatIndex(play.data, handIndex);
    props = fives[seatIndex];

    rotate1 = mu.rand(-20, 20);
    rotate2 = mu.rand(-20, 20);

    iDeal1.both(1.0);
    iDeal2.both(1.0);
    shouldDealSecond = false;

    dealAnim.reject();
  };

  const updateDeal = (delta) => {

    iDeal1.update(delta * 0.01 * speed);
    iDeal2.update(delta * 0.01 * speed);

    if (shouldDealSecond && iDeal1.progress() > 0.3) {
      shouldDealSecond = false;
      iDeal2.target(1.0);
    }

    if (!dealAnim.settled()
        && iDeal1.settled(0.8)
        && iDeal2.settled(0.8)) {
      dealAnim.resolve();
    }
  };

  const maybeFold = (delta) => {

    let game = play.game();

    let allInvolved = game.allInvolved();

    if (!allInvolved.includes(handIndex)) {
      pool.release(this);
    }
  };

  this.update = delta => {
    maybeFold(delta);
    updateDeal(delta);
  };

  this.preBeginDeal = () => {
    iDeal1.both(0.0);
    iDeal2.both(0.0);
  };

  this.beginDeal = () => {
    shouldDealSecond = true;
    iDeal1.both(0.0, 1.0);
    iDeal2.both(0.0);
    return dealAnim.begin();
  };

  const bounds = () => ({
    ...props.position,
    ...handStyle()
  });

  this.view = () => {
    let klass = props.klass;

    let iOpacity1 = iDeal1.value(),
        iOpacity2 = iDeal2.value();

    let iRotate1 = rotate1 * iDeal1.value(),
        iRotate2 = rotate2 * iDeal2.value();

    let posBase = props.deal[0],
        posDiff = V2.sub(props.deal[1], props.deal[0]);

    let iPos1 = V2.addScale(posBase, posDiff, iDeal1.value()),
        iPos2 = V2.addScale(posBase, posDiff, iDeal2.value());

    // iPos1 = posBase;
    // iPos2 = V2.addScale(posBase, posDiff, 1);

    return h('div.hand.' + klass, {
      style: {
        ...bounds(),
        transform: props.deal.transform
      }
    }, [
      h('div.card.back', {
        style: {
          opacity: `${iOpacity1}`,
          transform: `rotate(${iRotate1}deg)`,
          top: `${iPos1[0]}%`,
          left: `${iPos1[1]}%`
        }
      }),
      h('div.card.back', {
        style: {
          opacity: `${iOpacity2}`,
          transform: `rotate(${iRotate2}deg)`,
          top: `${iPos2[0]}%`,
          left: `${iPos2[1]}%`
        }
      })
    ]);
  };
}


function Button(play) {

  let button,
      seatIndex;

  let props;
  
  this.init = (opts) => {
    button = opts.button;
    seatIndex = lens.seatIndex(play.data, button);

    props = fives[seatIndex];
  };

  this.update = delta => {
  };

  const bounds = () => ({
    top: `${props.button[0][0]}%`,
    left: `${props.button[0][1]}%`
  });
  
  this.view = () => {
    let klass = props.klass;

    return h('div.button.' + klass, {
      style: { ...bounds() }
    }, 'B');
  };

}
