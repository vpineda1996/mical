import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MapExplorerModule} from './map-explorer/map-explorer.module';
import { AppRoutingModule } from './app-routing.module';
import {DataProviderService} from './services/data-provider.service';
import {ColorProviderService} from './services/color-provider.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MapExplorerModule,
    AppRoutingModule
  ],
  providers: [
    DataProviderService,
    ColorProviderService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
