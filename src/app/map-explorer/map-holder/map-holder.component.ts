import {Component, OnInit} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {Observable} from 'rxjs';
import {GeoJsonPoint, PointCollection} from '../../model/map';
import {FilterProviderService} from '../../services/filter-provider.service';
import {MapExplorerService} from '../map-explorer.service';
import {environment} from 'src/environments/environment.prod';
import {CLUSTER_LAYER_NAME, POINT_LAYER} from "../../util/constants";
import {MapboxEvent} from "mapbox-gl";
import { SpinnerOverlayService } from '../../services/spinner-overlay.service';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-map-holder',
  templateUrl: './map-holder.component.html',
  styleUrls: ['./map-holder.component.css']
})
export class MapHolderComponent implements OnInit {

  /// default settings
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/satellite-streets-v11';
  lat = 37.75;
  lng = -122.41;
  message = 'Hello World!';

  // data
  source: any;
  markers$: Observable<Array<GeoJsonPoint>>;

  constructor(private mapService: MapExplorerService,
              private filterProviderService: FilterProviderService) { 
    // @ts-ignore
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  ngOnInit() {
    this.markers$ = this.mapService.getMarkers();
    this.initializeMap();
  }

  onResize(e: Event) {
    setTimeout(() => {
      if (this.map) this.map.resize();
    }, 100);
  }

  private initializeMap() {
    /// locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.map.flyTo({
          center: [this.lng, this.lat]
        });
      });
    }

    this.buildMap();

  }

  setupClusterListeners() {
    // inspect a cluster on click
    this.map.on('click', CLUSTER_LAYER_NAME,  (e) => {
      let features: any = this.map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
      let clusterId = features[0].properties.cluster_id;
      this.source.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err)
          return;

        this.map.easeTo({
          center: features[0].geometry.coordinates,
          zoom: zoom
        });
      });
    });

    this.map.on('mouseenter', 'clusters',  (e) => {
      this.map.getCanvas().style.cursor = 'pointer';
    });
    this.map.on('mouseleave', 'clusters',  () => {
      this.map.getCanvas().style.cursor = '';
    });
  }

  setupTooltip() {
    let popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    let mouseEnterHandler = (e) => {
      // Change the cursor style as a UI indicator.
      this.map.getCanvas().style.cursor = 'pointer';

      let feature: any = e.features[0];
      let dataArray = e.features;
      let data: any = feature.properties;

      try {
        // using set to remove duplicates
        let locationSet: Set<String>  = new Set();
        let interventionNameSet: Set<String> = new Set();
        let authorSet: Set<String>  = new Set();
        let cropSet: Set<String>  = new Set();
  
        for (data of dataArray) {
          let properties = data.properties;
          let filterCols = JSON.parse(properties.filterCols);
          let location = properties.location;
          let interventionName = properties.interventionName;
          let author = filterCols.author;
          let crop = filterCols.crop;
          locationSet.add(location);
          interventionNameSet.add(interventionName);
          authorSet.add(author);
          cropSet.add(crop);
        }
        
        // switching back to array as set cannot use .map
        let locationArray = Array.from(locationSet);
        let interventionNameArray = Array.from(interventionNameSet);
        let authorArray = Array.from(authorSet);
        let cropArray = Array.from(cropSet);

        let coordinates = feature.geometry.coordinates.slice();
        let description = `
        <div>
        <h3 style="color: #4B6ECB; font-size: 16px; font-family: Source Sans Pro;">STUDY DETAILS</h3>
        <ul style="list-style-type:none; font-weight: 600; font-family: Source Sans Pro; font-size: 14px; 
                                      padding-left: 0; word-wrap: break-word;" >
                            <li style="margin: 10px 0;">INTERVENTION:${interventionNameArray.map(i => ' ' + i)}</li>                    
                            <li style="margin: 10px 0;">CROP: ${cropArray.map(i => ' ' + this.capitalizeFirstLetter(i))}</li>
                            <li style="margin: 10px 0;">LOCATION: ${locationArray.map(i => ' ' + i)}</li>
                            <li style="margin: 10px 0;">DOI: ${authorArray.map(i => ' ' + i)}</li>
                           </ul></div>`;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        // todo vpineda setup popup
        popup.setLngLat(coordinates)
          .setHTML(description)
          .addTo(this.map);

      // catching case where our selected keys arent in the object, this will usually occur
      // when you are still in a cluster feature
      } catch (err) {
        console.log("hovering over cluster");
      }
    };

    let mouseLeaveHandler = () => {
      this.map.getCanvas().style.cursor = '';
      popup.remove();
    }

    this.map.on('mouseenter', POINT_LAYER, mouseEnterHandler);
    this.map.on('mouseleave', POINT_LAYER, mouseLeaveHandler);

    this.map.on('mouseenter', CLUSTER_LAYER_NAME, mouseEnterHandler);
    this.map.on('mouseleave', CLUSTER_LAYER_NAME, mouseLeaveHandler);
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 1,
      center: [this.lng, this.lat]
    });


    /// Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());


    /// Add realtime dataService data on map load
    this.map.on('load', (event) => {

      /// register source
      this.map.addSource('places', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        },
        cluster: true,
        clusterMaxZoom: 12, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
      });

      this.map.on('move', () => {
        this.filterProviderService.setGeoFilter(this.map.getBounds());
      });



      this.mapService.boundsEvent.subscribe((bbox) => {
        this.map.fitBounds([
          [bbox.getWest(), bbox.getNorth()],
          [bbox.getEast(), bbox.getSouth()]
        ]);
      });

      /// get source
      this.source = this.map.getSource('places');

      /// subscribe to realtime database and set data source
      this.markers$.subscribe(markers => {
        const data = new PointCollection(markers);
        this.source.setData(data);
      });


      /// create map layers with realtime data
      const layers = this.mapService.getLayers('places');
      layers.layerDef.map((layer, idx) => {
          this.map.addLayer(layer);
        }
      );
    });

    this.setupClusterListeners();
    this.setupTooltip();

  }


  /// Helpers

  flyTo(data: GeoJsonPoint) {
    this.map.flyTo({
      center: <[number, number]>data.geometry.coordinates
    });
  }

  capitalizeFirstLetter(string: String) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
