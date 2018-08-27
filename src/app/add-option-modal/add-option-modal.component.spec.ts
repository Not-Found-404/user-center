import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOptionModalComponent } from './add-option-modal.component';

describe('AddOptionModalComponent', () => {
  let component: AddOptionModalComponent;
  let fixture: ComponentFixture<AddOptionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOptionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOptionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
