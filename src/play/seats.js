import * as Vnode from 'mithril/render/vnode';
import * as h from 'mithril/hyperscript';

import { fives } from './seatklass';

export default function Seats(play) {

  let data = [
    1,
    2,
    3,
    4,
    5
  ];

  let seats = data.map((_, i) => new Seat(play, _, i));


  let size = () => seats.length;


  this.update = delta => {
    seats.forEach(_ => _.update(delta));
  };

  this.view = () => {

    return h('div.seats.overlay', seats.map(Vnode));

  };

}

function Seat(play, data, seat) {

  let props = fives[seat];

  let klass = props.klass;

  klass += '.empty';

  this.update = delta => {
    
  };

  const bounds = () => ({
    ...props.position,
    height: '20%',
    width: '10%'
  });

  this.view = () => {
    return h('div.seat.' + klass, {
      style: {
        ...bounds()
      }
    });
  };

}
