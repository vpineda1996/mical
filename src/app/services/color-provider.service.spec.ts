import { TestBed } from '@angular/core/testing';

import { ColorProviderService } from './color-provider.service';

describe('ColorProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ColorProviderService = TestBed.get(ColorProviderService);
    expect(service).toBeTruthy();
  });
});
