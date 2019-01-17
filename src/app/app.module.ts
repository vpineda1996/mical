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
    DataProviderService,
    ColorProviderService,
    FilterProviderService,
    ChartProviderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
