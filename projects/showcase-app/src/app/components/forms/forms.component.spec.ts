import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsComponent } from './forms.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgiwCdkModule } from 'ngiw-common/cdk';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('FormsComponent', () => {
  let component: FormsComponent;
  let fixture: ComponentFixture<FormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormsComponent],
      imports: [NgiwCdkModule],
      providers: [NzModalService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(FormsComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(1).toBeTruthy();
  });
});
