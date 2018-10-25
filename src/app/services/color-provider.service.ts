import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorProviderService {

  private selectedColourScheme: string[];

  constructor() {
    this.selectedColourScheme = defaultMatlabColors;
  }



  getColor(identifier: number) {
    let idx = Math.floor(identifier);
    return this.selectedColourScheme[idx % this.selectedColourScheme.length];
  }

  getColoursStartingAtIndex(idx: number, quantity: number): string[] {
    const ret = [];
    for (; idx < quantity; idx++) {
      ret.push(this.getColor(idx));
    }
    return ret;
  }
}


const defaultMatlabColors = [
  // Starting in R2014b	R2014a and Earlier
  "rgb(0,   114, 189)",
  "rgb(217, 83,  25)",
  "rgb(237, 177, 32)",
  "rgb(126, 47,  142)",
  "rgb(119, 172, 48)",
  "rgb(77,  190, 238)",
  "rgb(162, 20,  47)",
];
