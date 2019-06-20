import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GeoData, GeoJsonPoint} from '../model/map';
import {ColorProviderService} from '../services/color-provider.service';
import {DataProviderService} from '../services/data-provider.service';
import {MapExplorerHolderComponent} from './map-explorer-holder/map-explorer-holder.component';
import {CustomLngLatBounds} from "../util/typings";
import {FilterProviderService} from "../services/filter-provider.service";
import {BoundingBox} from "../util/util.algo";
import {CLUSTER_LAYER_NAME, CLUSTER_LAYER_TAGS_NAME, POINT_LAYER} from "../util/constants";


@Injectable({
  providedIn: MapExplorerHolderComponent
})
export class MapExplorerService {


  public boundsEvent: BehaviorSubject<CustomLngLatBounds>;

  constructor(private dataProvider: DataProviderService,
              private colorProvider: ColorProviderService,
              private filterProvider: FilterProviderService) {
    this.setupBoundeEvent();
  }

  getMarkers(): Observable<Array<GeoJsonPoint>> {
    const ret: Observable<Array<GeoJsonPoint>> = this.dataProvider.getGeoDataPoints().pipe(
      map((data: GeoData) => {
        return <GeoJsonPoint[]>data.datum.features;
      }));
    return ret;
  }

  getLayers(dataSourceId: string): {names: string[], layerDef: any[]} {
    // todo vpineda remove this harcoded thing
    const steps = [100, 200, 700];
    return {
      names: [CLUSTER_LAYER_NAME, CLUSTER_LAYER_TAGS_NAME, POINT_LAYER],
      layerDef: [
        this.buildClusterLayer(CLUSTER_LAYER_NAME, dataSourceId, steps),
        this.buildClusterDescLayer(CLUSTER_LAYER_TAGS_NAME, dataSourceId),
        this.buildPointLayer(POINT_LAYER, dataSourceId)
      ]
    };
  }

  private generateColorSteps(steps: number[], colorIdx: number): (number | string)[] {
    const arr = steps.map((currMax, idx) => {
      return [ this.colorProvider.getColor(idx + colorIdx), currMax];
    }).reduce((acc, cur) => {
      acc.push(...cur);
      return acc;
    });
    arr.push(this.colorProvider.getColor(colorIdx + arr.length - 1));
    return arr;
  }

  private buildClusterLayer(id: string, source: string, steps: number[]): any {
    return {
      id: id,
      type: "circle",
      source: source,
      filter: ["has", "point_count"],
      paint: {
        // Use step expressions (https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
        // with three steps to implement three types of circles:
        //   * Blue, 20px circles when point count is less than 100
        //   * Yellow, 30px circles when point count is between 100 and 750
        //   * Pink, 40px circles when point count is greater than or equal to 750
        "circle-color": [
          "step",
          ["get", "point_count"],
          ...this.generateColorSteps(steps, 0)
        ],
        "circle-radius": [
          "step",
          ["get", "point_count"],
          20,
          100,
          30,
          750,
          40
        ]
      }
    };
  }

  private buildClusterDescLayer(id: string, source: string): any {
    // todo vpineda maybe not harcode column for tag
    return {
      id: id,
      type: "symbol",
      source: source,
      filter: ["has", "point_count"],
      layout: {
        "text-field": "{point_count_abbreviated}",
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 12
      }
    };
  }

  private buildPointLayer(id: string, source: string): any {
    return {
      id: id,
      type: "circle",
      source: source,
      filter: ["!", ["has", "point_count"]],
      paint: {
        "circle-color": this.colorProvider.getColor(0),
        "circle-radius": 4,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff"
      }
    };
  }

  private setupBoundeEvent() {
    let gf = this.filterProvider.boundingBox;
    if (gf) {
      this.boundsEvent = new BehaviorSubject(gf);
    } else {
      this.boundsEvent = new BehaviorSubject(
        new BoundingBox(90, -180, -90, 180)
      );
    }

    this.filterProvider.announcer.subscribe((opts) => {
      if (opts.isMapUpdate) return;
      let bbox = this.filterProvider.boundingBox;
      this.boundsEvent.next(bbox);
    })
  }
}
