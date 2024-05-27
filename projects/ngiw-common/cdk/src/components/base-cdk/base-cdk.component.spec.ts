import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCdkComponent } from './base-cdk.component';

describe('BaseCdkComponent', () => {
  let component: BaseCdkComponent;
  let fixture: ComponentFixture<BaseCdkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseCdkComponent]
    });
    fixture = TestBed.createComponent(BaseCdkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
