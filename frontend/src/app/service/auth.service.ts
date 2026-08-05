import { User } from './../model/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NotificationService } from './notification.service';

export interface IAuthModel {
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
  private readonly readySubject = new BehaviorSubject<boolean>(false);
  ready$ = this.readySubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private notifications: NotificationService
  ) {
    this.restoreSession();
  }

  private restoreSession(): void {
    this.http.get<IAuthModel>(`${this.loginUrl}/session`).subscribe({
      next: response => {
        this.userSubject.next(response.user);
        this.readySubject.next(true);
      },
      error: () => {
        this.userSubject.next(null);
        this.readySubject.next(true);
      },
    });
  }

  login(loginData: ILoginData): void {
    this.http
      .post<IAuthModel>(this.loginUrl, loginData)
      .pipe(
        tap((response: IAuthModel) => {
          this.userSubject.next(response.user);
          this.notifications.showSuccess('Sikeres bejelentkezés.', 'Miserere Mei');
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: err => {
          this.notifications.showError(
            err.status === 401 ? 'Hibás e-mail-cím vagy jelszó.' : 'A bejelentkezés nem sikerült.',
            'Miserere Mei'
          );
        },
      });
  }

  logout(): void {
    this.userSubject.next(null);
    this.router.navigate(['/login']);
    this.http.post<void>(`${this.loginUrl}/logout`, {}).subscribe({ error: () => undefined });
  }

  get isAuthenticated(): boolean {
    return !!this.userSubject.value;
  }

  get currentUser(): User | null {
    return this.userSubject.value;
  }
}
