import mrender from 'mithril/render';
import * as Vnode from 'mithril/render/vnode';


export default function MRender(mountPoint) {

  let bounds;

  const setBounds = (element) => {
    let width = element.clientWidth,
        height = element.clientHeight;

    let ratio = width / height;

    bounds = {
      width,
      height,
      ratio
    };
  };

  this.bounds = () => bounds;

  this.render = (vnode) => {
    mrender(mountPoint, vnode);
  };  

  setBounds(mountPoint);
}
