export interface UserLogin {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}
