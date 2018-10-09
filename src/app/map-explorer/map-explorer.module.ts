import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapHolderComponent } from './map-holder/map-holder.component';
import { GraphicsHolderComponent } from './graphics-holder/graphics-holder.component';
import {MapExplorerService} from './map-explorer.service';
import { MapExplorerHolderComponent } from './map-explorer-holder/map-explorer-holder.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    MapHolderComponent,
    GraphicsHolderComponent,
    MapExplorerHolderComponent],
  exports : [
    MapExplorerHolderComponent
  ],
  providers: [
    MapExplorerService
  ]
})
export class MapExplorerModule { }
