
import { Injectable } from '@angular/core';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { users } from '../interface/userInterface';


@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  constructor(private http: HttpClient) { }

  signUpUser(userData:users){
    return this.http.post<{ message: string, error: string }>('http://localhost:3100/signup', userData,
      {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
  })
}

  loginUser(email: string, password: string){
    const userLogs ={email:email, password:password};
    return this.http.post<{ message: string, error: string,}>('http://localhost:3100/auth/login', userLogs);
  };


  getOneUserDetails(id:string){
    return this.http.get<{user:users[]}>(`http://localhost:3100/users/${id}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      })
    })
  }

}
