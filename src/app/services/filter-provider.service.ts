import { HttpClient } from '@angular/common/http';
import {EventEmitter, Injectable} from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { flatMap, share, debounce, debounceTime } from 'rxjs/operators';
import { Filter, RegexFilter, CompoundFilter, Comparator, EmptyFilter } from '../model/filters';
import { API_ROUTE, COLUMN_FILTERS_STORAGE_KEY, DEFAULT_FILTERS, OUTCOME_TABLE_ROUTE, SERVER_URL, AREA_KEY } from '../util/constants';
import { CustomLngLatBounds } from '../util/typings';
import { OutcomeTableProviderService } from './outcome-table-provider.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BoundingBox } from '../util/util.algo';

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
  private _geoFilter: GeoFilter = new GeoFilter();
  public announcer: EventEmitter<any> = new EventEmitter();

  private get storage() {
    let opts = window.sessionStorage.getItem(COLUMN_FILTERS_STORAGE_KEY);
    try {
      return JSON.parse(opts);
    } catch (e) {
      window.sessionStorage.setItem(COLUMN_FILTERS_STORAGE_KEY, "{}");
    }
    return {};
  }

  private set storage(store: {[col:string]: string[]}) {
    window.sessionStorage.setItem(COLUMN_FILTERS_STORAGE_KEY, JSON.stringify(store));
  }

  get filters() {
    return this.parseFilterOpts(this.storage);
  }

  enabledFilters(col: string): string[] {
    return this.storage[col];
  }

  filterOn(col: string, opts: string[]) {
    let st = this.storage;
    if (opts.length == 0 && st[col] !== undefined) {
      delete st[col];
    } else {
      st[col] = opts;
    }
    this.storage = st;
  }


  private _cache: {[col: string]: string[]} = {};
  filtersForCol(col: string) : Observable<string[]> {
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

  private geoDebounceS = new Subject();
  private geoDebounceP = this.geoDebounceS.pipe(
    debounceTime(100)
  ).subscribe((f: CustomLngLatBounds) => {
    let mParams = new BoundingBox(f.getNorth(), 
        f.getWest(),
        f.getSouth(), 
        f.getEast())
    this._geoFilter.bnds = mParams;
  });
  setGeoFilter(f: CustomLngLatBounds) {
    this.geoDebounceS.next(f);
  }

  get boundingBox(): CustomLngLatBounds {
    return this._geoFilter.bnds;
  }

  get geoFilter(): string {
    return this._geoFilter.compile();
  }

  constructor(private outcomeTableProvider: OutcomeTableProviderService,
              private activeRoute: ActivatedRoute,
              private route: Router,
              private http: HttpClient) {
    if (window.sessionStorage.getItem(COLUMN_FILTERS_STORAGE_KEY) === null) {
      window.sessionStorage.setItem(COLUMN_FILTERS_STORAGE_KEY, "{}");
    }
    activeRoute.queryParamMap.subscribe(this.parseAreaOpts.bind(this));
  }

  private parseAreaOpts(pm: ParamMap) {
    let ak = pm.get(AREA_KEY);
    if (ak) {
      this._geoFilter.bnds = BoundingBox.uncompress(ak);
      this.announcer.next();
    }
  }

  private parseFilterOpts(opts: {[col:string]: string[]}): Filter {
    // todo vpineda how do you grab these filters?
    let fs = Object.keys(opts).map(k => {
      let ors = opts[k];
      let aFors = ors.map(s => new RegexFilter(s,k));
      return (aFors.length) ? new CompoundFilter(Comparator.OR, aFors) : null;
    }).filter(v => v != null);
    return (fs.length) ? new CompoundFilter(Comparator.AND, fs) : new EmptyFilter();
  }

  private filtersUrl(... end: string[]) {
    return [SERVER_URL, API_ROUTE, OUTCOME_TABLE_ROUTE, this.outcomeTableProvider.table, ...end].join("/");
  }

}

