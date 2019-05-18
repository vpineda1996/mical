import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VizModule } from '../viz/viz.module';
import { GraphicsHolderComponent } from './graphics-holder/graphics-holder.component';
import { MapExplorerHolderComponent } from './map-explorer-holder/map-explorer-holder.component';
import { MapExplorerModuleRoutingModule } from './map-explorer-router.module';
import { MapExplorerService } from './map-explorer.service';
import { MapHolderComponent } from './map-holder/map-holder.component';
import { SharedModule } from '../shared/shared.module';
import { ResultsComponent } from './results/results.component';
import {AngularResizedEventModule} from 'angular-resize-event';
import {GraphExplorerHolderComponent} from "./graph-explorer-holder/graph-explorer-holder.component";

@NgModule({
  imports: [
    MapExplorerModuleRoutingModule,
    CommonModule,
    FormsModule,
    VizModule,
    AngularResizedEventModule,
    
    SharedModule,
  ],
  declarations: [
    MapHolderComponent,
    GraphicsHolderComponent,
    MapExplorerHolderComponent,
    ResultsComponent,
    GraphExplorerHolderComponent,
  ],
  providers: [
    MapExplorerService
  ]
})
export class MapExplorerModule { }
