import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {MapExplorerModule} from './map-explorer/map-explorer.module';
import {AppRoutingModule} from './app-routing.module';
import {ColorProviderService} from './services/color-provider.service';
import {ChartProviderService} from './services/chart-provider.service';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeModule} from './home/home.module';
import {AboutModule} from './about/about.module';
import {ContactModule} from './contact/contact.module';
import {SharedModule} from './shared/shared.module';

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
    ContactModule,

    SharedModule.forRoot()
  ],
  providers: [
    ColorProviderService,
    ChartProviderService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
