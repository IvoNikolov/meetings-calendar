import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Meeting } from '../models/meeting.model';
import { CalendarService } from '../services/calendar.service';
import { ObservableService } from '../services/observables/observable.service';

@Component({
  selector: 'app-calendar-meetings-month',
  templateUrl: './calendar-meetings-month.component.html',
  styleUrls: ['./calendar-meetings-month.component.scss'],
})
export class CalendarMeetingsMonthComponent implements OnInit, OnDestroy {
  @Input() daysMonth: any;
  @Input() month: number;

  currentMeetings: Meeting[] = [];
  allMeetings: Meeting[] = [];
  selectedDay = {
    day: null,
    month: null,
    currentMeetings: [],
    allMeetings: [],
  };

  calendarSub: Subscription;

  meetingsArray: Meeting[];
  monthDays = 0;
  monthIndex = 0;
  columns = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  weeks = [0, 1, 2, 3, 4, 5];

  firstDate: number;
  currentMonth: number;
  paramIndex: number;

  day: number;

  showModal: boolean;
  currentModal: string;

  isMonthHref: boolean;

  constructor(
    private calendarService: CalendarService,
    private route: ActivatedRoute,
    private router: Router,
    private observableService: ObservableService
  ) {}

  ngOnInit(): void {
    this.isMonthHref = this.router.url.includes('month');

    this.firstDate = new Date(2020, this.month).getDay();
    this.currentMonth = new Date(2020, this.month + 1, 0).getDate();

    this.route.params.subscribe((params: Params) => {
      if (!this.month && params.id) {
        this.monthIndex = +params.id;
        this.paramIndex = +params.id;
        this.month = +params.id;
      }

      this.monthIndex = +params.id;

      if (this.isMonthHref) {
        this.firstDate = new Date(2020, this.monthIndex).getDay();
        this.currentMonth = new Date(2020, this.monthIndex + 1, 0).getDate();
      }

      this.calendarSub = this.calendarService
        .getMeetings()
        .subscribe((meetings) => {
          this.currentMeetings = [];
          this.allMeetings = [];

          meetings.forEach((meeting: Meeting) => {
            if (this.isMonthHref) {
              if (meeting.month === this.monthIndex) {
                this.allMeetings.push(meeting);
              }
            } else {
              this.allMeetings.push(meeting);
            }
          });
        });
    });
  }

  deleteMeeting(id: string): void {
    this.allMeetings = this.allMeetings.filter((data) => data.id !== id);
    this.calendarService.addMeeting(this.allMeetings);
    this.allMeetings = [];
    this.currentMeetings = [];
  }

  getData(id: number): Meeting[] {
    let unsortedMeetings: Meeting[] = [];

    if (!this.monthIndex) {
      this.monthIndex = this.month;
    }

    unsortedMeetings = this.allMeetings.filter(
      (meeting) => meeting.day === id && meeting.month === this.monthIndex
    );

    this.currentMeetings = this.calendarService.sortMeetings(unsortedMeetings);

    return this.currentMeetings;
  }

  open(rows: number, cols: number, currentModal: string): void {
    this.currentModal = currentModal;
    this.selectedDay.day = rows * 7 + (cols + 1 - this.firstDate);
    this.selectedDay.month = this.monthIndex;

    const currentMeetings = this.allMeetings.filter(
      (meetings) =>
        meetings.day === this.selectedDay.day &&
        meetings.month === this.selectedDay.month
    );

    this.selectedDay.currentMeetings = currentMeetings;
    this.selectedDay.allMeetings = this.allMeetings;

    this.observableService.publishChangeMeetings();
    this.showModal = true;
  }

  close(): void {
    this.showModal = false;
  }

  ngOnDestroy(): void {
    if (this.calendarSub) {
      this.calendarSub.unsubscribe();
    }
  }
}
