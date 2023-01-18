import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacadeService } from './facade.service';
import { FlightsService } from './flights.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    FacadeService,
    
    FlightsService
  ]
})
export class ServicesModule { }
