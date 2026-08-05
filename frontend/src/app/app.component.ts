import { Component, ChangeDetectionStrategy } from '@angular/core';
import Scrollbar from 'smooth-scrollbar';
import { ConfigService, IMenuItem } from './service/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class AppComponent {
  constructor(private config: ConfigService) {}

  ngAfterViewInit() {
    Scrollbar.init(document.querySelector('#scrollbar')!, {
      damping: 0.5,
      renderByPixels: true,
      alwaysShowTracks: false,
      continuousScrolling: true,
    });
  }

  title = 'MiserereMei';
  sidebar: IMenuItem[] = this.config.sidebarMenu;
}
