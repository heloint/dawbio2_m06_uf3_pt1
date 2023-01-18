import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidateCredentialsService } from '../../services/validate-credentials.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit{

  registerFormValues: ValidateCredentialsService = new ValidateCredentialsService();

  genders:          string[] = this.registerFormValues.genders;
  civilStatuses:    string[] = this.registerFormValues.civilStatuses;
  informationTypes: string[] = this.registerFormValues.informationTypes;

  registerForm: FormGroup = new FormGroup({

    username: new FormControl('',
    [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^[a-zA-Z ]+$')
    ]),

    password: new FormControl('',
    [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^[a-zA-Z0-9]+$')
    ]),

    passwordConfirmation: new FormControl('',
    [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^[a-zA-Z0-9]+$'),
    ]),

    email: new FormControl('',
    [
      Validators.required,
      Validators.email,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
    ]),

    civilStatus: new FormControl('',
    [
      Validators.required,
    ]),

    acceptConditions: new FormControl(false ,
    [
      Validators.requiredTrue,
    ]),

    // gender
    /* gender: new FormControl('',
    [
      Validators.required,
    ]),

    // infoType
    infoType: new FormControl('',
    [
      Validators.required,
    ]),

    // acceptConditions
    acceptConditions: new FormControl('',
    [
      Validators.required,
    ])
 */
    // sendButton
    /* sendButton: new FormControl({
    }) */

  })

  register() {
    console.log('submit button works');
  }

  ngOnInit() {
    this.registerForm.patchValue({
      civilStatus: 'married',
    })
  }
}
