import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService {

  constructor() { }

  airportCodeValidator():ValidatorFn{
    return (control: AbstractControl) : {[key: string]: any} => {
      if(!control.value){
        return null!;
      }

      const regex = new RegExp('^[A-Z][A-Z][A-Z]');
      const valid = regex.test(control.value);
      return valid ? null! : {invalidAirportCode: true};
    }
  }

  validDestination(depart: string, arrive: string){
    return (formGroup: FormGroup) => {
      const departControl = formGroup.controls['scheduledDepartureCity'];
      const arriveControl = formGroup.controls['scheduledArrivalCity'];

      if(!departControl || !arriveControl){ 
        return null; 
      }

      if(arriveControl.errors && !arriveControl.errors['sameCityError']){ 
        return null; 
      }

      if(departControl.value == arriveControl.value){
        arriveControl.setErrors({'sameCityError' : true});
      } else{
        arriveControl.setErrors(null);
      }

      return null
    }
  }
}
