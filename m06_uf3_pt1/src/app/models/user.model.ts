/*
 * "User" class to represent a user in the application's database.
 * */

export class User {
  #username: string;
  #password: string;
  #email: string;
  #civilState: string;
  #gender: string;
  #infoInterests: String[];
  #acceptedCondition!: Boolean;
  #role: string;

  constructor(
    username: string,
    password: string,
    email: string,
    civilState: string,
    gender: string,
    infoInterests: String[],
    acceptedCondition: Boolean,
    role: string
  ) {
    this.#username = username;
    this.#password = password;
    this.#email = email;
    this.#civilState = civilState;
    this.#gender = gender;
    this.#infoInterests = infoInterests;
    this.#acceptedCondition = acceptedCondition;
    this.#role = role;
  }

  // Get username.
  get username(): string {
    return this.#username;
  }

  // Get password.
  get password(): string {
    return this.#password;
  }

  // Get email.
  get email(): string {
    return this.#email;
  }

  // Get civilState.
  get civilState(): string {
    return this.#civilState;
  }

  // Get gender.
  get gender(): string {
    return this.#gender;
  }

  // Get infoInterests.
  get infoInterests(): String[] {
    return this.#infoInterests;
  }

  // Get acceptedCondition.
  get acceptedCondition(): Boolean {
    return this.#acceptedCondition;
  }

  // Get role.
  get role(): string {
    return this.#role;
  }

  // set username.
  set username(username: string) {
    this.#username = username;
  }

  // set password.
  set password(password: string) {
    this.#password = password;
  }

  // set email.
  set email(email: string) {
    this.#email = email;
  }

  // set civilState.
  set civilState(civilState: string) {
    this.#civilState = civilState;
  }

  // set gender.
  set gender(gender: string) {
    this.#gender = gender;
  }

  // set infoInterests.
  set infoInterests(infoInterests: String[]) {
    this.#infoInterests = infoInterests;
  }

  // set acceptedCondition.
  set acceptedCondition(acceptedCondition: Boolean) {
    this.#acceptedCondition = acceptedCondition;
  }

  // set role.
  set role(role: string) {
    this.#role = role;
  }
}
