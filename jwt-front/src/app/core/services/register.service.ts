import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  urlBase = 'localhost:8000/api/'

  constructor(private http: HttpClient) { }

  registerUser(body: any) {
    this.http.post<any>(`${this.urlBase}/register`, body)
  }
}
