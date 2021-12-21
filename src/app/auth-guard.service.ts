import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (localStorage.getItem("user") && localStorage.getItem("token")) {
      return true;
    } else {
      // alert("Not loggedin");
      this.router.navigate(['login']);
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (localStorage.getItem("user") && localStorage.getItem("token")) {
      return true;
    } else {
      // alert("Not loggedin");
      this.router.navigate(['login']);
      return false;
    }
  }

}
