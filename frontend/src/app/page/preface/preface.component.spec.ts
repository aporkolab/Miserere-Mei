import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefaceComponent } from './preface.component';
import { testProviders } from '../../../testing/test-providers';

describe('PrefaceComponent', () => {
  let component: PrefaceComponent;
  let fixture: ComponentFixture<PrefaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrefaceComponent],
      providers: testProviders,
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
