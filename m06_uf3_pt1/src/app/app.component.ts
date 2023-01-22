import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ValidateCredentialsService } from './services/validate-credentials.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'm06_uf3_pt1';
  constructor( private credensValidate: ValidateCredentialsService,
               private cookieService: CookieService) { }

    
  get isLoggedIn(): Boolean {
    return this.credensValidate.isLoggedIn;
  }
  

  public doLogOut() {
        this.cookieService.deleteAll();
        this.credensValidate.isLoggedIn = false;
  }

  ngOnInit() {
      this.credensValidate.isLoggedIn = Object.keys(this.cookieService.getAll()).length > 0 ? true : false;
  }

  
}
