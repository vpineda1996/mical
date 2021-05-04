import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild('histogramHolder', { static: true }) holder: ElementRef;

  ngAfterViewInit(): void {
    this.chart();
  }

  buildBar() {
    return {
      data: this.histogramDfn.bar,
      label: this.histogramDfn.title,
      color: "#FFB03A",
      bars: {
        show: true,
        fill: 1,
        align: "center",
        lineWidth: 0,
        barWidth: 1,
      }
    };
  }

  buildBaseline() {
    return {
      data: [0,0],
      color: "#4B6ECB",
      bars: {
        show: true,
        fill: 1,
        align: "center",
        lineWidth: 1,
        barWidth: 1,
      }
    };
  }

  buildDensity() {
    return {
      data:  this.histogramDfn.dist,
      color: "black",
      yaxis: 1,
      lines: {
        show: true,
        lineWidth: 1,
        fill: 1,
        fillColor: {colors: ["#FFFFFF00", "#4B6ECBF0"]}
      },
    };
  }


  async chart() {
    let opts = {
      series: {},
      xaxis: {
        tickFormatter: (n) => Math.round(n * 100) + "%",
        showMinorTicks: false,
        font: {
          family: "Roboto",
          weight: "bold"
        },
        tickLength: 0
      },
      yaxis: {
        gridLines: false,
        showMinorTicks: false,
        font: "Roboto",
        tickLength: 0
      },
      grid: {
        borderWidth: 0,
        tickColor: (t, axis, ctx: CanvasRenderingContext2D) => {
          ctx.lineCap = "round";
          if (t.v == 0) return "#4B6ECB";
          return "#D8D8D8";
        },
        tickWidth: (t, axis) => {
          if (t.v == 0) return 5;
          return 1;
        }
      },
    };
    console.log(this.buildBar())
    $.plot(this.holder.nativeElement, [this.buildBar(), this.buildBaseline(), this.buildDensity()], opts);
  }
}
