import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  DoCheck,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { Meeting } from '../../../models/meeting.model';
import { CalendarService } from '../../../services/calendar.service';


@Component({
  selector: 'app-add-meeting-modal',
  templateUrl: './add-meeting-modal.component.html',
  styleUrls: ['./add-meeting-modal.component.scss'],
})
export class AddMeetingModalComponent implements OnInit, DoCheck, OnDestroy {
  @Input() data: any;

  @Output() closeWindow = new EventEmitter<any>();

  meetingForm: FormGroup;
  participants = new FormArray([]);
  meetings: FormArray;

  selectedDate = '';
  calendarSub: Subscription;

  currentMeetings: Meeting[] = [];
  allMeetings: Meeting[] = [];

  errorTime: string;

  constructor(private calendarService: CalendarService) {}

  ngDoCheck() {
    this.selectedDate = '';

    if (this.data.day < 10) {
      this.selectedDate = this.selectedDate.concat('0' + this.data.day);
    } else {
      this.selectedDate = this.selectedDate.concat(this.data.day);
    }

    if (this.data.month < 10) {
      this.selectedDate = this.selectedDate.concat(
        '.0' + (this.data.month + 1)
      );
    } else {
      this.selectedDate = this.selectedDate.concat('.' + (this.data.month + 1));
    }

    this.checkTime();
  }

  ngOnInit(): void {

    this.calendarSub = this.calendarService
      .getMeetings()
      .subscribe((meetings) => {
        this.allMeetings = [];
        this.currentMeetings = [];
        meetings.forEach((element) => {
          this.allMeetings.push(element);
          if (element.day === this.data.day) {
            this.currentMeetings.push(element);
          }
        });
      });

    this.participants.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
      })
    );

    this.meetingForm = new FormGroup({
      name: new FormControl('', Validators.required),
      meetingRoom: new FormControl('Arbanasi', Validators.required),
      startHour: new FormControl('09:00', Validators.required),
      endHour: new FormControl('10:00', Validators.required),
      participants: this.participants,
    });

    this.checkTime();
  }

  onAddparticipant() {
    (this.meetingForm.get('participants') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
      })
    );
  }

  onDeleteparticipant(index: number) {
    (this.meetingForm.get('participants') as FormArray).removeAt(index);
  }

  checkTime() {
    if (this.errorTime) {
      this.errorTime = '';
    }

    if (
      this.meetingForm.value.startHour === null ||
      this.meetingForm.value.endHour === null
    ) {
      return;
    }

    const startHour = this.meetingForm.value.startHour;
    const endHour = this.meetingForm.value.endHour;
    const meetingRoom = this.meetingForm.value.meetingRoom;

    if (startHour >= endHour) {
      this.errorTime = 'End time is yearlier than start time';
      return;
    }

    const startMil = new Date(`${this.data.month + 1}/${this.data.day}/2020 ${startHour}:00`).getTime();
    const endMil = new Date(`${this.data.month + 1}/${this.data.day}/2020 ${endHour}:00`).getTime();


    console.log(this.data.currentMeetings);
    this.data.currentMeetings.forEach((meeting: Meeting) => {
      if (
        (endMil >= meeting.endMil && startMil >= meeting.endMil) ||
        (endMil <= meeting.startMil && startMil <= meeting.startMil) ||
        ((!(endMil < meeting.startMil) || !(startMil < meeting.startMil)) && meetingRoom !== meeting.meeetingRoom) ||
        ((!(endMil > meeting.startMil) || !(startMil > meeting.startMil)) && meetingRoom !== meeting.meeetingRoom)

      ) {
        console.log('OK');
      } else {
        this.errorTime = 'Room is booked';
      }
    });
    console.log(this.errorTime);
  }

  onSubmit(): void {
    const formData = this.meetingForm.value;

    const startMil = new Date(`${this.data.month + 1}/${this.data.day}/2020 ${formData.startHour}:00`).getTime();
    const endMil = new Date(`${this.data.month + 1}/${this.data.day}/2020 ${formData.endHour}:00`).getTime();

    this.allMeetings.push(
      new Meeting(
        startMil + formData.meetingRoom,
        this.data.day,
        this.data.month,
        startMil,
        endMil,
        formData.name,
        formData.participants,
        formData.meetingRoom
      )
    );
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
