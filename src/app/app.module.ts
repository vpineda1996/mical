import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ChartProviderService } from './services/chart-provider.service';
import { ColorProviderService } from './services/color-provider.service';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { Overlay } from '@angular/cdk/overlay';


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
    HomeModule,

    SharedModule.forRoot()
  ],
  providers: [
    ColorProviderService,
    ChartProviderService,
    Overlay
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
