import {AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BUTTON_ID} from '../filter-bar/filter-bar.component';
import {of} from 'rxjs';
import {MultiSelectListComponent} from '../multi-select-list/multi-select-list.component';

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

  @ViewChild('search_bar') sb: ElementRef;

  @ViewChild('selection_list') sl: MultiSelectListComponent;

  protected activeSelection = false;
  protected searchString = "";

  protected existingSelection = false;

  opts$ = of(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"]);

  @Input()
  onOptSelected = (id: BUTTON_ID, selctedOpts: string[]) => {};

  protected clearListener(e: Event) {
    this.activeSelection = false;
  }

  protected sinkClickEvents(e: Event) {
    e.stopPropagation();
  }

  protected getSelection(): string[] {
    return (this.sl) ? Object.keys(this.sl.selected) : [];
  }

  protected onButtonClick(event: Event) {
    this.activeSelection = true;

    // delay focusing the element & allow element to render
    setTimeout(() => {
      if (this.activeSelection && this.sb.nativeElement) {
        this.sb.nativeElement.focus();
      }
    });
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
    this.onOptSelected(this.id, this.getSelection());
    event.stopPropagation();
  }

  protected onClearClick(event: Event) {
    // clear selection
    this.sl.selected = {};
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
