import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutHolderComponent } from './about-holder/about-holder.component';

const routes: Routes = [
  {
    path: '',
    component: AboutHolderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }