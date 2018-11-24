import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationGraphComponent } from './duration-graph.component';

describe('DurationGraphComponent', () => {
  let component: DurationGraphComponent;
  let fixture: ComponentFixture<DurationGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DurationGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
