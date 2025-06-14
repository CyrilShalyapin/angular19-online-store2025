import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortMethodSelectComponent } from './sort-method-select.component';

describe('SortMethodSelectComponent', () => {
  let component: SortMethodSelectComponent;
  let fixture: ComponentFixture<SortMethodSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortMethodSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortMethodSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
