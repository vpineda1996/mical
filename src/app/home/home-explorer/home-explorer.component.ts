import {Component, Input, OnInit} from '@angular/core';
import {Filter} from '../../model/filters';
import {Router} from '@angular/router';
import {FilterProviderService} from '../../services/filter-provider.service';
import {INTERVENTION_KEY} from '../../util/constants';

@Component({
  selector: 'app-home-explorer',
  templateUrl: './home-explorer.component.html',
  styleUrls: ['./home-explorer.component.css']
})
export class HomeExplorerComponent implements OnInit {


  constructor(private router: Router, private filter: FilterProviderService) { }

  ngOnInit() {
  }

  onApply(f: {[section: string]: string[]}) {
    this.router.navigate(['map'], {
      queryParams: {
        [INTERVENTION_KEY]: f['intervention'].join(","),
      }
    });
  }

}
