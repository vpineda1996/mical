import { TestBed } from '@angular/core/testing';

import { QueryProviderService } from './query-provider.service';

describe('QueryProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QueryProviderService = TestBed.get(QueryProviderService);
    expect(service).toBeTruthy();
  });
});
