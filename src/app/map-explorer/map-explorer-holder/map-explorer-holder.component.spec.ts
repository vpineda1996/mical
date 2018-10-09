import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapExplorerHolderComponent } from './map-explorer-holder.component';

describe('MapExplorerHolderComponent', () => {
  let component: MapExplorerHolderComponent;
  let fixture: ComponentFixture<MapExplorerHolderComponent>;

  beforeEach(async(() => {
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
