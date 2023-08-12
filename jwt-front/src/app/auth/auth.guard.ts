import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Emitters } from '../core/emitters/emitters';
import { Observable } from 'rxjs';
import { AuthService } from '../core/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

 token = false

  constructor(private route: Router, private authService: AuthService,) { }



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        this.authService.authUser().subscribe(
          res => {
            if(res._id > 0) {
              this.token = true
            }
          },
          error => {
            this.token = false
          }
        )
      if(this.token) {
        return true
      } else {
        this.route.navigate(['/login'])
        return false
      }
    }

}
