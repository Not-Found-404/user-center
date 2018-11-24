import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NzTreeNode} from 'ng-zorro-antd';
import {Observable} from 'rxjs';
import {Result} from './result';
import {log} from 'util';
import {Answer} from './answer';
import {Publish} from './publish';

const httpOptions = {
  /*使用http获取数据*/
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
/**
 * @author AmberXu
 * @date 2018/8/23
 * @Description: 答题service
 */
@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  /**
   * 试题回答的baseUrl
   */
  answerUrl: String;
  /**
   * 构造函数，注入一个 HttpClient服务
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient) {
    this.answerUrl = 'api/answer/';
  }
  findAllAnswers(): Observable<Answer[]> {
    log('获取当前登录用户的所有试题');
    return this.http.get<Answer[]>(this.answerUrl + `findAllAnswers`, httpOptions);
  }
  /**
   * 根据id得到某一答题情况的信息
   * @param {number} questionId
   * @returns {Observable<Answer>}
   */
  getAnswerById(publish: Publish): Observable<Answer[]> {
    log('service:获取数据库中的答题情况信息' + publish.publishId);
    return this.http.post<Answer[]>(this.answerUrl + `fetchAnswerByPublishId`, publish, httpOptions);
  }
}
