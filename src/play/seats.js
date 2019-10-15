import * as Vnode from 'mithril/render/vnode';
import * as h from 'mithril/hyperscript';

import Pool from 'poolf';

import { fives } from './seatklass';

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

  let seat,
      props;

  this.init = (opts) => {
    props = fives[opts.seatIndex];
    seat = opts.seat;
  };

  this.update = delta => {
    
  };

  const klass = () => ([
    props.klass,
  ].join(' '));

  const bounds = () => ({
    ...props.position,
    height: '20%',
    width: '10%'
  });

  this.view = () => {
    let content = [];

    if (seat) {
      content.push(h('img', {
        src: seat.img
      }));
    }

    return h('div.seat.' + klass(), {
      style: {
        ...bounds()
      }
    }, content);
  };

}
