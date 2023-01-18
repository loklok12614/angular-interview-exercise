import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';

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
}
