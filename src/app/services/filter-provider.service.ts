import {HttpClient} from '@angular/common/http';
import {EventEmitter, Injectable} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {debounceTime, flatMap, share} from 'rxjs/operators';
import {Comparator, CompoundFilter, EmptyFilter, Filter, GeoFilter, RegexFilter} from '../model/filters';
import {API_ROUTE, AREA_KEY, COLUMN_FILTERS_STORAGE_KEY, OUTCOME_TABLE_ROUTE, SERVER_URL} from '../util/constants';
import {CustomLngLatBounds} from '../util/typings';
import {OutcomeTableProviderService} from './outcome-table-provider.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BoundingBox} from '../util/util.algo';

@Injectable({
  providedIn: 'root'
})
export class FilterProviderService {
  private _geoFilter: GeoFilter = new GeoFilter();
  public announcer: EventEmitter<{
    isMapUpdate: boolean,
  }> = new EventEmitter();

  get filters() {
    return this.parseFilterOpts(this.storage);
  }

  selectedValues(col: string): string[] {
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
    ans.subscribe((v) => {
      if (col === 'filterCols.crop') {
        v.sort(function(a, b) {
          const aIgnoreCase = a.toUpperCase();
          const bIgnoreCase = b.toUpperCase();
          if (aIgnoreCase < bIgnoreCase) {
            return -1;
          }
          if (aIgnoreCase > bIgnoreCase) {
            return 1;
          }
          return 0;
        });
      }
      this._cache[col] = v
    });
    return ans;
  }

  private geoDebounce = new Subject();
  setGeoFilter(f: CustomLngLatBounds) {
    this.geoDebounce.next(f);
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
    // setup the storage to hold something meaningful
    if (window.sessionStorage.getItem(COLUMN_FILTERS_STORAGE_KEY) === null) {
      window.sessionStorage.setItem(COLUMN_FILTERS_STORAGE_KEY, "{}");
    }
    // parse the lat long that we want
    activeRoute.queryParamMap.subscribe(this.parseAreaOpts.bind(this));

    // set listener to propagate new filter;
    this.geoDebounce.pipe(
      debounceTime(200)
    ).subscribe((f: CustomLngLatBounds) => {
      this._geoFilter.bnds = new BoundingBox(f.getNorth(),
        f.getWest(),
        f.getSouth(),
        f.getEast());
      this.announcer.next({isMapUpdate: true});
    });
  }

  private parseAreaOpts(pm: ParamMap) {
    let ak = pm.get(AREA_KEY);
    if (ak) {
      this._geoFilter.bnds = BoundingBox.uncompress(ak);
      this.announcer.next({isMapUpdate: false});
    }
  }

  /**
   * Decodes the options saved on cache
   * @param opts { col : [str1, str2, ]... } specifies which column and which
   *                                         possible strings to match on
   */
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

}

