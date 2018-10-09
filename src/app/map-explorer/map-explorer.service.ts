import { Injectable } from '@angular/core';
import {MapExplorerModule} from './map-explorer.module';
import {GeoJson} from '../model/map';
import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: MapExplorerModule
})
export class MapExplorerService {

  constructor() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  getMarkers(): Observable<Array<GeoJson>> {
    return of([new GeoJson([0, 0], {
      message: "hello",
    })]);
  }

  createMarker(newMarker: GeoJson) {

  }

  removeMarker($key: string) {

  }
}
