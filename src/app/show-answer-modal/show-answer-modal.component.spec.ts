import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAnswerModalComponent } from './show-answer-modal.component';

describe('ShowAnswerModalComponent', () => {
  let component: ShowAnswerModalComponent;
  let fixture: ComponentFixture<ShowAnswerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAnswerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAnswerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
