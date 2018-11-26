/* 构造模拟数据 */
import { Folder } from './services/folder';
import { Question, QuestionList } from './services/question';
import { Option } from './services/option';
import { Publish } from './services/publish';
import { Attendance, AttendanceListResponse, ViewStatistics } from './services/attendance';
export const QUESTION: Question[] = [
  {
    userId: 1,
    questionId: 1,
    originalAnswer: 111, // 正确答案
    description: '问题1',
    optionList: [
      {
        optionId: 111,
        content: '选项1'
      },
      {
        optionId: 222,
        content: '选项2'
      },
      {
        optionId: 333,
        content: '选项3'
      },
      {
        optionId: 444,
        content: '选项4'
      }
    ],
    publishList: [
      {
        publishId: 1,
        questionId: 1,
        time: new Date(),
      },
      {
        publishId: 2,
        questionId: 1,
        time: new Date('2017-01-08'),
      }
    ]
  },
  {
    userId: 1,
    questionId: 2,
    originalAnswer: 111, // 正确答案
    description: '问题2',
    optionList: [
      {
        optionId: 111,
        content: '选项1'
      },
      {
        optionId: 222,
        content: '选项2'
      },
      {
        optionId: 333,
        content: '选项3'
      },
      {
        optionId: 444,
        content: '选项4'
      }
    ],
    publishList: [
      {
        publishId: 1,
        questionId: 1,
        time: new Date(),
      },
      {
        publishId: 2,
        questionId: 1,
        time: new Date('2017-01-08'),
      }
    ]
  },
  {
    userId: 1,
    questionId: 3,
    originalAnswer: 333, // 正确答案
    description: '问题3',
    optionList: [
      {
        optionId: 111,
        content: '选项1'
      },
      {
        optionId: 222,
        content: '选项2'
      }
    ],
    publishList: [
      {
        publishId: 1,
        questionId: 1,
        time: new Date(),
      },
      {
        publishId: 2,
        questionId: 1,
        time: new Date('2017-01-08'),
      }
    ]
  },
  {
    userId: 1,
    questionId: 4,
    originalAnswer: 444, // 正确答案
    description: '问题4',
    optionList: [
      {
        optionId: 111,
        content: '选项1'
      },
      {
        optionId: 222,
        content: '选项2'
      },
      {
        optionId: 333,
        content: '选项3'
      },
      {
        optionId: 444,
        content: '选项4'
      }
    ],
    publishList: [
      {
        publishId: 1,
        questionId: 1,
        time: new Date(),
      },
      {
        publishId: 2,
        questionId: 1,
        time: new Date('2017-01-08'),
      }
    ]
  }
];
export const DATA: Folder = {
  folderName: '根文件夹',
  folderId: 0,
  parent: 0,
  child: [
    {
      folderName: '文件夹1',
      folderId: 1,
      parent: 0,
      child: [],
      slideVos: []
    },
    {
      folderName: '文件夹2',
      folderId: 2,
      parent: 0,
      child: [],
      slideVos: []
    },
    {
      folderName: '文件夹3',
      folderId: 3,
      parent: 0,
      child: [],
      slideVos: []
    },
    {
      folderName: '文件夹4',
      folderId: 4,
      parent: 0,
      child: [],
      slideVos: []
    },
    {
      folderName: '文件夹5',
      folderId: 5,
      parent: 0,
      child: [],
      slideVos: []
    }
  ],
  slideVos: [
    {
      slideId: 1,
      name: '幻灯片1',
      folderId: 0
    },
    {
      slideId: 2,
      name: '幻灯片2',
      folderId: 0
    },
    {
      slideId: 3,
      name: '幻灯片3',
      folderId: 0
    },
    {
      slideId: 4,
      name: '幻灯片4',
      folderId: 0
    },
    {
      slideId: 5,
      name: '幻灯片5',
      folderId: 0
    },
    {
      slideId: 6,
      name: '幻灯片6',
      folderId: 0
    }
  ]
};

export const ATTENANCE: AttendanceListResponse[] = [
  {
    beginTime: '2018-11-11 22:22:22',
    endTime: '2018-11-11 22:22:22',
    slideName: '这是我的测试案例1',
    id: 10000
  },
  {
    beginTime: '2018-11-11 0:0:0',
    endTime: '2018-11-11 0:0:0',
    slideName: '这是我的测试案例2',
    id: 11111
  }
];

export const ATTENANCEDETAIL: ViewStatistics[] = [
  {
    id: 1,
    identify: '乐正晨曦',
    totalTime: 2400000,
    exitTimes: 24,
    attendanceId: 1111
  },
  {
    id: 2,
    identify: '纳莹白',
    totalTime: 1260000,
    exitTimes: 43,
    attendanceId: 2222
  },
  {
    id: 3,
    identify: '孔乙己',
    totalTime: 1404000,
    exitTimes: 4,
    attendanceId: 1111
  },
  {
    id: 4,
    identify: '切·格瓦拉',
    totalTime: 1004000,
    exitTimes: 25,
    attendanceId: 1111
  },
  {
    id: 5,
    identify: '杨一禾',
    totalTime: 1068160,
    exitTimes: 36,
    attendanceId: 1111
  },
  {
    id: 6,
    identify: '奕琇芬',
    totalTime: 1353170,
    exitTimes: 13,
    attendanceId: 1111
  },
  {
    id: 7,
    identify: '图门安柏',
    totalTime: 1953170,
    exitTimes: 31,
    attendanceId: 1111
  },
  {
    id: 8,
    identify: '叶夜香',
    totalTime: 1865654,
    exitTimes: 22,
    attendanceId: 1111
  },
  {
    id: 9,
    identify: '巴勃罗.山迪亚哥',
    totalTime: 1865654,
    exitTimes: 9,
    attendanceId: 1111
  }
];
