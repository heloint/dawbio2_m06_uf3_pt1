import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ValidatePasswordConfirmationDirective } from './directives/validate-password-confirmation.directive';
import { HomeComponent } from './components/home/home.component';
import { BannedUsernameDirective } from './directives/banned-username.directive';
import { BannedEmailDirective } from './directives/banned-email.directive';
import { EventsComponent } from './components/events/events.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegisterFormComponent,
    PageNotFoundComponent,
    ValidatePasswordConfirmationDirective,
    HomeComponent,
    BannedUsernameDirective,
    BannedEmailDirective,
    EventsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
