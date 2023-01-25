import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidateCredentialsService } from '../../services/validate-credentials.service';
import { User } from '../../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import {LocalStorageHandlerService} from '../../services/local-storage-handler.service';

import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {


  constructor( private route: Router,
               private cookieService: CookieService,
               private credenService: ValidateCredentialsService,
               private localStorageHandler: LocalStorageHandlerService) {}


  get isLoggedIn(): Boolean {
        return this.credenService.isLoggedIn;
  }

  get loggedInUsername(): string{
      return Object.keys(this.cookieService.getAll())[0];
  }

  get loggedInRole(): string{
      return Object.values(this.cookieService.getAll())[0];
  }

  get loginUserName() {
    return this.localStorageHandler.getLocalStorageValue('loginUserName');
  }

  get loginPassword() {
    return this.localStorageHandler.getLocalStorageValue('loginPassword');
  }

  validationResult!: User | null;

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(this.loginUserName,
    [
      Validators.required,
    ]),
    password: new FormControl(this.loginPassword,
    [
      Validators.required,
    ]),
  })

  setLocalStorageValue(key: string, value: string) {
    this.localStorageHandler.saveIntoLocalStorage(key, value);

  }


  ngOnInit() {
    if (this.isLoggedIn) {
      this.route.navigate(['/home']);
    }
  }

  submit() {
    this.validationResult = this.credenService.validateLoginCredens(
                        this.loginForm.get('username')?.value,
                        this.loginForm.get('password')?.value
    );

    if (this.validationResult !== null) {
        this.cookieService.set(this.validationResult.username, this.validationResult.role, {expires: 3});
        this.credenService.isLoggedIn = true;
        this.route.navigate(['/home']);
    } else {
        // Pass
    }
  }
}
