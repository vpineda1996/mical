import {Injectable} from '@angular/core';
import {Column, MapData, HistogramData} from '../model/datatypes';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {FeatureCollection} from 'geojson';
import {GeoData, GeoJsonPoint, PointCollection} from '../model/map';
import {map} from 'rxjs/operators';
import {QueryProviderService} from './query-provider.service';
import { InterventionProviderService } from './intervention-provider.service';
import { OutcomeTableProviderService } from './outcome-table-provider.service';
import { FilterProviderService } from './filter-provider.service';


const DEBOUNCE_WAIT = 500;

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  private data: Subject<Array<MapData>> = new Subject();
  private summaryQueries: Subject<HistogramData>[] = [];
  private geoDataSubject: Subject<GeoData> = new BehaviorSubject(new GeoData( <FeatureCollection> DATA));

  private updateWithDebounce = (function() {
    let curTimeout;
    return () => {
      if (curTimeout != null) {
        clearTimeout(curTimeout);
      }
      curTimeout = setTimeout(this.update.bind(this), DEBOUNCE_WAIT);
    }
  })();

  
  constructor(private interventionProviderService: InterventionProviderService,
              private outcomeTableProvider: OutcomeTableProviderService,
              private filterProvider: FilterProviderService,
              private queryProvider: QueryProviderService) {
    filterProvider.announcer.subscribe(() => {
      this.updateWithDebounce();
    })
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
    this.queryProvider.getMapData().subscribe((value: Array<MapData>) => {
      this.data.next(value);
    })
  }

  getGeoDataPoints(columns: Column[]): Observable<GeoData> {
    return this.geoDataSubject;
  }

  getData(): Observable<Array<MapData>> {
    return this.data;
  }
}

const DATA = {
  "type": "FeatureCollection",
  "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},
  "features": [
  ]
};


