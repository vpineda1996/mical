import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {FilterProviderService} from '../../services/filter-provider.service';
import {INTERVENTION_KEY} from '../../util/constants';

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

  }

  openDialog() {
    const dialogRef = this.dialog.open(Warning);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})
export class Warning {}
