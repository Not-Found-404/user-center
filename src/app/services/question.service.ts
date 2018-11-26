import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NzTreeNode} from 'ng-zorro-antd';
import {Observable} from 'rxjs';
import {Result} from './result';
import {Question, QuestionList} from './question';
import {Publish} from './publish';

const httpOptions = {
  /*使用http获取数据*/
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
/**
 * @author AmberXu
 * @date 2018/8/2
 * @Description: 试题检验
*/
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  /**
   * 试题测验的baseUrl
   */
  questionUrl: String;
  /**
   * 构造函数，注入一个 HttpClient服务
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient) {
    this.questionUrl = 'question/';
  }
  /**
   * 获得当前登录用户的所有试题，与后端路径写法一致
   * @returns {Observable<QuestionList>}
   */
  findAllQuestions(): Observable<Question[]> {
    // console.log('获取当前登录用户的所有试题');
    return this.http.get<Question[]>(this.questionUrl + `findAllQuestions`, httpOptions);
  }
  /**
   * 根据id得到某一试题的信息
   * @param {number} questionId
   * @returns {Observable<Question>}
   */
  getQuestionById(questionId: number): Observable<Question> {
    // console.log('service:获取数据库中的试题信息' + questionId);
    return this.http.get<Question>(this.questionUrl + `fetchQuestionById?questionId=` + questionId, httpOptions);
  }
  /**
   * 删除试题,未完善，查看后端路径的写法
   * @param {number} questionid
   * @returns {Observable<Result>}
   */
  deleteQuestion(questionid: number): Observable<Result> {
    // console.log('service:删除试题');
    return this.http.post<Result>(this.questionUrl + `deleteQuestion`, questionid, httpOptions);
  }
  /**
     * description:修改试题，未完善，后端还没写
     * @param  {Question} question
     * @returns {Observable<Result>}
     */
  modifyQuestion(question: Question): Observable<Result> {
    // console.log('service:修改试题');
    return this.http.post<Result>(this.questionUrl + `modifyQeustion`, question, httpOptions);
  }
  /**
     * description 添加试题
     * @param {Question} question
     * @returns {Observable<Result>}
     */
  addNewQuestion(question: Question): Observable<Question> {
    // console.log('service:添加试题');
    return this.http.get<Question>(this.questionUrl + `addNew`, httpOptions);
  }
  /**
     * description 所选中试题的显示正确答案
     * @param { number }questionId
     * @returns {Observable<Question>}
*/
  showRightAnswer(questionId: number): Observable<Question> {
    return this.http.get<Question>(this.questionUrl + `fetchOriginalAnswerById?id=` + questionId, httpOptions);
  }
}
