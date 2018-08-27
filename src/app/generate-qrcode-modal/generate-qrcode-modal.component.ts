import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generate-qrcode-modal',
  templateUrl: './generate-qrcode-modal.component.html',
  styleUrls: ['./generate-qrcode-modal.component.css']
})
export class GenerateQRCodeModalComponent implements OnInit {

  s: number;
  m: number;
  msg: string;
  isVisible = false;
  // 生成二维码参数
  elementType: 'url' | 'canvas' | 'img' = 'url';
  value: string; // 二维码生成的地址
  constructor() { }

  ngOnInit() {
  }
  generateQRCode(value: string) {
    this.value = value;
    this.isVisible = true;
}
  handleCancel(): void {
    this.isVisible = false;
  }
  handleOk(): void {
    this.isVisible = false;
  }
}
