import { Component } from '@angular/core';
import { FlightSearch } from '../Models/Flight-Search';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FlightsService } from '../flights.service';
import { CustomValidatorService } from '../CustomValidators/custom-validator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  searchData: FlightSearch = {
    scheduledDepartureCity : '',
    scheduledArrivalCity : '',
    scheduledDepartureDate : null!,
    includeCancelledFlights : false,
    includeDepartedFlights : false,
  };
  searchForm: FormGroup;

  constructor(private router:Router, private formBuilder: FormBuilder, private customValidator: CustomValidatorService) {

  }

  ngOnInit(): void {
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
      //redirect to /flights with params
      this.searchData.scheduledDepartureCity = this.SearchFormControl['scheduledDepartureCity'].value;
      this.searchData.scheduledArrivalCity = this.SearchFormControl['scheduledArrivalCity'].value;
      this.searchData.scheduledDepartureDate = this.SearchFormControl['scheduledDepartureDate'].value;
      this.searchData.includeCancelledFlights = this.SearchFormControl['includeCancelledFlights'].value;
      this.searchData.includeDepartedFlights = this.SearchFormControl['includeDepartedFlights'].value;

      this.router.navigate(['/flights'], {
        queryParams: this.searchData
      });
    }
  }

  forceUppercase(formControl, event){
    formControl[event.target.name].setValue(formControl[event.target.name].value.toUpperCase())
  }
}
