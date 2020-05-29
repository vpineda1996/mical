import {Injectable} from '@angular/core';
import {HistogramData, MapData} from '../model/datatypes';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {FeatureCollection} from 'geojson';
import {GeoData, GeoJsonPoint, PointCollection} from '../model/map';
import {debounceTime, flatMap, map, reduce} from 'rxjs/operators';
import {QueryProviderService} from './query-provider.service';
import {Intervention, InterventionProviderService} from './intervention-provider.service';
import {FilterProviderService} from './filter-provider.service';

const DEBOUNCE_WAIT = 500;

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  private mapData: Subject<Array<MapData>> = new Subject();
  private selectedInterventions: Intervention[] = [];
  private allInterventions: Intervention[] = [];
  private interventionQueries: Subject<{[intervention:string]: HistogramData}> = new BehaviorSubject({});
  private geoDataSubject: Subject<GeoData> = new BehaviorSubject(new GeoData( <FeatureCollection> DATA));

  constructor(private interventionProviderService: InterventionProviderService,
              private filterProvider: FilterProviderService,
              private queryProvider: QueryProviderService) {

    // 1. create a fn to listen to the filter provider
    filterProvider.announcer.pipe(
      debounceTime(DEBOUNCE_WAIT)
    ).subscribe(() => {
      this.updateMapData([]);
      this.updateHistograms();
    });

    this.setupGeoDataListener();
    this.setupActiveInterventionsListener();
    this.setupAllInterventionsListener();

    this.updateMapData([]);
    this.updateHistograms();
  }

  setupGeoDataListener(): void {
    this.mapData.pipe(
      map((newData) => {
        return newData.map(v =>
          new GeoJsonPoint(<[number, number]> v.coords.coordinates, v)
        )
      })
    ).subscribe((points) => {
      this.geoDataSubject.next(new GeoData(new PointCollection(points)));
    });
  }

  setupActiveInterventionsListener() {
    this.interventionProviderService.activeInterventions.subscribe((int) => {
      this.selectedInterventions = Object.values(int);
      this.updateHistograms();
    });
  }

  setupAllInterventionsListener() {
    this.interventionProviderService.allObservableInterventions.subscribe((int) => {
      this.allInterventions = Object.values(int);
      this.updateHistograms();
    });
  }

  updateHistograms() {
    // if no interventions are selected, display all by default
    const displayedInterventions = this.selectedInterventions.length === 0
      ? this.allInterventions
      : this.selectedInterventions;
    of(...displayedInterventions).pipe(
      flatMap((intervention) => {
        return this.queryProvider.getHistogramData(intervention)
      }),
      reduce((acc, v, idx) => {
        acc[displayedInterventions[idx].key] = v;
        return acc;
      }, {})
    ).subscribe((hData) => {
      this.interventionQueries.next(hData);
    });
  }

  updateMapData(selectedInterventions) {
    // maintain a hash set for unique intervention keys and quick access
    const keys = {};
    const allInterventions = this.interventionProviderService.allInterventions;
    allInterventions.forEach(intervention => {
      const { key: currentInterventionKey, sKey } = intervention;
      if (!keys[currentInterventionKey] && selectedInterventions.includes(sKey)) {
        keys[currentInterventionKey] = true;
      }
    });
    // do database query
    this.queryProvider.getMapData().subscribe((value: Array<MapData>) => {
      // if no interventions are selected, display all by default
      // otherwise, only keep map data that belong to the selected interventions
      const selectedInterventions = Object.keys(keys).length === 0
        ? value
        : value.filter(v => keys[v.interventionType]);
      this.mapData.next(selectedInterventions);
    });
  }

  getGeoDataPoints(): Observable<GeoData> {
    return this.geoDataSubject;
  }

  getHistogramData(): Observable<{[intervention:string]: HistogramData}> {
    return this.interventionQueries;
  }
}

const DATA = {
  "type": "FeatureCollection",
  "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},
  "features": [
  ]
};


