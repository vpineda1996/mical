import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GraphExplorerHolderComponent } from './graph-explorer-holder.component';

describe('GraphExplorerHolderComponent', () => {
  let component: GraphExplorerHolderComponent;
  let fixture: ComponentFixture<GraphExplorerHolderComponent>;

  beforeEach(waitForAsync(() => {
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
