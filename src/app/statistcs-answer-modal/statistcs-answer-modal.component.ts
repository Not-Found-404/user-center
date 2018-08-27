import { Component, OnInit } from '@angular/core';
import {log} from 'util';
import {PublishService} from '../services/publish.service';
import {Publish} from '../services/publish';
import {AnswerService} from '../services/answer.service';
import {Answer} from '../services/answer';
import {Question} from '../services/question';
/*添加饼状图*/
import { EChartOption } from 'echarts-ng2';

/**/
@Component({
  selector: 'app-statistcs-answer-modal',
  templateUrl: './statistcs-answer-modal.component.html',
  styleUrls: ['./statistcs-answer-modal.component.css']
})
export class StatistcsAnswerModalComponent implements OnInit {
  // 饼图的配置
  chartOption: EChartOption;
  numOfRightRespondent: number; // 回答正确的人数
  numOfWrongRespondent: number; // 回答错误的人数
  publishList: Publish[];
  answerList: Answer[];
  question: Question; // 正在统计答题结果的题目
  isVisible: boolean;
  isShowPublish: boolean; // 是否显示发布情况
  isShowAnswer: boolean; // 是否显示答题情况
  title = '题目的发布情况';
  answer: Answer;
  constructor(private publishService: PublishService,
              private answerService: AnswerService) { }

  ngOnInit() {

    this.answerList = null;
  /*  this.publishList = [{
      publishId: 1,
    questionId: 1,
    time : new Date(),
    },
      {
        publishId: 2,
        questionId: 1,
        time : new Date(),
      }];
    this.answerList =  [{
      answerId: 1,
    publishId: 1,
    ipAddress: '12245455454',
    respondentInfo: 'www',
    time: new Date(),

    },
      {
        answerId: 1,
        publishId: 1,
        ipAddress: '12245455454',
        respondentInfo: 'dfedt',
        time: new Date(),
      },
      {
        answerId: 1,
        publishId: 1,
        ipAddress: '12245455454',
        respondentInfo: 'dfdsf',
        time: new Date(),
      },
      {
        answerId: 1,
        publishId: 1,
        ipAddress: '12245455454',
        respondentInfo: 'fgfdg',
        time: new Date(),
      },
      {
        answerId: 1,
        publishId: 1,
        ipAddress: '12245455454',
        respondentInfo: 'dwerwe',
        time: new Date(),
      },
      {
        answerId: 1,
        publishId: 1,
        ipAddress: '12245455454',
        respondentInfo: 'dwerwe',
        time: new Date(),
      },
      {
        answerId: 1,
        publishId: 1,
        ipAddress: '12245455454',
        respondentInfo: 'dwerwe',
        time: new Date(),
      },
      {
        answerId: 1,
        publishId: 1,
        ipAddress: '12245455454',
        respondentInfo: 'dwerwe',
        time: new Date(),
      },
      {
        answerId: 2,
        publishId: 1,
        ipAddress: '12245455454',
        respondentInfo: 'www',
        time: new Date(),
      }];*/
  }

  /**
   * 统计题目的发布情况
   * @param questionId
   */
  statistcsPublish(question: Question): void {
    log('统计题目的发布情况');
    this.question = question;
    this.publishService.getPublishByQuuestionId(question.questionId).subscribe((publishList: Publish[]) => {
      this.publishList = publishList;
    });
    this.isShowPublish = true;
    this.isShowAnswer = false;
    this.isVisible = true;
  }

  /**
   * 统计题目的答题情况
   * @param publish
   */
  statistcsAnswer(publishBody: Publish): void {
    this.numOfRightRespondent = 0;
    this.numOfWrongRespondent = 0;
    this.answerService.getAnswerById(publishBody).subscribe((answerList: Answer[]) => {
      this.answerList = answerList;
      for (this.answer of answerList) {
        if (this.answer.answerId == null) {
          this.numOfWrongRespondent = 0;
        } else if (this.answer.answerId === this.question.originalAnswer) {
          this.numOfRightRespondent++;
        } else {
          this.numOfWrongRespondent++;
        }
      }
      this.chartOption = this.createChart([{name: '做错的人数', value: this.numOfWrongRespondent},
          {name: '做对的人数', value: this.numOfRightRespondent}]);
      this.isShowAnswer = true;
      this.isShowPublish = false;
    });
    /*前端测试饼状图-开始*/
    // this.isShowAnswer = true;
    //   this.isShowPublish = false;
    // for (this.answer of this.answerList) {
    //       if (this.answer.answerId == null) {
    //         this.numOfWrongRespondent = 0;
    //       } else if (this.answer.answerId === this.question.originalAnswer) {
    //         this.numOfRightRespondent++;
    //       } else {
    //         this.numOfWrongRespondent++;
    //       }
    //     }
    // this.chartOption = this.createChart([{name: '做错的人数', value: this.numOfWrongRespondent},
    //   {name: '做对的人数', value: this.numOfRightRespondent}]);
      /*前端测试饼状图-结束*/
}
// 画饼图
  private createChart(data: any[]): EChartOption {
    return {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      series: [
        {
          name: '回答情况',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: data
        }
      ]
    };
  }
  /**
   * description 点击确定按钮响应函数
   * @param void
   * @returns void
   */
  handleOk(): void {
    log('显示答题情况__确定');
    this.isVisible = false;
  }
  handleCancel(): void {
    /* 点击取消响应函数 */
    log('编辑试题__取消');
    this.isVisible = false;
  }
}
