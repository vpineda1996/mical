import {Component, ElementRef, OnInit} from '@angular/core';
import {HistogramDefinition} from '../../viz/model/Histogram';


const defaultMatlabColors = [
  // Starting in R2014b	R2014a and Earlier
  "rgb(0,   114, 189)",
  "rgb(217, 83,  25)",
  "rgb(237, 177, 32)",
  "rgb(126, 47,  142)",
  "rgb(119, 172, 48)",
  "rgb(77,  190, 238)",
  "rgb(162, 20,  47)",
]

@Component({
  selector: 'app-graphics-holder',
  templateUrl: './graphics-holder.component.html',
  styleUrls: ['./graphics-holder.component.css']
})
export class GraphicsHolderComponent implements OnInit {

  myHistDef: HistogramDefinition = {
    data: [
      {
        frequency: [20, 6],
        color: defaultMatlabColors,
        xPoint: -10
      },
      {
        frequency: [50, 70, 5, 1, 4, 1, 10, 20, 10, 10],
        color: defaultMatlabColors,
        xPoint: 20
      },
      {
        frequency: [30],
        color: defaultMatlabColors,
        xPoint: 30
      }
    ]
  };

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
  }

}
