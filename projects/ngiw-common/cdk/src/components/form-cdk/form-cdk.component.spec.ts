import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCdkComponent } from './form-cdk.component';

describe('FormCdkComponent', () => {
  let component: FormCdkComponent<any>;
  let fixture: ComponentFixture<FormCdkComponent<any>>;

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
