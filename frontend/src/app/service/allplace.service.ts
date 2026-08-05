import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';
import { AllPlace } from '../model/allplace';

@Injectable({
  providedIn: 'root',
})
export class AllPlaceService extends BaseService<AllPlace> {
  constructor(http: HttpClient, config: ConfigService) {
    super(http, config);
    this.entity = 'allplace';
  }
}
