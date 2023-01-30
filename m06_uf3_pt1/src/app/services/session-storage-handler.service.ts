/* Handle service for the sessionStorage.
 * @author Dániel Májer
 * */

import { Injectable } from '@angular/core';

export type TableFilters = {
    type: string,
    location: string
}

@Injectable({
  providedIn: 'root'
})
export class SessionStorageHandlerService {

  constructor() { }


  /* Initializes TableFilter type object stringified in the sessionStorage.
   * @return void
   * */
  public initFilterStorage() {
      let currentTableFilters: TableFilters = {type:'', location: ''};

      // Initialize 'tableFilter' TableFilters type object in sessionStorage.
      if (!Object.keys(sessionStorage).includes('tableFilters')){
          sessionStorage['tableFilters'] = JSON.stringify(currentTableFilters);
      } else {
          currentTableFilters = JSON.parse(sessionStorage['tableFilters']);
      }
  }

}
