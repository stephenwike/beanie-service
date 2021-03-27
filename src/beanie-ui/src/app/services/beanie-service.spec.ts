import { TestBed } from '@angular/core/testing';

import { BeanieService } from './beanie-service';

describe('BeanieService', () => {
  let service: BeanieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeanieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
