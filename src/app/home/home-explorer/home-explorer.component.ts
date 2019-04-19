import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FilterProviderService} from '../../services/filter-provider.service';
import {INTERVENTION_KEY} from '../../util/constants';

@Component({
  selector: 'app-home-explorer',
  templateUrl: './home-explorer.component.html',
  styleUrls: ['./home-explorer.component.css']
})
export class HomeExplorerComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {
  }

  onApply(f: {[section: string]: string[]}) {
    let fs: {[type: string]: string} = {};
    if (f['intervention'].length) {
      fs[INTERVENTION_KEY] = f['intervention'].join(",");
    }

    this.router.navigate(['map'], {
      queryParams: fs
    });
  }

}
