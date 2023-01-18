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
  flightResult: FlightResult[];
  isEmpty: boolean = true;

  constructor(private facadeService:FacadeService, private activatedRoute:ActivatedRoute){

  }

  ngOnInit(): void{
    this.searchData.scheduledDepartureCity = this.activatedRoute.snapshot.queryParamMap.get('scheduledDepartureCity');
    this.searchData.scheduledArrivalCity = this.activatedRoute.snapshot.queryParamMap.get('scheduledArrivalCity');
    this.searchData.scheduledDepartureDate = this.activatedRoute.snapshot.queryParamMap.get('scheduledDepartureDate');
    this.searchData.includeCancelledFlights = this.activatedRoute.snapshot.queryParamMap.get('includeCancelledFlights') == 'false'? false : true;
    this.searchData.includeDepartedFlights = this.activatedRoute.snapshot.queryParamMap.get('includeDepartedFlights') == 'false'? false : true;
    
    // this.facadeService.getFlightResults(this.searchData).subscribe((result: FlightResult[]) => {
    //   this.flightResult = result;
    //   console.log(this.flightResult);
    // })

    this.flightResult = [
      {
        flightNumber: 'AE0111',
        departureTime: '11:05',
        arrivalTime: '15:30'
      },
      {
        flightNumber: 'SW1921',
        departureTime: '14:05',
        arrivalTime: '19:30'
      },
      {
        flightNumber: 'UA3211',
        departureTime: '21:05',
        arrivalTime: '23:30'
      }
    ]
  }
}
