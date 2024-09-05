import { TestBed } from '@angular/core/testing';

import { OrsersService } from './orsers.service';

describe('OrsersService', () => {
  let service: OrsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
