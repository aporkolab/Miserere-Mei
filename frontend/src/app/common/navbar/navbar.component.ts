import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import Scrollbar from 'smooth-scrollbar';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class NavbarComponent implements OnInit {
  user$ = this.auth.user$;
  public isCollapsed = false;
  mobile: boolean = false;

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    if (window.screen.width <= 390) {
      // 768px portrait
      this.mobile = true;
    }
  }
}
