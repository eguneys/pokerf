import * as Vnode from 'mithril/render/vnode';
import * as h from 'mithril/hyperscript';

import Pool from 'poolf';
import ipol from '../ipol';
import PMaker from '../pmaker';
import * as V2 from '../vector2';

import * as lens from '../lens';

import { fives } from './seatklass';

export default function Pots(play) {

  let amount;

  let colBg;

  let pots = new Pool(() => new PotDistribution(play, pots));

  this.init = () => {
    colBg = play.colors.potBg.copy();

    let game = play.game();

    pots.releaseAll();

    if (!game.playing()) {
      amount = 0;
      return;
    }

    amount = game.allPotsWager();

  };

  this.beginCollect = () => {
    amount = play.game().allPotsWager();
    return Promise.resolve();
  };

  this.beginDistribute = () => {

    pots.releaseAll();

    let winners = play.game().winners();

    winners.reduce((acc, winners) => {
      let { wager, involved } = winners;

      let distAmount = wager / involved.length;

      let cPots = involved.map(i => pots.acquire(_ => _.init({
        seatIndex: lens.seatIndex(play.data, i),
        amount: distAmount
      })));
      
      return acc.then(() => {
        amount -= distAmount;
        return Promise.all(cPots.map(_ => _.beginDistribute()));
      });
    }, Promise.resolve());

  };

  this.update = delta => {
    pots.each(_ => _.update(delta));
  };

  const bounds = () => ({
    top: '26%',
    left: '50%'
  });
  
  this.view = () => {

    let potContent;
    
    if (amount > 0) {
      potContent = h('div.pot', {
        style: {
          ...bounds()
        }
      }, [h('div.header', {
        style: {
          color: 'white',
          background: colBg.css()
        }
      }, 'P'),
          h('div.amount', amount)
         ]);
    }

    return [...pots.map(_ => _.view()), potContent];

  };
}

function PotDistribution(play, pool) {

  let colBg;

  let amount;
  let seatIndex;

  let props;

  const distAnim = new PMaker({
    name: 'Pot Distribute Animation'
  });

  const iDistribute = new ipol(0.0);

  let speed = 0.1;

  this.init = (opts) => {
    colBg = play.colors.potBg.copy();

    amount = opts.amount;

    seatIndex = opts.seatIndex;

    props = fives[seatIndex];


    iDistribute.both(0.0);
    distAnim.reject();
  };

  this.beginDistribute = () => {
    iDistribute.target(1.0);
    return distAnim.begin();
  };


  this.update = delta => {
    iDistribute.update(delta * 0.01 * speed);

    if (!distAnim.settled()
        && iDistribute.settled(0.8)) {
      pool.release(this);
      distAnim.resolve();
    }

  };


  const bounds = () => ({
    top: '26%',
    left: '50%'
  });

  this.view = () => {

    let posBase = props.action[1],
        posDiff = V2.sub(props.action[0], props.action[1]);

    let iPos = V2.addScale(posBase, posDiff, iDistribute.value());

    return h('div.pot', {
      style: {
        top: `${iPos[0]}%`,
        left: `${iPos[1]}%`
      }
    }, [h('div.header', {
      style: {
        color: 'white',
        background: colBg.css()
      }
    }, 'P'),
        h('div.amount', amount)
       ]);    
  };
  
}
