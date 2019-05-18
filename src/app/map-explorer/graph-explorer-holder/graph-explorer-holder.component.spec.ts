import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphExplorerHolderComponent } from './graph-explorer-holder.component';

describe('GraphExplorerHolderComponent', () => {
  let component: GraphExplorerHolderComponent;
  let fixture: ComponentFixture<GraphExplorerHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphExplorerHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphExplorerHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
