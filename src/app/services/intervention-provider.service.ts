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
  INTERVENTIONS_STORAGE_KEY,
} from '../util/constants';
import {BehaviorSubject, Observable, Subject, of} from 'rxjs';
import {OutcomeTableProviderService} from './outcome-table-provider.service';
import {share, map, flatMap, reduce, filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterventionProviderService {

  private _intervention: InterventionData = DEFAULT_INTERVENTIONS;
  private _interventions$: Subject<InterventionData> = new BehaviorSubject(this._intervention);

  get activeInterventions(): Observable<InterventionData> {
    return this._interventions$;
  }

  // TODO: vpineda filter interventions based on the current table
  get allObservableInterventions(): Observable<Intervention[]> {
    return <Observable<Intervention[]>> this.http
      .get(tableUrl(this.outcomeTableProviderService.table))
      .pipe(share());
  }

  get allInterventions(): Intervention[] {
    return this.storage;
  }

  constructor(private route: ActivatedRoute,
              private outcomeTableProviderService: OutcomeTableProviderService,
              private http: HttpClient) {
    route.queryParamMap.subscribe((qMap) => {
      if (qMap.has(INTERVENTION_KEY)) this.parseInterventions(qMap.get(INTERVENTION_KEY));
    })
    this.allObservableInterventions
      .pipe(map(ints => ints))
      .subscribe(res => this.storage = res || []);
  }

  private parseInterventions(str: string) {
    let intKeys = str.split(",").map(val => val.trim());
    let req = of(...intKeys).pipe(
      filter((k) => k != ""),
      flatMap((key) => {
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

  private get storage() {
    let opts = window.sessionStorage.getItem(INTERVENTIONS_STORAGE_KEY);
    try {
      return JSON.parse(opts);
    } catch (e) {
      window.sessionStorage.setItem(INTERVENTIONS_STORAGE_KEY, "[]");
    }
    return [];
  }

  private set storage(store: Intervention[]) {
    window.sessionStorage.setItem(INTERVENTIONS_STORAGE_KEY, JSON.stringify(store));
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


