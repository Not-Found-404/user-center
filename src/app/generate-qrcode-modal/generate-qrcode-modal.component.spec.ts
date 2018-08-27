import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateQRCodeModalComponent } from './generate-qrcode-modal.component';

describe('GenerateQRCodeModalComponent', () => {
  let component: GenerateQRCodeModalComponent;
  let fixture: ComponentFixture<GenerateQRCodeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateQRCodeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateQRCodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
