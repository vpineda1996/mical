import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-holder',
  templateUrl: './contact-holder.component.html',
  styleUrls: ['./contact-holder.component.css']
})
export class ContactHolderComponent implements OnInit {

  message = {
    from: "",
    email: "",
    msg: ""
  }

  constructor() { }

  ngOnInit() {
  }

}
