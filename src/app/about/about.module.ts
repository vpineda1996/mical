import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutHolderComponent } from './about-holder/about-holder.component';
import { AboutRoutingModule } from './about-router.module';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [AboutHolderComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,

    // Material utils
    MatExpansionModule
  ]
})
export class AboutModule { }
