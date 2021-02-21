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
  interventionType: number;
  interventionName: string;
  location: string;
  sampleSize: number;
  filterCols: {
    author: string;
    crop: string;
    crop2: string;
    duration: string;
    soil: string;
    climate: string;
  }
}


export type SeriesEntry = [number, number][]

export interface HistogramData {
  title: string,
  desc: string,
  bar: SeriesEntry,
  dist: SeriesEntry,
  ticks: Ticks,
  labels: {
    denom: string,
    numerator: string,
    xaxis: string
  }
}

export type Ticks = number[];

