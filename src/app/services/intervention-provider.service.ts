import { Injectable } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterventionProviderService {

  private _interventions: string[] = DEFAULT_INTERVENTIONS;

  get interventions() {
    return this._interventions;
  }


  constructor(private route: ActivatedRoute) {
    route.queryParamMap.subscribe((qMap) => {
      if (qMap.has(INTERVENTION_KEY)) this._interventions = qMap.get(INTERVENTION_KEY).split(",");
    })
  }


}

export const INTERVENTION_KEY = 'intrvtn';
const DEFAULT_INTERVENTIONS = ['organic'];
