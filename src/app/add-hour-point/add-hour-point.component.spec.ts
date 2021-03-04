import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHourPointComponent } from './add-hour-point.component';

describe('AddHourPointComponent', () => {
  let component: AddHourPointComponent;
  let fixture: ComponentFixture<AddHourPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHourPointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHourPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
