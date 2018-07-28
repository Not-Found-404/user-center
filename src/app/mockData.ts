/* 构造模拟数据 */
import {Folder} from './services/folder';

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
