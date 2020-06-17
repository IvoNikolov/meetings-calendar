import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsModalComponent } from './meetings-modal.component';

describe('MeetingsModalComponent', () => {
  let component: MeetingsModalComponent;
  let fixture: ComponentFixture<MeetingsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
