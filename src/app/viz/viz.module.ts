import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HistogramComponent} from './histogram/histogram.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
  ],
  declarations: [
    HistogramComponent
  ],
  exports: [
    HistogramComponent,
    MatCardModule
  ]
})
export class VizModule { }
