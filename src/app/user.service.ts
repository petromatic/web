import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  authState: any = null;

  setAuthState(authState)
  {
    this.authState = authState;
    localStorage.setItem('authState', this.authState);
  }

  constructor() {
    this.authState = localStorage.getItem('authState');
   }

   isLoggedIn()
   {
    return !!this.authState;
   }

}
