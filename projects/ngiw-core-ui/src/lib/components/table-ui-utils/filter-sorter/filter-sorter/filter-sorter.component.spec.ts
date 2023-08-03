import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSorterComponent } from './filter-sorter.component';

describe('FilterSorterComponent', () => {
  let component: FilterSorterComponent;
  let fixture: ComponentFixture<FilterSorterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterSorterComponent]
    });
    fixture = TestBed.createComponent(FilterSorterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
