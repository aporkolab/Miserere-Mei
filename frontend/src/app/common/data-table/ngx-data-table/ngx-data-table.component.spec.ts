import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDataTableComponent } from './ngx-data-table.component';
import { testProviders } from '../../../../testing/test-providers';

describe('NgxDataTableComponent', () => {
  let component: NgxDataTableComponent<Record<string, unknown>>;
  let fixture: ComponentFixture<NgxDataTableComponent<Record<string, unknown>>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxDataTableComponent],
      providers: testProviders,
    }).compileComponents();

    fixture =
      TestBed.createComponent<NgxDataTableComponent<Record<string, unknown>>>(
        NgxDataTableComponent
      );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
