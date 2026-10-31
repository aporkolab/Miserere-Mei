import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AllPlace } from '../model/allplace';

@Injectable({
  providedIn: 'root',
})
export class AllPlaceViewerService extends BaseService<AllPlace> {
  override entity = 'allplace';
}
