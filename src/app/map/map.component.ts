import {AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild} from '@angular/core';
import {MapService} from '../../lib/services/map.service';

@Component({
    templateUrl: './map.component.html',
    selector: 'app-map-selector'
})
export class MapComponent implements AfterViewInit, OnChanges {
    @ViewChild('mapElement') mapElement: ElementRef;

    // default center of map
    lat = 40.730610;
    lng = -73.935242;
    map: any;
    mapInstance: any;
    @Input() markers;

    constructor(private mapService: MapService) {}

    ngAfterViewInit(): void {
        this.displayMap();
    }

    ngOnChanges(): void {
        if (this.markers.length > 0) {
            this.displayMarkers();
        }
    }

    displayMap(): void {
        const mapInit = this.mapService.createMap();
        mapInit.then( (map) => {
            this.map = map;
            this.mapInstance = this.mapService.displayMap(map, this.lat, this.lng, this.mapElement);
        });
    }

    displayMarkers() {
        const r = this.mapService.displayMarker(this.map, this.markers, 'click', function (e) {
            console.log(e.latLng.lat(), e.latLng.lng());
        });
        console.log(r);

        const c = this.mapService.createMarkerCluster(this.mapInstance, r);
        console.log(c);

    }
}
