import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MapHolderComponent } from './map-holder.component';

describe('MapHolderComponent', () => {
  let component: MapHolderComponent;
  let fixture: ComponentFixture<MapHolderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MapHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
