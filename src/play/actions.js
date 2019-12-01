import * as Vnode from 'mithril/render/vnode';
import * as h from 'mithril/hyperscript';

import * as mu from 'mutilz';
import Pool from 'poolf';
import ipol from '../ipol';
import PMaker from '../pmaker';
import * as V2 from '../vector2';

import * as u from '../util';
import * as lens from '../lens';
import { fives } from './seatklass';
import * as actionklass from './actionklass';

export default function Actions(play) {

  let actions = new Pool(() => new Action(play, actions));

  this.init = () => {

    let game = play.game();

    actions.releaseAll();

    if (!game.playing()) {
      return;
    }

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

  this.beginCollect = () => {
    let ps = [];
    actions.each(_ => ps.push(_.beginCollect()));
    return Promise.all(ps);
  };

  this.update = delta => {
    actions.each(_ => _.update(delta));
  };
  
  this.view = () => {
    return actions.map(_ => _.view());
  };
}

function Action(play, pool) {

  let props;
  
  let seatIndex,
      handIndex;

  let amount,
      type;

  let colBg;

  const collectAnim = new PMaker({
    name: 'Collect Animation'
  });

  const iCollect = new ipol(0.0);

  let speed = 0.2;

  this.init = (opts) => {
    amount = opts.amount;
    type = opts.type;
    handIndex = opts.handIndex;
    seatIndex = lens.seatIndex(play.data, handIndex);
    props = fives[seatIndex];

    colBg = type.colors.background.copy();

    iCollect.both(0.0);

    collectAnim.reject();
  };

  this.handIndex = () => handIndex;

  this.update = delta => {
    iCollect.update(delta * 0.01 * speed);

    if (!collectAnim.settled()
        && iCollect.settled(0.8)) {
      pool.release(this);
      collectAnim.resolve();
    }
  };

  this.beginCollect = () => {
    iCollect.target(1.0);
    return collectAnim.begin();
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

    let posBase = props.action[0],
        posDiff = V2.sub(props.action[1], props.action[0]);

    let iPos = V2.addScale(posBase, posDiff, iCollect.value());

    let iOpacity = 0.4 + 0.6 - 0.6 * iCollect.value();

    let hideAmount = type.hideAmount;

    return h('div.action.' + klass, {
      style: {
        ...bounds(),
        top: `${iPos[0]}%`,
        left: `${iPos[1]}%`,
        opacity: iOpacity
      }
    }, [
      h('div.header', {
        style: {
          ...colors()
        }
      }, type.header),
      !hideAmount?h('div.amount', u.formatChips(amount)):''
    ]);
  };
}
