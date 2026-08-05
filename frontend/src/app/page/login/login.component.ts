import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService, ILoginData } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class LoginComponent implements OnInit {
  loginData: ILoginData = { email: '', password: '' };

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.logout();
  }

  onLogin(): void {
    this.auth.login(this.loginData);
  }
}
