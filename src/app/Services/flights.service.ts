import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { FlightResult } from '../Models/Flight-Result';
import { FlightSearch } from '../Models/Flight-Search';
import { ApiRequestService } from './api-request.service';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  private healthEndpoint: string = 'https://apis.qa.alaskaair.com/aag/1/guestServices/flights/ping';
  private flightsEndpoint: string = 'https://apis.qa.alaskaair.com/aag/1/guestServices/flights/scheduledrouting/flights/search';

  //
  // Example Flight Search call
  // https://apis.qa.alaskaair.com/aag/1/guestServices/flights/scheduledrouting/flights/search?scheduledDepartureCity=SEA&scheduledDepartureDate=2023-03-01&scheduledArrivalCity=LAX&includeCancelledFlights=false&includeDepartedFlights=false
  //
  // scheduledDepartureCity: 3 letter airport code for the departure airport (e.g.: SEA)
  // scheduledArrivalCity: 3 letter airport code for the arrival airport (e.g.: LAX)
  // scheduledDepartureDate: ISO formatted departure date (e.g.: 2023-03-01)
  // 
  // These two parameters are required but should just be left as false
  // includeCancelledFlights
  // includeDepartedFlights
  //

  constructor(private http: HttpClient, private apiRequestService: ApiRequestService) { }

  public getHealthPing(): Observable<string> {
    // const options = {
    //   headers: new HttpHeaders({
    //     'Ocp-Apim-Subscription-Key': environment.apiKey
    //   }),
    // };

    // return this.http.get<string>(this.healthEndpoint, options).pipe(
    //   map((result: string) => {
    //     return result;
    //   })
    // );
    return this.apiRequestService.getRequest(this.healthEndpoint).pipe(
      map((result: string) => {
        return result;
      })
    )
  }

  public getFlightResults(data: FlightSearch): Observable<FlightResult[]>{
    return this.apiRequestService.getRequest(this.flightsEndpoint, data);
  }
}
