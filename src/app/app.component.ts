import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    addressMarkers = [];

    // {lat: 40.730610, lng: -73.935242};
    // default location
    userLocation: object = {lat: 37.774929, lng: -122.419416};

    onAddressSearchEvent(addressMarkers) {
        this.addressMarkers = addressMarkers;
    }

    onMapReadyEvent() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position: Position) => {
                this.userLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
            });
        }
    }
}
