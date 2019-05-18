import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ColorProviderService} from '../../services/color-provider.service';
import {DataProviderService} from 'src/app/services/data-provider.service';
import {map} from 'rxjs/operators';
import {HistogramData} from '../../model/datatypes';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-graphics-holder',
  templateUrl: './graphics-holder.component.html',
  styleUrls: ['./graphics-holder.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class GraphicsHolderComponent implements OnInit {

  @Input()
  histogramClassStyle = "pure-u-1";

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
