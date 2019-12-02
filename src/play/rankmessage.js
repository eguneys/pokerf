import * as Vnode from 'mithril/render/vnode';
import * as h from 'mithril/hyperscript';

import PMaker from '../pmaker';
import Ticker from '../ticker';

export default function RankMessage(play) {

  let message;

  let ticker = new Ticker({ autoStart: false, delay: 2000 });

  const showAnim = new PMaker({
    name: 'Rank Message Animation'
  });

  this.init = () => {
    message = undefined;
    ticker.stop();
    showAnim.reject();
  };

  this.update = delta => {
    ticker.update(delta);
  };

  this.beginShow = (msg) => {
    message = msg;

    ticker.beginDelay(() => {
      showAnim.resolve();
    });

    return showAnim.begin();
  };

  const bounds = () => ({
    top: '36%',
    left: '50%'
  });
  
  this.view = () => {

    let klass = message ? '':'.hidden';

    return [h('div.rankmessage' + klass, {
      style: {
        ...bounds()
      }
    }, message)];

  };

}
