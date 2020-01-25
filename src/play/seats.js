import * as Vnode from 'mithril/render/vnode';
import * as h from 'mithril/hyperscript';

import Pool from 'poolf';

import Clock from './clock';

import * as u from '../util';
import * as lens from '../lens';

export default function Seats(play) {

  let seats = new Pool(() => new Seat(play));

  this.init = (data) => {

    seats.releaseAll();

    lens.seats(play.data)
      .forEach((seat, seatIndex) => {
        seats.acquire(_ => _.init({
          seatIndex,
          seat 
        }));
      });

  };

  let size = () => seats.length;


  this.beginClock = (clock) => {
    seats.each(_ => _.beginClock(clock));
  };

  this.stopClock = () => {
    seats.each(_ => _.stopClock());
  };

  this.updateStack = (stackIndex) => {
    seats
      .find(_ => _.handIndex === stackIndex)
      .updateStack();
  };

  this.addStack = (stackIndex, amount) => {
    seats.find(_ => _.handIndex === stackIndex)
      .addStack(amount);
  };

  this.update = delta => {
    seats.each(_ => _.update(delta));
  };

  this.view = (tBounds) => {
    return seats.map(_ => _.view(tBounds));
  };

}

function Seat(play) {

  let seatIndex,
      seat,
      props;

  let handIndex;

  let stack;

  let clock = new Clock(play, this);

  this.init = (opts) => {
    seatIndex = opts.seatIndex;
    seat = opts.seat;

    props = play.povProp(seatIndex);

    clock.init({seatIndex});

    handIndex = this.handIndex = lens.handIndex(play.data, seatIndex);

    this.updateStack();
  };

  this.updateStack = () => {
    let game = play.game();

    if (handIndex !== -1) {
      stack = game.stack(handIndex);
    }
  };

  this.addStack = (amount) => {
    stack += amount;
  };

  this.beginClock = () => {
    clock.init({seatIndex});
  };

  this.stopClock = () => {
    clock.hide();
  };

  this.update = delta => {
    clock.update(delta);
  };

  const empty = () => !seat;

  const onSit = () => {
    if (empty()) {
      u.callUserFunction(lens.eventSit(play.data), seatIndex);
    }
  };

  const klass = () => ([
    props.klass,
    empty()?'.empty':''
  ].join(' '));

  const bounds = (tBounds) => {

    let size = 16;

    let relW = size,
        relH = size * tBounds.tRatio;

    return {
      ...props.position,
      height: relH + '%',
      width: relW + '%'
    };
  };

  this.view = (tBounds) => {
    let content = [
      clock.view()
    ];

    if (!empty()) {
      content.push(h('span.name', seat.name));

      content.push(h('img', {
        src: seat.img
      }));

      if (handIndex !== -1) {
        content.push(h('div.stack', lens.formatChips(play.data, stack)));
      }
    }
    
    return h('div.seat.' + klass(), {
      onclick: onSit,
      style: {
        ...bounds(tBounds)
      }
    }, content);
  };

}
