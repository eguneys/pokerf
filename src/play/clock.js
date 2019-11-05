import * as Vnode from 'mithril/render/vnode';
import * as h from 'mithril/hyperscript';

import * as u from '../util';
import * as lens from '../lens';

export default function Clock(play) {

  let seatIndex;

  let running,
      initial,
      times,
      millis;

  let barTime,
      emergMs;

  this.init = (opts) => {
    seatIndex = opts.seatIndex;

    let clockOpts = lens.clock(play.data);

    running = clockOpts.running;
    initial = clockOpts.initial;
    times = clockOpts.times * 1000;
    millis = times;

    barTime = 1000 * initial;
    emergMs = 1000 * Math.min(60, Math.max(10, initial * .125));
  };

  const nextToActAndRunning = () => {
    let game = play.game();

    let nextToAct = game.toAct() === lens.handIndex(play.data, seatIndex);
    
    return nextToAct && running;
  };

  const timeRatio = () => {

    let timeRatioDivisor = 1 / barTime;

    return Math.min(1, millis * timeRatioDivisor);
  };

  const onFlag = () => {
    u.callUserFunction(lens.eventFlag(play.data));
  };

  const tick = delta => {
    let lastMillis = millis;
    millis = Math.max(0, millis - delta);

    if (lastMillis > 0 && millis === 0) {
      onFlag();
    }
  };

  const maybeTick = (delta) => {
    if (nextToActAndRunning()) {
      tick(delta);
    }
  };

  this.update = delta => {
    maybeTick(delta);
  };

  this.view = () => {

    let klass = nextToActAndRunning()?'':'.hidden';

    let barKlass = (millis<emergMs)?'emerg':'';

    return h('div.timer' + klass, [
      h('svg', {
        viewBox: '0 0 40 40'
      }, [
        h('circle.border', {
          cx: 20,
          cy: 20,
          r: 18,
          fill: 'none'
        }),
        h('circle.bar.' + barKlass, {
          cx: 20,
          cy: 20,
          r: 18,
          fill: 'none',
          style: {
            'stroke-dasharray': '113px',
            'stroke-dashoffset': timeRatio(millis) * 283 + '%'
          }
        })
      ])
    ]);
  };

}
