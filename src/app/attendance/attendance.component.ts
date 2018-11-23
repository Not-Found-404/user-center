import { Component, forwardRef, Host, Inject, OnInit } from '@angular/core';
import { Nf4AppComponent } from '../nf4-app.component';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  // 得到父组件，调用更新
  parentComponent: Nf4AppComponent;

  // 模拟数据
  attendanceDataSet = [
    {
      id: 12,                               // 幻灯片的id
      endTime: '2018-11-11 22:22:22',       // 截止时间
      beginTime: '2018-11-11 22:22:22',     // 开始时间
      slideName: '中国风'                   // 看的幻灯片的名字
    },
    {
      id: 13,
      endTime: '2018-11-11 22:22:22',
      beginTime: '2018-11-11 22:22:22',
      slideName: '中国风'
    }
  ];

  constructor(
    @Host() @Inject(forwardRef(() => Nf4AppComponent)) nf4AppComponent: Nf4AppComponent // 获取父组件
  ) {
    this.parentComponent = nf4AppComponent;
  }

  ngOnInit() {
  }

  // 侧边栏切换函数，通过调用父组件的侧边栏切换函数
  triggerToggle(): void {
    this.parentComponent.triggerToggle();
  }


}


