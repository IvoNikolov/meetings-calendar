import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ObservableService {
  private changeMeetings = new Subject();
  changeMeetings$ = this.changeMeetings.asObservable();

  constructor() {}

  publishChangeMeetings(): void {
    this.changeMeetings.next();
  }
}
