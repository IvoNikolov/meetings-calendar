import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Meeting } from '../models/meeting.model';


interface IResponseMeetings {
  start: string;
  end: string;
  name: string;
  participants: [];
  meetingRoom: string;
}

interface IResponseData {
  meetingRooms: string[];
  meetings: IResponseMeetings[];
}

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  jsonDb = '../../assets/meetings.json';

  private _meetings = new BehaviorSubject<Meeting[]>([]);

  get meetings() {
    return this._meetings.asObservable();
  }

  constructor(private http: HttpClient) {}

  fetchMeetings() {
    return this.http.get(this.jsonDb).pipe(
      map((res: IResponseData) => {
        const meetings = [];
        const data = res.meetings;

        data.forEach((meeting) => {
          meetings.push(
            new Meeting(
              new Date(meeting.start).getTime() + meeting.meetingRoom,
              new Date(meeting.start).getDate(),
              new Date(meeting.start).getMonth(),
              new Date(meeting.start).getTime() - 10800000,
              new Date(meeting.end).getTime() - 10800000,
              meeting.name,
              meeting.participants,
              meeting.meetingRoom
            )
          );
        });

        return meetings;
      }),
      tap((res) => {
        this._meetings.next(res);
      })
    );
  }

  getMeetings() {
    return this.meetings;
  }

  addMeeting(meetings) {
    this._meetings.next(meetings);
  }

  sortMeetings(meetings: Meeting[]) {
    const sortedMeetings = meetings.sort((a, b) => {
      if (a.startMil !== b.startMil) {
        return a.startMil - b.startMil;
      }
      if (a.endMil === b.endMil) {
        return 0;
      }
      return a.endMil > b.endMil ? 1 : -1;
    });

    return sortedMeetings;
  }
}
