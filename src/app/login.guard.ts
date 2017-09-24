import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private router: Router, public userService: UserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
  {
    if(this.userService.isLoggedIn())
    {
      return true;
    }
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
  }
}
