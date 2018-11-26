import {Component, forwardRef, Host, Inject, OnInit} from '@angular/core';
import {OptionService} from '../services/option.service';
import {QuestionTestComponent} from '../question-test/question-test.component';
import {QuestionEditModalComponent} from '../question-edit-modal/question-edit-modal.component';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-add-option-modal',
  templateUrl: './add-option-modal.component.html',
  styleUrls: ['./add-option-modal.component.css']
})
export class AddOptionModalComponent implements OnInit {

  questionId: number;
  // 选项的内容
  content: string;
  isVisible = false;
  // 得到父组件，调用更新
  parentComponent: QuestionEditModalComponent;
  constructor(private optionService: OptionService,
              private messageService: NzMessageService,   // 全局消息服务-ant
              @Host() @Inject(forwardRef(() => QuestionEditModalComponent)) questionEidtComponent: QuestionEditModalComponent) {
    this.parentComponent =  questionEidtComponent;
  }

  ngOnInit() {
  }

  /**
   * 添加新的选项
   * @param questionId
   */
  addNewOption(questionId: number) {
    this.isVisible = true;
   this.questionId = questionId;
   this.content = null;
  }
  /**
   * description 点击确定按钮响应函数
   * @param void
   * @returns void
   */
  handleOk(): void {
    // console.log('添加选项__确定');
    this.optionService.addNewOption({
      questionId: this.questionId,
      content: this.content,
    }).subscribe(__ => {
      this.messageService.info('成功添加选项');
      this.parentComponent.parentComponent.getAllQuestions(this.parentComponent.parentComponent.user.userId);
    });
    this.isVisible = false;
  }
  handleCancel(): void {
    /* 点击取消响应函数 */
    // console.log('添加选项__取消');
    this.isVisible = false;
  }

}
