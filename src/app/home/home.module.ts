import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeExplorerComponent } from './home-explorer/home-explorer.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    HomeExplorerComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
  ]
})
export class HomeModule { }
