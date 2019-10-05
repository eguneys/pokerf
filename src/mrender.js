import mrender from 'mithril/render';
import * as Vnode from 'mithril/render/vnode';


export default function MRender(mountPoint) {

  this.render = (component) => {
    mrender(mountPoint, Vnode(component));
  };  
  
}
