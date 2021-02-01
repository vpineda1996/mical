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

    this.map.on('mouseenter', 'clusters',  () => {
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

      // todo vpineda set the right type here
      let feature: any = e.features[0];


      let coordinates = feature.geometry.coordinates.slice();
      let description = "<div>Hello!</div>";

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // Populate the popup and set its coordinates
      // based on the feature found.
      // todo vpineda setup popup
      // popup.setLngLat(coordinates)
      //   .setHTML(description)
      //   .addTo(this.map);
    };

    let mouseLeaveHandler = (e) => {
      // this.map.getCanvas().style.cursor = '';
      // popup.remove();
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
}
