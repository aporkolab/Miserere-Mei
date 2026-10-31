import { Player } from 'src/app/model/player';
import { Component, OnInit, ChangeDetectionStrategy, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import { PlaceService } from 'src/app/service/place.service';
import { PlayerService } from 'src/app/service/player.service';
import { Observable } from 'rxjs';
import { Enemy } from 'src/app/model/enemy';
import { Item } from 'src/app/model/item';
import { BattleService } from 'src/app/service/battle.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class BattleComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private notifyService = inject(NotificationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  placeService = inject(PlaceService);
  playerService = inject(PlayerService);
  private data = inject(BattleService);

  player$!: Observable<Player>;
  player: Player = new Player();
  enemy$!: Observable<Enemy>;
  enemy: Enemy = new Enemy();

  //Player data
  playerHealth = this.player.protagonistHealthPoint;
  weaponName = this.player.currentWeaponName;
  playerMinDamage!: number;
  playerMaxDamage!: number;
  playerBulletsNumber = this.player.playerAmmo;

  //Moster data
  monsterName!: string;
  enemyHealth = this.enemy.monsterhealth;
  monsterMinDamage = this.enemy.minDamage;
  monsterMaxDamage = this.enemy.maxDamage;

  youAreDead = false;
  inBattle = false;
  roundDamageByPlayer = 0;
  roundDamageByEnemy = 0;
  roundNumber = 0;

  inventory: Item[] = [];

  ngOnInit(): void {
    this.data.currentBattleState
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((state: boolean) => (this.inBattle = state));
    this.data.currentMinDamage
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(monsterMinDamage => (this.monsterMinDamage = monsterMinDamage));
    this.data.currentMaxDamage
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(monsterMaxDamage => (this.monsterMaxDamage = monsterMaxDamage));
    this.data.currentMonsterHealth
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(enemyHealth => (this.enemyHealth = enemyHealth));
    this.data.currentMessage
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(monsterName => (this.monsterName = monsterName));
    this.data.currentPlayerHealth
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(playerHealth => (this.playerHealth = playerHealth));
    this.data.currentPlayerMinDamage
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(playerMinDamage => (this.playerMinDamage = playerMinDamage));
    this.data.currentPlayerMaxDamage
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(playerMaxDamage => (this.playerMaxDamage = playerMaxDamage));
    this.data.currentPlayerBulletsNumber
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(playerBulletsNumber => (this.playerBulletsNumber = playerBulletsNumber));
    this.data.currentWeapon
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(weaponName => (this.weaponName = weaponName));
    this.data.currentPlayerInventory
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(inventory => (this.inventory = inventory));
  }

  oneRound(player: Player, enemy: Enemy) {
    if (this.youAreDead || !this.inBattle || this.enemyHealth <= 0) return;

    this.roundNumber += 1;
    this.bulletCheck(player);
    this.roundDamageByPlayer = this.randomDamageByPlayer(player);
    this.enemyHealth = Math.max(0, this.enemyHealth - this.roundDamageByPlayer);
    this.data.changeMonsterHealth(this.enemyHealth);
    this.enemyHealthCheck(enemy);

    this.roundDamageByEnemy = this.inBattle ? this.randomDamageByEnemy(enemy) : 0;
    this.playerHealth = Math.max(0, this.playerHealth - this.roundDamageByEnemy);
    this.data.changePlayerHealth(this.playerHealth);
    this.healthCheck(player);
  }

  randomDamageByPlayer(player: Player) {
    return (
      Math.floor(Math.random() * (this.playerMaxDamage - this.playerMinDamage + 1)) +
      this.playerMinDamage
    );
  }

  randomDamageByEnemy(enemy: Enemy) {
    return (
      Math.floor(Math.random() * (this.monsterMaxDamage - this.monsterMinDamage + 1)) +
      this.monsterMinDamage
    );
  }

  healthCheck(player: Player): void {
    if (this.playerHealth <= 0) {
      this.youAreDead = true;
      this.notifyService.showError('Vége a játéknak!', 'MEGHALTÁL!');
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }

  bulletCheck(player: Player) {
    if (this.playerBulletsNumber <= 1) {
      this.notifyService.showWarning(
        'Cantusnak elfogyott a lőszere, ezért a jó öreg Bowie-késére vált át!',
        'NINCS LŐSZER!'
      );
      this.data.changePlayerMinDamage(1);
      this.data.changePlayerMaxDamage(3);
      this.data.changePlayerWeapon('Bowie-kés');
      this.data.changePlayerBulletsNumber(0);
    } else {
      this.data.changePlayerBulletsNumber((this.playerBulletsNumber -= 1));
    }
  }

  enemyHealthCheck(enemy: Enemy) {
    if (this.enemyHealth <= 0) {
      this.data.changeMonsterMaxDamage(0);
      this.data.changeMonsterMinDamage(0);
      this.data.changeMonsterHealth(0);
      this.data.changeMessage('Nincs');
      this.data.changeCurrentBattleState(false);
    }
  }
}
