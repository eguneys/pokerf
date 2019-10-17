import * as Vnode from 'mithril/render/vnode';
import * as h from 'mithril/hyperscript';

import * as mu from 'mutilz';
import Pool from 'poolf';
import ipol from '../ipol';
import PMaker from '../pmaker';
import * as V2 from '../vector2';

import * as lens from '../lens';

import { fives } from './seatklass';
import * as actionklass from './actionklass';

export default function Actions(play) {

  let actions = new Pool(() => new Action(play, actions));

  this.init = () => {

    actions.releaseAll();
    if (lens.blindsPosted(play.data)) {
      let bigBlind = lens.blinds(play.data),
          smallBlind = bigBlind / 2;

      let smallBlindHIndex = lens.smallBlind(play.data),
          bigBlindHIndex = lens.bigBlind(play.data);

      actions.acquire(_ => _.init({
        handIndex: smallBlindHIndex,
        type: actionklass.SmallBlind(),
        amount: smallBlind
      }));
      actions.acquire(_ => _.init({
        handIndex: bigBlindHIndex,
        type: actionklass.BigBlind(),
        amount: bigBlind
      }));
    }
    
  };

  this.update = delta => {
    actions.each(_ => _.update(delta));
  };
  
  this.view = () => {
    return h('div.overlay.actions', [
      ...actions.map(_ => _.view())
    ]);    
  };
}

function Action(play, pool) {

  let props;
  
  let seatIndex,
      handIndex;

  let amount,
      type;

  let colBg;

  this.init = (opts) => {
    amount = opts.amount;
    type = opts.type;
    handIndex = opts.handIndex;
    seatIndex = lens.seatIndex(play.data, handIndex);
    props = fives[seatIndex];

    colBg = type.colors.background.copy();
  };

  this.update = delta => {
  };

  const bounds = () => ({
    ...props.position
  });

  const colors = () => ({
    color: 'white',
    background: colBg.css()
  });

  this.view = () => {
    let klass = props.klass;

    klass += '.' + type.klass;

    let posBase = props.action[0];

    return h('div.action.' + klass, {
      style: {
        ...bounds(),
        top: `${posBase[0]}%`,
        left: `${posBase[1]}%`
      }
    }, [
      h('div.header', {
        style: {
          ...colors()
        }
      }, type.header),
      amount?h('div.amount', amount):''
    ]);
  };
}
