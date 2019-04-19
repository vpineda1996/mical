import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { FilterProviderService } from '../../services/filter-provider.service';
import { InterventionProviderService } from '../../services/intervention-provider.service';
import { OutcomeTableProviderService } from '../../services/outcome-table-provider.service';
import { YIELD_FILTER_COLS } from '../../util/constants';
import { boundingBox } from 'src/app/util/util.algo';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {

  ButtonIds = BUTTON_ID;
  selectedBtn = [false, false, false, false, false, false, false, false];

  filters = {
    country: {},
    intervention: {},
    crop: {},
    climate: {},
    soil: {},
    duration: {},
  };

  @Input()
  dropDownMargin = "60px";

  interventions$: Observable<string[]> =
    this.interventionProvider.allInterventions.pipe(
      map(ints => ints.map(i => i.sKey))
    );

  crops$: Observable<string[]>;
  climate$: Observable<string[]> ;
  soil$: Observable<string[]> ;
  duration$: Observable<string[]>;

  @Output("onApply")
  applyEmitter = new EventEmitter();
  
  constructor(private outcomeProvider: OutcomeTableProviderService,
              private interventionProvider: InterventionProviderService,
              private filterProvider: FilterProviderService) {
    let fn = (arr: string[]) => {
      if (arr == null) return {};
      return arr.reduce((a, str) => {
        a[str] = true;
        return a;
      }, {});
    };
    this.filters.crop = fn(this.filterProvider.enabledFilters(this.outcomeProvider.filterCols.CROP));
    this.filters.climate = fn(this.filterProvider.enabledFilters(this.outcomeProvider.filterCols.CLIMATE));
    this.filters.soil = fn(this.filterProvider.enabledFilters(this.outcomeProvider.filterCols.SOIL));
    this.filters.duration = fn(this.filterProvider.enabledFilters(this.outcomeProvider.filterCols.DURATION));
  }

  ngOnInit() {
    this.crops$ = this.filterProvider.filtersForCol(this.outcomeProvider.filterCols.CROP);
    this.climate$ = this.filterProvider.filtersForCol(this.outcomeProvider.filterCols.CLIMATE);
    this.soil$ = this.filterProvider.filtersForCol(this.outcomeProvider.filterCols.SOIL);
    this.duration$ = this.filterProvider.filtersForCol(this.outcomeProvider.filterCols.DURATION);
  }

  async onSelectButton(btnId: BUTTON_ID, selectedOpts: string[]) {

    // highlight current button
    if (btnId != BUTTON_ID.APPLY)
      this.selectedBtn[btnId] = !!selectedOpts.length;
    else {
      this.handleApply()
    }

    // check if we should highlight button
    this.selectedBtn[BUTTON_ID.APPLY] = this.selectedBtn.some((v, idx) => v && idx != BUTTON_ID.APPLY);
  }

  handleApply() {
    // todo vpineda country & duration filter

    let properties = Object.keys(this.filters).reduce((p, k) => {
      let sec = this.filters[k];
      p[k] = Object.keys(sec);
      return p;
    }, <{[section: string]: string[]}>{});

    // notify the filter provider of the new filters
    this.filterProvider.filterOn(this.outcomeProvider.filterCols.CROP, properties.crop);
    this.filterProvider.filterOn(this.outcomeProvider.filterCols.CLIMATE, properties.climate);
    this.filterProvider.filterOn(this.outcomeProvider.filterCols.SOIL, properties.soil);
    this.filterProvider.filterOn(this.outcomeProvider.filterCols.DURATION, properties.duration);


    let applyParams = {
      intervention: properties.intervention,
      // todo vpinda grab bbox of countries
      area: boundingBox([[0,0], [0, 10], [30, -1]]),
    }
    this.selectedBtn = this.selectedBtn.map( () => false );
    this.applyEmitter.emit(applyParams);
  }
}

export enum BUTTON_ID {
  COUNTRY, INTERVENTION, CROP, CLIMATE, SOIL, DURATION, APPLY, NONE
}
