import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
})
export class SidebarComponent implements OnInit {
  auth = inject(AuthService);

  ngOnInit(): void {}
}
