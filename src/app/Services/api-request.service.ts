import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FlightSearch } from '../Models/Flight-Search';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  constructor(private http:HttpClient) { }

  getRequest(url: string, data?: FlightSearch): Observable<any>{
    const queryString = data ? Object.entries(data).map(param => {
      return `${param[0]}=${param[1]}`
    }).join('&') : "";

    // https://apis.qa.alaskaair.com/aag/1/guestServices/flights/scheduledrouting/flights/search?scheduledDepartureCity=SEA&scheduledDepartureDate=2023-03-01&scheduledArrivalCity=LAX&includeCancelledFlights=false&includeDepartedFlights=false

    const options = {
      headers: new HttpHeaders({
        'Ocp-Apim-Subscription-Key': environment.apiKey
      }),
    };

    return this.http.get<any>(`${url}?${queryString}`, options);
  }
}
