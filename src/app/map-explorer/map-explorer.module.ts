import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapHolderComponent } from './map-holder/map-holder.component';
import { GraphicsHolderComponent } from './graphics-holder/graphics-holder.component';
import { MapExplorerComponent } from './map-explorer/map-explorer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MapHolderComponent,
    GraphicsHolderComponent,
    MapExplorerComponent],
  exports : [
    MapExplorerComponent
  ]
})
export class MapExplorerModule { }
