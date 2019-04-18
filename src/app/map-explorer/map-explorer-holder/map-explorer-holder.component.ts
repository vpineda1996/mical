import {Component, OnInit} from '@angular/core';
import { NavBarView } from 'src/app/nav-bar/nav-bar.component';

@Component({
  selector: 'app-map-explorer-holder',
  templateUrl: './map-explorer-holder.component.html',
  styleUrls: ['./map-explorer-holder.component.css']
})
export class MapExplorerHolderComponent implements OnInit {
  View = NavBarView;
  height = window.innerHeight;

  showGraphs = false;

  constructor() { }

  ngOnInit() {
  }

  getHeight(): string {
    return this.height + "px";
  }

}
