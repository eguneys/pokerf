import * as h from 'mithril/hyperscript';

import OffControls from './meoffcontrols';
import OnControls from './meoncontrols';

export default function MeControls(play) {

  let offControls = new OffControls(play, this),
      onControls = new OnControls(play, this);

  this.init = () => {

  };

  this.update = delta => {};

  const meInvolved = () => play.game().meInvolved();
  const meTurn = () => play.game().meTurn();

  const meOn = () => meInvolved() && meTurn();
  const meOff = () => meInvolved() && !meTurn();
  
  this.view = () => {
    let content = [];

    if (meOn()) {
      content.push(onControls.view());
    } else if (meOff()) {
      content.push(offControls.view());
    }

    return [h('div.mecontrols', content)];
  };

}
