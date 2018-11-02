import {Injectable} from '@angular/core';
import { GoogleMapsService } from 'google-maps-angular2';
declare var MarkerClusterer: any;

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
         * @return Promise<any>
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
            zoom: 8,
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

        const self = this;
        marker.addListener('click', function (e) {
            console.log(e.latLng.lat(), e.latLng.lng());
        });

        return map;
    }

    protected createMarker(map, lat, lng, markerTitle) {
        return new map.Marker({
            position: {lat: lat, lng: lng},
            title: markerTitle
        });
    }

    protected addMarkerListener(marker, eventName, callback) {
        marker.addListener(eventName, callback);
        return marker;
    }

    public displayMarker(mapObj, markerList, eventName, callback) {
        const self = this;
        return markerList.map(function(marker) {
            if (marker) {
                const markerObj = self.createMarker(mapObj, marker.lat, marker.lng, marker.title);
                return self.addMarkerListener(markerObj, eventName, callback);
            }
        }, this);
    }

    public createMarkerCluster(map, markers: any): any {
        return new MarkerClusterer(map, markers,
            {imagePath: 'http://localhost:4200/assets/images/m'});
    }
}
