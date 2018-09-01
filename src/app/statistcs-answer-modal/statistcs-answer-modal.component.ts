import { Component, OnInit } from '@angular/core';
import {log} from 'util';
import {PublishService} from '../services/publish.service';
import {Publish} from '../services/publish';
import {AnswerService} from '../services/answer.service';
import {Answer} from '../services/answer';
import {Question} from '../services/question';
/*添加饼状图*/
import { EChartOption } from 'echarts-ng2';
import {Option} from '../services/option';

/**/
@Component({
  selector: 'app-statistcs-answer-modal',
  templateUrl: './statistcs-answer-modal.component.html',
  styleUrls: ['./statistcs-answer-modal.component.css']
})
export class StatistcsAnswerModalComponent implements OnInit {
  // 饼图的配置
  chartOption: EChartOption;
  // 柱状图
  histogram: EChartOption;
  // 选项分布情况
  singleNumberOfOption: number;
  // 总数
  countOfOption: number[];
  // x轴
  xAxisData: string[];
  // 范围
  charactOfOption: string[];
  // 计算重复值
  countNumber: number;
  numOfRightRespondent: number; // 回答正确的人数
  numOfWrongRespondent: number; // 回答错误的人数
  publishList: Publish[];
  answerList: Answer[];
  question: Question; // 正在统计答题结果的题目
  option: Option;
  isVisible: boolean;
  isShowPublish: boolean; // 是否显示发布情况
  isShowAnswer: boolean; // 是否显示答题情况
  title = '题目的发布情况';
  answer: Answer;
  i: number;
  constructor(private publishService: PublishService,
              private answerService: AnswerService) { }

  ngOnInit() {
    this.xAxisData = [];
    this.charactOfOption = [];
    this.countOfOption = [];
    this.answerList = null;
    this.publishList = null;
   // 前端测试例子
   // this.publishList = [{
   //    publishId: 1,
   //  questionId: 1,
   //  time : new Date(),
   //  },
   //    {
   //      publishId: 2,
   //      questionId: 1,
   //      time : new Date(),
   //    }];
   //  this.answerList =  [{
   //    answerId: 444,
   //  publishId: 1,
   //  ipAddress: '12245455454',
   //  respondentInfo: 'www',
   //  time: new Date(),
   //
   //  },
   //    {
   //      answerId: 444,
   //      publishId: 1,
   //      ipAddress: '12245455454',
   //      respondentInfo: 'dfedt',
   //      time: new Date(),
   //    },
   //    {
   //      answerId: 111,
   //      publishId: 1,
   //      ipAddress: '12245455454',
   //      respondentInfo: 'dfdsf',
   //      time: new Date(),
   //    },
   //    {
   //      answerId: 222,
   //      publishId: 1,
   //      ipAddress: '12245455454',
   //      respondentInfo: 'fgfdg',
   //      time: new Date(),
   //    },
   //    {
   //      answerId: 444,
   //      publishId: 1,
   //      ipAddress: '12245455454',
   //      respondentInfo: 'dwerwe',
   //      time: new Date(),
   //    },
   //    {
   //      answerId: 444,
   //      publishId: 1,
   //      ipAddress: '12245455454',
   //      respondentInfo: 'dwerwe',
   //      time: new Date(),
   //    },
   //    {
   //      answerId: 444,
   //      publishId: 1,
   //      ipAddress: '12245455454',
   //      respondentInfo: 'dwerwe',
   //      time: new Date(),
   //    },
   //    {
   //      answerId: 111,
   //      publishId: 1,
   //      ipAddress: '12245455454',
   //      respondentInfo: 'dwerwe',
   //      time: new Date(),
   //    },
   //    {
   //      answerId: 222,
   //      publishId: 1,
   //      ipAddress: '12245455454',
   //      respondentInfo: 'www',
   //      time: new Date(),
   //    }];
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
  statistcsAnswer(publishBody: Publish, question: Question): void {
    this.xAxisData = [];
    // this.countOfOption = [];
    this.countNumber = 0;
    this.numOfRightRespondent = 0;
    this.numOfWrongRespondent = 0;
    for (let i = 0; i < this.countOfOption.length; i++){
      this.countOfOption[i] = 0;
    }
    for (let num = 1; num <= this.question.optionList.length; num++) {
      this.xAxisData.push('选项' + num);
    }
    /*后端整合*/
    this.answerService.getAnswerById(publishBody).subscribe((answerList: Answer[]) => {
      this.answerList = answerList;
      for (this.answer of answerList) {
        for (this.option of this.question.optionList) {
          if (this.answer.answerId === this.option.optionId) {
            this.singleNumberOfOption = this.question.optionList.indexOf(this.option) + 1;
            if (this.charactOfOption.includes('选项' + this.singleNumberOfOption)) {
              this.countNumber = this.countOfOption[this.question.optionList.indexOf(this.option)];
              this.countNumber++;
              this.countOfOption[this.question.optionList.indexOf(this.option)] = this.countNumber;
            } else {
              this.countOfOption[this.question.optionList.indexOf(this.option)] = 1;
              this.charactOfOption.push('选项' + this.singleNumberOfOption);
            }
          }
        }
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
    /*后端整合-结束*/
    //
    /*前端测试饼状图-开始*/
    // this.isShowAnswer = true;
    //   this.isShowPublish = false;
    // for (this.answer of this.answerList) {
    //   log('答案：：' + this.answer);
    //   /*设置选项的数组测试-start*/
    //   for (this.option of this.question.optionList) {
    //     if (this.answer.answerId === this.option.optionId) {
    //       this.singleNumberOfOption = this.question.optionList.indexOf(this.option) + 1;
    //       if (this.charactOfOption.includes('选项' + this.singleNumberOfOption)) {
    //         this.countNumber = this.countOfOption[this.question.optionList.indexOf(this.option)];
    //         this.countNumber++;
    //         log('countNumber::' + this.countNumber);
    //         this.countOfOption[this.question.optionList.indexOf(this.option)] = this.countNumber;
    //         log('111numOfOption::' + this.countOfOption);
    //       } else {
    //         this.countOfOption[this.question.optionList.indexOf(this.option)] = 1;
    //         this.charactOfOption.push('选项' + this.singleNumberOfOption);
    //         log('222numOfOption::' + this.countOfOption);
    //       }
    //     }
    //   }
    //   /*设置选项的数组-end*/
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
    // 添加柱状图
    this.histogram = {
      title: {
        text: '试题选项统计情况'
      },
      tooltip: {},
      xAxis: {
        data: this.xAxisData,
      },
      yAxis: {},
      series: [{
        name: '数量',
        type: 'bar',
        data: this.countOfOption,
        color: ['#759aa0', '#e69d87', '#8dc1a9', '#ea7e53',
          '#eedd78', '#73a373', '#73b9bc', '#7289ab', '#91ca8c', '#f49f42'],
      }]
    };
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
          // color: ['#ff2a36', '#0078D7'],
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
