import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {ColorProviderService} from '../../services/color-provider.service';
import { DataProviderService } from 'src/app/services/data-provider.service';
import {flatMap, map} from 'rxjs/operators';
import {HistogramData, MapData} from '../../model/datatypes';
import {Observable} from 'rxjs';




@Component({
  selector: 'app-graphics-holder',
  templateUrl: './graphics-holder.component.html',
  styleUrls: ['./graphics-holder.component.css']
})
export class GraphicsHolderComponent implements OnInit {

  myHistDefs$: Observable<HistogramData[]>;

  constructor(
    private dataProvider: DataProviderService,
    public colorProvider: ColorProviderService) {
    this.myHistDefs$ = this.dataProvider.getHistogramData().pipe(
      map(obj => {
        return Object.values(obj);
      })
    );
  }

  ngOnInit() {
  }

}
