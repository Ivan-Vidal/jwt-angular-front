import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Emitters } from '../core/emitters/emitters';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../core/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

 token: boolean = false

  constructor(private route: Router, private authService: AuthService,) { }



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        Emitters.authEmitters.subscribe(
          (auth: boolean) =>  {
            this.token =  auth
          }
        )


      if(this.token){
        return true
      }else {
        this.route.navigate(['/login'])
        return false
      }
    }

}
