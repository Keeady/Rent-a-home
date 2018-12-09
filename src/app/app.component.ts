import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    addressMarkers = [];
    zip;

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

    onMapClickedEvent(mapData) {
        mapData.geocodePromise.then((geocodeLocation) => {
            const postalCodeLocation = geocodeLocation.find((location) => {
                 return location.types.find((type) => {
                    return type === 'postal_code';
                });
            });

            if (postalCodeLocation) {
                const zip = postalCodeLocation.address_components.find((component) => {
                    return component.types.find((type) => {
                        return type === 'postal_code';
                    });
                });

                this.zip = zip.long_name;
            }

        });
    }
}
