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

    let game = play.game();

    actions.releaseAll();

    game.handIndexes().forEach(index => {
      let action = game.lastAction(index);

      if (action) {
        actions.acquire(_ => _.init({
          handIndex: index,
          type: actionklass.Klasses[action.action],
          amount: action.to
        }));
      }
    });
  };

  this.beginMove = () => {
    let game = play.game();
    let toAct = game.toAct();

    let action = game.lastAction(toAct);
    let cAction = actions.find(_ => _.handIndex() === toAct);

    let oAction = {
      handIndex: toAct,
      type: actionklass.Klasses[action.action],
      amount: action.to
    };

    if (cAction) {
      cAction.init(oAction);
    } else {
      cAction = actions.acquire(_ => _.init(oAction));
    }

    return Promise.resolve();
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

  this.handIndex = () => handIndex;

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

    let hideAmount = type.hideAmount;

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
      !hideAmount?h('div.amount', amount):''
    ]);
  };
}
