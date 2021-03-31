import { TestBed } from '@angular/core/testing';

import { BeanieManagerService } from './beanie-manager.service';

describe('BeanieManagerService', () => {
  let service: BeanieManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeanieManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
