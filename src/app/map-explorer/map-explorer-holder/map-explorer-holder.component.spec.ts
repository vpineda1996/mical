import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MapExplorerHolderComponent } from './map-explorer-holder.component';

describe('MapExplorerHolderComponent', () => {
  let component: MapExplorerHolderComponent;
  let fixture: ComponentFixture<MapExplorerHolderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MapExplorerHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapExplorerHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
