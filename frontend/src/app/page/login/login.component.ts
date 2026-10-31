import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { AuthService, ILoginData } from 'src/app/service/auth.service';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [FormsModule, NgClass],
})
export class LoginComponent implements OnInit {
  private auth = inject(AuthService);

  loginData: ILoginData = { email: '', password: '' };

  ngOnInit(): void {
    this.auth.logout();
  }

  onLogin(): void {
    this.auth.login(this.loginData);
  }
}
