import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';
import { ValidateCredentialsService } from '../../services/validate-credentials.service';
import { LocalStorageHandlerService } from '../../services/local-storage-handler.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit{

  genders!:          string[];
  civilStatuses!:    string[];
  informationTypes!: string[];

  registerForm: FormGroup = new FormGroup({

    username: new FormControl(this.registerUserName,
    [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^[a-zA-Z ]+$')
    ]),

    password: new FormControl(this.registerPassword,
    [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^[a-zA-Z0-9]+$')
    ]),

    passwordConfirmation: new FormControl(this.registerPassword,
    [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^[a-zA-Z0-9]+$'),
    ]),

    email: new FormControl(this.registerEmail,
    [
      Validators.required,
      Validators.email,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
    ]),

    civilStatus: new FormControl(this.registerCivilStatus,
    [
      Validators.required,
    ]),

    gender: new FormControl(this.registerGender,
    [
      Validators.required,
    ]),

    informationTypes: new FormControl('',
    [
    ]),

    acceptConditions: new FormControl(false ,
    [
      Validators.requiredTrue,
    ]),
  })

  constructor( private credenService: ValidateCredentialsService,
               private cookieService: CookieService,
               private localStorageHandler: LocalStorageHandlerService) { }

  get registerUserName() {
    return this.localStorageHandler.getLocalStorageValue('registerUserName');
  }

  get registerPassword() {
    return this.localStorageHandler.getLocalStorageValue('registerPassword');
  }

  get registerRepeatedPassword() {
    return this.localStorageHandler.getLocalStorageValue('registerRepeatedPassword');
  }

  get registerEmail() {
    return this.localStorageHandler.getLocalStorageValue('registerEmail');
  }

  get registerCivilStatus() {
    return this.localStorageHandler.getLocalStorageValue('registerCivilStatus');
  }

  get registerGender() {
    return this.localStorageHandler.getLocalStorageValue('registerGender');
  }

  get registerInformationTypes() {
    return this.localStorageHandler.getLocalStorageValue('registerInformationTypes');
  }

  get registerAcceptConditions() {
    return this.localStorageHandler.getLocalStorageValue('registerAcceptConditions');
  }

  setLocalStorageValue(key: string, value: string) {
    this.localStorageHandler.saveIntoLocalStorage(key, value);
  }

  setLocalStorageInfoTypes(event: any, value: Boolean) {

    /* let currentVals: string[] = [];

    if (localStorage['registerInformationTypes'] !== undefined) {
      currentVals = Array.from(localStorage['registerInformationTypes'].split(';'));
    }
    console.log(value);
    if (value == true) {
      console.log(event.target.value);
      currentVals.push(event.target.value);
    }
 */
  }

  register() {
    console.log('submit button works');
  }

  ngOnInit() {

  this.genders          = this.credenService.genders;
  this.civilStatuses    = this.credenService.civilStatuses;
  this.informationTypes = this.credenService.informationTypes;

  if (this.registerCivilStatus !== undefined) {
    this.registerForm.patchValue({
      civilStatus: 'married',
    });
  } else {
    this.registerForm.patchValue({
      civilStatus: this.registerCivilStatus,
    });
  }

  /* if (this.registerForm.get('gender')?.value === this.registerGender) {
    this.registerForm.controls['gender'].parent;
  } */

  }
}
