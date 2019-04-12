import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapExplorerHolderComponent } from './map-explorer-holder/map-explorer-holder.component';

const routes: Routes = [
  {
    path: '',
    component: MapExplorerHolderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapExplorerModuleRoutingModule { }