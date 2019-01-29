import {Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DEFAULT_TABLE, OUTCOME_TABLE_KEY} from '../util/constants';

@Injectable({
  providedIn: 'root'
})
export class OutcomeTableProviderService {

  private _table: string = DEFAULT_TABLE;

  get table() {
    return this._table;
  }


  constructor(private route: ActivatedRoute) {
    route.queryParamMap.subscribe((qMap) => {
      if (qMap.has(OUTCOME_TABLE_KEY)) this._table = qMap.get(OUTCOME_TABLE_KEY);
    })
  }


}
