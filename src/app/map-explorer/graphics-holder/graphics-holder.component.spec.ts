import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicsHolderComponent } from './graphics-holder.component';

describe('GraphicsHolderComponent', () => {
  let component: GraphicsHolderComponent;
  let fixture: ComponentFixture<GraphicsHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicsHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicsHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
