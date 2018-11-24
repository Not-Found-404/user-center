import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NzTreeNode} from 'ng-zorro-antd';
import {Observable} from 'rxjs';
import {Result} from './result';
import {Question, QuestionList} from './question';
import {log} from 'util';
import {Publish} from './publish';

const httpOptions = {
  /*使用http获取数据*/
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
/**
 * @author AmberXu
 * @date 2018/8/17
 * @Description: 发布试题
 */
@Injectable({
  providedIn: 'root'
})
export class PublishService {
  /**
   * 发布试题的baseUrl
   */
  publishUrl: String;
  /**
   * 构造函数，注入一个 HttpClient服务
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient) {
    this.publishUrl = 'api/publish/';
  }

  /**
   * description 设置发布的试题函数，未完善
   * @param void
   * @returns void
   */
  setPublish(publish: Publish): Observable<Publish> {
    log('questionService：设置发布的试题的参数,时间' + publish.time.toLocaleString());
    return this.http.post<Publish>(this.publishUrl + `addPublish`, publish, httpOptions);
  }

  /**
   * 根据questionId得到发布试题的信息
   * @param {number} questionId
   * @returns {Observable<Question>}
   */
  getPublishByQuuestionId(questionId: number): Observable<Publish[]> {
    log('service:获取数据库中的发布信息');
    return this.http.post<Publish[]>(this.publishUrl + `fetchPublishById?questionId=` + questionId, httpOptions);
  }
}
