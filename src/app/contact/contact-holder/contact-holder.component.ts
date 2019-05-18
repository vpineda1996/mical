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

  onSubmit(e: Event) {
    alert(`NOT IMPLEMENTED \n\
    FROM: ${this.message.from}\n\
    EMAIL: ${this.message.email}\n\
    msg: ${this.message.msg}, try using email instead!`)
  }

}
