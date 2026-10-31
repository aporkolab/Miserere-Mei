import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectionStrategy,
  inject,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
})
export class PlayerComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private notifyService = inject(NotificationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  placeService = inject(PlaceService);
  playerService = inject(PlayerService);
  data = inject(BattleService);

  // @Output() selectOne: EventEmitter<Player> = new EventEmitter<Player>();
  public player$!: Observable<Player>;
  @Output()
  player: Player = new Player();

  weaponName!: string;
  playerMinDamage!: number;
  playerMaxDamage!: number;
  playerHealth!: number;
  playerBulletsNumber!: number;

  monsterName!: string;
  monsterMinDamage!: number;
  monsterMaxDamage!: number;
  monsterHealth!: number;

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

  ngOnInit(): void {
    this.data.currentMessage
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(monsterName => (this.monsterName = monsterName));
    this.data.currentMinDamage
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(monsterMinDamage => (this.monsterMinDamage = monsterMinDamage));
    this.data.currentMaxDamage
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(monsterMaxDamage => (this.monsterMaxDamage = monsterMaxDamage));
    this.data.currentMonsterHealth
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(monsterHealth => (this.monsterHealth = monsterHealth));
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
    this.data.changePlayerInventory(this.inventory);
    this.data.currentPlayerInventory
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(inventory => (this.inventory = inventory));
  }
}
