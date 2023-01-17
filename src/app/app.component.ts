import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import {MatCalendarCellClassFunction} from '@angular/material/datepicker';
import { CustomValidatorService } from '../app/CustomValidators/custom-validator.service'
import { Observable } from 'rxjs';
import { FlightsService } from './flights.service';
import { FlightSearch } from './Models/Flight-Search';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  healthPing: Observable<string>;

  searchData: FlightSearch = {
    scheduledDepartureCity : '',
    scheduledArrivalCity : '',
    scheduledDepartureDate : null!,
    includeCancelledFlights : false,
    includeDepartedFlights : false,
  };
  searchForm: FormGroup;
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };

  constructor(private flightService: FlightsService, private formBuilder: FormBuilder, private customValidator: CustomValidatorService) {

  }

  ngOnInit(): void {
    this.healthPing = this.flightService.getHealthPing();
    this.searchForm = this.formBuilder.group({
      scheduledDepartureCity: ['SFO', Validators.required],
      scheduledArrivalCity: ['LGA', Validators.required],
      scheduledDepartureDate: [new Date(), Validators.required],
      includeCancelledFlights: [false],
      includeDepartedFlights: [false]
    })
  }

  get SearchFormControl(){
    return this.searchForm.controls
  }

  searchFlight(){
    if(this.searchForm.valid){

    }
  }

  forceUppercase(formControl, event){
    formControl[event.target.name].setValue(formControl[event.target.name].value.toUpperCase())
  }

  testfn(event){
    console.log(event.target.value);
  }
}
