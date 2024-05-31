import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCdkComponent } from './table-cdk.component';

describe('TableCdkComponent', () => {
  let component: TableCdkComponent<any>;
  let fixture: ComponentFixture<TableCdkComponent<any>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableCdkComponent]
    });
    fixture = TestBed.createComponent(TableCdkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
