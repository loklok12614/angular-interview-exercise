import { Injectable, Injector } from '@angular/core';
import { FlightsService } from './flights.service';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  constructor(private injector: Injector) { }

  private _flightService:FlightsService;
  public get flightService(): FlightsService{
    if(!this._flightService){
      this._flightService = this.injector.get(FlightsService);
    }
    return this._flightService;
  }

  getHealthPing(){
    return this.flightService.getHealthPing();
  }

  getFlightResults(){
    return this.flightService.getFlightResults();
  }
}
