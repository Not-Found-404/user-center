import {Component, forwardRef, Host, Inject, OnInit} from '@angular/core';
import {Nf4AppComponent} from '../nf4-app.component';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  // 得到父组件，调用更新
  parentComponent:  Nf4AppComponent;

  // 模拟数据
  dataSet = [
    {
      key    : '1',
      name   : 'John Brown',
      age    : 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key    : '2',
      name   : 'Jim Green',
      age    : 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key    : '3',
      name   : 'Joe Black',
      age    : 32,
      address: 'Sidney No. 1 Lake Park'
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


