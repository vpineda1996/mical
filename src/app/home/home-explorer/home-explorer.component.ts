import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {FilterProviderService} from '../../services/filter-provider.service';
import {INTERVENTION_KEY} from '../../util/constants';
import {HOME_SEARCH, FILTER_UPDATE} from '../../util/constants';

@Component({
  selector: 'app-home-explorer',
  templateUrl: './home-explorer.component.html',
  styleUrls: ['./home-explorer.component.css']
})
export class HomeExplorerComponent implements OnInit {


  constructor(public dialog: MatDialog) {
    if (window.innerWidth < 1152) // smallest macbook width dimension
      this.openDialog();
  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    
  }

  onApply(f: {[section: string]: string[]}) {
    // only updateMapData from home page apply if a filter value has been changed 
    if (this.getFilterUpdateStorage() === "true") {
      this.setHomeSearchStorage("true");
      this.setFilterUpdateStorage("false");
    }
  }

  openDialog() {
    this.dialog.open(Warning);
  }

  // helpers for global session storage 
  private getFilterUpdateStorage() {
    let isFilterChanged = window.sessionStorage.getItem(FILTER_UPDATE);
    if (isFilterChanged === null) {
      window.sessionStorage.setItem(FILTER_UPDATE, "false");
      return "false"
    }
    console.log(isFilterChanged)
    return isFilterChanged;
  }

  private setHomeSearchStorage(isFilterChanged) {
    window.sessionStorage.setItem(HOME_SEARCH, isFilterChanged);
  }

  private setFilterUpdateStorage(isFilterChanged) {
    window.sessionStorage.setItem(FILTER_UPDATE, isFilterChanged);
  }

}

@Component({
  selector: 'warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})
export class Warning {}
