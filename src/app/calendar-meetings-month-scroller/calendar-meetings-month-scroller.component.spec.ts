import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarMeetingsMonthScrollerComponent } from './calendar-meetings-month-scroller.component';

describe('CalendarMeetingsMonthScrollerComponent', () => {
  let component: CalendarMeetingsMonthScrollerComponent;
  let fixture: ComponentFixture<CalendarMeetingsMonthScrollerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarMeetingsMonthScrollerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarMeetingsMonthScrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
