import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  urlBase = 'http://localhost:8000/api'

  constructor(private http: HttpClient) { }

  registerUser(body: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.urlBase}/register`, body);
  }
}
