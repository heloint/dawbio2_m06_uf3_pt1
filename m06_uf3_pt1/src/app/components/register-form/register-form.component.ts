/*
 * Component of the registration form.
 * Author: Dániel Májer
*/

import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from '../../models/user.model';

import { CookieService } from 'ngx-cookie-service';
import { ValidateCredentialsService, InfoTypes, RegistrationResult } from '../../services/validate-credentials.service';
import { LocalStorageHandlerService } from '../../services/local-storage-handler.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit{

  constructor( private credenService: ValidateCredentialsService,
               private cookieService: CookieService,
               private localStorageHandler: LocalStorageHandlerService) { }

  // Initialize variables.
  genders!:          string[];
  civilStatuses!:    string[];
  informationTypes!: string[];
  registrationResult!: RegistrationResult | null;

  // Get register form's gender from localStorage
  get registerGender() {
    return this.localStorageHandler.getLocalStorageValue('registerGender');
  }

  // Get register form's information types from localStorage
  get registerInformationTypes() {
    return this.localStorageHandler.getLocalStorageValue('registerInformationTypes');
  }

  // Get login flag from the service.
  get isLoggedIn(): Boolean {
        return this.credenService.isLoggedIn;
  }

  // Declare FormGroup + FormArray + FormControl
  registerForm: FormGroup = new FormGroup({
    username: new FormControl(
      localStorage['registerUserName'],
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^[a-zA-Z0-9]+$')
      ]
    ),

    password: new FormControl(
      localStorage['registerPassword'],
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^[a-zA-Z0-9+$.!]+$')
      ]
    ),

    passwordConfirmation: new FormControl(
      localStorage['registerRepeatedPassword'],
    [
      Validators.required,
    ]),

    email: new FormControl(
      localStorage['registerEmail'],
      [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ]
    ),

    civilStatus: new FormControl('',
      [
        Validators.required,
      ]
    ),

    gender: new FormControl(
      localStorage['registerGender'],
      [
        Validators.required,
      ]
    ),

    informationTypes: new FormArray(
      this.fetchCheckboxFormArray(
        Array.from(Object.values(JSON.parse(localStorage['registerInformationTypes'])))
      )
    ),

    acceptConditions: new FormControl(
      (localStorage['registerAcceptConditions'].toLowerCase() === 'true') ,
      [
        Validators.requiredTrue,
      ]
    ),
  })

  /* Dinamically create FormControls for each checkbox value for the FormArray.
   * @param values Array<Boolean>
   * @return FormControl
   */
  fetchCheckboxFormArray(values: Boolean[]): FormControl[] {
    let formControlArr: FormControl[] = [];

    values.forEach((value) => {
      formControlArr.push(new FormControl(value, []));
    });

    return formControlArr;
  }

  /* Set key-value pair in the localStorage.
    * @param key string
    * @param value string
    */
  setLocalStorageValue(key: string, value: string) {
    this.localStorageHandler.saveIntoLocalStorage(key, value);
  }

  // Set key-value[array] pair in the localStorage for the selected information types from the form.
  setLocalStorageInfoType() {

    let infoTypes: InfoTypes = {};

    const boolArr: Boolean[] = this.registerForm.get('informationTypes')?.value;
    this.informationTypes.forEach((type, index) => {
      infoTypes[type] = boolArr[index];
    });

    localStorage['registerInformationTypes'] = JSON.stringify(infoTypes);
  }

  // On the initialization of the class, after the constructor.
  ngOnInit() {
    // For multi selection form elements.
    this.genders          = this.credenService.genders;
    this.civilStatuses    = this.credenService.civilStatuses;
    this.informationTypes = this.credenService.informationTypes;

    // Keys that are needed.
    const neededKeys: string[] = [
      'registerUserName',
      'registerPassword',
      'registerRepeatedPassword',
      'registerEmail',
      'registerCivilStatus',
      'registerGender',
      'registerInformationTypes',
      'registerAcceptConditions'

    ];

    // Init localStorage key-value pairs if don't exist.
    if (!neededKeys.every(key => Object.keys(localStorage).includes(key))) {
      neededKeys.forEach((key) => {

        if (key == 'registerInformationTypes') {
          let infoTypes: InfoTypes = {};

          this.informationTypes.forEach((type) => {
            infoTypes[type] = false;
          });

          localStorage['registerInformationTypes'] = JSON.stringify(infoTypes);

        } else {
          localStorage[key] = '';
        }

      });
    }

    // Set default selected.
    if (localStorage['registerCivilStatus'] === '') {
      this.registerForm.patchValue({
        civilStatus: 'married',
      });
    } else {
      this.registerForm.patchValue({
        civilStatus: localStorage['registerCivilStatus'],
      });

    }
  }

  // Try to validate the registration data and register the user.
  register() {

    const infoInterests: string[] = Array.from(Object.values(JSON.parse(localStorage['registerInformationTypes'])));

    this.registrationResult = this.credenService.registerUser(
      new User(
        this.registerForm.get('username')?.value,
        this.registerForm.get('password')?.value,
        this.registerForm.get('email')?.value,
        this.registerForm.get('civilStatus')?.value,
        this.registerForm.get('gender')?.value,
        infoInterests,
        this.registerForm.get('acceptConditions')?.value,
        'buyer'
      )
    );

    if (this.registrationResult.isSuccess) {
      this.localStorageHandler.setLocalStorageToDefault();
    }
  }

}
