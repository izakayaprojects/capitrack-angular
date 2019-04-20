import { TestBed } from '@angular/core/testing';

import { TransactionItemService } from './transaction-item.service';

describe('TransactionItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransactionItemService = TestBed.get(TransactionItemService);
    expect(service).toBeTruthy();
  });
});
