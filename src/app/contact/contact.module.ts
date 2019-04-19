import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactHolderComponent } from './contact-holder/contact-holder.component';
import { ContactRoutingModule } from './contact-router.module';

@NgModule({
  declarations: [ContactHolderComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
  ]
})
export class ContactModule { }
