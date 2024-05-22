import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreUtilsComponent } from './core-utils.component';

describe('CoreUtilsComponent', () => {
  let component: CoreUtilsComponent;
  let fixture: ComponentFixture<CoreUtilsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoreUtilsComponent]
    });
    fixture = TestBed.createComponent(CoreUtilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
