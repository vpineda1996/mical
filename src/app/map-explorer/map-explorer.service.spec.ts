import { TestBed } from '@angular/core/testing';

import { MapExplorerService } from './map-explorer.service';

describe('MapExplorerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapExplorerService = TestBed.get(MapExplorerService);
    expect(service).toBeTruthy();
  });
});
