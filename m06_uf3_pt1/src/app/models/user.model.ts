export class User {

  username:                 string;
  password:                 string;
  email:                    string;
  civilState:               string;
  gender:                   string;
  infoInterests:            String[];
  acceptedCondition!:       Boolean;
  role:                     string;

  constructor(
    username:          string,
    password:          string,
    email:             string,
    civilState:        string,
    gender:            string,
    infoInterests:     String[],
    acceptedCondition: Boolean,
    role: string
  ){

   this.username          = username;
   this.password          = password;
   this.email             = email;
   this.civilState        = civilState;
   this.gender            = gender;
   this.infoInterests     = infoInterests;
   this.acceptedCondition = acceptedCondition;
   this.role              = role;
  }
}
