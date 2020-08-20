import { TestBed } from '@angular/core/testing';

import { MinorService } from './minor.service';

describe('MinorService', () => {
  let service: MinorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
