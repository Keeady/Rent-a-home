import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PropertyService {
    apiUrl = 'http://localhost:3000/api';

    constructor(private http: HttpClient) {
        this.http = http;
    }

    public searchPropertiesByAddress(address: string, city: string, state: string, zip: string) {
        const citystatezip = zip ? zip : city + ' ' + state;
        const query = 'address=' + encodeURIComponent(address) + '&citystatezip=' +
            encodeURIComponent(citystatezip);

        return this.http.get(`${this.apiUrl}/homes/?${query}`, {observe: 'response'});
    }

}
