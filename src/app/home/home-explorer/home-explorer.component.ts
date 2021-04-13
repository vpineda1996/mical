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


  constructor() {
    if (window.innerWidth < 1152) // smallest macbook 
      alert('This site is best viewed on desktop for chrome');
  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    
  }

  onApply(f: {[section: string]: string[]}) {

  }

}
