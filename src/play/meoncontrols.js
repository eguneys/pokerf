import * as h from 'mithril/hyperscript';

import * as OnControlKlasses from './oncontrolklass';

import * as u from '../util';
import * as lens from '../lens';

export default function MeOnControls(play) {

  const onCall = () => {
    u.callUserFunction(lens.eventMove(play.data), 'CA');
  };

  const onCheck = () => {
    u.callUserFunction(lens.eventMove(play.data), 'CH');
  };

  const onFold = () => {
    u.callUserFunction(lens.eventMove(play.data), 'FO');
  };

  const onRaise = () => {
    let amount = raiseControls.amount();

    if (amount === play.game().meMaxRaise()) {
      u.callUserFunction(lens.eventMove(play.data), 'AA');
    } else {
      u.callUserFunction(lens.eventMove(play.data), 'RR' + amount);
    }
  };

  const call = new Button(play, OnControlKlasses.Call, onCall),
        check = new Button(play, OnControlKlasses.Check, onCheck),
        fold = new Button(play, OnControlKlasses.Fold, onFold),
        raise = new Button(play, OnControlKlasses.Raise, onRaise);
        
  const raiseControls = new RaiseControls(play, this);

  this.init = () => {
    call.init({});
    check.init({});
    fold.init({});
    raise.init({});
    raiseControls.init({});
  };

  this.update = delta => {
  };

  this.view = () => {
    return [
      raiseControls.view(),
      h('div.meon', {
      }, [fold.view(),
          check.view(),
          call.view(),
          raise.view()
         ])];
  };

}

function RaiseControls(play, controls) {


  let hide;

  let min,
      max,
      amount;

  const bgColor = play.colors.background2
        .copy()
        .alp(0.8)
        .base();


  const onThirdRaise = () => {
    amount = play.game().meThirdRaise();
  };

  const onHalfRaise = () => {
    amount = play.game().meHalfRaise();
  };

  const onPotRaise = () => {
    amount = play.game().mePotRaise();
  };

  const onAllIn = () => {
    amount = play.game().meAllin();
  };

  let thirdRaise = new RaiseButton(play, OnControlKlasses.ThirdRaise, onThirdRaise),
      halfRaise = new RaiseButton(play, OnControlKlasses.HalfRaise, onHalfRaise),
      potRaise = new RaiseButton(play, OnControlKlasses.PotRaise, onPotRaise),
      allIn = new RaiseButton(play, OnControlKlasses.AllIn, onAllIn);
  
  this.init = () => {

    let game = play.game();

    min = game.meMinRaise();
    max = game.meMaxRaise();

    amount = min;

    thirdRaise.init({});
    halfRaise.init({});
    potRaise.init({});
    allIn.init({});

    hide = OnControlKlasses.Raise.possibleMoves
      .includes(_ => game.mePossibleMoveHash(_));
  };

  this.amount = () => amount;

  this.update = delta => {
  };

  this.view = () => {
    let klass = hide?'.hidden':'';

    return h('div.meraise' + klass, {
      style: {
        background: bgColor.css()
      }
    }, [
      h('div.label', {
        style: {
          background: play.colors.background.css()
        }
      }, amount),
      h('input.slider', {
        oninput: (evt) => { amount = evt.target.value; },
        type: 'range',
        value: amount,
        min,
        max
      }),
      h('div.presets', [
        thirdRaise.view(),
        halfRaise.view(),
        potRaise.view(),
        allIn.view()
      ])
    ]);
  };
}

function RaiseButton(play, cKlass, onClick) {

  const bgColor = play.colors.background2.copy();

  let hide;

  this.init = (opts) => {
    let game = play.game();
    hide = !cKlass.possibleMoves.some(_ => game.mePossibleMoveHash(_));
  };

  this.update = delta => {
  };

  this.view = () => {
    let klass = cKlass.klass;
    let content = cKlass.text;

    if (hide) {
      klass += '.hidden';
    }

    return h('button.mebutton.' + klass, {
      onclick: onClick,
      style: {
        background: bgColor.css()
      }
    }, content);    
  };
}

function Button(play, cKlass, onClick) {
  let hide;

  this.init = (opts) => {
    let game = play.game();
    hide = !cKlass.possibleMoves.some(_ => game.mePossibleMoveHash(_));
  };

  this.update = delta => {
  };

  this.view = () => {
    let klass = cKlass.klass;
    let content = play.trans(cKlass.text);

    let color = play.colors.actions[cKlass.colors].copy();

    if (hide) {
      klass += '.hidden';
    }

    return h('button.mebutton.' + klass, {
      onclick: onClick,
      style: {
        background: color.css()
      }
    }, content);
  };
}
