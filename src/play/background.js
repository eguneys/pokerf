import * as Vnode from 'mithril/render/vnode';
import * as h from 'mithril/hyperscript';

import * as co from 'colourz';

export default function Background(play) {

  let colBg;
  let colTable;

  this.init = () => {
    colBg = play.colors.background.copy();

    colTable = new co.shifter(co.Palette.CelGreen)
      .lum(0.44)
      .alp(0.98)
      .base();
  };

  this.update = delta => {
    
  };

  const tableStyle = () => ({
    background: colTable.css()
  });

  this.pokerView = () => {
    return [
      h('.bg-poker', {
        style: {
          background: colBg.css()
        }
      })
    ];
  };
  
  this.view = () => {
    return [
      h('.bg-table', {
        style: {
          ...tableStyle()
        }
      })];
  };

}
