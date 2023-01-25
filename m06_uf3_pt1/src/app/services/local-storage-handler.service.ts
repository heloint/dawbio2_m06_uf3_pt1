import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageHandlerService {

  constructor() { }

  /* Gets value from localStorage by key.
   * @param key string
   * @return string
   * */
  getLocalStorageValue(key: string): string | null {
    let str: string | null = null;
    if (localStorage[key] !== undefined){
      str = localStorage[key];
    }
    return str;
  }

  /* Saves key-value pair into localStorage.
   * @param key string
   * @param value string
   * */
  saveIntoLocalStorage(key: string, value: string){
    localStorage[key] = value;
  }

}
