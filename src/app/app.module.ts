import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {MapExplorerModule} from './map-explorer/map-explorer.module';
import {AppRoutingModule} from './app-routing.module';
import {DataProviderService} from './services/data-provider.service';
import {ColorProviderService} from './services/color-provider.service';
import {ChartProviderService} from './services/chart-provider.service';
import {QueryProviderService} from './services/query-provider.service';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
