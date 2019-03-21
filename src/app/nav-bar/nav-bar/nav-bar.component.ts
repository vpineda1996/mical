import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Input()
  view: NavBarView = NavBarView.HOME;

  constructor() { }

  ngOnInit() {
  }

}

export enum NavBarView {
  HOME = 0,
  ABOUT = 1,
  EXPLORE = 2,
  CONTACT = 3,
}
