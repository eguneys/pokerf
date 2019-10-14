import * as Vnode from 'mithril/render/vnode';
import * as h from 'mithril/hyperscript';

import * as mu from 'mutilz';
import Pool from 'poolf';
import ipol from '../ipol';
import PMaker from '../pmaker';
import * as V2 from '../vector2';

import * as lens from '../lens';

import { fives } from './seatklass';

export default function Deals(play) {

  let deals = new Pool(() => new Deal(play, deals));
  
  this.init = () => {
    deals.releaseAll();

    let involved = lens.involved(play.data) || [];
    
    involved.forEach(handIndex => {
      deals.acquire(_ => _.init({
        handIndex
      }));
    });
  };

  this.beginDeal = () =>
  deals.reduce((acc, deal) => 
    acc.then(() => deal.beginDeal())
    , Promise.resolve());



  this.update = delta => {
    deals.each(_ => _.update(delta));
  };

  const handStyle = () => ({
    height: '8%',
    width: '3%'
  });
  
  this.view = () => {
      return h('div.overlay.deals', [
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
      ]);
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

  this.init = (opts) => {
    handIndex = opts.handIndex;
    seatIndex = lens.seatIndex(play.data, handIndex);
    props = fives[seatIndex];

    rotate1 = mu.rand(-20, 20);
    rotate2 = mu.rand(-20, 20);

    iDeal1.both(0.0);
    iDeal2.both(0.0);
    shouldDealSecond = false;
  };

  this.update = delta => {
    iDeal1.update(delta * 0.01 * 0.5);
    iDeal2.update(delta * 0.01 * 0.5);

    if (shouldDealSecond && iDeal1.progress() > 0.3) {
      shouldDealSecond = false;
      iDeal2.target(1.0);
    }

    if (!dealAnim.settled()
        && iDeal1.settled(0.2)
        && iDeal2.settled(0.2)) {
      dealAnim.resolve();
    }
  };

  this.beginDeal = () => {
    shouldDealSecond = true;
    iDeal1.both(0.0, 1.0);
    iDeal2.both(0.0);
    return dealAnim.begin();
  };

  const bounds = () => ({
    ...props.position,
    height: '8%',
    width: '3%'
  });

  this.view = () => {
    let klass = props.klass;

    let iRotate1 = rotate1 * iDeal1.value(),
        iRotate2 = rotate2 * iDeal2.value();

    let posBase = props.deal[0],
        posDiff = V2.sub(props.deal[1], props.deal[0]);

    let iPos1 = V2.addScale(posBase, posDiff, iDeal1.value()),
        iPos2 = V2.addScale(posBase, posDiff, iDeal2.value());

    //iPos1 = posBase;
    //iPos2 = V2.addScale(posBase, posDiff, 1);

    return h('div.hand.' + klass, {
      style: {
        ...bounds()
      }
    }, [
      h('div.card.back', {
        style: {
          transform: `rotate(${iRotate1}deg)`,
          top: `${iPos1[0]}%`,
          left: `${iPos1[1]}%`
        }
      }),
      h('div.card.back', {
        style: {
          transform: `rotate(${iRotate2}deg)`,
          top: `${iPos2[0]}%`,
          left: `${iPos2[1]}%`
        }
      })
    ]);
  };
}
