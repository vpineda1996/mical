import { Component, OnInit } from '@angular/core';
import {MapExplorerService} from '../map-explorer.service';
import * as mapboxgl from 'mapbox-gl';
import {Observable} from 'rxjs';
import {Feature, FeatureCollection} from 'geojson';
import {GeoJsonPoint, PointCollection} from '../../model/map';

@Component({
  selector: 'app-map-holder',
  templateUrl: './map-holder.component.html',
  styleUrls: ['./map-holder.component.css']
})
export class MapHolderComponent implements OnInit {

  /// default settings
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/satellite-v9';
  lat = 37.75;
  lng = -122.41;
  message = 'Hello World!';

  // data
  source: any;
  markers$: Observable<Array<GeoJsonPoint>>;

  constructor(private mapService: MapExplorerService) {
  }

  ngOnInit() {
    this.markers$ = this.mapService.getMarkers();
    this.initializeMap();
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

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 1,
      center: [this.lng, this.lat]
    });


    /// Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());


    //// Add Marker on Click
    this.map.on('click', (event) => {
      const coordinates = [event.lngLat.lng, event.lngLat.lat];
      const newMarker   = new GeoJsonPoint(<any> coordinates, { message: this.message });
      this.mapService.createMarker(newMarker);
    });


    /// Add realtime firebase data on map load
    this.map.on('load', (event) => {

      /// register source
      this.map.addSource('firebase', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });

      /// get source
      this.source = this.map.getSource('firebase');

      /// subscribe to realtime database and set data source
      this.markers$.subscribe(markers => {
        const data = new PointCollection(markers);
        this.source.setData(data);
      });


      /// create map layers with realtime data
      const layers = this.mapService.getLayers('firebase');
      layers.layerDef.map((layer, idx) => {
          this.map.addLayer(layer);
        }
      );
    });

  }


  /// Helpers

  removeMarker(marker) {
    this.mapService.removeMarker(marker.$key);
  }

  flyTo(data: GeoJsonPoint) {
    this.map.flyTo({
      center: <[number, number]>data.geometry.coordinates
    });
  }
}
