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


  this.update = delta => {
    seats.each(_ => _.update(delta));
  };

  this.view = () => {
    return h('div.overlay.seats', seats.map(_ => _.view()));
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

  const bounds = () => ({
    ...props.position,
    height: '20%',
    width: '10%'
  });

  this.view = () => {
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
        ...bounds()
      }
    }, content);
  };

}
