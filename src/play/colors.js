import * as co from 'colourz';

export default function Colors() {
  
  this.background = new co.shifter(co.Palette.CrocTooth)
    .lum(0.2).base();

  this.background2 = new co.shifter(co.Palette.CrocTooth)
    .lum(0.4).base();

  this.potBg = new co.shifter(co.Palette.SummerSky)
    .lum(0.2).base();


  this.actions = {
    'sblind': new co.shifter(co.Palette.Mandarin)
      .lum(0.44)
      .base(),
    'bblind': new co.shifter(co.Palette.Mandarin)
      .lum(0.44)
      .base(),
    'raise': new co.shifter(co.Palette.Mandarin)
      .lum(0.54)
      .base(),
    'check': new co.shifter(co.Palette.SummerSky)
      .lum(0.44)
      .base(),
    'call': new co.shifter(co.Palette.SummerSky)
      .lum(0.44)
      .base(),
    'fold': new co.shifter(co.Palette.FluRed)
      .lum(0.44)
      .base(),
    'allin': new co.shifter(co.Palette.Pumpkin)
      .lum(0.44)
      .base()
  };

}
