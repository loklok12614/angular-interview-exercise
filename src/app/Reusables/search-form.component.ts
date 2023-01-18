import { Component } from '@angular/core';
import { FlightSearch } from '../Models/Flight-Search';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidatorService } from '../CustomValidators/custom-validator.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FacadeService } from '../Services/facade.service';

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
  today: Date = new Date();

  constructor(private router:Router,
    private activatedRoute: ActivatedRoute, 
    private formBuilder: FormBuilder, 
    private customValidator: CustomValidatorService,
    private facadeService: FacadeService) {}

  ngOnInit(): void {


    var departCity = this.activatedRoute.snapshot.queryParamMap.get('scheduledDepartureCity') ? 
      this.activatedRoute.snapshot.queryParamMap.get('scheduledDepartureCity') : 'SFO';
    var arriveCity = this.activatedRoute.snapshot.queryParamMap.get('scheduledArrivalCity') ? 
      this.activatedRoute.snapshot.queryParamMap.get('scheduledArrivalCity') : 'LGA';
    var departDate = this.activatedRoute.snapshot.queryParamMap.get('scheduledDepartureDate') ? 
      this.activatedRoute.snapshot.queryParamMap.get('scheduledDepartureDate') : this.today.toISOString().slice(0,10);
    var departed = this.activatedRoute.snapshot.queryParamMap.get('includeDepartedFlights') ? 
      this.activatedRoute.snapshot.queryParamMap.get('includeDepartedFlights') == 'false' ? false : true : false;
    var cancelled = this.activatedRoute.snapshot.queryParamMap.get('includeCancelledFlights') ? 
      this.activatedRoute.snapshot.queryParamMap.get('includeCancelledFlights') == 'false' ? false : true : false;
    
    this.searchForm = this.formBuilder.group({
      scheduledDepartureCity: [departCity, Validators.compose([Validators.required, this.customValidator.airportCodeValidator()])],
      scheduledArrivalCity: [arriveCity, Validators.compose([Validators.required, this.customValidator.airportCodeValidator()])],
      scheduledDepartureDate: [departDate, Validators.required],
      includeDepartedFlights: [departed],
      includeCancelledFlights: [cancelled]
    },
    {
      validator: this.customValidator.validDestination('scheduledDepartureCity', 'scheduledArrivalCity')
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
      }).then(() => {
        window.location.reload();
      });

      // this.facadeService.populateFormData(this.searchData);

      // setTimeout(() => {
      //   this.router.navigate(['/flights']);
      // }, 1000);      
    }
  }

  forceUppercase(formControl, event){
    formControl[event.target.name].setValue(formControl[event.target.name].value.toUpperCase())
  }
}
