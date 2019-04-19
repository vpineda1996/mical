import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownButtonComponent } from './drop-down-button.component';

describe('DropDownButtonComponent', () => {
  let component: DropDownButtonComponent;
  let fixture: ComponentFixture<DropDownButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropDownButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
