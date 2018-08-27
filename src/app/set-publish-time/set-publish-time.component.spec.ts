import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPublishTimeComponent } from './set-publish-time.component';

describe('SetPublishTimeComponent', () => {
  let component: SetPublishTimeComponent;
  let fixture: ComponentFixture<SetPublishTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetPublishTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPublishTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
