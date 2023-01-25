/*
 * Service in charge of handling localStorage related data.
 * @Author Dániel Májer
 * */

import { Injectable } from '@angular/core';
import { InfoTypes } from './validate-credentials.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageHandlerService {
  constructor() {}

  /* Gets value from localStorage by key.
   * @param key string
   * @return string
   * */
  getLocalStorageValue(key: string): string | null {
    let str: string | null = null;
    if (localStorage[key] !== undefined) {
      str = localStorage[key];
    }
    return str;
  }

  /* Saves key-value pair into localStorage.
   * @param key string
   * @param value string
   * */
  saveIntoLocalStorage(key: string, value: string) {
    localStorage[key] = value;
  }

  /* Sets localStorage's login-register corresponding key-value pairs to the
   * initial default.
   * */
  setLocalStorageToDefault() {
    // Keys that are needed.
    const neededKeys: string[] = [
      'loginUserName',
      'loginPassword',
      'registerUserName',
      'registerPassword',
      'registerRepeatedPassword',
      'registerEmail',
      'registerCivilStatus',
      'registerGender',
      'registerInformationTypes',
      'registerAcceptConditions',
    ];

    neededKeys.forEach((key) => {
      if (key == 'registerInformationTypes') {
        let infoTypes: InfoTypes = JSON.parse(
          localStorage['registerInformationTypes']
        );

        Array.from(Object.keys(infoTypes)).forEach((type) => {
          infoTypes[type] = false;
        });

        localStorage['registerInformationTypes'] = JSON.stringify(infoTypes);
      } else {
        localStorage[key] = '';
      }
    });
  }
}
