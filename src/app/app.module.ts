import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapService } from '../lib/services/map.service';
import {GoogleMapsModule} from 'google-maps-angular2';
import {MapComponent} from './map/map.component';

@NgModule({
  declarations: [
      AppComponent,
      MapComponent
  ],
  imports: [
      BrowserModule,
      GoogleMapsModule.forRoot({
          url: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC_2OreLZVt7xI0LJGnvuy-u7URp7f0MKs'
      })
  ],
  providers: [
      MapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
