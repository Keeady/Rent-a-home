import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PropertyService} from '../../lib/services/property.service';

@Component({
    templateUrl: './address-search.component.html',
    selector: 'app-address-search'
})
export class AddressSearchComponent {
    @Input() address: string;
    @Input() city: string;
    @Input() state: string;
    @Input() zip: string;
    @Output() addressSearchEvent: EventEmitter<any> = new EventEmitter();

    properties = [];
    usedLat = [];
    usedLng = [];
    markers = [];
    markerClusters = [];

    constructor(private propertyService: PropertyService) {}

    searchAddress(address: string): void {
        this.markers = [];
        const promise = this.propertyService.searchPropertiesByAddress(this.address, this.city, this.state, this.zip);
        if (!promise) {
            return;
        }

        promise.subscribe(data => {
            const results = data['body']['response'];
            if (!results) {
                return false;
            }

            for (let i = 0; i < results.length; i++) {
                const marker = this.parsePropertyDetails(results[i]);
                this.markers.push(marker);
            }

            this.addressSearchEvent.emit(this.markers);
        });
    }

    protected parsePropertyDetails(property: any): Object {
        const zpid = property['zpid'];
        this.properties[zpid] = property;

        const marker = {
            lat: Number(property['address'].latitude),
            lng: Number(property['address'].longitude),
            title: property['bedrooms'] + ' BD ' + property['bathrooms'] + ' Bath, ' +
            property['finishedSqFt'] + ' Sq Ft',
            draggable: false,
            zpid: property['zpid']
        };

        if (this.usedLat[marker.lat] && this.usedLng[marker.lng]) {
            return;
        }

        if (!this.usedLat[marker.lat]) {
            this.usedLat[marker.lat] = [marker.zpid];
        }

        if (!this.usedLng[marker.lng]) {
            this.usedLng[marker.lng] = [marker.zpid];
        }

        return marker;
    }
}
