import { Directive, Input } from '@angular/core';

import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appValidatePasswordConfirmation]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidatePasswordConfirmationDirective, multi: true}]
})
export class ValidatePasswordConfirmationDirective implements Validator{

  @Input() firstPassword: any;
  constructor() { }
  validate (control: AbstractControl): ValidationErrors | null {
    let validate: boolean = false;


    if (control.value === this.firstPassword) {
    console.log('the same');
      validate = true;
    }

    return validate ? null : {'unequivalentPassword': true};
  }
}
