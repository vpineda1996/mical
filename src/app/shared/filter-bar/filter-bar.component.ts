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

  async onSelectButton(btnId: BUTTON_ID, selectedOpts: string[]) {
    // highlight current button
    if (btnId != BUTTON_ID.APPLY)
      this.selectedBtn[btnId] = !!selectedOpts.length;

    // wait to see the user's answer
    await this.selectHandlers[btnId](selectedOpts);

    // check if we should highlight button
    this.selectedBtn[BUTTON_ID.APPLY] = this.selectedBtn.some((v, idx) => v && idx != BUTTON_ID.APPLY);
  }

  async onSelectCountry(selectedOpts: string[]) {

  }

  async onSelectIntervention(selectedOpts: string[]) {


  }

  async onSelectCrop(selectedOpts: string[]) {

  }

  async onSelectClimate(selectedOpts: string[]) {

  }

  async onSelectSoil(selectedOpts: string[]) {

  }

  async onSelectStudyDur(selectedOpts: string[]) {

  }

  async onApply(ignore: string[]) {

  }

}

export enum BUTTON_ID {
  COUNTRY, INTERVENTION, CROP, CLIMATE, SOIL, DURATION, APPLY, NONE
}
