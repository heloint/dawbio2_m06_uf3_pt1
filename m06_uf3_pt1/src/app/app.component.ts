import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {
  ValidateCredentialsService,
  InfoTypes,
} from './services/validate-credentials.service';
import { LocalStorageHandlerService } from './services/local-storage-handler.service';
import { SessionStorageHandlerService } from './services/session-storage-handler.service';

type TableFilters = {
    type: string,
    location: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'm06_uf3_pt1';

  constructor(
    private credenService: ValidateCredentialsService,
    private cookieService: CookieService,
    private localStorageHandler: LocalStorageHandlerService,
    private sessionStorageHandler: SessionStorageHandlerService
  ) {}

  // Check if user logged in from cookie.
  get isLoggedIn(): Boolean {
    return this.credenService.isLoggedIn;
  }

  // Get username from cookie.
  get loggedInUsername(): string {
    return Object.keys(this.cookieService.getAll())[0];
  }

  // Get role from cookie.
  get loggedInRole(): string {
    return Object.values(this.cookieService.getAll())[0];
  }

  // Delete cookie and logout.
  public doLogOut() {
    this.cookieService.deleteAll();
    this.credenService.isLoggedIn = false;
  }

  ngOnInit() {
    this.credenService.isLoggedIn =
      Object.keys(this.cookieService.getAll()).length > 0 ? true : false;

    // Keys that are needed.
    const neededKeys: string[] = [
      'registerUserName',
      'registerPassword',
      'registerRepeatedPassword',
      'registerEmail',
      'registerCivilStatus',
      'registerGender',
      'registerInformationTypes',
      'registerAcceptConditions',
    ];

    // Init localStorage key-value pairs if don't exist.
    if (!neededKeys.every((key) => Object.keys(localStorage).includes(key))) {
      neededKeys.forEach((key) => {
        if (key == 'registerInformationTypes') {
          let infoTypes: InfoTypes = {};

          this.credenService.informationTypes.forEach((type) => {
            infoTypes[type] = false;
          });

          localStorage['registerInformationTypes'] = JSON.stringify(infoTypes);
        } else {
          localStorage[key] = '';
        }
      });
    }

    this.sessionStorageHandler.initFilterStorage();

  }
}
