import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  urlBase = 'http://localhost:8000/api'

  constructor(private http: HttpClient) { }

  login(body: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.urlBase}/login`, body, {withCredentials: true} );
  }
}
