import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MapExplorerModule} from './map-explorer/map-explorer.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MapExplorerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
