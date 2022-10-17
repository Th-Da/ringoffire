import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNoticeComponent } from './dialog-notice.component';

describe('DialogNoticeComponent', () => {
  let component: DialogNoticeComponent;
  let fixture: ComponentFixture<DialogNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNoticeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
