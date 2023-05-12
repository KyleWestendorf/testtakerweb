import { TestBed } from '@angular/core/testing';

import { TestingStateService } from './testing-state.service';

describe('TestingStateService', () => {
  let service: TestingStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestingStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
