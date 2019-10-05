import * as Vnode from 'mithril/render/vnode';
import * as h from 'mithril/hyperscript';

import * as co from 'colourz';

export default function Background(play) {

  let colBg = play.colors.background.copy();

  let colTable = new co.shifter(co.Palette.CelGreen)
      .lum(0.44)
      .alp(0.98)
      .base();

  let tableStyle = {
    top: '10%',
    width: '70%',
    height: '60%',
    background: colTable.css()
  };

  this.update = delta => {
    
  };
  
  this.view = () => {
    return h('.background.overlay', { 
      style: `background: ${colBg.css()};`
    }, [
      h('.bg-table', {
        style: {
          ...tableStyle
        }
      })
    ]);
    
  };

}
