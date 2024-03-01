
import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  constructor(private http: HttpClient) { }

  signUpUser(UserName: string, email: string, password: string){
    const userData= { userName: UserName, email: email, password: password };
    return this.http.post<{ message: string, error: string }>('http://localhost:3100/signup', userData)
  }

  loginUser(email: string, password: string){
    const userLogs ={email:email, password:password};
    return this.http.post<{ message: string, error: string }>('http://localhost:3100/auth/login', userLogs);
  };

}
