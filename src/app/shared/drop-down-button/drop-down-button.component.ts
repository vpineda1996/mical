import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {BUTTON_ID} from '../filter-bar/filter-bar.component';
import {Observable} from 'rxjs';
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

  activeSelection = false;
  protected searchString = "";

  protected selectedOpts : {[key:string]: boolean} = {};

  @Input("selection")
  get selection() {
    return this.selectedOpts;
  }

  @Output("selection") 
  selectedChange = new EventEmitter<{[key:string]: boolean}>();
  set selection(opts: {[key:string]: boolean}) {
    if (opts) {
      this.selectedOpts = opts;
      this.selectedChange.emit(this.selectedOpts);
    }
  }

  protected existingSelection = false;

  @Input()
  opts$ : Observable<string[]>;

  @Input()
  onOptSelected = (id: BUTTON_ID, selctedOpts: string[]) => {};

  protected closeDropDown(e: Event) {
    this.activeSelection = false;
    this.selection = (this.sl) ? this.sl.selected : undefined;
    this.onOptSelected(this.id, Object.keys(this.selectedOpts));
    e.stopPropagation();
  }

  protected sinkClickEvents(e: Event) {
    e.stopPropagation();
  }

  protected getSelection(): string[] {
    return Object.keys(this.selectedOpts)
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

  protected onApplyClick(event: Event) {
    this.selection = (this.sl) ? this.sl.selected : undefined;
    this.onOptSelected(this.id, Object.keys(this.selectedOpts));
    this.activeSelection = false;
    event.stopPropagation();
  }

  protected onClearClick(event: Event) {
    // clear selection
    this.selection = {};
    event.stopPropagation();
  }

  constructor() {

  }

  ngOnInit() {
    window.addEventListener('click', this.closeDropDown.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('click', this.closeDropDown.bind(this));
  }


}
