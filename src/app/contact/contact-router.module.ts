import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactHolderComponent } from './contact-holder/contact-holder.component';

const routes: Routes = [
  {
    path: '',
    component: ContactHolderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }