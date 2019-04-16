import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Observable, of, Subject} from 'rxjs';
import { Column } from '../model/datatypes';
import { Filter } from '../model/filters';
import {API_ROUTE, DEFAULT_FILTERS, FILTERS_KEY, INTERVENTION_ROUTE, OUTCOME_TABLE_ROUTE, SERVER_URL} from '../util/constants';
import { CustomLngLatBounds } from '../util/typings';
import {OutcomeTableProviderService} from './outcome-table-provider.service';
import {HttpClient} from '@angular/common/http';
import {Intervention} from './intervention-provider.service';
import {flatMap, map, share} from 'rxjs/operators';

class GeoFilter implements Filter {
  bnds: CustomLngLatBounds;

  build() {
    return undefined;
  }

  compile(): string {
    if (this.bnds === undefined) return "";
    let east = this.bnds.getEast();
    let west = this.bnds.getWest();
    let north = this.bnds.getNorth();
    let south = this.bnds.getSouth();
    let arr = [];
    if (east - west >= 360) {
      arr =  [[north, -180], [south, -180 ], [south, 180], [north, 180]];
    } else {
      // check if east goes around 
      if (east > 180) {
        // TODO: vpineda AE-45
        arr =  [[north, 180], [south, 180], [south, west], [north, west]];
      } else if (west < -180) {
        // TODO: vpineda AE-45
        arr =  [[north, east], [south, east], [south, -180], [north, -180]];
      } else {
        arr =  [[north, east], [south, east], [south, west], [north, west]];
      }
    }
    return arr.map((loc) => {
        return loc[0] + "," + loc[1];
    }).join(",");
  }
}

@Injectable({
  providedIn: 'root'
})
export class FilterProviderService {

  private _filters: Filter = DEFAULT_FILTERS;
  private _geoFilter: GeoFilter = new GeoFilter();
  public announcer: Subject<any> = new Subject();

  get filters() {
    return this._filters;
  }


  private _cache: {[col: string]: string[]} = {};
  filtersForCol(col: string) : Observable<string[]> {
    console.log("here!");
    let start = of(this._cache);
    let ans = start.pipe(
      flatMap((cache) => {
        if(cache[col]) return of(cache[col]);
        return <Observable<string[]>>this.http.get(this.filtersUrl(col))
      }),
      share()
    );
    ans.subscribe((v) => this._cache[col] = v);
    return ans;
  }

  setGeoFilter(f: CustomLngLatBounds) {
    this._geoFilter.bnds = f;
    this.announcer.next();
  }

  get geoFilter(): string {
    return this._geoFilter.compile();
  }

  constructor(private route: ActivatedRoute,
              private outcomeTableProvider: OutcomeTableProviderService,
              private http: HttpClient) {
    this.route.queryParamMap.subscribe((qMap) => {
      if (qMap.has(FILTERS_KEY)) this._filters = this.parseFilterOpts(qMap.get(FILTERS_KEY));
    })
  }

  private parseFilterOpts(str: string): Filter {
    // todo vpineda how do you grab these filters?
    return DEFAULT_FILTERS;
  }

  private filtersUrl(... end: string[]) {
    return [SERVER_URL, API_ROUTE, OUTCOME_TABLE_ROUTE, this.outcomeTableProvider.table, ...end].join("/");
  }

}

