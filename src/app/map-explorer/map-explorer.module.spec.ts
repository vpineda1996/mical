import { MapExplorerModule } from './map-explorer.module';

describe('MapExplorerModule', () => {
  let mapExplorerModule: MapExplorerModule;

  beforeEach(() => {
    mapExplorerModule = new MapExplorerModule();
  });

  it('should create an instance', () => {
    expect(mapExplorerModule).toBeTruthy();
  });
});
