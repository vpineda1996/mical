import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutHolderComponent } from './about-holder/about-holder.component';
import { AboutRoutingModule } from './about-router.module';

@NgModule({
  declarations: [AboutHolderComponent],
  imports: [
    CommonModule,
    AboutRoutingModule
  ]
})
export class AboutModule { }
