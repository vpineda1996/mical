import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeExplorerComponent} from './home-explorer/home-explorer.component';
import {MatButtonModule} from '@angular/material';

@NgModule({
  declarations: [
    HomeExplorerComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
  ]
})
export class HomeModule { }
