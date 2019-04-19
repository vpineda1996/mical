import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

import {Observable} from 'rxjs';
import 'flot';
import {HistogramData} from '../../model/datatypes';

declare var $: any;

@Component({
  selector: 'viz-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.css']
})
export class HistogramComponent implements OnInit, AfterViewInit {

  @Input()
  histogramDfn: HistogramData;

  constructor() { }

  ngOnInit() {

  }

  @ViewChild('histogramCanvas') canvas: ElementRef;
  @ViewChild('histogramHolder') holder: ElementRef;

  ngAfterViewInit(): void {
    this.chart();
  }


  async chart() {
    $.plot(this.holder.nativeElement, [this.histogramDfn.bar, this.histogramDfn.dist]);
  }



}
