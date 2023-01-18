import { Component } from '@angular/core';
import { FacadeService } from '../Services/facade.service';
import { ActivatedRoute } from '@angular/router';
import { FlightResult } from '../Models/Flight-Result';
import { FlightSearch } from '../Models/Flight-Search';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent {

  searchData: FlightSearch = {
    scheduledDepartureCity: '',
    scheduledArrivalCity: '',
    scheduledDepartureDate: '',
    includeCancelledFlights: false,
    includeDepartedFlights: false
  };
  flightResult: FlightResult;
  isEmpty: boolean = true;

  constructor(private facadeService:FacadeService, private activatedRoute:ActivatedRoute){

  }

  ngOnInit(): void{
    this.searchData.scheduledDepartureCity = this.activatedRoute.snapshot.queryParamMap.get('scheduledDepartureCity');
    console.log(this.searchData.scheduledDepartureCity);
  }
}
