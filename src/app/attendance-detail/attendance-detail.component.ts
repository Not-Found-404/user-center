import {Component, forwardRef, Host, Inject, OnInit} from '@angular/core';
import {Nf4AppComponent} from '../nf4-app.component';
import {AttendanceService} from '../services/attendance.service';
import {ViewStatistics} from '../services/attendance';
import {ATTENANCEDETAIL} from '../mockData';
import {log} from 'util';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-attendance-detail',
  templateUrl: './attendance-detail.component.html',
  styleUrls: ['./attendance-detail.component.css']
})
export class AttendanceDetailComponent implements OnInit {

  // 得到父组件，调用更新
  parentComponent: Nf4AppComponent;
  // 详细的考勤记录
  attendanceDetailDataSet: ViewStatistics[];
  constructor(private attendanceService: AttendanceService,
              private route: ActivatedRoute,
              @Host() @Inject(forwardRef(() => Nf4AppComponent)) nf4AppComponent: Nf4AppComponent // 获取父组件
  ) {
    this.parentComponent = nf4AppComponent;
  }

  ngOnInit() {
    this.getAttendanceListDetail();
    /*模拟数据*/
    // this.attendanceDetailDataSet = ATTENANCEDETAIL;
    // 模拟数据
  }
  // 侧边栏切换函数，通过调用父组件的侧边栏切换函数
  triggerToggle(): void {
    this.parentComponent.triggerToggle();
  }
  getAttendanceListDetail(): void {
    log('获取考勤具体记录');
    const id = +this.route.snapshot.paramMap.get('id');
     this.attendanceService.viewList(id).subscribe((attendanceDetailDataSet: ViewStatistics[]) => {
       this.attendanceDetailDataSet = attendanceDetailDataSet;
     });
  }
}
