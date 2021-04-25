import { TestBed } from '@angular/core/testing';

import { WorkPositionsService } from './work-positions.service';

describe('WorkPositionsService', () => {
  let service: WorkPositionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkPositionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
