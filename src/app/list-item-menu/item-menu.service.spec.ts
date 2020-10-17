import { TestBed } from '@angular/core/testing';

import { ListItemMenuService } from './list-item-menu.service';

describe('ListItemMenuService', () => {
  let service: ListItemMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListItemMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
