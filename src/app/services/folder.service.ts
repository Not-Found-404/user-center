import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {Result} from './result';
import {Folder} from './folder';
import {NzTreeNode} from 'ng-zorro-antd';
import {TreeNode} from './TreeNode';
import {Slide} from './slide';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
/**
 * 文件服务
 * @author wildunt_unique
 */
export class FolderService {
  /**
   * 文件服务的baseUrl
   */
  folderUrl: String;

  // 当前选中的文件节点
  activedNode: NzTreeNode;
  // 添加数据监听，观察者模式，自动订阅事件，管理一系列订阅者并向其发布事件的对象，事件触发与事件监听器功能，创建服务，new一个EventEmitter
  change: EventEmitter<Slide[]>;


  /**
   * 获得当前登录用户的文件树 (测试完成)
   * @returns {Observable<Folder>}
   */
  getRootFolder(): Observable<TreeNode> {
    return this.http.get<TreeNode>(this.folderUrl + `getRootFolderWithAngular`, httpOptions);
  }

  /**
   * 根据id得到某一文件夹的信息
   * @param {number} id
   * @returns {Observable<Folder>}
   */
  getFolder(id: number): Observable<Folder> {
    return this.http.get<Folder>(this.folderUrl + `fetchById?id=` + id, httpOptions);
  }

  /**
   * 删除文件夹
   * @param {number} id
   * @returns {Observable<Result>}
   */
  deleteFolder(id: number): Observable<Result> {
    return this.http.get<Result>(this.folderUrl + `delete?folderId=` + id, httpOptions);
  }

  /**
   * 修改文件夹
   * @param {Folder} folder
   this.foldrService.modify({
      child: null,
      slides: null,
      folderId: folderId,
      folderName: folderName,
      parent: parent
    }).subscribe((data: Folder) => {
      this.folder = data;
    });
   */
  modify(folder: Folder): Observable<Result> {
    return this.http.post<Result>(this.folderUrl + `modifyWithAngular`, folder, httpOptions);
  }

  /**
   * 添加一个文件夹
   * @param {Folder} folder
   * @returns {Observable<Folder>}
   */
  save(folder: Folder): Observable<Folder> {
    return this.http.post<Folder>(this.folderUrl + `saveWithAngular`, folder, httpOptions);
  }

  /**
   * 构造函数，注入一个 HttpClient服务
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient) {
    this.folderUrl = 'folder/';
    this.activedNode = null;
    this.change = new EventEmitter();
  }

  /**
   * 设置当前选中节点
   * @param {NzTreeNode} activedNode
   */
  setActivedNode(activedNode: NzTreeNode) {
    this.activedNode = activedNode;
  }
}
