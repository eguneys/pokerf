import * as h from 'mithril/hyperscript';

import * as u from '../util';
import * as lens from '../lens';

export default function MeSideControls(play) {

  let sitoutNextHand;

  this.init = () => {
    sitoutNextHand = false;
  };

  this.update = delta => {
    
  };

  const onSitoutNextHand = () => {
    u.callUserFunction(lens.eventSitoutNextHand(play.data), sitoutNextHand);
  };
  
  const bounds = () => ({
    width: '36%',
    height: '10%',
    bottom: '2%',
    left: '1.2%'
  });

  this.view = () => {
    let content = [];

    content.push(h('div', [
      h('label.melabel', {},
        [
          h('input', { type: 'checkbox', checked: sitoutNextHand,
                       onclick: (e) => {
                         sitoutNextHand = !sitoutNextHand;
                         onSitoutNextHand();
                       }
                     }),
          play.trans('Sit out next hand')])
    ]));

    return [h('div.mesidecontrols', 
              { style: { ...bounds() } }, 
              content)];    
  };

}
