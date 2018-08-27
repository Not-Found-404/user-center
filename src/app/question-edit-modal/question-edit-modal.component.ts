import {Component, forwardRef, Host, Inject, OnInit, ViewChild} from '@angular/core';
import {Question} from '../services/question';
import {QuestionTestComponent} from '../question-test/question-test.component';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {QuestionService} from '../services/question.service';
import {log} from 'util';
import {Option, OptionList} from '../services/option';
import {OptionService} from '../services/option.service';
import {SetPublishTimeComponent} from '../set-publish-time/set-publish-time.component';
import {AddOptionModalComponent} from '../add-option-modal/add-option-modal.component';
import {Result} from '../services/result';

@Component({
  selector: 'app-question-edit-modal',
  templateUrl: './question-edit-modal.component.html',
  styleUrls: ['./question-edit-modal.component.css']
})
export class QuestionEditModalComponent implements OnInit {
  isVisible = false;
  // 选择修改的试题
  question: Question;
  // 试题的题目
  description: string;
  optionList: Option[];
  originalAnswer: number;
  userId: number;
  /*属性装饰器，声明对子组件元素的实例引用*/
  @ViewChild('appAddOptionModalModal')
  appAddOptionModalModal: AddOptionModalComponent;
  // 得到父组件，调用更新
  parentComponent: QuestionTestComponent;
  constructor( private questionService: QuestionService,
               private optionService: OptionService,
               private messageService: NzMessageService,
               private modalService: NzModalService,      // 对话框服务-ant
               @Host() @Inject(forwardRef(() => QuestionTestComponent)) questionComponent: QuestionTestComponent) {
    this.parentComponent = questionComponent;
  }

  ngOnInit() {
    this.userId = this.parentComponent.userId;
  }
  editQuestion(question: Question) {
    log('需编辑试题的ID' + question.questionId.toString());
    this.question = question;
    this.description = question.description;
    this.optionList = question.optionList;
    this.originalAnswer = question.originalAnswer;
    this.isVisible = true;
  }
  /**
   * 添加新选项
   * @param questionId
   */
  addNewOption(questionId: number) {
    log('添加新选项');
    this.isVisible = false;
    this.appAddOptionModalModal.addNewOption(questionId);
  }
  deleteOption(optionId: number) {
    log('要删除选项的Id' + optionId);
    this.showDeleteOptionConfirm(optionId);
  }
  showDeleteOptionConfirm(optionId: number): void {
    /* 删除选项确认对话框 */
    this.modalService.confirm({
      nzTitle     : '您确定要删除这个选项？',
      nzContent   : '<b style="color: red;">删除的选项将不可恢复</b>',
      nzOkText    : '删除',
      nzOkType    : 'danger',
      nzOnOk      : () => this.showDeleteResult(optionId), // 确认操作，回调删除选项函数
      nzCancelText: '取消',
      nzOnCancel  : () => console.log('删除对话框_取消')
    });
  }
  showMessage(type: string, content: string): void {
    /* 显示全局信息函数
     * type:信息类型 success,error,warning
     * content:信息内容 string
     */
    this.messageService.create(type, content);
  }
  showDeleteResult(optionId: number): void {
    /*删除试题*/
    /* 提示信息_删除试题id */
    log('删除选项ID:' + optionId.toString());
    /* 删除试题业务逻辑 */
    this.optionService.deleteOption(optionId).subscribe((data: Result) => { // 异步请求
      if (data.code === 200) {
        this.parentComponent.getAllQuestions(this.parentComponent.user.userId);
        this.isVisible = false;
        /* 提示信息_删除成功 */
        this.showMessage('success', '选项删除成功');
      }
    });
  }
  /**
     * description 点击确定按钮响应函数
     * @param void
     * @returns void
     */
  handleOk(): void {
    log('编辑试题__确定');
    log('正确选项：' + this.originalAnswer);
    this.questionService.modifyQuestion({
      questionId: this.question.questionId,
      description: this.description,
      optionList: this.optionList,
      originalAnswer: this.originalAnswer
    }).subscribe(_ => {
      this.parentComponent.getAllQuestions(this.parentComponent.user.userId); // 重新获取试题数据
    });
    this.isVisible = false;
  }
  handleCancel(): void {
    /* 点击取消响应函数 */
    log('编辑试题__取消');
    /*前端测试运行时,注释掉下面这行代码*/
   // this.parentComponent.getAllQuestions(this.parentComponent.user.userId);
    this.isVisible = false;
  }
}
