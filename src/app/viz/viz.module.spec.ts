import { VizModule } from './viz.module';

describe('VizModule', () => {
  let vizModule: VizModule;

  beforeEach(() => {
    vizModule = new VizModule();
  });

  it('should create an instance', () => {
    expect(vizModule).toBeTruthy();
  });
});
