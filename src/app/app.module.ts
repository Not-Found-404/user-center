import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {Nf4AppComponent} from './nf4-app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgZorroAntdModule, NZ_I18N, NZ_MESSAGE_CONFIG, zh_CN} from 'ng-zorro-antd';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FileTreeComponent } from './file-tree/file-tree.component';
import { InputModalComponent } from './input-modal/input-modal.component';
import { MoveFileModalComponent } from './move-file-modal/move-file-modal.component';
import { UsercenterComponent } from './usercenter/usercenter.component';
import { QuestionTestComponent } from './question-test/question-test.component';
import {QuestionEditModalComponent} from './question-edit-modal/question-edit-modal.component';
import { SetPublishTimeComponent } from './set-publish-time/set-publish-time.component';
import { AddOptionModalComponent } from './add-option-modal/add-option-modal.component';
import { GenerateQRCodeModalComponent } from './generate-qrcode-modal/generate-qrcode-modal.component';
import { StatistcsAnswerModalComponent } from './statistcs-answer-modal/statistcs-answer-modal.component';
import { ShowAnswerModalComponent } from './show-answer-modal/show-answer-modal.component';
/*添加为饼状图*/
import { EchartsNg2Module } from 'echarts-ng2';
import {NgxEchartsModule} from 'ngx-echarts';
/*生成二维码*/
import { NgxQRCodeModule } from 'ngx-qrcode2';
/*路由*/
import { RouterModule, Routes } from '@angular/router';

/*路由跳转到问题检测:question-test*/
const appRoutes: Routes = [
  { path: '', redirectTo: '/usercenter', pathMatch: 'full' }, // 添加默认路由
  { path: 'nf4slide/toUserPage', redirectTo: '/usercenter', pathMatch: 'full' },
  { path: 'usercenterA', redirectTo: '/usercenter', pathMatch: 'full' },
  { path: 'usercenter', component: UsercenterComponent },
  { path: 'question-test', component: QuestionTestComponent },
];
registerLocaleData(zh);

@NgModule({
  declarations: [
    FileTreeComponent,
    InputModalComponent,
    MoveFileModalComponent,
    Nf4AppComponent,
    UsercenterComponent,
    SetPublishTimeComponent,
    QuestionEditModalComponent,
    AddOptionModalComponent,
    StatistcsAnswerModalComponent,
    GenerateQRCodeModalComponent,
    ShowAnswerModalComponent,
    QuestionTestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    /** 导入 ng-zorro-antd 模块 **/
    NgZorroAntdModule,
    AngularFontAwesomeModule,
    NgxEchartsModule,
    EchartsNg2Module,
    NgxQRCodeModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [
    /** 配置 ng-zorro-antd 国际化 **/
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: NZ_MESSAGE_CONFIG, useValue: { nzMaxStack: 2 }}
  ],
  bootstrap: [Nf4AppComponent]
})
export class AppModule { }
