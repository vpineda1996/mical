import {Injectable} from '@angular/core';
import {Column} from '../model/datatypes';
import {Observable, of, Subject} from 'rxjs';
import {FeatureCollection} from 'geojson';
import {GeoData} from '../model/map';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  data: GeoData = new GeoData(<FeatureCollection> DATA);
  geoDataSubject: Subject<GeoData> = new Subject();

  constructor() {
    setTimeout(() => (
      this.geoDataSubject.next(this.data)
    ), 1000);
  }

  getGeoDataPoints(columns: Column[]): Observable<GeoData> {
    // do database query
    return this.geoDataSubject;
  }

  getColumns(): Observable<Array<Column>> {
    return of([]);
  }
}

const ACTUALDATA = [
  {
    point: [-151.5129, 63.1016],
    study: "crops cry every night",
    mag: 3.1,
  }
];

const DATA = {
  "type": "FeatureCollection",
  "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},
  "features": [
    {
      "type": "Feature",
      "properties": {"id": "ak16994521", "mag": 2.3, "time": 1507425650893, "felt": null, "tsunami": 0},
      "geometry": {"type": "Point", "coordinates": [-151.5129, 63.1016]}
    },
  ]
};


