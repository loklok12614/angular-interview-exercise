import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import {MatCalendarCellClassFunction} from '@angular/material/datepicker';
import { CustomValidatorService } from '../app/CustomValidators/custom-validator.service'
import { Observable } from 'rxjs';
import { FacadeService } from './Services/facade.service';
import { FlightSearch } from './Models/Flight-Search';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  healthPing: string;

  constructor(private facadeService: FacadeService) {

  }

  ngOnInit(): void {
    this.facadeService.getHealthPing().subscribe((healthPing: string) => {
      this.healthPing = healthPing;
    })
  }
}
