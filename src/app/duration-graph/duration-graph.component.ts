import { Component, OnInit } from '@angular/core';
/*添加饼状图*/
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-duration-graph',
  templateUrl: './duration-graph.component.html',
  styleUrls: ['./duration-graph.component.css']
})
export class DurationGraphComponent implements OnInit {
  // 持续时间柱状图
  durationHistogram: NgxEchartsModule;

  constructor() { }

  ngOnInit() {
  }
  triggerToggle(): void {
    // 侧边栏
  }
}
