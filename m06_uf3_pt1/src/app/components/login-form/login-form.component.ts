import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidateCredentialsService } from '../../services/validate-credentials.service';
import { User } from '../../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  validationResult!: User | null;

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('',
    [
      Validators.required,
    ]),
    password: new FormControl('',
    [
      Validators.required,
    ]),
  })

  constructor( private route: Router,
               private cookieService: CookieService,
               private credenService: ValidateCredentialsService) {}


  get isLoggedIn(): Boolean {
        return this.credenService.isLoggedIn;
  }

  get loggedInUsername(): string{
      return Object.keys(this.cookieService.getAll())[0];
  }

  get loggedInRole(): string{
      return Object.values(this.cookieService.getAll())[0];
  }

  ngOnInit() {
    console.log(this.cookieService.getAll() == null); 
    if (this.isLoggedIn) {
      this.route.navigate(['/register']);
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
        this.route.navigate(['/register']);
    } else {
        // Pass
    }
  }
}
