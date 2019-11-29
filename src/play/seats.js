import * as Vnode from 'mithril/render/vnode';
import * as h from 'mithril/hyperscript';

import Pool from 'poolf';

import { fives } from './seatklass';

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

  let clock = new Clock(play, this);

  this.init = (opts) => {
    seatIndex = opts.seatIndex;
    seat = opts.seat;
    props = fives[seatIndex];

    clock.init({seatIndex});
  };

  this.beginClock = () => {
    clock.init({seatIndex});
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
      content.push(h('img', {
        src: seat.img
      }));
    }

    return h('div.seat.' + klass(), {
      onclick: onSit,
      style: {
        ...bounds(tBounds)
      }
    }, content);
  };

}
