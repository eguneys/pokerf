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
  let [blinds, bettingRound, button, turnToAct, lastFullRaise] = opts.split(' ');

  return {
    blinds: parseFloat(blinds),
    round: rounds[bettingRound],
    button: parseInt(button),
    toAct: parseInt(turnToAct),
    lastFullRaise: parseFloat(lastFullRaise)
  };
}

function readPot(pot) {
  let wagerInvolved = pot.split(' ');

  let wager = wagerInvolved[0];
  let involved = wagerInvolved.slice(1);

  return {
    wager: parseFloat(wager),
    involved: involved.map(_ => parseInt(_))
  };  
}


function readStack(sStack, stackIndex) {
  let [role, stack, wager, lastAction] = sStack.split(' ');

  return {
    stackIndex,
    role: roles[role],
    stack: parseFloat(stack),
    wager: parseFloat(wager),
    lastAction: readAct(lastAction, parseFloat(wager))
  };
}

export function readRole(role) {
  return roles[role];
}

const acts = { 'TR': 'thirdraise', 'HR': 'halfraise', 'PR': 'potraise', 'RR': 'raise', 'CA': 'call', 'CH': 'check', 'FO': 'fold', 'AA': 'allin', 'AC': 'allincall', 'AH': 'allinhalf', 'AF': 'allinfull' };

const roles = { 'I': 'involved', 'F': 'folded', 'O': 'oldallin', 'N': 'newallin' };

const rounds = { 'P': 'preflop', 'F': 'flop', 'T': 'turn', 'R': 'river' };

const movePattern = /(TR|HR|PR|RR|CA|CH|FO|AA|AC|AH|AF)(\d*)/;

export function readPossibleMoves(poss) {
  if (!poss) {
    return null;
  }
  return poss.split(' ').map(readMove);
}

export function readMove(uci) {
  let act = uci.match(movePattern);

  if (!act) {
    return null;
  }
  return { hash: act[1], action: acts[act[1]], to: act[2] };
}

function readAct(act, to) {
  act = act.match(movePattern);

  if (!act) {
    return null;
  }
  return { hash: act[1], action: acts[act[1]], to: to };
}

export function makeAction(action, to) {
  return { action: action, to };
}
