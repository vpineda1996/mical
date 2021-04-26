import { Injectable } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {
  API_ROUTE,
  DEFAULT_INTERVENTIONS,
  INTERVENTION_KEY,
  INTERVENTION_ROUTE,
  OUTCOME_TABLE_ROUTE,
  SERVER_URL,
} from '../util/constants';
import {BehaviorSubject, Observable, Subject, of} from 'rxjs';
import {OutcomeTableProviderService} from './outcome-table-provider.service';
import {share, map, reduce, filter, mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterventionProviderService {

  private _intervention: InterventionData = DEFAULT_INTERVENTIONS;
  private _interventions$: Subject<InterventionData> = new BehaviorSubject(this._intervention);
  private interventionsSingleton: Intervention[] = [];

  get activeInterventions(): Observable<InterventionData> {
    return this._interventions$;
  }

  private _cache: {[col: string]: string[]} = {};
  // copied simliar style to query-provider.service filtersForCol() for consistency and caching
  filtersForCol(): Observable<string[]> {
    let start = of(this._cache);
    let ans = start.pipe(
      mergeMap((cache) => {
        if(cache['interventions']) {
          return of(cache['interventions'])
        };
        return this.allObservableInterventions.pipe(map(ints => ints.map(i => i.sKey).sort()));
      }),
      share()
    );
    ans.subscribe((interventions) => {
      this._cache['interventions'] = interventions
    })
    return ans;

  }

  get allObservableInterventions(): Observable<Intervention[]> {
    return <Observable<Intervention[]>> this.http
      .get(tableUrl(this.outcomeTableProviderService.table))
      .pipe(share());
  }

  get allInterventions(): Intervention[] {
    this.allObservableInterventions
      .pipe(map(ints => ints))
      .subscribe(res => {
        this.interventionsSingleton = res
      });
    return this.interventionsSingleton;
  }

  constructor(private route: ActivatedRoute,
              private outcomeTableProviderService: OutcomeTableProviderService,
              private http: HttpClient) {
    route.queryParamMap.subscribe((qMap) => {
      if (qMap.has(INTERVENTION_KEY)) this.parseInterventions(qMap.get(INTERVENTION_KEY));
    })
    this.allObservableInterventions
      .pipe(map(ints => ints))
      .subscribe(res => this.interventionsSingleton = res || []);
  }

  private parseInterventions(str: string) {
    let intKeys = str.split(",").map(val => val.trim());
    let req = of(...intKeys).pipe(
      filter((k) => k != ""),
      mergeMap((key) => {
        return <Observable<Intervention>> this.http.get(interventionUrl(key));
      }),
      reduce((acc, v: Intervention) => {
        acc[v.sKey] = v;
        return acc;
      }, {})
    );
    req.subscribe((v: InterventionData) => {
      this._intervention = v;
      this._interventions$.next(this._intervention);
    })
  }
}

function interventionUrl(... end: string[]) {
  return [SERVER_URL, API_ROUTE, INTERVENTION_ROUTE, ...end].join("/");
}

function tableUrl(tableName: string) {
  return [SERVER_URL, API_ROUTE, OUTCOME_TABLE_ROUTE, INTERVENTION_ROUTE, tableName].join("/");
}

let errorFn = (err) => {
  console.log("Error trying to fetch intervention: " + JSON.stringify(err));
};

export interface InterventionData {
  [sKey: string]: Intervention
}

export interface Intervention {
  key: number;
  sKey: string;
  title: string;
  desc: string;
  denom: string;
  numerator: string;
}


