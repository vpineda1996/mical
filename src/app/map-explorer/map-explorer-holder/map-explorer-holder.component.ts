import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-explorer-holder',
  templateUrl: './map-explorer-holder.component.html',
  styleUrls: ['./map-explorer-holder.component.css']
})
export class MapExplorerHolderComponent implements OnInit {

  height = window.innerHeight;

  constructor() { }

  ngOnInit() {
  }

  getHeight(): string {
    return this.height + "px";
  }

}
