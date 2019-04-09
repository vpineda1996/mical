import {Component, Input, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-multi-select-list',
  templateUrl: './multi-select-list.component.html',
  styleUrls: ['./multi-select-list.component.css']
})
export class MultiSelectListComponent implements OnInit {

  @Input()
  list$: Observable<string[]>;

  selected : {[key:string]: boolean} = {};

  onClick(idx: string) {
    this.selected[idx] = !this.selected[idx];
  }

  constructor() { }

  ngOnInit() {
  }

}
