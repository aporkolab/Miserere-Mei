import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersEditorComponent } from './users-editor.component';
import { testProviders } from '../../../testing/test-providers';

describe('UsersEditorComponent', () => {
  let component: UsersEditorComponent;
  let fixture: ComponentFixture<UsersEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersEditorComponent],
      providers: testProviders,
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
