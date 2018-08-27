import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistcsAnswerModalComponent } from './statistcs-answer-modal.component';

describe('StatistcsAnswerModalComponent', () => {
  let component: StatistcsAnswerModalComponent;
  let fixture: ComponentFixture<StatistcsAnswerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatistcsAnswerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatistcsAnswerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
