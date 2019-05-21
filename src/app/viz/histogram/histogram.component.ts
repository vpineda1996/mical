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

  buildBar() {
    return {
      data: this.histogramDfn.bar,
      label: this.histogramDfn.title,
      bars: {
        show: true,
        fill: 1,
        align: "center",
        lineWidth: 0,
        barWidth: 1,
      }
    };
  }

  buildDensity() {
    return {
      data:  this.histogramDfn.dist,
      yaxis: 1,
      lines: {
        show: true,
        lineWidth: 4,
        fill: 1,
        fillColor: {colors: [{ opacity: 0.1 }, { opacity: 0.8 }]}
      }
    };
  }


  async chart() {
    let opts = {
      series: {},
      xaxis: {},
      yaxis: {
        gridLines: false,
      },
      grid: {
        borderWidth: 0,
        tickColor: (t, axis) => {
          if (t.v == 0) return "#4B6ECB";
          return "#D8D8D8";
        }
      },
    };
    $.plot(this.holder.nativeElement, [this.buildBar(), this.buildDensity()], opts);
  }
}
