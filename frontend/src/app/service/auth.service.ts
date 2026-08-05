import { User } from './../model/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface IAuthModel {
  success: boolean;
  accessToken: string;
  user: User;
}

export interface ILoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private readonly loginUrl = `${this.apiUrl}/login`;

  private readonly userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  private readonly accessTokenSubject = new BehaviorSubject<string>('');
  access_token$ = this.accessTokenSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadSessionData();
  }

  private loadSessionData(): void {
    const loginInfo = sessionStorage.getItem('login');
    if (!loginInfo) return;

    try {
      const loginObject: IAuthModel = JSON.parse(loginInfo);
      if (!loginObject.accessToken || !loginObject.user) throw new Error('Invalid session');
      this.accessTokenSubject.next(loginObject.accessToken);
      this.userSubject.next(loginObject.user);
    } catch {
      sessionStorage.removeItem('login');
    }
  }

  login(loginData: ILoginData): void {
    this.http
      .post<IAuthModel>(this.loginUrl, loginData)
      .pipe(
        tap((response: IAuthModel) => {
          this.userSubject.next(response.user);
          this.accessTokenSubject.next(response.accessToken);
          sessionStorage.setItem('login', JSON.stringify(response));
          alert('Sikeres bejelentkezés!');
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: err => {
          console.error('Login error:', err);
          alert('Hiba történt a bejelentkezés során!');
        },
      });
  }

  logout(): void {
    this.userSubject.next(null);
    this.accessTokenSubject.next('');
    sessionStorage.removeItem('login');
    this.router.navigate(['/login']);
  }

  get isAuthenticated(): boolean {
    return !!this.userSubject.value;
  }

  get accessToken(): string {
    return this.accessTokenSubject.value;
  }
}
