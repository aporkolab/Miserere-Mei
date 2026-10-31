import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPlaceViewerComponent } from './all-place-viewer.component';
import { testProviders } from '../../../testing/test-providers';

describe('AllPlaceViewerComponent', () => {
  let component: AllPlaceViewerComponent;
  let fixture: ComponentFixture<AllPlaceViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllPlaceViewerComponent],
      providers: testProviders,
    }).compileComponents();

    fixture = TestBed.createComponent(AllPlaceViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
