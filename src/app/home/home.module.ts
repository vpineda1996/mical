import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeExplorerComponent} from './home-explorer/home-explorer.component';
import {MatButtonModule} from '@angular/material';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    HomeExplorerComponent
  ],
  imports: [
    CommonModule,

    SharedModule,
  ]
})
export class HomeModule { }
