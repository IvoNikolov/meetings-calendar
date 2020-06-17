import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CalendarMeetingsMonthScrollerComponent } from './calendar-meetings-month-scroller/calendar-meetings-month-scroller.component';
import { CalendarMeetingsMonthComponent } from './calendar-meetings-month/calendar-meetings-month.component';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cal', children: [
      { path: '', component: CalendarMeetingsMonthComponent},
      { path: ':id', component: CalendarMeetingsMonthComponent}
    ]
  },
  { path: 'month', children: [
      { path: '', component: CalendarMeetingsMonthScrollerComponent},
      { path: ':id', component: CalendarMeetingsMonthScrollerComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
