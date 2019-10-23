import { readPlay as fenReadPlay } from './fen';

export default function Game(fen) {

  let play = fenReadPlay(fen);  

  this.allInvolved = () => play.stacks.map((_, i) => i);

  this.deal = () => play.deal;

  this.blinds = () => play.blinds;

  this.blindsPosted = () => play.deal.blindsPosted;

  this.button = () => play.deal.button;

  this.smallBlind = () => 
  nextIndex(this.allInvolved(), this.button());

  this.bigBlind = () =>
  nextIndex(this.allInvolved(), this.smallBlind());


  function nextIndex(involved, i) {
    return (i + 1) % involved.length;
  }

  this.involved = this.allInvolved;

  this.doDeal = (o) => {
    play = fenReadPlay(o.fen);
  };

}
