import { Component, forwardRef, Host, Inject, OnInit } from '@angular/core';
import { Nf4AppComponent } from '../nf4-app.component';
import {AttendanceService} from '../services/attendance.service';
import {AttendanceListResponse} from '../services/attendance';
import {log} from 'util';
import {ATTENANCE} from '../mockData';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  /**
   * @author AmberXu
   * @date 2018/11/23
   * @Description: 课堂考勤模块
  */
  // 得到父组件，调用更新
  parentComponent: Nf4AppComponent;
  attendanceDataSet: AttendanceListResponse[];
  constructor(
    private attendanceService: AttendanceService,
    @Host() @Inject(forwardRef(() => Nf4AppComponent)) nf4AppComponent: Nf4AppComponent // 获取父组件
  ) {
    this.parentComponent = nf4AppComponent;
  }

  ngOnInit() {
    this.getAttendanceList();
    /*模拟数据*/
    this.attendanceDataSet = ATTENANCE;
    // 模拟数据
  }

  // 侧边栏切换函数，通过调用父组件的侧边栏切换函数
  triggerToggle(): void {
    this.parentComponent.triggerToggle();
  }
  getAttendanceList(): void {
    log('获取考勤记录');
   /* this.attendanceService.findAttendanceList().subscribe((attendanceDataSet: AttendanceListResponse[]) => {
      this.attendanceDataSet = attendanceDataSet;
    });*/
  }
}


