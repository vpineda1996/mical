import { Injectable } from '@angular/core';
import {InterventionProviderService} from './intervention-provider.service';
import {OutcomeTableProviderService} from './outcome-table-provider.service';
import {FilterProviderService} from './filter-provider.service';
import {HttpClient} from '@angular/common/http';
import {MapData} from '../model/datatypes';
import {Observable} from 'rxjs';
import {API_ROUTE, OUTCOME_TABLE_ROUTE, SERVER_URL} from '../util/constants';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QueryProviderService {

  constructor(private interventionProviderService: InterventionProviderService,
              private outcomeTableProvider: OutcomeTableProviderService,
              private filterProvider: FilterProviderService,
              private http: HttpClient) {
  }

  getMapData(): Observable<Array<MapData>> {
    let ans =  <Observable<Array<MapData>>> this.http.get(this.buildMapURL());
    ans.subscribe(undefined, errorFn);
    return ans.pipe(share());
  }

  buildMapURL(): string {
    let baseURL = this.buildURL();
    baseURL += "&cols=coords";
    return baseURL;
  }

  buildURL(): string {
     let url = [SERVER_URL, API_ROUTE, OUTCOME_TABLE_ROUTE, this.outcomeTableProvider.table].join("/");
     let startedQ = false;
     // set geofilter
     let areaFilter = this.filterProvider.geoFilter;
     if (areaFilter !== "") {
       startedQ = true;
       url += "?area=" + areaFilter;
     }

     // set other filters
     let customF = this.filterProvider.filters.compile();
     url += ((startedQ) ? "&" : "?") + "f=" + customF;
     console.log("Querying: " + url);
     return url;
  }

}


let errorFn = (err) => {
  console.log("Error tring to fetch rows: " + JSON.stringify(err));
};
