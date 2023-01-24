import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ValidateCredentialsService } from './services/validate-credentials.service';
import { LocalStorageHandlerService } from './services/local-storage-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'm06_uf3_pt1';
  constructor( private credenService: ValidateCredentialsService,
               private cookieService: CookieService,
               private localStorageHandler: LocalStorageHandlerService) { }


  get isLoggedIn(): Boolean {
        return this.credenService.isLoggedIn;
  }

  get loggedInUsername(): string{
      return Object.keys(this.cookieService.getAll())[0];
  }

  get loggedInRole(): string{
      return Object.values(this.cookieService.getAll())[0];
  }

  public doLogOut() {
        this.cookieService.deleteAll();
        this.credenService.isLoggedIn = false;
  }

  ngOnInit() {
      this.credenService.isLoggedIn = Object.keys(this.cookieService.getAll()).length > 0 ? true : false;
  }


}
