import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgiwCommonComponent } from './ngiw-common.component';

describe('NgiwCommonComponent', () => {
  let component: NgiwCommonComponent;
  let fixture: ComponentFixture<NgiwCommonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgiwCommonComponent]
    });
    fixture = TestBed.createComponent(NgiwCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
