import { Injectable } from '@angular/core';

interface ColourScheme {
  fill: string[],
  border: string[],
}

@Injectable({
  providedIn: 'root'
})
export class ColorProviderService {

  private selectedColourScheme: ColourScheme;

  constructor() {
    this.selectedColourScheme = colourSchemeMatlab;
  }



  getColor(identifier: number) {
    let idx = Math.floor(identifier);
    let border = this.selectedColourScheme.border;
    return border[idx % border.length];
  }

  getFillColor(identifier: number) {
    let idx = Math.floor(identifier);
    let fill = this.selectedColourScheme.fill;
    return fill[idx % fill.length];
  }

  getColoursStartingAtIndex(idx: number, quantity: number): string[] {
    const ret = [];
    for (; idx < quantity; idx++) {
      ret.push(this.getColor(idx));
    }
    return ret;
  }

  getColoursFillStartingAtIndex(idx: number, quantity: number): string[] {
    const ret = [];
    for (; idx < quantity; idx++) {
      ret.push(this.getFillColor(idx));
    }
    return ret;
  }
}

const defaultMatlabColorsBorder = [
  // Starting in R2014b	R2014a and Earlier
  "rgb(0,   114, 189 )",
  "rgb(217, 83,  25  )",
  "rgb(237, 177, 32  )",
  "rgb(126, 47,  142 )",
  "rgb(119, 172, 48  )",
  "rgb(77,  190, 238 )",
  "rgb(162, 20,  47  )",
];

const defaultMatlabColorsFill = [
  // Starting in R2014b	R2014a and Earlier
  "rgb(0,   114, 189, 0.2)",
  "rgb(217, 83,  25,  0.2)",
  "rgb(237, 177, 32,  0.2)",
  "rgb(126, 47,  142, 0.2)",
  "rgb(119, 172, 48,  0.2)",
  "rgb(77,  190, 238, 0.2)",
  "rgb(162, 20,  47,  0.2)",
];

const colourSchemeMatlab = {
  fill: defaultMatlabColorsFill,
  border: defaultMatlabColorsBorder,
};

