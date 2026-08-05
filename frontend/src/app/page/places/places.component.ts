import { PlaceService } from './../../service/place.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Place } from 'src/app/model/place';
import { NotificationService } from 'src/app/service/notification.service';
import { BattleService } from 'src/app/service/battle.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class PlacesComponent implements OnInit {
  private gameOverTimer?: ReturnType<typeof setTimeout>;
  currentPlace!: Place;

  monsterName = '';

  monsterSubscription!: Subscription;
  inBattle!: boolean;
  inBattleSubscription!: Subscription;
  monsterMinDamage = 0;
  monsterMaxDamage = 0;
  monsterHealth = 0;
  monsterMinDamageSubscription!: Subscription;
  monsterMaxDamageSubscription!: Subscription;
  monsterHealthSubscription!: Subscription;

  inventory!: any[];
  inventorySubscription!: Subscription;

  constructor(
    private notifyService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    public placeService: PlaceService,
    public data: BattleService
  ) {}

  ngOnInit(): void {
    const location = this.route.snapshot.params['location'];
    if (location) this.getPlace(location);
    this.monsterMinDamageSubscription = this.data.currentMinDamage.subscribe(
      monsterMinDamage => (this.monsterMinDamage = monsterMinDamage)
    );
    this.monsterMaxDamageSubscription = this.data.currentMaxDamage.subscribe(
      monsterMaxDamage => (this.monsterMaxDamage = monsterMaxDamage)
    );
    this.monsterHealthSubscription = this.data.currentMonsterHealth.subscribe(
      monsterHealth => (this.monsterHealth = monsterHealth)
    );
    this.monsterSubscription = this.data.currentMessage.subscribe(
      message => (this.monsterName = message)
    );
    this.inBattleSubscription = this.data.currentBattleState.subscribe(
      (state: boolean) => (this.inBattle = state)
    );

    this.inventorySubscription = this.data.currentPlayerInventory.subscribe(
      inventory => (this.inventory = inventory)
    );
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
          this.gameOverTimer = setTimeout(() => {
            this.router.navigate(['/place', 'GameBeginning']);
          }, 3000);
        }
      },
      error: () =>
        this.notifyService.showError('A helyszín nem tölthető be.', 'Kommunikációs hiba'),
    });
  }

  ngOnDestroy() {
    if (this.gameOverTimer) clearTimeout(this.gameOverTimer);
    this.monsterSubscription.unsubscribe();
    this.inBattleSubscription.unsubscribe();
    this.monsterMinDamageSubscription.unsubscribe();
    this.monsterMaxDamageSubscription.unsubscribe();
    this.monsterHealthSubscription.unsubscribe();
    this.inventorySubscription.unsubscribe();
  }
}
