import { TestBed } from '@angular/core/testing';

import { BaseService } from './base.service';

describe('BaseService', () => {
  let service: BaseService<{ _id: string }>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseService<{ _id: string }>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
