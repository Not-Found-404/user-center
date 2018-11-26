/**
 * author:BillowsTao
 * date:2018.11.24
 * describe:Duration graph of watch record.
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
  selector: 'app-duration-graph',
  templateUrl: './duration-graph.component.html',
  styleUrls: ['./duration-graph.component.css']
})
export class DurationGraphComponent implements OnInit {
  // 得到父组件，调用更新
  parentComponent: Nf4AppComponent;
  // 持续时间柱状图
  durationHistogram: NgxEchartsModule;
  // 图表数据信息
  public durationHistogramOption: any;
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
    this.attendanceService.viewList(viewStatisticsId).subscribe((attendanceDetailDataSet: ViewStatistics[]) => {
      // 获取考勤数据
      this.viewStatistics = attendanceDetailDataSet;
      // 统计图表初始化
      this.durationHistogramOption = {
        /* 背景颜色设置 */
        backgroundColor: '#fff',
        /* 图标标题设置 */
        title: {
          text: '课堂考勤 - 观看时间统计',
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
          data: ['观看时间'],
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
          name: '分钟',
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
          color: '#3398DB'
        },

        /* 图表数据 */
        series: [
          {
            name: '观看时间',
            type: 'bar',
            /* x 轴显示观看时间，以分钟为单位，通过异步加载数据 */
            data: this.processTimeData(this.viewStatistics),
            label: {
              normal: {
                formatter: '{c} 分钟',
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
   * @description 时间获取函数
   * @returns 时间数组
   */
  processTimeData(viewStatistics: ViewStatistics[]): number[] {
    const timeData = [];  // 时间数据
    viewStatistics.forEach(element => {
      // 进行时间处理，将秒转换为分钟
      timeData.push(Math.round(element.totalTime / (60 * 1000)));
    });
    // console.log('时间', timeData);
    return timeData; // 返回时间数据
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

}
