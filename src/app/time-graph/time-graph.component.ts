/**
 * author:BillowsTao
 * date:2018.11.25
 * describe:Time graph of time record.
 */
import { Component, OnInit, Host, Inject, forwardRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Nf4AppComponent } from '../nf4-app.component';
/* echeats 图表服务 */
import { NgxEchartsModule } from 'ngx-echarts';
/* 考勤信息查询服务 */
import { AttendanceService } from '../services/attendance.service';
import { ViewStatistics } from '../services/attendance';

/* --模拟数据-- start -- */
// import { ATTENANCEDETAIL } from '../mockData';
/* --模拟数据-- end ---- */

@Component({
  selector: 'app-time-graph',
  templateUrl: './time-graph.component.html',
  styleUrls: ['./time-graph.component.css']
})
export class TimeGraphComponent implements OnInit {
  // 得到父组件，调用更新
  parentComponent: Nf4AppComponent;
  // 持续时间柱状图
  timeHistogram: NgxEchartsModule;
  // 图表数据信息
  public timeHistogramOption: any;
  // 考勤记录信息
  viewStatistics: ViewStatistics[] = [];
  // 考勤记录 id 信息
  attendanceId: number;

  // 构造函数
  constructor(
    private attendanceService: AttendanceService,  // 考勤信息查询服务
    private route: ActivatedRoute,
    // 注入父组件，以便调用父组件方法
    @Host() @Inject(forwardRef(() => Nf4AppComponent)) nf4AppComponent: Nf4AppComponent // 获取父组件
  ) {
    this.parentComponent = nf4AppComponent;
  }

  // 初始化函数
  ngOnInit() {
    // 获取考勤信息
    this.getAttendanceData();
    // 获取当前考勤信息 id
    this.attendanceId = Number(this.route.snapshot.paramMap.get('id'));
  }

  // 侧边栏切换函数，通过调用父组件的侧边栏切换函数
  triggerToggle(): void {
    this.parentComponent.triggerToggle();
  }

  /**
   * @author BillowsTao
   * @param 考勤数据数组
   * @description 获取考勤信息函数
   */
  getAttendanceData(): void {
    // 获取考勤记录 id
    const viewStatisticsId = Number(this.route.snapshot.paramMap.get('id'));
    // 调用考勤信息获取服务加载数据
    this.attendanceService.viewList(viewStatisticsId).subscribe((attendanceDetailDataSet: ViewStatistics[]) => {
      // 获取考勤数据
      this.viewStatistics = attendanceDetailDataSet;
      // 统计图表初始化
      this.timeHistogramOption = {
        /* 背景颜色设置 */
        backgroundColor: '#fff',
        /* 图标标题设置 */
        title: {
          text: '课堂考勤 - 离开次数统计',
          top: '1%',
          left: '2%',
          textStyle: {
            color: '#000'
          }
        },

        /* 工具提示信息 */
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },

        legend: {
          data: ['离开次数'],
          right: '3%',
          top: '1%'
        },

        grid: {
          left: '1%',
          right: '5%',
          bottom: '3%',
          containLabel: true
        },

        /* x 轴属性 */
        xAxis: {
          name: '次',
          type: 'value',
          boundaryGap: [0, '1%']
        },

        /* y 轴属性 */
        yAxis: {
          name: '姓名',
          type: 'category',
          /* y 轴显示观看者姓名，通过异步加载数据 */
          data: this.processNameData(this.viewStatistics)
        },

        /* 柱状图与图例颜色设置 */
        itemStyle: {
          color: '#4d8cf7'
        },

        /* 图表数据 */
        series: [
          {
            name: '离开次数',
            type: 'bar',
            /* x 轴显示离开次数，以次为单位，通过异步加载数据 */
            data: this.processTimeData(this.viewStatistics),
            label: {
              normal: {
                formatter: '{c} 次',
                show: true,
                textBorderColor: '#fff',
                position: 'inside'
              }
            }
          }
        ],

        /* 数据缩放显示 */
        dataZoom: [
          {
            id: 'dataZoomY',
            type: 'slider',
            yAxisIndex: [0],
            filterMode: 'filter',
            /* 过滤数据索引为0-7 */
            startValue: 0,
            endValue: 7
          }
        ]
      };
    });
    /* 构造模拟数据 */
    // this.viewStatistics = ATTENANCEDETAIL;
  }

  /**
   * @author BillowsTao
   * @param 考勤数据数组
   * @description 用户名获取函数
   * @returns 姓名数组
   */
  processNameData(viewStatistics: ViewStatistics[]): string[] {
    const nameData = [];
    viewStatistics.forEach(element => {
      // 进行姓名处理，产生姓名数组
      nameData.push(element.identify);
    });
    // console.log('姓名', nameData);
    return nameData; // 返回姓名数据
  }

  /**
   * @author BillowsTao
   * @param 考勤数据数组
   * @description 用户名获取函数
   * @returns 离开次数数组
   */
  processTimeData(viewStatistics: ViewStatistics[]): number[] {
    const timeData = [];  // 离开次数数据
    viewStatistics.forEach(element => {
      // 进行离开次数处理，产生离开次数数组
      timeData.push(element.exitTimes);
    });
    // console.log('离开次数', timeData);
    return timeData; // 返回离开次数数据
  }
}
