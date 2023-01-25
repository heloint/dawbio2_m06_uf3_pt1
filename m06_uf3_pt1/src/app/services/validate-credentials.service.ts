import { Injectable, OnInit } from '@angular/core';
import { User } from '../models/user.model';

export type RegistrationResult = {
  isSuccess: Boolean,
  errorMessage: string
}

@Injectable({
  providedIn: 'root'
})
export class ValidateCredentialsService implements OnInit {

  // #userArr!: Array<User>;

  roles:            string[] = ['buyer', 'administrator'];
  genders:          string[] = ['Male', 'Female', 'Other'];
  civilStatuses:    string[] = [ "Married", "Single", "Divorced" ];
  informationTypes: string[] = [ "Videogames", "Accessories", "Market news" ];

  #userArr: Array<User> = this.generateUsers(50);
  isLoggedIn: Boolean = false;

  constructor() { }

  private getRandomInterests(): Array<String> {
    let numberOfInterest: number = Math.floor(Math.random() * this.informationTypes.length);
    let collector: Array<String> = [];
    for(let i = 0; i <= numberOfInterest; i++) {
      collector.push(this.informationTypes[Math.floor(Math.random()*this.informationTypes.length)]);
    }

    return collector;
  }

  public generateUsers(userNum: number): Array<User>
  {
    let userArr: Array<User> = [];

    for(let i = 0; i <= userNum; i++) {
      let username:      string = `user${i}${i}`;
      let password:      string = `password${i}`;
      let role:          string = this.roles[Math.floor(Math.random()*this.roles.length)];
      let email:         string = `user${i}@gmail.com`;
      let civilState:    string = this.civilStatuses[Math.floor(Math.random()*this.civilStatuses.length)];
      let gender:        string = this.genders[Math.floor(Math.random()*this.genders.length)];
      let infoInterests: String[] = this.getRandomInterests();
      let acceptedCondition: Boolean = Math.random() < 0.5;

      userArr.push( new User(
                username,
                password,
                email,
                civilState,
                gender,
                infoInterests,
                acceptedCondition,
                role
      ));
    }

    return userArr;
  }

  public validateLoginCredens(username: string, password: string): User | null {
        let validationResult = null;

        this.#userArr.forEach((usr) => {
            if (usr.username === username &&
                usr.password === password) {
                validationResult = usr;
            }
        });

        return validationResult;
  }


  private validateRegisterCredens(user: User): RegistrationResult {

    let result: RegistrationResult = {
      isSuccess: true,
      errorMessage: ''
    };

    const username: string = user.username;
    const email: string = user.email;

    const allUsernames: string[] = this.#userArr.map((usr) => {
      return usr.username;
    });

    const allEmails: string[] = this.#userArr.map((usr) => {
      return usr.email;
    });

    if (allUsernames.includes(username) &&
        allEmails.includes(email)) {
      result.isSuccess = false;
      result.errorMessage = 'Username already exists and email also already in use!';
    } else if (allEmails.includes(email)) {
      result.isSuccess = false;
      result.errorMessage = 'Email is already in use!';
    } else if (allUsernames.includes(username)) {
      result.isSuccess = false;
      result.errorMessage = 'Username already exists!';
    }

    return result;
  }

  public registerUser(user: User): RegistrationResult {

    const beforeFetchLength: number = this.#userArr.length;
    let isValidRegistration: RegistrationResult = this.validateRegisterCredens(user);

    if (isValidRegistration.isSuccess) {
      this.#userArr.push(user);
    }

    const afterFetchLength: number = this.#userArr.length;

    if (isValidRegistration.isSuccess &&
        !(afterFetchLength > beforeFetchLength)) {
      isValidRegistration.isSuccess = false;
      isValidRegistration.errorMessage = 'An error has occured. Try again later.';
    }

    return isValidRegistration;
  }

  ngOnInit() {
  }
}
