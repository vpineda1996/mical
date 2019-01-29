import { TestBed } from '@angular/core/testing';

import { InterventionProviderService } from './intervention-provider.service';

describe('InterventionProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InterventionProviderService = TestBed.get(InterventionProviderService);
    expect(service).toBeTruthy();
  });
});
