import {AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
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

  opts$ = of([
    "basket",
    "flash",
    "feeling",
    "redundancy",
    "restrain",
    "decay",
    "amputate",
    "corn",
    "outline",
    "discipline",
    "glass",
    "orgy",
    "weakness",
    "selection",
    "fragrant",
    "ash",
    "reception",
    "healthy",
    "breathe",
    "arrangement"]);

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

  protected onActiveInput(event: Event) {
    let keyE = <KeyboardEvent> event;
    if (keyE.key == "Enter") {
      // todo vpineda new search
      return;
    }
  }

  protected onApplyClick(event: Event) {
    this.selection = (this.sl) ? this.sl.selected : undefined;;
    this.onOptSelected(this.id, Object.keys(this.selectedOpts));
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
