import { Injectable } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {API_ROUTE, DEFAULT_INTERVENTIONS, INTERVENTION_KEY, INTERVENTION_ROUTE, SERVER_URL} from '../util/constants';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {OutcomeTableProviderService} from './outcome-table-provider.service';

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
  get allInterventions(): Observable<Intervention[]> {
    return <Observable<Intervention[]>> this.http.get(this.tableUrl());
  }


  constructor(private route: ActivatedRoute,
              private outcomeTableProviderService: OutcomeTableProviderService,
              private http: HttpClient) {
    route.queryParamMap.subscribe((qMap) => {
      if (qMap.has(INTERVENTION_KEY)) this.parseInterventions(qMap.get(INTERVENTION_KEY));
    })
  }

  private parseInterventions(str: string) {
    let intKeys = str.split(",").map(val => parseInt(val, 10));
    intKeys.map((key) => {
      this.http.get(this.interventionUrl(key)).subscribe((intervention: Intervention) => {
        this._intervention[intervention.sKey] = intervention;
        this._interventions$.next(this._intervention);
      }, errorFn);
    });
  }

  private interventionUrl(... end: number[]) {
    return [SERVER_URL, API_ROUTE, INTERVENTION_ROUTE, ...end].join("/");
  }

  private tableUrl() {
      return [SERVER_URL, API_ROUTE, this.outcomeTableProviderService.table, INTERVENTION_ROUTE].join("/");
  }


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


