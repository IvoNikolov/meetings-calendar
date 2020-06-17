import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';

import { Subscription } from 'rxjs';

import { CalendarService } from 'src/app/services/calendar.service';
import { Meeting } from 'src/app/models/meeting.model';
import { ObservableService } from 'src/app/services/observables/observable.service';

@Component({
  selector: 'app-meetings-modal',
  templateUrl: './meetings-modal.component.html',
  styleUrls: ['./meetings-modal.component.scss'],
})
export class MeetingsModalComponent implements OnInit, OnDestroy {
  @Input() data: any;

  @Output() closeWindow = new EventEmitter<any>();

  currentMeetings: Meeting[] = [];
  allMeetings: Meeting[] = [];

  calendarSub: Subscription;

  constructor(
    private calendarService: CalendarService,
    private observableService: ObservableService
  ) {}

  ngOnInit(): void {
    this.allMeetings = this.calendarService.sortMeetings(this.data.allMeetings);

    this.currentMeetings = this.calendarService.sortMeetings(this.data.currentMeetings);

    this.observableService.changeMeetings$.subscribe(() => {

      this.allMeetings = this.calendarService.sortMeetings(this.data.allMeetings);

      this.currentMeetings = this.calendarService.sortMeetings(this.data.currentMeetings);

    });
  }

  deleteMeeting(id: string): void {
    this.allMeetings = this.allMeetings.filter((data) => data.id !== id);
    this.calendarService.addMeeting(this.allMeetings);
    this.close();
  }

  close(): void {
    this.closeWindow.emit();
  }

  ngOnDestroy(): void {
    if (this.calendarSub) {
      this.calendarSub.unsubscribe();
    }
  }

}
