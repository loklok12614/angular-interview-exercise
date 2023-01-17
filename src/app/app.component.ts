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

  constructor(private flightService: FlightsService) {

  }

  ngOnInit(): void {
    this.healthPing = this.flightService.getHealthPing();
  }
}
