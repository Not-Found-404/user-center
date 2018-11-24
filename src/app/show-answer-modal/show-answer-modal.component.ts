import { Component, OnInit } from '@angular/core';
import {Question} from '../services/question';
import {OptionService} from '../services/option.service';
import {Option} from '../services/option';

@Component({
  selector: 'app-show-answer-modal',
  templateUrl: './show-answer-modal.component.html',
  styleUrls: ['./show-answer-modal.component.css']
})
export class ShowAnswerModalComponent implements OnInit {

  isVisible = false;
  title = '正确答案';
  option: Option;
  content: string;
  originalAnswer: string;
  constructor( private  optionService: OptionService) { }

  ngOnInit() {
    this.originalAnswer =  null;
  }

  /**
   * 点击取消
   */
  handleCancel() {
    this.isVisible = false;
  }

  /**
   * 显示正确答案
   * @param question
   */
  showAnswer(question: Question): void {
    console.log('显示正确答案的试题ID：' + question.questionId);
    if (question.originalAnswer === 0) {
      this.originalAnswer = '本题目还未设置正确答案';
      this.isVisible = true;
    } else {
      this.optionService.getOptionByOptionId(question.originalAnswer).subscribe((option: Option) => {
        this.option = option;
        this.content = option.content;
        this.isVisible = true;
        console.log('option.content:' + option.content);
        console.log('this.content:' + this.content);
        this.originalAnswer = option.content;
      });
    }

  }
  /**
   * 点击确定
   */
  handleOk() {
    this.isVisible = false;
  }
}
