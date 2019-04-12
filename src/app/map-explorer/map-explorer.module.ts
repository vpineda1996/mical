import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VizModule } from '../viz/viz.module';
import { GraphicsHolderComponent } from './graphics-holder/graphics-holder.component';
import { MapExplorerHolderComponent } from './map-explorer-holder/map-explorer-holder.component';
import { MapExplorerModuleRoutingModule } from './map-explorer-router.module';
import { MapExplorerService } from './map-explorer.service';
import { MapHolderComponent } from './map-holder/map-holder.component';

@NgModule({
  imports: [
    MapExplorerModuleRoutingModule,
    CommonModule,
    FormsModule,
    VizModule,
    
  ],
  declarations: [
    MapHolderComponent,
    GraphicsHolderComponent,
    MapExplorerHolderComponent,
  ],
  providers: [
    MapExplorerService
  ]
})
export class MapExplorerModule { }
