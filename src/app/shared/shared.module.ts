import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterBarComponent} from './filter-bar/filter-bar.component';
import {MatButtonModule, MatInputModule, MatProgressSpinnerModule, MatPseudoCheckboxModule, MatRippleModule} from '@angular/material';
import {DropDownButtonComponent} from './drop-down-button/drop-down-button.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MultiSelectListComponent } from './multi-select-list/multi-select-list.component';
import {DataProviderService} from '../services/data-provider.service';
import {QueryProviderService} from '../services/query-provider.service';
import {InterventionProviderService} from '../services/intervention-provider.service';

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
    MatRippleModule,
    MatProgressSpinnerModule,
  ],

  exports: [
    MatButtonModule,
    FilterBarComponent,
    DropDownButtonComponent,
    MultiSelectListComponent,
    MatInputModule,
    MatRippleModule,
    MatProgressSpinnerModule,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        // Data providers
        DataProviderService,
        QueryProviderService,
        InterventionProviderService,
      ]
    };
  }
}
