import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, ViewChild} from '@angular/core';
import {MapService} from '../../lib/services/map.service';

@Component({
    templateUrl: './map.component.html',
    selector: 'app-map-selector'
})
export class MapComponent implements AfterViewInit, OnChanges {
    @ViewChild('mapElement') mapElement: ElementRef;

    map: any;
    mapInstance: any;
    markers: any[] = [];
    @Input() markerLocations;
    @Input() userLocation;

    @Output() mapReadyEvent: EventEmitter<void> = new EventEmitter();
    @Output() mapClickedEvent: EventEmitter<object> = new EventEmitter();

    constructor(private mapService: MapService) {}

    ngAfterViewInit(): void {
        const mapInitPromise = this.displayMap();
        mapInitPromise.then( () => {
            this.centerMap(this.userLocation);
            this.mapReadyEvent.emit();
        });
    }

    ngOnChanges(e: any): void {
        if (e.markerLocations && this.markerLocations.length > 0) {
            this.displayMarkers();
        }

        if (e.userLocation) {
            this.clearMarkers(this.markers);
            this.centerMap(this.userLocation);
        }
    }

    displayMap(): Promise<any> {
        const mapInit = this.mapService.createMap();
        mapInit.then( (map) => {
            this.map = map;
            this.mapInstance = this.mapService.displayMap(map, this.userLocation.lat, this.userLocation.lng, this.mapElement);
        });

        return mapInit;
    }

    displayMarkers() {
        const r = this.mapService.displayMarker(this.map, this.markerLocations, 'click', function (e) {
            console.log(e.latLng.lat(), e.latLng.lng());
        });

        this.mapService.createMarkerCluster(this.mapInstance, r);
    }

    centerMap(location) {
        if (!this.mapInstance) {
            return;
        }

        this.mapService.centerMap(this.mapInstance, location.lat, location.lng);
        const marker = this.mapService.createMarker(this.map, location.lat, location.lng, location.title);
        this.markers.push(marker);
        const self = this;
        this.mapService.addMarkerListener(marker, 'click', function (e) {
            const geocodePromise = self.mapService.reverseGeocode(self.map, e.latLng.lat(), e.latLng.lng());
            self.mapClickedEvent.emit({lat: e.latLng.lat(), lng: e.latLng.lng(), geocodePromise: geocodePromise});
        });
        this.mapService.addMarker(marker, this.mapInstance);
    }

    clearMarkers(markers) {
        markers.forEach((item: any) => {
            item.setMap(null);
        });
    }
}
