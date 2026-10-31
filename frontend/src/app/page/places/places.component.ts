import { PlaceService } from './../../service/place.service';
import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
  inject,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Place } from 'src/app/model/place';
import { NotificationService } from 'src/app/service/notification.service';
import { Item } from 'src/app/model/item';
import { BattleService } from 'src/app/service/battle.service';
import { PlayerComponent } from '../battle/player/player.component';
import { BattleComponent } from '../battle/battle.component';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [PlayerComponent, BattleComponent],
})
export class PlacesComponent implements OnInit, OnDestroy {
  private readonly destroyRef = inject(DestroyRef);
  private notifyService = inject(NotificationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private document = inject(DOCUMENT);
  placeService = inject(PlaceService);
  data = inject(BattleService);

  private gameOverTimer?: ReturnType<typeof setTimeout>;
  currentPlace!: Place;

  monsterName = '';

  inBattle!: boolean;
  monsterMinDamage = 0;
  monsterMaxDamage = 0;
  monsterHealth = 0;

  inventory: Item[] = [];

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      const location = params.get('location');
      if (location) this.getPlace(location);
    });
    this.data.currentMinDamage
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(monsterMinDamage => (this.monsterMinDamage = monsterMinDamage));
    this.data.currentMaxDamage
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(monsterMaxDamage => (this.monsterMaxDamage = monsterMaxDamage));
    this.data.currentMonsterHealth
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(monsterHealth => (this.monsterHealth = monsterHealth));
    this.data.currentMessage
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(message => (this.monsterName = message));
    this.data.currentBattleState
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((state: boolean) => (this.inBattle = state));

    this.data.currentPlayerInventory
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(inventory => (this.inventory = inventory));
  }

  getPlace(location: string): void {
    this.placeService.getOnePlace(location).subscribe({
      next: data => {
        this.currentPlace = data;
        if (this.currentPlace.opponentName != '') {
          this.data.changeMessage(this.currentPlace.opponentName);
          this.data.changeMonsterHealth(this.currentPlace.opponenthealth);
          this.data.changeMonsterMinDamage(this.currentPlace.opponentMinDamage);
          this.data.changeMonsterMaxDamage(this.currentPlace.opponentMaxDamage);
          this.data.changeCurrentBattleState(true);
        } else {
          this.data.changeMessage('Nincs');
          this.data.changeMonsterMinDamage(0);
          this.data.changeMonsterMaxDamage(0);
          this.data.changeMonsterHealth(0);
          this.data.changeCurrentBattleState(false);
        }
        if (this.currentPlace.objectFound) {
          this.data.addItem(this.currentPlace.objectFound);
        }

        if (this.currentPlace.location === 'GameOver') {
          this.gameOverTimer = setTimeout(() => this.restartGame(), 3000);
        }
      },
      error: () =>
        this.notifyService.showError('A helyszín nem tölthető be.', 'Kommunikációs hiba'),
    });
  }

  /**
   * Story navigation happens in-component, so the URL usually still reads /place/GameBeginning.
   * A plain router.navigate() to that URL is ignored; reload to also reset the player state,
   * mirroring what happens when Cantus dies in battle.
   */
  restartGame(): void {
    void this.router
      .navigateByUrl('/place/GameBeginning')
      .then(() => this.document.location.reload());
  }

  ngOnDestroy(): void {
    if (this.gameOverTimer) clearTimeout(this.gameOverTimer);
  }
}
