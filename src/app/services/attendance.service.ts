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
  attendance: Observable<AttendanceListResponse[]>;
  /**
   * 构造函数，注入一个 HttpClient服务
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient) {
    this.attendanceUrl = 'api/statistics/';
  }

  /**
   * description 获取当前登录用户的所有考勤记录
   * @param void
   * @returns void
   */
  findAttendanceList(): Observable<AttendanceListResponse[]> {
    console.log('获取当前登录用户的所有考勤记录');
    this.attendance = this.http.get<AttendanceListResponse[]>(this.attendanceUrl + `attendance/list`, httpOptions);
    console.log(this.attendance);
    return this.attendance;
  }

  /**
   * 根据attendanceId获取具体考勤情况
   * @param {number} attendanceId
   * @returns {Observable<ViewStatistics>}
   */
  viewList(attendanceId: number): Observable<ViewStatistics[]> {
    console.log('service:获取数据库中的考勤具体信息');
    return this.http.get<ViewStatistics[]>(this.attendanceUrl + `view/list?attendanceId=` + attendanceId , httpOptions);
  }
  /**
   * @author AmberXu
   * @date 2018/11/24
   * @Description: 创建考勤
  */
  createAttendance(slideId: number): Observable<number> {
    console.log('service:创建考勤');
    return this.http.get<number>(this.attendanceUrl + `attendance/save?slideId=` + slideId , httpOptions);
  }
}
