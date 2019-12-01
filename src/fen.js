// blinds bettingRound button turnToAct allowRaiseUntil lastFullRaise!runningPot~sidePot
// stack recentWager lastAction|. 

// 10 (P|F|T|R) 0 0 0 100!100 0 1 2 3~50 0 1 2
// (I|F|O|N) 100 10 C
// I 100 10 R200
// I 100 10 .


export function readPlay(play) {
  let headerStacks = play.split('\n').map(_ => _.trim());

  let header = headerStacks[0];
  let stacks = headerStacks.slice(1);

  return {
    ...readHeader(header),
    stacks: stacks.map(readStack)
  };
}

function readHeader(header) {
  let optsPots = header.split('!');

  let opts = optsPots[0];
  let pots = optsPots[1];

  return {
    ...readOpts(opts),
    pots: readPots(pots)
  };
}

export function readPots(pots) {
  return {
    running: readPot(pots.split('~')[0]),
    sides: pots.split('~').slice(1).map(readPot)
  };
}

export function readPotDistribution(pots) {
  return pots.split('~').map(readPot);
}

function readOpts(opts) {
  let [blinds, bettingRound, button, turnToAct, allowRaiseUntil, lastFullRaise] = opts.split(' ');

  return {
    blinds: parseInt(blinds),
    round: rounds[bettingRound],
    button: parseInt(button),
    toAct: parseInt(turnToAct),
    allowRaiseUntil: parseInt(allowRaiseUntil),
    lastFullRaise: parseInt(lastFullRaise)
  };
}

function readPot(pot) {
  let wagerInvolved = pot.split(' ');

  let wager = wagerInvolved[0];
  let involved = wagerInvolved.slice(1);

  return {
    wager: parseInt(wager),
    involved: involved.map(_ => parseInt(_))
  };  
}


function readStack(sStack, stackIndex) {
  let [role, stack, wager, lastAction] = sStack.split(' ');

  return {
    stackIndex,
    role: roles[role],
    stack: parseInt(stack),
    wager: parseInt(wager),
    lastAction: readAct(lastAction, parseInt(wager))
  };
}

export function readRole(role) {
  return roles[role];
}

const acts = { 'R': 'raise', 'C': 'call', 'H': 'check', 'F': 'fold', 'A': 'allin' };

const roles = { 'I': 'involved', 'F': 'folded', 'O': 'oldallin', 'N': 'newallin' };

const rounds = { 'P': 'preflop', 'F': 'flop', 'T': 'turn', 'R': 'river' };

const movePattern = /(R|C|A|H|F)(\d*)/;

export function readMove(uci) {
  let act = uci.match(movePattern);

  if (!act) {
    return null;
  }
  return { action: acts[act[1]], to: act[2] };
}

function readAct(act, to) {
  act = act.match(movePattern);

  if (!act) {
    return null;
  }
  return { action: acts[act[1]], to: to };
}

export function makeAction(action, to) {
  return { action: action, to };
}
