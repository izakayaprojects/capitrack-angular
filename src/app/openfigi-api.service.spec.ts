import { TestBed } from '@angular/core/testing';

import { OpenfigiApiService } from './openfigi-api.service';

describe('OpenfigiApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpenfigiApiService = TestBed.get(OpenfigiApiService);
    expect(service).toBeTruthy();
  });
});
