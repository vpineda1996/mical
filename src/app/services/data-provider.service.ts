import {Injectable} from '@angular/core';
import {Column, RowData} from '../model/datatypes';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {FeatureCollection} from 'geojson';
import {GeoData, GeoJsonPoint, PointCollection} from '../model/map';
import {map} from 'rxjs/operators';
import {QueryProviderService} from './query-provider.service';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  private data: Subject<Array<RowData>> = new Subject();
  private geoDataSubject: Subject<GeoData> = new BehaviorSubject(new GeoData( <FeatureCollection> DATA));

  
  constructor(private queryProvider: QueryProviderService) {
    this.setupGeoDataListener()
    this.update();
  }

  setupGeoDataListener(): void {
    let transformed = this.data.pipe(
      map((newData) => {
        return newData.map(v => 
          new GeoJsonPoint(<[number, number]> v.coords.coordinates, v)
        )
      })
    );
    transformed.subscribe((points) => {
      this.geoDataSubject.next(new GeoData(new PointCollection(points)));
    })
  }

  update() {
    // do database query
    this.queryProvider.get().subscribe((value: Array<RowData>) => {
      this.data.next(value);
    })
  }

  getGeoDataPoints(columns: Column[]): Observable<GeoData> {
    return this.geoDataSubject;
  }

  getData(): Observable<Array<RowData>> {
    return this.data;
  }
}

const DATA = {
  "type": "FeatureCollection",
  "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},
  "features": [
  ]
};


