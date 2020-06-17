import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarMeetingsMonthComponent } from './calendar-meetings-month.component';

describe('CalendarMeetingsMonthComponent', () => {
  let component: CalendarMeetingsMonthComponent;
  let fixture: ComponentFixture<CalendarMeetingsMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarMeetingsMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarMeetingsMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
