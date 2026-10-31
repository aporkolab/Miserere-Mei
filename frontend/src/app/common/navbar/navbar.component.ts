import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [RouterLink, AsyncPipe],
})
export class NavbarComponent implements OnInit {
  auth = inject(AuthService);

  user$ = this.auth.user$;
  public isCollapsed = false;
  mobile: boolean = false;

  ngOnInit(): void {
    if (window.screen.width <= 390) {
      // 768px portrait
      this.mobile = true;
    }
  }
}
