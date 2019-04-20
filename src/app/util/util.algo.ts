import { invalid } from "@angular/compiler/src/render3/view/util";

/**
 * Returns the bounding box of the given points
 * @param a the array of points
 */
export function boundingBox(a: [number, number][]): BoundingBox{
  let up =  90, down = -90, l = 10000, r = -10000;
  a.forEach(([x, y]) => {
    up = Math.min(x, up);
    down  = Math.max(x, down);
    l = Math.min(y, l);
    r = Math.max(y, r);
  });

  return new BoundingBox(up, l, down, r);
}

export class BoundingBox {

  protected valid = true;
  constructor(public up: number, 
              public l: number,
              public down: number,
              public r: number) {}

  static uncompress(s: string) {
    let invalidBB = new BoundingBox(-90, -180, 90, 180);
    invalidBB.valid = false;
    if (s == null || s == "") return invalidBB;
    
    let sp = s.split(",");
    if (sp.length != 4) return invalidBB;
    let psp = sp.map(v => parseFloat(v));

    return new BoundingBox(psp[0], psp[1], psp[2], psp[3]);
  }

  getEast() {
    return this.r;
  }
  getNorth() {
    return this.up;
  }
  getSouth() {
    return this.down;
  }
  getWest() {
    return this.l;
  }

  compress(): string {
    if(!this.valid) return "";
    return [this.up, this.l, this.down, this.r]
      .join(",");
  }

  get bbox(): [number, number][] {
    return [
      [this.up, this.l],    // nw
      [this.down, this.l],  // sw
      [this.up, this.r],    // ne
      [this.down, this.r]   // se
    ]
  }
}
