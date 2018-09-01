/* 构造模拟数据 */
import {Folder} from './services/folder';
import {Question, QuestionList} from './services/question';
import {Option} from './services/option';
import {Publish} from './services/publish';
export const QUESTION: Question[] = [
  {
    userId: 1,
    questionId: 1,
    originalAnswer: 111, // 正确答案
    description: '这是问题1',
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
    questionId: 1,
    originalAnswer: 333, // 正确答案
    description: '这是问题1',
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
