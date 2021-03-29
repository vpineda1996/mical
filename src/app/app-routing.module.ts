import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeExplorerComponent } from './home/home-explorer/home-explorer.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeExplorerComponent,
  },
  {
    path: 'map',
    loadChildren: './map-explorer/map-explorer.module#MapExplorerModule'
  },
  {
    path: 'about',
    loadChildren: './about/about.module#AboutModule'
  },
  {
    path: 'contact', 
    loadChildren: './contact/contact.module#ContactModule'
  },
  {path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})


export class AppRoutingModule { }
