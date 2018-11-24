import {Component, forwardRef, Host, Inject, OnInit, ViewChild} from '@angular/core';
import {Publish} from '../services/publish';
import {QuestionTestComponent} from '../question-test/question-test.component';
import {Question} from '../services/question';
import {PublishService} from '../services/publish.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {GenerateQRCodeModalComponent} from '../generate-qrcode-modal/generate-qrcode-modal.component';

@Component({
  selector: 'app-set-publish-time',
  templateUrl: './set-publish-time.component.html',
  styleUrls: ['./set-publish-time.component.css']
})
export class SetPublishTimeComponent implements OnInit {
  // 生成二维码参数
  elementType: 'url' | 'canvas' | 'img' = 'url';
  hostname: string;
  value: string; // 二维码生成的地址
  // 分钟差
  minute: number;
  // 秒数差
  second: number;
  // 发布的时间
  time: any;
  // 本次发布的参数
  publish: Publish;
  // 本次发布的试题
  question: Question;
  isVisible = false;
  // 得到父组件
  parentComponent: QuestionTestComponent;
  // 经过计算之后的总时间
  totaltime: number;
  // 结束时间
  endTimes: any;
  /*属性装饰器，声明对子组件元素的实例引用*/
  @ViewChild('appGenerateQRCodeModal')
  appGenerateQRCodeModal: GenerateQRCodeModalComponent;
  constructor( private publishService: PublishService,
               private messageService: NzMessageService,   // 全局消息服务-ant
               private modalService: NzModalService,
               @Host() @Inject(forwardRef(() => QuestionTestComponent)) questionComponent: QuestionTestComponent) {
    this.parentComponent = questionComponent;
  }

  ngOnInit() {
    this.minute = 1;
    this.second = 0;
  }
  setPublish(question): void {
    // 设置时间限制
    console.log('发布试题的ID' + question.questionId.toString());
    this.question = question;
    this.isVisible = true;
  }
  handleCancel(): void {
    this.isVisible = false;
  }
  showMessage(type: string, content: string): void {
    /* 显示全局信息函数
     * type:信息类型 success,error,warning
     * content:信息内容 string
     */
    this.messageService.create(type, content);
  }

  handleOk(): void {
    if ( this.minute <= 60 && this.second <= 60) {
      this.isVisible = false;
      this.totaltime = this.second * 1 + this.minute * 60 ;
      this.time = new Date();
      this.endTimes = new Date(this.time.setSeconds(this.time.getSeconds() + this.totaltime));
      /*测试二维码*/
      // this.hostname = location.host.toString();
      // this.value = this.hostname +  '/nf4slide/toPublishPage?questionId=' + this.question.questionId + '&publishId=';
      // this.appGenerateQRCodeModal.generateQRCode(this.value);
      /*测试二维码*/
      this.publishService.setPublish({
        time: this.endTimes,
        questionId: this.question.questionId,
        question: this.question
      }).subscribe((publish: Publish) => {
        this.hostname = location.host.toString();
       this.value = 'http://' + this.hostname + '/nf4slide/toPublishPage?questionId='
         +  this.question.questionId + '&publishId=' + publish.publishId
       + '&publishDate=' + publish.time;
        // 跳转到生成二维码的组件
        this.appGenerateQRCodeModal.generateQRCode(this.value);
         // window.open('toPublishPage?questionId=' + this.question.questionId + '&publishId=' + publish.publishId);
      }
      );
      console.log( '总时间' + this.totaltime );
      console.log( '结束时间' + this.endTimes);
      // 获取Publish
    } else {
        this.showMessage('error', '输入时间不符合，请重新输入');
    }

    }
}
