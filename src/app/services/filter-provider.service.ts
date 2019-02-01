import {Injectable} from '@angular/core';
import {Filter} from '../model/filters';
import {Column} from '../model/datatypes';
import {ActivatedRoute} from '@angular/router';
import {DEFAULT_FILTERS, FILTERS_KEY} from '../util/constants';
import {LngLat, LngLatBounds} from 'mapbox-gl';
import {Subject} from 'rxjs';

class GeoFilter implements Filter {
  bnds: LngLatBounds;

  compile(): string {
    if (this.bnds === undefined) return "";
    return [this.bnds.getNorthEast(), this.bnds.getSouthEast(),
      this.bnds.getNorthWest(), this.bnds.getSouthWest()].map((loc) => {
        return loc.lat + "," + loc.lng;
    }).join(",");
  }
}

@Injectable({
  providedIn: 'root'
})
export class FilterProviderService {

  private _filters: Filter = DEFAULT_FILTERS;
  private _geoFilter: GeoFilter = new GeoFilter();
  public announcer: Subject<any> = new Subject();

  get filters() {
    return this._filters;
  }

  setGeoFilter(f: LngLatBounds) {
    this._geoFilter.bnds = f;
    this.announcer.next();
  }

  get geoFilter(): string {
    return this._geoFilter.compile();
  }

  constructor(private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe((qMap) => {
      if (qMap.has(FILTERS_KEY)) this._filters = this.parseFilterOpts(qMap.get(FILTERS_KEY));
    })
  }

  private parseFilterOpts(str: string): Filter {
    return DEFAULT_FILTERS;
  }

  filterOn(column: Column, filter: Filter) {

  }

}

