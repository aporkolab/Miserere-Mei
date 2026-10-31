import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ForbiddenComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
