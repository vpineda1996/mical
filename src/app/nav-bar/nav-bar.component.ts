import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router, RoutesRecognized} from '@angular/router';
import {filter, map, take} from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  view: NavBarView = NavBarView.home; 

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    router.events.pipe(
      filter((e) => (e instanceof NavigationStart)),
    ).subscribe((e) => {
      let rr = <NavigationStart> e;
      let place = rr.url.split("/")[1];
      if (place.includes('map'))
        place = 'map';
      this.view = NavBarView[place];
    });
  }

  ngOnInit() {
  }

  nav(loc: string) {
    this.router.navigate([loc]);
  }

}

export enum NavBarView {
  home = 0,
  about = 1,
  map = 2,
  contact = 3,
}
