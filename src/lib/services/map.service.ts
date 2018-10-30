import {Injectable} from '@angular/core';
import { GoogleMapsService } from 'google-maps-angular2';

@Injectable
export class MapService {
    constructor (private mapApiService: GoogleMapsService) {
        this.mapApiService = mapApiService;
    }

    public createMap(lat: number, lng: number, mapElement: any): any {
        return this.initializeMap(lat, lng, mapElement);
    }

    protected initializeMap(lat: number, lng: number, mapElement: any): any {
        /**
         * Init map api [google.maps]
         */
        return this.mapApiService.init();
    }

    public displayMap(mapObj: any, lat: number, lng: number, mapElement: any): void {
        const center = new mapObj.LatLng(lat, lng);

        return new mapObj.Map(mapElement.nativeElement, {
            zoom: 13,
            center: center,
            scrollwheel: false,
            panControl: false,
            mapTypeControl: false,
            zoomControl: true,
            streetViewControl: false,
            scaleControl: true,
            zoomControlOptions: {
                style: mapObj.ZoomControlStyle.LARGE,
                position: mapObj.ControlPosition.RIGHT_BOTTOM
            },
            gestureHandling: 'cooperative'
        });
    }
}
