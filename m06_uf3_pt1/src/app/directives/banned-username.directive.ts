/*
 * Directive to validate banned emails.
 * Author: Dániel Májer
 */

import { Directive } from '@angular/core';
import {
  NG_VALIDATORS,
  AbstractControl,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appBannedUsername]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: BannedUsernameDirective,
      multi: true,
    },
  ],
})
export class BannedUsernameDirective {
  constructor() {}

  #bannedUserNames: string[] = [
    'admin',
    'user',
    'password',
    'proven',
    'provenUsr',
    'buyer',
  ];

  /* Validates if the two password fields are match.
   * @param control AbstractControl
   * @return ValidationErrors | null
   * */
  validate(control: AbstractControl): ValidationErrors | null {
    let validate: boolean = false;

    if (!this.#bannedUserNames.includes(control.value)) {
      validate = true;
    }

    return validate ? null : { bannedUsername: true };
  }
}
