import { readPlay as fenReadPlay } from './fen';

export default function Game(fen) {

  let play,
      allInvolved,
      history;

  const init = (fen) => {
    if (fen) {
      play = fenReadPlay(fen);
    }

    allInvolved = play.stacks.map((_, i) => i);

    history = makeHistory();
  };

  const makeHistory = () => {

    console.log(play.acts);

    // let rounds = play.acts.reduce((acc, round) => {
      
    // }, {
      
    // });

    return new History([], allInvolved);
  };

  init(fen);

  this.allInvolved = () => allInvolved;

  this.deal = () => play.deal;

  this.blinds = () => play.blinds;

  this.blindsPosted = () => play.deal.blindsPosted;

  this.button = () => play.deal.button;

  this.lastToAct = () => play.deal.lastToAct;

  this.smallBlind = () => 
  nextIndex(this.allInvolved(), this.button());

  this.bigBlind = () =>
  nextIndex(this.allInvolved(), this.smallBlind());

  function nextIndex(involved, i) {
    return (i + 1) % involved.length;
  }

  this.toAct = () => 2;

  this.round = () => 'preflop';

  this.preflop = () => true;
  this.flop = () => false;
  this.turn = () => false;
  this.river = () => false;

  this.involved = () => history.involved;

  this.middlePot = () => 0;

  this.recentAction = (index) => {
    
  };

  this.doDeal = (o) => {
    init(o.fen);
  };

}

function History(rounds, allInvolved) {
  this.rounds = rounds;

  this.preflop = this.rounds[this.rounds.length - 1];
  this.flop = this.rounds[this.rounds.length - 2];
  this.turn = this.rounds[this.rounds.length - 3];
  this.river = this.rounds[this.rounds.length - 4];

  this.round = (() => {
    if (this.river) {
      return 'river';
    }
    if (this.turn) {
      return 'turn';
    }
    if (this.flop) {
      return 'flop';
    }
    return 'preflop';
  })();

  this.lastRound = this.rounds[0];

  this.pastRounds = (() => {
    if (this.river) {
      return [
        this.preflop,
        this.flop,
        this.turn
      ];
    }
    if (this.turn) {
      return [
        this.preflop,
        this.flop
      ];
    }
    if (this.flop) {
      return [this.preflop];
    }
    return [];
  })();

  this.allRounds = [...this.pastRounds, this.lastRound];


  this.involved = this.allRounds.reduce((acc, round) => {
    return round.actions.reduce((acc, action) => {
      if (action.drop) {
        return acc.slice(acc.indexOf(action.who), 1);
      }
      return acc;
    }, acc);
  }, allInvolved);

}

function ActingRound(name, actions) {
  this.name = name;
  this.actions = actions;
}


function Action(who, action, { amount, to }) {
  this.who = who;
  this.action = action;
  this.amount = amount;
  this.to = to;

  this.drop = 
    action === 'fold' || action === 'allin';
}
