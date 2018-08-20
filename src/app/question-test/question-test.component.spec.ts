import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTestComponent } from './question-test.component';

describe('QuestionTestComponent', () => {
  let component: QuestionTestComponent;
  let fixture: ComponentFixture<QuestionTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
