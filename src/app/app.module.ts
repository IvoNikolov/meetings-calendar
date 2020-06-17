import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CalendarMeetingsMonthComponent } from './calendar-meetings-month/calendar-meetings-month.component';
import { MeetingsModalComponent } from './calendar-meetings-month/modals/meetings-modal/meetings-modal.component';
import { AddMeetingModalComponent } from './calendar-meetings-month/modals/add-meeting-modal/add-meeting-modal.component';
import { CalendarMeetingsMonthScrollerComponent } from './calendar-meetings-month-scroller/calendar-meetings-month-scroller.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CalendarMeetingsMonthComponent,
    MeetingsModalComponent,
    AddMeetingModalComponent,
    CalendarMeetingsMonthScrollerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
