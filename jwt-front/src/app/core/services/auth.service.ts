import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlBase = 'http://localhost:8000/api'
  
  constructor(private http: HttpClient) { }

  authUser():Observable<any> {
      return this.http.get<any>(`${this.urlBase}/user`, {withCredentials: true} );
    }

    logout() {
      return this.http.post<any>(`${this.urlBase}/logout`, {}, {withCredentials: true} );

    }
  }
