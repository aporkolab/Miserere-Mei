import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [SidebarComponent, NavbarComponent, RouterOutlet],
})
export class AppComponent {
  title = 'MiserereMei';
}
