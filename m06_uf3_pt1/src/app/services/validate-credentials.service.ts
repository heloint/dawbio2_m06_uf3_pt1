/*
 * Service in charge of serving and validating user credentials related data.
 * @Author Dániel Májer
 * */

import { Injectable, OnInit } from '@angular/core';
import { User } from '../models/user.model';

export type RegistrationResult = {
  isSuccess: Boolean;
  errorMessage: string;
};

export interface InfoTypes {
  [infoType: string]: Boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ValidateCredentialsService implements OnInit {
  constructor() {}

  // Initialize and declare variables.
  roles: string[] = ['buyer', 'administrator'];
  genders: string[] = ['Male', 'Female', 'Other'];
  civilStatuses: string[] = ['Married', 'Single', 'Divorced'];
  informationTypes: string[] = ['Videogames', 'Accessories', 'Market news'];
  isLoggedIn: Boolean = false;

  // Generate 50 users.
  #userArr: Array<User> = this.generateUsers(50);

  /* Get random element from the "informationTypes".
   * @return Array<String>
   */
  private getRandomInterests(): Array<String> {
    let numberOfInterest: number = Math.floor(
      Math.random() * this.informationTypes.length
    );
    let collector: Array<String> = [];
    for (let i = 0; i <= numberOfInterest; i++) {
      collector.push(
        this.informationTypes[
          Math.floor(Math.random() * this.informationTypes.length)
        ]
      );
    }

    return collector;
  }

  /* Generate N users objects.
   * @param number
   * @return Array<User>
   */
  public generateUsers(userNum: number): Array<User> {
    let userArr: Array<User> = [];

    for (let i = 0; i <= userNum; i++) {
      let username: string = `user${i}${i}`;
      let password: string = `password${i}`;
      let role: string =
        this.roles[Math.floor(Math.random() * this.roles.length)];
      let email: string = `user${i}@gmail.com`;
      let civilState: string =
        this.civilStatuses[
          Math.floor(Math.random() * this.civilStatuses.length)
        ];
      let gender: string =
        this.genders[Math.floor(Math.random() * this.genders.length)];
      let infoInterests: String[] = this.getRandomInterests();
      let acceptedCondition: Boolean = Math.random() < 0.5;

      userArr.push(
        new User(
          username,
          password,
          email,
          civilState,
          gender,
          infoInterests,
          acceptedCondition,
          role
        )
      );

      // An administrator user for testing in production.
      userArr.push(
        new User(
          'administrator',
          'administrator',
          email,
          civilState,
          gender,
          infoInterests,
          acceptedCondition,
          'administrator'
        )
      );
      // A buyer user for testing in production.
      userArr.push(
        new User(
          'buyer',
          'buyer',
          email,
          civilState,
          gender,
          infoInterests,
          acceptedCondition,
          'buyer'
        )
      );

    }

    return userArr;
  }

  /* Validates username and password against the "database".
   * @param username string
   * @param password string
   * @return User | null
   * */
  public validateLoginCredens(username: string, password: string): User | null {
    let validationResult = null;

    this.#userArr.forEach((usr) => {
      if (usr.username === username && usr.password === password) {
        validationResult = usr;
      }
    });

    return validationResult;
  }

  /* Validates user object against the "database".
   * @param user User
   * @return User | null
   * */
  private validateRegisterCredens(user: User): RegistrationResult {
    let result: RegistrationResult = {
      isSuccess: true,
      errorMessage: '',
    };

    const username: string = user.username;
    const email: string = user.email;

    const allUsernames: string[] = this.#userArr.map((usr) => {
      return usr.username;
    });

    const allEmails: string[] = this.#userArr.map((usr) => {
      return usr.email;
    });

    if (allUsernames.includes(username) && allEmails.includes(email)) {
      result.isSuccess = false;
      result.errorMessage =
        'Username already exists and email also already in use!';
    } else if (allEmails.includes(email)) {
      result.isSuccess = false;
      result.errorMessage = 'Email is already in use!';
    } else if (allUsernames.includes(username)) {
      result.isSuccess = false;
      result.errorMessage = 'Username already exists!';
    }

    return result;
  }

  /* Validates user object against the "database" and update the array of User
   * objects by adding to it.
   * @param user User
   * @return RegistrationResult error messages + boolean
   * */
  public registerUser(user: User): RegistrationResult {
    const beforeFetchLength: number = this.#userArr.length;
    let isValidRegistration: RegistrationResult =
      this.validateRegisterCredens(user);

    if (isValidRegistration.isSuccess) {
      this.#userArr.push(user);
    }

    const afterFetchLength: number = this.#userArr.length;

    if (
      isValidRegistration.isSuccess &&
      !(afterFetchLength > beforeFetchLength)
    ) {
      isValidRegistration.isSuccess = false;
      isValidRegistration.errorMessage =
        'An error has occured. Try again later.';
    }

    return isValidRegistration;
  }

  ngOnInit() {}
}
