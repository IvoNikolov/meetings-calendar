import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-calendar-meetings-month-scroller',
  templateUrl: './calendar-meetings-month-scroller.component.html',
  styleUrls: ['./calendar-meetings-month-scroller.component.scss'],
})
export class CalendarMeetingsMonthScrollerComponent implements OnInit {
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  currentMonth: string;

  monthId: number;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.monthId = +params.id;
      this.currentMonth = this.months[params.id];
    });
  }

  changePage(direction: string) {
    if (direction === 'forward') {
      this.monthId++;
    } else {
      this.monthId--;
    }
    this.router.navigate(['../month', this.monthId]);
  }
}
