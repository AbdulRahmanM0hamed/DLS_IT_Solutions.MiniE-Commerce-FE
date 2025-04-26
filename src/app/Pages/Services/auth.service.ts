import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import {jwtDecode} from 'jwt-decode';
import { environment } from '../../environments/environment.development';
import { Gender } from '../Enums/GenderType';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl; // Replace with your backend URL
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private roleSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    this.tokenSubject.next(localStorage.getItem('token'));
    this.roleSubject.next(localStorage.getItem('role'));
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/Account/Login`, credentials).pipe(
      tap((response: any) => {
        const token = response.token;
        const role = response.roles[0];
        const refreshToken = response.refreshToken;
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('refreshToken', refreshToken);
        this.tokenSubject.next(token);
        this.roleSubject.next(role);
      })
    );
  } 
  
  Register(credentials: { fristName: string; lastName: string , email:string ,phoneNumber :string ,password:string ,Gender:Gender}): Observable<any> {
    return  this.http.post(`${this.apiUrl}/api/Account/Register-For-User`, credentials);
   } 

  logout(): void {
    // this.http.post(`${this.apiUrl}/api/Account/LogOut`);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('refreshToken');
    this.tokenSubject.next(null);
    this.roleSubject.next(null);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }
  getuserId(): any {
    const token = this.getToken();
    if (!token) return null;
    const decodedToken = this.getDecodedToken(token);
    console.log(decodedToken.uid,'id');
    return  decodedToken.uid ;
    
  }


  getRole(): string | null {
    console.log(this.roleSubject.value,'role');
    return this.roleSubject.value;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  getDecodedToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  }

  private isTokenExpired(token: string): boolean {
    const decoded = this.getDecodedToken(token);
    if (!decoded || !decoded.exp) return true;
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  }
}
