import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import { Filter, FilterExecutor } from '../model/filters';
import { Column } from '../model/datatypes';

@Injectable({
  providedIn: 'root'
})
export class FilterProviderService {

  constructor() { }

  filterOn(column: Column, filter: Filter) {

  }
  
  buildFilter() : FilterExecutor {
    return {};
  }

}
