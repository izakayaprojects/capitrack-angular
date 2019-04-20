import { TestBed } from '@angular/core/testing';

import { UserCredService } from './user-cred.service';

describe('UserCredService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserCredService = TestBed.get(UserCredService);
    expect(service).toBeTruthy();
  });
});
