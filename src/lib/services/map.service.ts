import {Injectable} from '@angular/core';
import { GoogleMapsService } from 'google-maps-angular2';

@Injectable()
export class MapService {
    constructor (private mapApiService: GoogleMapsService) {
        this.mapApiService = mapApiService;
    }

    public createMap(): any {
        return this.initializeMap();
    }

    protected initializeMap() {
        /**
         * Init map api [google.maps]
         */
        return this.mapApiService.init;
    }

    /**
     * @param mapObj
     * @param {number} lat
     * @param {number} lng
     * @param mapElement
     */
    public displayMap(mapObj: any, lat: number, lng: number, mapElement: any): void {
        const center = new mapObj.LatLng(lat, lng);

        const map = new mapObj.Map(mapElement.nativeElement, {
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

        const marker = new mapObj.Marker({
            position: center,
            title: 'center',
            map: map
        });

        marker.addListener('click', function (e) {
            console.log('clciked ');
        });

        return map;
    }
}
