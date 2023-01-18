export class User {

  username:                 string;
  password:                 string;
  role:                     string;
  email:                    string;
  civilState:               string;
  gender:                   string;
  infoInterests:            String[];
  acceptedCondition!:       Boolean;

  constructor(
    username:          string,
    password:          string,
    role:              string,
    email:             string,
    civilState:        string,
    gender:            string,
    infoInterests:     String[],
    acceptedCondition: Boolean
  ){

   this.username          = username;
   this.password          = password;
   this.role              = role;
   this.email             = email;
   this.civilState        = civilState;
   this.gender            = gender;
   this.infoInterests     = infoInterests;
   this.acceptedCondition = acceptedCondition;
  }
}
