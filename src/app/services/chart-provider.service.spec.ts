import { TestBed } from '@angular/core/testing';

import { ChartProviderService } from './chart-provider.service';

describe('ChartProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChartProviderService = TestBed.get(ChartProviderService);
    expect(service).toBeTruthy();
  });
});
