import { Component, forwardRef, Host, Inject, OnInit } from '@angular/core';
import { Nf4AppComponent } from '../nf4-app.component';
import { AttendanceService } from '../services/attendance.service';
import { ViewStatistics } from '../services/attendance';
// import {ATTENANCEDETAIL} from '../mockData';
import { ActivatedRoute } from '@angular/router';

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
  // 考勤记录 id 信息
  attendanceId: number;

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

    // 获取当前考勤信息 id
    this.attendanceId = Number(this.route.snapshot.paramMap.get('id'));
  }
  // 侧边栏切换函数，通过调用父组件的侧边栏切换函数
  triggerToggle(): void {
    this.parentComponent.triggerToggle();
  }

  getAttendanceListDetail(): void {
    // console.log('获取考勤具体记录');
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.attendanceService.viewList(id).subscribe((attendanceDetailDataSet: ViewStatistics[]) => {
      // 进行数据转换，然后传入数据
      this.attendanceDetailDataSet = this.processTimeData(attendanceDetailDataSet);
    });
  }

  /**
   * @author BillowsTao
   * @param 考勤数据数组
   * @description 时间获取函数
   * @returns 时间数组
   */
  processTimeData(viewStatistics: ViewStatistics[]): ViewStatistics[] {
    viewStatistics.forEach((element, index) => {
      // 进行时间处理，将秒转换为分钟
      viewStatistics[index].totalTime = Math.round(element.totalTime / (60 * 1000));
    });
    return viewStatistics; // 返回时间数据
  }
}
