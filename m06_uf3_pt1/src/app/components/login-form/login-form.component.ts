import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

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

  submit() {
    console.log('submit button works');
  }
}
