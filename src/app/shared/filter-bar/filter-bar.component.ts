import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {

  ButtonIds = BUTTON_ID;
  selectedBtn = [false, false, false, false, false, false, false, false];
  selectHandlers = [this.onSelectCountry, this.onSelectIntervention, this.onSelectCrop,
    this.onSelectClimate, this.onSelectSoil, this.onSelectStudyDur, this.onApply, async () => {}];

  activeSelection: BUTTON_ID = BUTTON_ID.NONE;

  constructor() { }

  ngOnInit() {
  }

  async onSelectButton(btnId: BUTTON_ID) {
    // highlight current button
    if (btnId != BUTTON_ID.APPLY)
      this.selectedBtn[btnId] = !this.selectedBtn[btnId];

    // wait to see the user's answer
    await this.selectHandlers[btnId]();

    // check if we should highlight button
    this.selectedBtn[BUTTON_ID.APPLY] = this.selectedBtn.some((v, idx) => v && idx != BUTTON_ID.APPLY);
  }

  async onSelectCountry() {

  }

  async onSelectIntervention() {


  }

  async onSelectCrop() {

  }

  async onSelectClimate() {

  }

  async onSelectSoil() {

  }

  async onSelectStudyDur() {

  }

  async onApply() {

  }

}

export enum BUTTON_ID {
  COUNTRY, INTERVENTION, CROP, CLIMATE, SOIL, DURATION, APPLY, NONE
}
