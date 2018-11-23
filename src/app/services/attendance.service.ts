import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AttendanceListResponse, ViewStatistics} from './attendance';

const httpOptions = {
  /*使用http获取数据*/
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
/**
 * @author AmberXu
 * @date 2018/11/23
 * @Description: 课堂考勤
 */
@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  /**
   * 课堂考勤的baseUrl
   */
  attendanceUrl: String;
  /**
   * 构造函数，注入一个 HttpClient服务
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient) {
    this.attendanceUrl = '/api/statistics/';
  }

  /**
   * description 获取当前登录用户的所有考勤记录
   * @param void
   * @returns void
   */
  findAttendanceList(): Observable<AttendanceListResponse[]> {
    console.log('获取当前登录用户的所有考勤记录');
    return this.http.get<AttendanceListResponse[]>(this.attendanceUrl + `attendance/list`, httpOptions);
  }

  /**
   * 根据attendanceId获取具体考勤情况
   * @param {number} attendanceId
   * @returns {Observable<ViewStatistics>}
   */
  viewList(attendanceId: number): Observable<ViewStatistics[]> {
    console.log('service:获取数据库中的考勤具体信息');
    return this.http.get<ViewStatistics[]>(this.attendanceUrl + `view/list?attendanceId` + attendanceId , httpOptions);
  }
}
