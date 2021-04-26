import {BBox, Feature, FeatureCollection, GeoJsonProperties, Point} from 'geojson';

export class GeoJsonPoint implements Feature<Point> {
   bbox: BBox;
   geometry: Point;
   id: string | number;
   type: "Feature" = "Feature";
   sampleSize: number;
   location: string;
   filterCols: {
    author: string;
    crop: string;
    intercrops: string;
    duration: string;
    soil: string;
    climate: string;
  }

  constructor(coordinates: [number, number], public properties: GeoJsonProperties) {
    this.geometry = {
      type: 'Point',
      coordinates: coordinates
    };
    this.type = "Feature";
    this.sampleSize = properties.sampleSize;
    this.filterCols = properties.filterCols;
    this.location = properties.location;
  }
}

export class PointCollection implements FeatureCollection<Point> {
  type: "FeatureCollection" = "FeatureCollection";
  crs: any = { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } };

  constructor(public features: Array<Feature<Point, GeoJsonProperties>>) {}
}

export class GeoData {
  constructor(public datum: FeatureCollection) {
  }
}
