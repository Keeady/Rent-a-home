import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class PropertyService {
    apiUrl: string;

    constructor(private http: HttpClient) {
        this.http = http;
        this.apiUrl = environment.apiUrl;
    }

    public searchPropertiesByAddress(address: string, city: string, state: string, zip: string) {
        const citystatezip = zip ? zip : city + ' ' + state;
        const query = 'address=' + encodeURIComponent(address) + '&citystatezip=' +
            encodeURIComponent(citystatezip);

        return this.http.get(`${this.apiUrl}/homes/?${query}`, {observe: 'response'});
    }

}
