import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextPrettifyComponent } from './text-prettify.component';

describe('TextPrettifyComponent', () => {
  let component: TextPrettifyComponent;
  let fixture: ComponentFixture<TextPrettifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextPrettifyComponent]
    });
    fixture = TestBed.createComponent(TextPrettifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
