import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionEditModalComponent } from './question-edit-modal.component';

describe('QuestionEditModalComponent', () => {
  let component: QuestionEditModalComponent;
  let fixture: ComponentFixture<QuestionEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
