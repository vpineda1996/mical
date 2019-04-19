import {Point} from 'geojson';

export class Column {
  constructor(public name: string) {

  }
}

export class GeoPoint implements Point {
  public type: 'Point' = 'Point';
  constructor(public coordinates: number[]) {
    this.type = 'Point';
  }
}



export interface MapData {
  coords: GeoPoint;
}


export type SeriesEntry = [number, number][]

export interface HistogramData {
  title: string,
  bar: SeriesEntry,
  dist: SeriesEntry,
  ticks: Ticks,
  labels: {
    denom: string,
    numerator: string
  }
}

export type Ticks = number[];

