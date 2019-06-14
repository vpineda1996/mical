import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Observable, of} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-multi-select-list',
  templateUrl: './multi-select-list.component.html',
  styleUrls: ['./multi-select-list.component.css']
})
export class MultiSelectListComponent implements OnInit, OnChanges {

  @Input()
  list$: Observable<string[]>;
  selectable: {name: string, visible: boolean}[] = [];

  @Input()
  selected : {[key:string]: boolean} = {};

  @Input()
  filterStr: string = "";

  protected onClick(idx: string) {
    if (this.selected[idx]) {
      delete this.selected[idx];
    } else {
      this.selected[idx] = true;
    }
  }

  protected buildSelectables(sList: string[]) {
    let trimedSearch = this.filterStr.trim().toLocaleLowerCase();
    this.selectable = sList
      .map(s => {
        return {
          name: s,
          visible:  s.toLocaleLowerCase().indexOf(trimedSearch) != -1
        }
      });
  }

  error: boolean = false;
  protected onLoadError(e? : HttpErrorResponse) {
    this.error = true;
  }

  constructor() {
  }

  ngOnInit() {
    if (this.list$) {
      this.list$.subscribe((array) => this.buildSelectables(array), this.onLoadError.bind(this));
    } else {
      this.onLoadError();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['filterStr']) {
      this.buildSelectables(this.selectable.map(e => e.name));
    }
  }

}
