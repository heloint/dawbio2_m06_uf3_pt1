/*
 * Directive to validate banned emails.
 * Author: Dániel Májer
*/

import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appBannedEmail]',
  providers: [{provide: NG_VALIDATORS, useExisting: BannedEmailDirective, multi: true}]
})
export class BannedEmailDirective {

  constructor() { }

  #bannedUserNames: string[] = [
    'admin',
    'user',
    'password',
    'proven',
    'provenUsr',
    'buyer'
  ];

  /* Validates if the two password fields are match.
   * @param control AbstractControl
   * @return ValidationErrors | null
   * */
  validate (control: AbstractControl): ValidationErrors | null {
    let validate: boolean = false;

    const emailFirstPath: string = control.value.split('@')[0];

    if (!this.#bannedUserNames.includes(emailFirstPath)) {
      validate = true;
    }

    return validate ? null : {'bannedEmail': true};
  }
}



