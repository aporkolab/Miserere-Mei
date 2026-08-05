import { Player } from 'src/app/model/player';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import { PlaceService } from 'src/app/service/place.service';
import { PlayerService } from 'src/app/service/player.service';
import { Observable, Subscription } from 'rxjs';
import { Enemy } from 'src/app/model/enemy';
import { BattleService } from 'src/app/service/battle.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class BattleComponent implements OnInit, OnDestroy {
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
  playerMinDamageSubscription!: Subscription;
  playerMaxDamageSubscription!: Subscription;
  playerHealthSubscription!: Subscription;
  playerWeaponSubscription!: Subscription;
  playerBulletsNumberSubscription!: Subscription;

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

  inBattleSubscription!: Subscription;
  monsterMinDamageSubscription!: Subscription;
  monsterMaxDamageSubscription!: Subscription;
  monsterHealthSubscription!: Subscription;
  subscription!: Subscription;

  inventory!: any[];
  inventorySubscription!: Subscription;

  constructor(
    private notifyService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    public placeService: PlaceService,
    public playerService: PlayerService,
    private data: BattleService
  ) {}

  ngOnInit(): void {
    this.inBattleSubscription = this.data.currentBattleState.subscribe(
      (state: boolean) => (this.inBattle = state)
    );
    this.monsterMinDamageSubscription = this.data.currentMinDamage.subscribe(
      monsterMinDamage => (this.monsterMinDamage = monsterMinDamage)
    );
    this.monsterMaxDamageSubscription = this.data.currentMaxDamage.subscribe(
      monsterMaxDamage => (this.monsterMaxDamage = monsterMaxDamage)
    );
    this.monsterHealthSubscription = this.data.currentMonsterHealth.subscribe(
      enemyHealth => (this.enemyHealth = enemyHealth)
    );
    this.subscription = this.data.currentMessage.subscribe(
      monsterName => (this.monsterName = monsterName)
    );
    this.playerHealthSubscription = this.data.currentPlayerHealth.subscribe(
      playerHealth => (this.playerHealth = playerHealth)
    );
    this.playerMinDamageSubscription = this.data.currentPlayerMinDamage.subscribe(
      playerMinDamage => (this.playerMinDamage = playerMinDamage)
    );
    this.playerMaxDamageSubscription = this.data.currentPlayerMaxDamage.subscribe(
      playerMaxDamage => (this.playerMaxDamage = playerMaxDamage)
    );
    this.playerBulletsNumberSubscription = this.data.currentPlayerBulletsNumber.subscribe(
      playerBulletsNumber => (this.playerBulletsNumber = playerBulletsNumber)
    );
    this.playerWeaponSubscription = this.data.currentWeapon.subscribe(
      weaponName => (this.weaponName = weaponName)
    );
    this.inventorySubscription = this.data.currentPlayerInventory.subscribe(
      inventory => (this.inventory = inventory)
    );
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

  ngOnDestroy(): void {
    this.inBattleSubscription.unsubscribe();
    this.monsterMinDamageSubscription.unsubscribe();
    this.monsterMaxDamageSubscription.unsubscribe();
    this.monsterHealthSubscription.unsubscribe();
    this.subscription.unsubscribe();
    this.playerHealthSubscription.unsubscribe();
    this.playerMinDamageSubscription.unsubscribe();
    this.playerMaxDamageSubscription.unsubscribe();
    this.playerBulletsNumberSubscription.unsubscribe();
    this.playerWeaponSubscription.unsubscribe();
    this.inventorySubscription.unsubscribe();
  }
}
