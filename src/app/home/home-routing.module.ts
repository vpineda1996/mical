import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeExplorerComponent } from './home-explorer/home-explorer.component';


const routes: Routes = [
  {
    path: '',
    component: HomeExplorerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }