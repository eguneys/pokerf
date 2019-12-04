import * as co from 'colourz';

export const SmallBlind = ({
  klass: 'sblind',
  colors: 'sblind',
  header: 'S'
});

export const BigBlind = ({
  klass: 'bblind',
  colors: 'bblind',
  header: 'B'
});

export const Raise = ({
  klass: 'raise',
  colors: 'raise',
  header: 'R'
});

export const Check = ({
  klass: 'check',
  colors: 'check',
  hideAmount: true,
  header: 'H'
});

export const Call = ({
  klass: 'call',
  colors: 'call',
  header: 'C'
});

export const Fold = ({
  klass: 'fold',
  colors: 'fold',
  hideAmount: true,
  header: 'F'
});

export const AllIn = ({
  klass: 'allin',
  colors: 'allin',
  header: 'A'
});

export const AllInCall = ({
  klass: 'allincall',
  colors: 'call',
  header: 'A'
});


export const AllInHalf = ({
  klass: 'allinhalf',
  colors: 'raise',
  header: 'A'
});

export const AllInFull = ({
  klass: 'allinfull',
  colors: 'raise',
  header: 'A'
});


export const Klasses = {
  'bigBlind': BigBlind,
  'smallBlind': SmallBlind,
  'raise': Raise,
  'call': Call,
  'fold': Fold,
  'check': Check,
  'allin': AllIn,
  'allincall': AllInCall,
  'allinhalf': AllInHalf,
  'allinfull': AllInFull
};
