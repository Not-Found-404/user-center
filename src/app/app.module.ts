import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { UserCenterComponent } from './usercenter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgZorroAntdModule, NZ_I18N, NZ_MESSAGE_CONFIG, zh_CN} from 'ng-zorro-antd';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);

@NgModule({
  declarations: [
    UserCenterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    AngularFontAwesomeModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: NZ_MESSAGE_CONFIG, useValue: { nzMaxStack: 2 }}
    ],
  bootstrap: [UserCenterComponent]
})
export class AppModule { }
