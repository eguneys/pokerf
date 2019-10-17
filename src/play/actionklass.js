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
