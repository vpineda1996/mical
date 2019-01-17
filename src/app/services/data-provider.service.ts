import { Injectable } from '@angular/core';
import { Column, YieldDocument } from '../model/datatypes';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { FeatureCollection } from 'geojson';
import { GeoData, GeoJsonPoint, PointCollection } from '../model/map';
import { FilterProviderService } from './filter-provider.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// TODO: vpineda this is harcoded, should be removed!
let datasetRequestForYield = "/api/yield/12" 
let serverURL = "http://localhost:8888"

let errorFn = (err) => {
  alert("Error tring to fetch rows: " + JSON.stringify(err));
};

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  private data: Subject<Array<YieldDocument>> = new Subject();
  private geoDataSubject: Subject<GeoData> = new BehaviorSubject(new GeoData( <FeatureCollection> DATA));

  
  constructor(private filterProvider: FilterProviderService, private http: HttpClient) {
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
    this.http.get(serverURL + datasetRequestForYield).subscribe((value: Array<YieldDocument>) => {
      this.data.next(value);
    }, errorFn)
  }

  getGeoDataPoints(columns: Column[]): Observable<GeoData> {
    return this.geoDataSubject;
  }

  getData(): Observable<Array<YieldDocument>> {
    return this.data;
  }
}

const DATA = {
  "type": "FeatureCollection",
  "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},
  "features": [
  ]
};


