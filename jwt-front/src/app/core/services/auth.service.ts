import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserAuth } from '../models/userAuth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlBase = 'http://localhost:8000/api'
  
  constructor(private http: HttpClient) { }

  authUser():Observable<IUserAuth> {
      return this.http.get<IUserAuth>(`${this.urlBase}/user`, {withCredentials: true} );
    }

    logout() {
      return this.http.post<IUserAuth>(`${this.urlBase}/logout`, {}, {withCredentials: true} );

    }
  }
