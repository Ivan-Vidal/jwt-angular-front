import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Emitters } from '../core/emitters/emitters';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

 token : any

  constructor(private route: Router, private emitters: Emitters,) { }



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


      if(this.token) {
        return true
      } else {
        this.route.navigate(['/login'])
        return false
      }
    }

}
