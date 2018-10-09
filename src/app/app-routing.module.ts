import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MapExplorerHolderComponent} from './map-explorer/map-explorer-holder/map-explorer-holder.component';

const routes: Routes = [
  {path: '', redirectTo: '/map', pathMatch: 'full' },
  {path: 'map', component: MapExplorerHolderComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})


export class AppRoutingModule { }
