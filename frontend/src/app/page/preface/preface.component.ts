import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-preface',
  templateUrl: './preface.component.html',
  styleUrls: ['./preface.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class PrefaceComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
