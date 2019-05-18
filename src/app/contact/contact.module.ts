import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactHolderComponent } from './contact-holder/contact-holder.component';
import { ContactRoutingModule } from './contact-router.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [ContactHolderComponent],
  imports: [
    CommonModule,
    FormsModule,

    ContactRoutingModule,
  ]
})
export class ContactModule { }
