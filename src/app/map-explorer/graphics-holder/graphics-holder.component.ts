import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {HistogramDefinition} from '../../viz/model/Histogram';
import {ColorProviderService} from '../../services/color-provider.service';
import { DataProviderService } from 'src/app/services/data-provider.service';




@Component({
  selector: 'app-graphics-holder',
  templateUrl: './graphics-holder.component.html',
  styleUrls: ['./graphics-holder.component.css']
})
export class GraphicsHolderComponent implements OnInit {

  @Input()
  topOffset = 0;
  @Input()
  bottomOffset = 0;

  myHistDef: HistogramDefinition = {
    data: [
      {
        frequency: [20, 6],
        color: this.colorProvider.getColoursStartingAtIndex(0, 10),
        xPoint: -10
      },
      {
        frequency: [50, 70, 5, 1, 4, 1, 10, 20, 10, 10],
        color: this.colorProvider.getColoursStartingAtIndex(0, 10),
        xPoint: 20
      },
      {
        frequency: [30],
        color: this.colorProvider.getColoursStartingAtIndex(6, 10),
        xPoint: 30
      }
    ]
  };

  constructor(
    private elementRef: ElementRef, 
    public colorProvider: ColorProviderService) { }

  ngOnInit() {
  }

}
