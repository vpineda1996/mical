import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MapExplorerModule } from './map-explorer/map-explorer.module';
import { AppRoutingModule } from './app-routing.module';
import { DataProviderService } from './services/data-provider.service';
import { ColorProviderService } from './services/color-provider.service';
import { FilterProviderService } from './services/filter-provider.service';
import { ChartProviderService } from './services/chart-provider.service';
import {OutcomeTableProviderService} from './services/outcome-table-provider.service';
import {InterventionProviderService} from './services/intervention-provider.service';
import {QueryProviderService} from './services/query-provider.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MapExplorerModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ColorProviderService,
    ChartProviderService,

    // Data providers
    DataProviderService,
    QueryProviderService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
