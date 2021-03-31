import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutHolderComponent } from './about-holder.component';

describe('AboutHolderComponent', () => {
  let component: AboutHolderComponent;
  let fixture: ComponentFixture<AboutHolderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
