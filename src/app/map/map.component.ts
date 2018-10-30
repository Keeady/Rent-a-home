import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {MapService} from '../../lib/services/map.service';

@Component({
    templateUrl: './map.component.html',
    selector: 'app-map-selector'
})
export class MapComponent implements AfterViewInit {
    @ViewChild('mapElement') mapElement: ElementRef;
    // default center of map
    lat = 40.730610;
    lng = -73.935242;
    map: any;

    constructor(private mapService: MapService) {}

    ngAfterViewInit(): void {
        this.displayMap();
    }

    displayMap(): void {
        const mapInit = this.mapService.createMap();
        mapInit.then( (map) => {
            this.map = map;
            this.mapService.displayMap(map, this.lat, this.lng, this.mapElement);
        });
    }
}
