import { Injectable, OnInit } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ValidateCredentialsService implements OnInit {

  #userArr!: Array<User>;

  roles:            string[] = ['buyer', 'administrator'];
  genders:          string[] = ['Male', 'Female', 'Other'];
  civilStatuses:    string[] = [ "Married", "Single", "Divorced" ];
  informationTypes: string[] = [ "Videogames", "Accessories", "Market news" ];

  constructor() { }

  private getRandomInterests(): Array<String> {
    let numberOfInterest: number = Math.floor(Math.random() * this.informationTypes.length);
    let collector: Array<String> = [];
    for(let i = 0; i <= numberOfInterest; i++) {
      collector.push(this.informationTypes[Math.floor(Math.random()*this.informationTypes.length)]);
    }

    return collector;
  }

  private generateUsers(userNum: number): Array<User>
  {
    let userArr: Array<User> = [];

    for(let i = 0; i <= userNum; i++) {
      let username:      string = `user${i}`;
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
                role,
                email,
                civilState,
                gender,
                infoInterests,
                acceptedCondition
      ));
    }

    return userArr;
  }

  ngOnInit() {
    this.#userArr = this.generateUsers(50);
  }
}
