import { HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { PlacesComponent } from './places.component';
import { testProviders } from '../../../testing/test-providers';
import { BattleService } from 'src/app/service/battle.service';
import { Place } from 'src/app/model/place';

describe('PlacesComponent', () => {
  let component: PlacesComponent;
  let fixture: ComponentFixture<PlacesComponent>;
  let http: HttpTestingController;

  const place = (overrides: Partial<Place>): Place =>
    ({
      id: 1,
      location: 'Somewhere',
      narrationZoneText: 'Text',
      opponentName: '',
      opponenthealth: 0,
      opponentMinDamage: 0,
      opponentMaxDamage: 0,
      decision1: 'Go',
      decision2: '',
      decision3: '',
      decision4: '',
      furtherLocation1: 'Next',
      furtherLocation2: '',
      furtherLocation3: '',
      furtherLocation4: '',
      objectFound: '',
      ...overrides,
    }) as Place;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacesComponent],
      providers: testProviders,
    }).compileComponents();
    http = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => vi.useRealTimers());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('starts a battle when the place has an opponent', async () => {
    component.getPlace('Ambush');
    http
      .expectOne(req => req.url.endsWith('/place/Ambush'))
      .flush(place({ location: 'Ambush', opponentName: 'Raider', opponenthealth: 30 }));

    const battle = TestBed.inject(BattleService);
    expect(await firstValueFrom(battle.currentBattleState)).toBe(true);
    expect(await firstValueFrom(battle.currentMonsterHealth)).toBe(30);
  });

  it('restarts the game three seconds after reaching GameOver', () => {
    vi.useFakeTimers();
    const restart = vi.spyOn(component, 'restartGame').mockImplementation(() => undefined);

    component.getPlace('GameOver');
    http
      .expectOne(req => req.url.endsWith('/place/GameOver'))
      .flush(place({ location: 'GameOver' }));

    vi.advanceTimersByTime(2999);
    expect(restart).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(restart).toHaveBeenCalledTimes(1);
  });
});
