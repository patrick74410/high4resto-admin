import { TestBed } from '@angular/core/testing';

import { OptionsItemService } from './options-item.service';

describe('OptionsItemService', () => {
  let service: OptionsItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OptionsItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
