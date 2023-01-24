import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageHandlerService {

  constructor() { }

  getLocalStorageValue(key: string) {
    if (localStorage[key] !== undefined){
      return localStorage[key];
    }
  }

  saveIntoLocalStorage(key: string, value: string){
    localStorage[key] = value;
  }

}
