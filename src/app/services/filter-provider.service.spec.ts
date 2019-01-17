import { TestBed } from '@angular/core/testing';

import { FilterProviderService } from './filter-provider.service';

describe('FilterProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterProviderService = TestBed.get(FilterProviderService);
    expect(service).toBeTruthy();
  });
});
