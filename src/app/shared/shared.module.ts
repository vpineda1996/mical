import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterBarComponent} from './filter-bar/filter-bar.component';
import {MatButtonModule, MatInputModule, MatPseudoCheckboxModule, MatRippleModule} from '@angular/material';
import {DropDownButtonComponent} from './drop-down-button/drop-down-button.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MultiSelectListComponent } from './multi-select-list/multi-select-list.component';

@NgModule({
  declarations: [
    FilterBarComponent,
    DropDownButtonComponent,
    MultiSelectListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,

    MatButtonModule,
    MatInputModule,
    MatPseudoCheckboxModule,
    MatRippleModule
  ],
  exports: [
    MatButtonModule,
    FilterBarComponent,
    DropDownButtonComponent,
    MultiSelectListComponent,
    MatInputModule,
    MatRippleModule
  ]
})
export class SharedModule { }
