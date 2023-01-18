import { Injectable, Injector } from '@angular/core';
import { FlightsService } from './flights.service';
import { FlightSearch } from '../Models/Flight-Search';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  constructor(private injector: Injector) { }

  today: Date = new Date();

  // private formDataSubject = new BehaviorSubject<FlightSearch>({
  //   scheduledDepartureCity: 'SFO',
  //   scheduledArrivalCity: 'LGA',
  //   scheduledDepartureDate: this.today.toISOString().slice(0, 10),
  //   includeDepartedFlights: false,
  //   includeCancelledFlights: false
  // } as FlightSearch);

  // private formDataSubject = new BehaviorSubject<FlightSearch>({} as FlightSearch);
  // public formData = this.formDataSubject.asObservable();

  private _flightService:FlightsService;
  public get flightService(): FlightsService{
    if(!this._flightService){
      this._flightService = this.injector.get(FlightsService);
    }
    return this._flightService;
  }

  // populateFormData(data : FlightSearch){
  //   this.formDataSubject.next(data);
  // }

  // clearFormData(){
  //   this.formDataSubject.next({} as FlightSearch);
  // }

  getHealthPing(){
    return this.flightService.getHealthPing();
  }

  getFlightResults(data: FlightSearch){
    return this.flightService.getFlightResults(data);
  }

}
