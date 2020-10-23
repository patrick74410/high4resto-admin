import { TestBed } from '@angular/core/testing';

import { ExpireService } from './expire.service';

describe('ExpireService', () => {
  let service: ExpireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
