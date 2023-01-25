import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';
import { ValidateCredentialsService } from '../../services/validate-credentials.service';
import { LocalStorageHandlerService } from '../../services/local-storage-handler.service';

interface InfoTypes {
  [infoType: string]: Boolean
}

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit{

  constructor( private credenService: ValidateCredentialsService,
               private cookieService: CookieService,
               private localStorageHandler: LocalStorageHandlerService) { }

  genders!:          string[];
  civilStatuses!:    string[];
  informationTypes!: string[];

  get registerGender() {
    return this.localStorageHandler.getLocalStorageValue('registerGender');
  }

  get registerInformationTypes() {
    return this.localStorageHandler.getLocalStorageValue('registerInformationTypes');
  }

  get isLoggedIn(): Boolean {
        return this.credenService.isLoggedIn;
  }

  registerForm: FormGroup = new FormGroup({

    username: new FormControl(
      localStorage['registerUserName'],
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^[a-zA-Z ]+$')
      ]
    ),

    password: new FormControl(
      localStorage['registerPassword'],
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^[a-zA-Z0-9]+$')
      ]
    ),

    passwordConfirmation: new FormControl(
      localStorage['registerRepeatedPassword'],
    [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^[a-zA-Z0-9]+$'),
    ]),

    email: new FormControl(
      localStorage['registerEmail'],
      [
        Validators.required,
        Validators.email,
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


  fetchCheckboxFormArray(values: Boolean[]): FormControl[] {
    let formControlArr: FormControl[] = [];

    values.forEach((value) => {
      formControlArr.push(new FormControl(value, []));
    });

    return formControlArr;
  }

  setLocalStorageValue(key: string, value: string) {
    this.localStorageHandler.saveIntoLocalStorage(key, value);
  }

  setLocalStorageInfoType(event: any) {
    let infoTypes: InfoTypes = {};

    const boolArr: Boolean[] = this.registerForm.get('informationTypes')?.value;
    this.informationTypes.forEach((type, index) => {
      infoTypes[type] = boolArr[index];
    });

    localStorage['registerInformationTypes'] = JSON.stringify(infoTypes);
  }

  register() {
  }

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
      localStorage[key] = '';
    });
  }

  // Set default selected.
  if (localStorage['registerCivilStatus'] === '') {
    this.registerForm.patchValue({
      civilStatus: 'married',
    });
  }

  }
}
