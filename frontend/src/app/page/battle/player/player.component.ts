import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { INgxTableColumn } from 'src/app/common/data-table/ngx-data-table/ngx-data-table.component';
import { Place } from 'src/app/model/place';
import { Player } from 'src/app/model/player';
import { BattleService } from 'src/app/service/battle.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PlaceService } from 'src/app/service/place.service';
import { PlayerService } from 'src/app/service/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: false,
})
export class PlayerComponent implements OnInit {
  // @Output() selectOne: EventEmitter<Player> = new EventEmitter<Player>();
  public player$!: Observable<Player>;
  @Output()
  player: Player = new Player();

  weaponName!: string;
  playerMinDamage!: number;
  playerMaxDamage!: number;
  playerHealth!: number;
  playerBulletsNumber!: number;
  playerMinDamageSubscription!: Subscription;
  playerMaxDamageSubscription!: Subscription;
  playerHealthSubscription!: Subscription;
  playerWeaponSubscription!: Subscription;
  playerBulletsNumberSubscription!: Subscription;

  monsterName!: string;
  subscription!: Subscription;
  monsterMinDamage!: number;
  monsterMaxDamage!: number;
  monsterHealth!: number;
  monsterMinDamageSubscription!: Subscription;
  monsterMaxDamageSubscription!: Subscription;
  monsterHealthSubscription!: Subscription;

  inventory = [
    {
      name: 'Gyógyszer',
      numberOfItems: 1,
      description: '20 ÉP-ot gyógyít',
      effect: '+20ÉP',
    },
    {
      name: 'Lőszer',
      numberOfItems: 2,
      description: '10 töltényt ad',
      effect: '+15ÉP',
    },
  ];

  inventorySubscription!: Subscription;

  constructor(
    private notifyService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    public placeService: PlaceService,
    public playerService: PlayerService,
    public data: BattleService
  ) {}

  ngOnInit(): void {
    this.subscription = this.data.currentMessage.subscribe(
      monsterName => (this.monsterName = monsterName)
    );
    this.monsterMinDamageSubscription = this.data.currentMinDamage.subscribe(
      monsterMinDamage => (this.monsterMinDamage = monsterMinDamage)
    );
    this.monsterMaxDamageSubscription = this.data.currentMaxDamage.subscribe(
      monsterMaxDamage => (this.monsterMaxDamage = monsterMaxDamage)
    );
    this.monsterHealthSubscription = this.data.currentMonsterHealth.subscribe(
      monsterHealth => (this.monsterHealth = monsterHealth)
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
    this.data.changePlayerInventory(this.inventory);
    this.inventorySubscription = this.data.currentPlayerInventory.subscribe(
      inventory => (this.inventory = inventory)
    );
  }
}
