import {Component, forwardRef, Host, Inject, OnInit, ViewChild} from '@angular/core';
import {Question, QuestionList} from '../services/question';
import {Nf4AppComponent} from '../nf4-app.component';
import {QuestionService} from '../services/question.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {SetPublishTimeComponent} from '../set-publish-time/set-publish-time.component';
import {User} from '../services/user';
import {UserService} from '../services/user.service';
import {QuestionEditModalComponent} from '../question-edit-modal/question-edit-modal.component';
import {Result} from '../services/result';
import {OptionService} from '../services/option.service';
import {QUESTION} from '../mockData';
import {StatistcsAnswerModalComponent} from '../statistcs-answer-modal/statistcs-answer-modal.component';
import {ShowAnswerModalComponent} from '../show-answer-modal/show-answer-modal.component';

@Component({
  selector: 'app-question-test',
  templateUrl: './question-test.component.html',
  styleUrls: ['./question-test.component.css']
})
export class QuestionTestComponent implements OnInit {
  // 当前登录的用户
  user: User;
  userId: number;
  // 当前用户的所有试题
  questionList: Question[];
  // 当前打开需要编辑、发布或删除的试题
  question: Question;
  // 得到父组件，调用侧边栏切换函数
  parentComponent:  Nf4AppComponent;
  // 是否显示正确答案
  isShowAnswer: boolean;
  /*属性装饰器，声明对子组件元素的实例引用*/
  @ViewChild('appSetPublishTimeModal')
  appSetPublishTimeModal: SetPublishTimeComponent;
  @ViewChild('appQuestionEditModal')
  appQuestionEditModal: QuestionEditModalComponent;
  @ViewChild('appStatistcsAnswerModal')
  appStatistcsAnswerModal: StatistcsAnswerModalComponent;
  @ViewChild('appShowOriginalAnswerModal')
  appShowOriginalAnswerModal: ShowAnswerModalComponent;
  constructor(
    private userService: UserService,
    private questionService: QuestionService,
    private messageService: NzMessageService,   // 全局消息服务-ant
    private modalService: NzModalService,      // 对话框服务-ant
    @Host() @Inject(forwardRef(() => Nf4AppComponent)) nf4AppComponent: Nf4AppComponent
  ) {
    this.parentComponent = nf4AppComponent;
    /** Test Environment 测试环境__数据传输 **/
    // this.questionList = QUESTION;
    /** Test Environment end 测试环境__数据传输-结束 **/
  }
  ngOnInit() {
    this.getLoginUser();
  }
  /**
     * description 获得当前用户的信息
     * @param void
     * @returns void
     */
  getLoginUser(): void {
    this.userService.getLoginUser().subscribe((data: User) => {
      if (data != null) {
        this.user = data;
        this.userId = this.user.userId;
        this.getAllQuestions(this.user.userId);
      }
    });
  }
  /**
     * description 获取登录用户的所有试题
     * @param number{userId}
     * @returns void
     */
  getAllQuestions(userId: number): void {
    if (userId != null) {
      // console.log('获取用户的所有试题' + userId);
      this.questionService.findAllQuestions().subscribe((questionList: Question[]) => {
        this.questionList = questionList;
      });
    }
  }

  /**
   * 通过questionId统计改题目的答题情况
   * @param questionId
   */
  statisticsAnswer(question: Question): void {
    this.appStatistcsAnswerModal.statistcsPublish(question);
}
  /**
     * description 调用父组件中的切换侧边栏函数
     * @param void
     * @returns void
     */
  triggerToggle(): void {
    this.parentComponent.triggerToggle();
  }
  /**
     * description
     * @param  number{questionId}
     * @returns void
     */
  publishQuestion(question: Question): void {
    // console.log('调用发布问题');
    this.appSetPublishTimeModal.setPublish(question);
}
  /**
     * description 添加新的试题
     * @param  void
     * @returns void
     */
  addNewQuestion(): void {
    this.questionService.addNewQuestion(this.question).subscribe(__ => {
      // 显示创建成功信息
      this.getAllQuestions(this.user.userId);
      this.messageService.info('成功创建试题');
    });
  }
  editQuestion(question: Question): void {
    /* 编辑试题 */
      this.appQuestionEditModal.editQuestion(question);
  }
  showMessage(type: string, content: string): void {
    /* 显示全局信息函数
     * type:信息类型 success,error,warning
     * content:信息内容 string
     */
    this.messageService.create(type, content);
  }

  /**
   * 显示正确答案
   * @param question
   */
  showAnswer(question: Question): void {
    this.appShowOriginalAnswerModal.showAnswer(question);
  }
 /**
    * description 删除试题
    * @param number{questionId}
    * @returns void
    */
  questionDelete(questionId: number): void {
    /* 前端页面调用该方法，显示删除确认对话框 */
    this.showDeleteQuestionConfirm(questionId);
  }
  showDeleteQuestionConfirm(questionId: number): void {
    /* 删除问题确认对话框 */
    this.modalService.confirm({
      nzTitle     : '您确定要删除这个试题？',
      nzContent   : '<b style="color: red;">删除的试题将不可恢复</b>',
      nzOkText    : '删除',
      nzOkType    : 'danger',
      nzOnOk      : () => this.deleteQuestion(questionId), // 确认操作，回调删除试题函数
      nzCancelText: '取消',
      nzOnCancel  : () => {} /* console.log('删除对话框_取消') */
    });
  }
  deleteQuestion(questionId: number): void {
    /*删除试题*/
    /* 提示信息_删除试题id */
    // console.log('删除试题ID:' + questionId.toString());
    /* 删除试题业务逻辑 */
    this.questionService.deleteQuestion(questionId).subscribe((data: Result) => { // 异步请求
      if (data.code === 200) {
        this.getAllQuestions(this.user.userId);
        /* 提示信息_删除成功 */
        this.showMessage('success', '试题删除成功');
      }
    });
  }
}
