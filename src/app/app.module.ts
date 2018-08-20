import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Nf4AppComponent } from './nf4-app.component';
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
import { QuestionTestComponent } from './question-test/question-test.component'
/*路由*/
import { RouterModule, Routes } from '@angular/router';
/*路由跳转到问题检测:question-test*/
const appRoutes: Routes = [
  { path: '', component: UsercenterComponent },
  { path: 'usercenter', component: UsercenterComponent },
  { path: 'question-test', component: QuestionTestComponent },
];
registerLocaleData(zh);

@NgModule({
  declarations: [
    Nf4AppComponent,
    FileTreeComponent,
    InputModalComponent,
    MoveFileModalComponent,
    QuestionTestComponent,
    UsercenterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: NZ_MESSAGE_CONFIG, useValue: { nzMaxStack: 2 }}
    ],
  bootstrap: [Nf4AppComponent]
})
export class AppModule { }
