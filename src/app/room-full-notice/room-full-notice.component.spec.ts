import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomFullNoticeComponent } from './room-full-notice.component';

describe('RoomFullNoticeComponent', () => {
  let component: RoomFullNoticeComponent;
  let fixture: ComponentFixture<RoomFullNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomFullNoticeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomFullNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
