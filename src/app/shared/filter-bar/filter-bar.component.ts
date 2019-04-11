import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Comparator, CompoundFilter, RegexFilter} from '../../model/filters';
import {InterventionProviderService} from '../../services/intervention-provider.service';
import {element} from 'protractor';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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

  interventions$: Observable<string[]> =
    this.interventionProvider.allInterventions.pipe(
      map(ints => ints.map(i => i.sKey))
    );

  @Output("onApply")
  applyEmitter = new EventEmitter();
  
  constructor(protected interventionProvider: InterventionProviderService) { }

  ngOnInit() {
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

    this.applyEmitter.emit(properties);

  }

}

export enum BUTTON_ID {
  COUNTRY, INTERVENTION, CROP, CLIMATE, SOIL, DURATION, APPLY, NONE
}
