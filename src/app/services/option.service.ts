import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Result} from './result';
import {log} from 'util';
import {Option} from './option';

const httpOptions = {
  /*使用http获取数据*/
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
/**
 * @author AmberXu
 * @date 2018/8/21
 * @Description: 关于option的service
*/
@Injectable({
  providedIn: 'root' // 表示从root根部就开始注入
})
export class OptionService {
  /**
   * 选项相关的baseUrl
   */
  optionUrl: String;
  /**
   * 构造函数，注入一个 HttpClient服务
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient) {
    this.optionUrl = 'option/';
  }
  /**
   * 获得所有选项
   * @returns {Observable<option[]>}
   */
  findAlloptions(): Observable<Option[]> {
    log('获取当前登录用户的所有选项');
    return this.http.get<Option[]>(this.optionUrl + `findAllOptions`, httpOptions);
  }
  /**
   * 根据id得到某一选项的信息
   * @param {number} optionId
   * @returns {Observable<Option>}
   */
  getOptionByOptionId(optionId: number): Observable<Option> {
    log('service:获取数据库中的选项信息' + optionId);
    return this.http.get<Option>(this.optionUrl + `fetchOptionById?optionId=` + optionId, httpOptions);
  }
  /**
   * 删除选项
   * @param {number} optionid
   * @returns {Observable<Result>}
   */
  deleteOption(optionid: number): Observable<Result> {
    log('service:删除选项');
    return this.http.post<Result>(this.optionUrl + `deleteOption`, optionid, httpOptions);
  }
  /**
     * description:修改选项，未完善，后端还没写
     * @param  {Option} option
     * @returns {Observable<Result>}
     */
  modifyOption(option: Option): Observable<Result> {
    log('service:修改选项');
    return this.http.post<Result>(this.optionUrl + `modifyQeustion`, option, httpOptions);
  }
  /**
     * description 添加选项
     * @param {Option} option
     * @returns {Observable<Result>}
     */
  addNewOption(option: Option): Observable<Option> {
    log('service:添加选项');
    return this.http.post<Option>(this.optionUrl + `addNewOption`, option, httpOptions);
  }
}
