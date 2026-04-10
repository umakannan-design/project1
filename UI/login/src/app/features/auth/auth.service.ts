import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRegister } from '../../shared/model/user-register';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, LoginResponse } from '../../shared/model/login';
import { Router } from '@angular/router';
import { UserProfile } from '../../shared/model/user-profile';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  api = 'https://localhost:7117/api/';

  constructor(private http: HttpClient, private router: Router) { }

  userRegistration(userData: UserRegister): Observable<string> {
    let url = this.api + 'auth/UserRegistration';
    return this.http.post<string>(url, userData);
  }

  loginUser(data: LoginRequest): Observable<LoginResponse> {
    let url = this.api + "auth/Login";
    return this.http.post<LoginResponse>(url, data);
  }

  setSession(token: string) {
    console.log(token)
    localStorage.setItem('token', token);
  }

  getUserProfile() : Observable<UserProfile>{
    let url = this.api + 'Auth/profile';
    return this.http.get<UserProfile>(url);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    // this._user.set(null);
    this.router.navigate(['/login']);
  }
}
