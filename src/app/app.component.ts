import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
// import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CustomValidatorService } from '../app/CustomValidators/custom-validator.service'
import { Observable } from 'rxjs';
import { FlightsService } from './flights.service';
import { FlightSearch } from './Models/Flight-Search';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  healthPing: Observable<string>;

  searchData: FlightSearch = {
    scheduledDepartureCity : 'SFO',
    scheduledArrivalCity : 'LGA',
    scheduledDepartureDate : null!,
    includeCancelledFlights : false,
    includeDepartedFlights : false,
  };
  searchForm: FormGroup;
  today: Date = new Date("mm-dd");

  constructor(private flightService: FlightsService, private formBuilder: FormBuilder, private customValidator: CustomValidatorService) {

  }

  ngOnInit(): void {
    this.healthPing = this.flightService.getHealthPing();
    this.searchForm = this.formBuilder.group({
      scheduledDepartureCity: ['', Validators.required],
      scheduledArrivalCity: ['', Validators.required],
      scheduledDepartureDate: ['', Validators.required]
    })

    console.log(this.searchForm.get("scheduledDepartureCity").value + "Hi")

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
}
