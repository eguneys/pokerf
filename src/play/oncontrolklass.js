export const Call = ({
  klass: 'call',
  text: 'call',
  colors: 'call',
  possibleMoves: ['CA']
});

export const Check = ({
  klass: 'check',
  text: 'check',
  colors: 'check',
  possibleMoves: ['CH']
});

export const Fold = ({
  klass: 'fold',
  text: 'fold',
  colors: 'fold',
  possibleMoves: ['FO']
});

export const Raise = ({
  klass: 'raise',
  text: 'raise',
  colors: 'raise',
  possibleMoves: ['AA', 'RR']
});


export const ThirdRaise = ({
  klass: 'traise',
  text: 'thirdPot',
  colors: 'raise',
  possibleMoves: ['TR']
});

export const HalfRaise = ({
  klass: 'hraise',
  text: 'halfpot',
  colors: 'raise',
  possibleMoves: ['HR']
});

export const PotRaise = ({
  klass: 'praise',
  text: 'fullpot',
  colors: 'raise',
  possibleMoves: ['PR']
});

export const AllIn = ({
  klass: 'allin',
  text: 'allin',
  colors: 'raise',
  possibleMoves: ['AA', 'AC', 'AH', 'AF']
});
