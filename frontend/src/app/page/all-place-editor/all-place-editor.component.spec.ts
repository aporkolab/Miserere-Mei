import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPlaceEditorComponent } from './all-place-editor.component';
import { testProviders } from '../../../testing/test-providers';

describe('AllPlaceEditorComponent', () => {
  let component: AllPlaceEditorComponent;
  let fixture: ComponentFixture<AllPlaceEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllPlaceEditorComponent],
      providers: testProviders,
    }).compileComponents();

    fixture = TestBed.createComponent(AllPlaceEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
