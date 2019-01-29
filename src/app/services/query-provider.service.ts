import { Injectable } from '@angular/core';
import {InterventionProviderService} from './intervention-provider.service';
import {OutcomeTableProviderService} from './outcome-table-provider.service';
import {FilterProviderService} from './filter-provider.service';
import {HttpClient} from '@angular/common/http';
import {RowData} from '../model/datatypes';
import {Observable} from 'rxjs';


const API_ROUTE = "api";

@Injectable({
  providedIn: 'root'
})
export class QueryProviderService {

  constructor(private interventionProviderService: InterventionProviderService,
              private outcomeTableProvider: OutcomeTableProviderService,
              private filterProvider: FilterProviderService,
              private http: HttpClient) {

  }

  get(): Observable<Array<RowData>> {
    let ans =  <Observable<Array<RowData>>> this.http.get(this.buildURL());
    ans.subscribe(undefined, errorFn);
    return ans;
  }

  buildURL(): string {
    return [serverURL, API_ROUTE, this.outcomeTableProvider.table].join("/");
  }

}


let errorFn = (err) => {
  console.log("Error tring to fetch rows: " + JSON.stringify(err));
};


// TODO: vpineda this is harcoded, should be removed!
let serverURL = "http://localhost:8888";
