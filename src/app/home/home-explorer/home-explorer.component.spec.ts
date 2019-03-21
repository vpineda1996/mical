import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeExplorerComponent } from './home-explorer.component';

describe('HomeExplorerComponent', () => {
  let component: HomeExplorerComponent;
  let fixture: ComponentFixture<HomeExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeExplorerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
