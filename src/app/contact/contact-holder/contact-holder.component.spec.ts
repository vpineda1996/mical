import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactHolderComponent } from './contact-holder.component';

describe('ContactHolderComponent', () => {
  let component: ContactHolderComponent;
  let fixture: ComponentFixture<ContactHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
