import { Injectable } from '@angular/core';
import { Place } from '../model/place';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class PlaceService extends BaseService<Place> {
  override entity = 'place';
}
