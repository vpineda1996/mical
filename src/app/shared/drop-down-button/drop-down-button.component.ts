import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BUTTON_ID} from '../filter-bar/filter-bar.component';

@Component({
  selector: 'app-drop-down-button',
  templateUrl: './drop-down-button.component.html',
  styleUrls: ['./drop-down-button.component.css']
})
export class DropDownButtonComponent implements OnInit, OnDestroy {

  @Input()
  id: BUTTON_ID;

  @Input()
  selected = false;

  protected activeSelection = false;
  protected searchString = "";

  protected existingSelection = false;

  @Input()
  onOptSelected = (id: BUTTON_ID, selctedOp: string) => {};

  protected clearListener(e: Event) {
    this.activeSelection = false;
  }

  protected sinkClickEvents(e: Event) {
    e.stopPropagation();
  }

  protected onButtonClick(event: Event) {
    this.activeSelection = true;

    // todo vpineda, active selection
    this.onOptSelected(this.id, "A");

    event.stopPropagation();
  }

  protected onActiveInput(event: Event) {
    let keyE = <KeyboardEvent> event;
    if (keyE.key == "Enter") {
      this.activeSelection = false;
      // todo vpineda new search
    }
  }

  protected onApplyClick(event: Event) {
    // todo vpineda

    event.stopPropagation();
  }

  protected onClearClick(event: Event) {
    // todo vpineda
    event.stopPropagation();
  }

  constructor() {

  }

  ngOnInit() {
    window.addEventListener('click', this.clearListener.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('click', this.clearListener.bind(this));
  }

}
