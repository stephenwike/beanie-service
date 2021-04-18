import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { BeanieService } from './beanie-service';

describe('BeanieService', () => {
  let service: BeanieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ HttpClient, HttpHandler ]
    });
    service = TestBed.inject(BeanieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
