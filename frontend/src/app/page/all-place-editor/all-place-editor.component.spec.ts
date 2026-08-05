import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPlaceEditorComponent } from './all-place-editor.component';
import { AppModule } from '../../app.module';

describe('AllPlaceEditorComponent', () => {
  let component: AllPlaceEditorComponent;
  let fixture: ComponentFixture<AllPlaceEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AllPlaceEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
