import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  authState: any = null;
  admin: boolean = false;

  setAuthState(authState)
  {
    this.authState = authState;
    localStorage.setItem('authState', this.authState);
    this.admin = !!this.authState;
  }

  constructor() {
    this.authState = localStorage.getItem('authState');
    this.admin = !!this.authState;
   }

   isLoggedIn()
   {
    return !!this.authState;
   }

   isAdmin()
   {
     return this.admin;
   }

}
