/*
 * Directive to validate if two passwords match.
 * @Author Dániel Májer
 * */

import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appValidatePasswordConfirmation]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidatePasswordConfirmationDirective, multi: true}]
})
export class ValidatePasswordConfirmationDirective implements Validator{

  constructor() { }

  /* Validates if the two password fields are match.
   * @param control AbstractControl
   * @return ValidationErrors | null
   * */
  @Input() firstPassword: any;
  validate (control: AbstractControl): ValidationErrors | null {
    let validate: boolean = false;

    if (control.value === this.firstPassword) {
      validate = true;
    }

    return validate ? null : {'unequivalentPassword': true};
  }
}
