export interface UserRegistrationInterface {
  username: string;
  email: string;
  password: string;
}

export default class UserRegistration implements UserRegistrationInterface {
  username: string;
  email: string;
  password: string;

  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
