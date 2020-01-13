import * as h from 'mithril/hyperscript';

import OffControls from './meoffcontrols';
import OnControls from './meoncontrols';

export default function MeControls(play) {

  let offControls = new OffControls(play, this),
      onControls = new OnControls(play, this);

  this.init = () => {
    if (play.game().me()) {
      console.log(play.game().toAct(),
                  play.game().meSide());
    }
    if (meOn()) {
      onControls.init();
    } else if (meOff()) {
      offControls.init();
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

    if (meOn()) {
      content.push(...onControls.view());
    } else if (meOff()) {
      content.push(...offControls.view());
    }

    return [h('div.mecontrols', 
              { style: { ...bounds() } }, 
              content)];
  };

}
