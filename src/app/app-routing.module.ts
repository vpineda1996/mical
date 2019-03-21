import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MapExplorerHolderComponent} from './map-explorer/map-explorer-holder/map-explorer-holder.component';
import {HomeExplorerComponent} from './home/home-explorer/home-explorer.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeExplorerComponent},
  {path: 'map', component: MapExplorerHolderComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})


export class AppRoutingModule { }
