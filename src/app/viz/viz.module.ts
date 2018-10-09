import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HistogramComponent} from './histogram/histogram.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HistogramComponent
  ],
  exports: [
    HistogramComponent
  ]
})
export class VizModule { }
