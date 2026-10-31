import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleComponent } from './battle.component';
import { testProviders } from '../../../testing/test-providers';

describe('BattleComponent', () => {
  let component: BattleComponent;
  let fixture: ComponentFixture<BattleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BattleComponent],
      providers: testProviders,
    }).compileComponents();

    fixture = TestBed.createComponent(BattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
