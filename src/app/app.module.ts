import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapService } from '../lib/services/map.service';
import { GoogleMapsModule } from 'google-maps-angular2';
import { MapComponent } from './map/map.component';
import { AddressSearchComponent } from './address-search/address-search.component';
import { CommonModule } from '@angular/common';
import { PropertyService } from '../lib/services/property.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
      AppComponent,
      MapComponent,
      AddressSearchComponent
  ],
  imports: [
      BrowserModule,
      GoogleMapsModule.forRoot({
          url: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC_2OreLZVt7xI0LJGnvuy-u7URp7f0MKs'
      }),
      CommonModule,
      HttpClientModule
  ],
  providers: [
      MapService,
      PropertyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
