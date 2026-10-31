import { Injectable } from '@angular/core';
import { Player } from '../model/player';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService extends BaseService<Player> {
  override entity = 'player';
}
