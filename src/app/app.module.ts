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
import { HomeExplorerComponent } from './home/home-explorer/home-explorer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule, MatButtonModule} from '@angular/material';
import {HomeModule} from './home/home.module';
import {AboutModule} from './about/about.module';
import {ContactModule} from './contact/contact.module';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,

    // material imports
    // views modules
    MapExplorerModule,
    HomeModule,
    AboutModule,
    ContactModule
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
