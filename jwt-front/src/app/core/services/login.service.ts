import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  urlBase = 'localhost:8000/api/'

  constructor(private http: HttpClient) { }

  login(body: any) {
    this.http.post<any>(`${this.urlBase}/login`, body)
  }
}
