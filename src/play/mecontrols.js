import * as h from 'mithril/hyperscript';

import OffControls from './meoffcontrols';
import OnControls from './meoncontrols';

export default function MeControls(play) {

  let offControls = new OffControls(play, this),
      onControls = new OnControls(play, this);

  let currentControls;

  this.init = () => {
    currentControls = null;
    if (meOn()) {
      currentControls = onControls;
    } else if (meOff()) {
      currentControls = offControls;
    }
    if (currentControls) {
      currentControls.init();
    }
  };

  this.update = delta => {
    onControls.update(delta);
    offControls.update(delta);
  };

  const meInvolved = () => play.game().meInvolved();
  const meTurn = () => play.game().meTurn();

  const meOn = () => meInvolved() && meTurn();
  const meOff = () => meInvolved() && !meTurn();
  

  const bounds = () => ({
    width: '36%',
    height: '10%',
    bottom: '2%',
    right: '1.2%'
  });

  this.view = () => {
    let content = [];

    if (currentControls) {
      content.push(currentControls.view());
    }

    return [h('div.mecontrols', 
              { style: { ...bounds() } }, 
              content)];
  };

}
