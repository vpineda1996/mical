import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterBarComponent} from './filter-bar/filter-bar.component';
import {MatButtonModule, MatInputModule} from '@angular/material';
import {DropDownButtonComponent} from './drop-down-button/drop-down-button.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    FilterBarComponent,
    DropDownButtonComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,

    MatButtonModule,
    MatInputModule,
  ],
  exports: [
    MatButtonModule,
    FilterBarComponent,
    DropDownButtonComponent,
    MatInputModule
  ]
})
export class SharedModule { }
