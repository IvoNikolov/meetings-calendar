import { Component, OnInit } from '@angular/core';
import { CalendarService } from './services/calendar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private calendarService: CalendarService) {}

  ngOnInit() {

    this.calendarService.fetchMeetings().subscribe();

  }

  onActivate(event) {
    window.scroll(0, 0);

  }
}
