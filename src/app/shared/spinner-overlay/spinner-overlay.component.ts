import { Component } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-spinner-overlay',
  templateUrl: './spinner-overlay.component.html',
  styleUrls: ['./spinner-overlay.component.css'],
})
export class SpinnerOverlayComponent {
  constructor(private spinner: NgxSpinnerService) {}
  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();
  }
}