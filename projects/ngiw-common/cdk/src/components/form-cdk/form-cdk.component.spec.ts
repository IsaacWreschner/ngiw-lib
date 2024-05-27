import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCdkComponent } from './form-cdk.component';

describe('FormCdkComponent', () => {
  let component: FormCdkComponent;
  let fixture: ComponentFixture<FormCdkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCdkComponent]
    });
    fixture = TestBed.createComponent(FormCdkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
