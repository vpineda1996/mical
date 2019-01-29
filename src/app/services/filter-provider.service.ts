import {Injectable} from '@angular/core';
import {Filter} from '../model/filters';
import {Column} from '../model/datatypes';
import {ActivatedRoute} from '@angular/router';
import {DEFAULT_FILTERS, FILTERS_KEY} from '../util/constants';

@Injectable({
  providedIn: 'root'
})
export class FilterProviderService {

  private _filters: Filter[] = DEFAULT_FILTERS;

  get filters() {
    return this._filters;
  }
  constructor(private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe((qMap) => {
      if (qMap.has(FILTERS_KEY)) this._filters = this.parseFilterOpts(qMap.get(FILTERS_KEY));
    })
  }

  private parseFilterOpts(str: string): Filter[] {
    return [];
  }

  filterOn(column: Column, filter: Filter) {

  }

}

