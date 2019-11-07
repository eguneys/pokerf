import * as co from 'colourz';

export const SmallBlind = () => ({
  klass: 'sblind',
  colors: {
    background: new co.shifter(co.Palette.Pumpkin)
      .lum(0.44)
      .base()
  },
  header: 'S'
});

export const BigBlind = () => ({
  klass: 'bblind',
  colors: {
    background: new co.shifter(co.Palette.Pumpkin)
      .lum(0.44)
      .base()
  },
  header: 'B'
});

export const Raise = () => ({
  klass: 'raise',
  colors: {
    background: new co.shifter(co.Palette.Pumpkin)
      .lum(0.44)
      .base()
  },
  header: 'R'
});

export const Check = () => ({
  klass: 'check',
  colors: {
    background: new co.shifter(co.Palette.Pumpkin)
      .lum(0.44)
      .base()
  },
  header: 'H'
});

export const Call = () => ({
  klass: 'call',
  colors: {
    background: new co.shifter(co.Palette.Pumpkin)
      .lum(0.44)
      .base()
  },
  header: 'C'
});

export const Fold = () => ({
  klass: 'fold',
  colors: {
    background: new co.shifter(co.Palette.Pumpkin)
      .lum(0.44)
      .base()
  },
  header: 'F'
});

export const AllIn = () => ({
  klass: 'allin',
  colors: {
    background: new co.shifter(co.Palette.Pumpkin)
      .lum(0.44)
      .base()
  },
  header: 'A'
});

export const Klasses = {
  'bigBlind': BigBlind(),
  'smallBlind': SmallBlind(),
  'raise': Raise(),
  'call': Call(),
  'fold': Fold(),
  'check': Check(),
  'allin': AllIn()
};
