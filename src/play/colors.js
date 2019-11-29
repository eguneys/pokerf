import * as co from 'colourz';

export default function Colors() {
  
  this.background = new co.shifter(co.Palette.CrocTooth)
    .lum(0.2).base();

  this.potBg = new co.shifter(co.Palette.SummerSky)
    .lum(0.2).base();

}
