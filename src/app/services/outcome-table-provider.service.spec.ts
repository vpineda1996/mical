import { TestBed } from '@angular/core/testing';

import { OutcomeTableProviderService } from './outcome-table-provider.service';

describe('OutcomeTableProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OutcomeTableProviderService = TestBed.get(OutcomeTableProviderService);
    expect(service).toBeTruthy();
  });
});
