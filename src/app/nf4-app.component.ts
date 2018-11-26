import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzMenuItemDirective, NzDropdownContextComponent } from '../../node_modules/ng-zorro-antd';
import { NzDropdownService, NzModalService, NzIconService } from '../../node_modules/ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd';
import { User } from './services/user';
import { Folder } from './services/folder';
import { UserService } from './services/user.service';
import { SlideService } from './services/slide.service';
import { FolderService } from './services/folder.service';
import { MoveFileModalComponent } from './move-file-modal/move-file-modal.component'; /*移动文件的component*/
import { InputModalComponent } from './input-modal/input-modal.component';
import { Slide } from './services/slide';
import { Result } from './services/result';

/** Test Environment 测试环境__数据传输 **/
import { DATA } from './mockData';
/** Test Environment end 测试环境__数据传输-结束 **/

@Component({
  selector: 'app-nf4',
  templateUrl: './nf4-app.component.html',
  styleUrls: ['./nf4-app.component.css']
})
export class Nf4AppComponent implements OnInit {
  // Module 标题
  title = 'userCenter';
  // 右键菜单控制变量
  private dropdown: NzDropdownContextComponent;
  // 控制侧边栏隐藏
  isCollapsed = false;

  // 当前登录的用户
  user: User;

  // 当前打开的文件夹
  folder: Folder;

  /*属性装饰器，声明对子组件元素的实例引用*/
  @ViewChild('appMoveFileModal')
  appMoveFileModal: MoveFileModalComponent;

  @ViewChild('appInputModal')
  appInputModal: InputModalComponent;

  ngOnInit() {
    this.getLoginUser();
  }
  constructor(private nzDropdownService: NzDropdownService,
    private userService: UserService,
    private slideService: SlideService,
    private folderService: FolderService,
    private messageService: NzMessageService,   // 全局消息服务-ant
    private modalService: NzModalService,       // 对话框服务-ant
    private nzIconService: NzIconService        // 蚂蚁框架图标服务
  ) {
    this.user = {
      username: '新用户',
      /* 用户初始头像 */
      /* 生产环境 */
      avator: 'http://www.qtu404.com/nf4slide/assets/avatar/default_avatar.png'
      /* 本地环境 */
      // avator: '../assets/img/avatar/default_avatar.png'
    };

    /* 修改静态资源访问路径，Ant Design 框架，映射到服务器路径 assets 文件夹 */
    // this.nzIconService.changeAssetsSource('http://www.qtu404.com/nf4slide/');
  }

  // 右键菜单监听函数
  contextMenu($event: MouseEvent, template: TemplateRef<void>): void {
    this.dropdown = this.nzDropdownService.create($event, template);
  }

  // 右键菜单关闭监听函数
  close(e: NzMenuItemDirective): void {
    // 显示当前访问载荷
    // console.log(e);
    this.dropdown.close();
  }

  /* 文件夹右键菜单 */

  // 右键菜单_删除文件夹
  folderMenuDelete(folderId: number): void {
    /* 显示删除确认对话框 */
    this.showDeleteFolderConfirm(folderId);
  }

  deleteFolder(folderId: number): void {
    /* 删除文件夹函数 */
    /* 提示信息_删除文件id */
    // console.log('删除文件夹ID:' + folderId.toString());
    /* 删除文件夹业务逻辑 */
    this.folderService.deleteFolder(folderId).subscribe((data: Result) => {
      if (data.code === 200) {
        this.getFolder(this.folder.folderId);
        /* 提示信息_删除成功 */
        this.showMessage('success', '文件夹删除成功');
      }
    });
  }
  deleteSlide(slideId: number): void {
    /* 删除幻灯片函数 */
    /* 提示信息_删除幻灯片id */
    // console.log('删除幻灯片ID:' + slideId.toString());
    /* 删除幻灯片业务逻辑 */
    this.slideService.delelteSlideInfo(slideId).subscribe((data: Result) => { // 异步请求
      if (data.code === 200) {
        this.getFolder(this.folder.folderId);
        /* 提示信息_删除成功 */
        this.showMessage('success', '幻灯片删除成功');
      }
    });
  }

  /* **** 右键菜单-end **** */

  // 得当前用户的信息
  getLoginUser(): void {
    this.userService.getLoginUser().subscribe((data: User) => {
      if (data != null) {
        this.user = data;
        this.getFolder(this.user.folderId);
      }
    });
  }

  // 根据id值打开文件夹
  getFolder(folderId: number): void {
    if (folderId != null) {
      this.folderService.getFolder(folderId).subscribe((data: Folder) => {
        this.folder = data;
      });
    }
  }
  modifyAvatar(): void {
    /* 点击修改头像 */
    // 在当前窗口打开修改头像网页
    window.location.href = 'toAvatorEditpage';
  }
  // 按照名称搜索
  searchFile(event: any): void {
    if (event.keyCode === 13) {
      if (event.target.value === '') {
        return;
      } else {
        this.slideService.findByName({
          name: event.target.value,
          slideId: null,
          folderId: null
        }).subscribe((data: Slide[]) => {
          // 如果组件中，修改了某些数据，需要刷新用户中心，用户中心在其他组件中，那么就可以发送数据过去，那边接收到这个数据比对一下，刷新列表。
          this.folderService.change.emit(data);
          // this.folder.slideVos = data;
          // this.folder.child = [];

        });
      }
    }
  }

  triggerToggle(): void {
    /* 侧边栏切换函数 */
    if (this.isCollapsed) {
      this.isCollapsed = false;
    } else {
      this.isCollapsed = true;
    }
  }
  showMessage(type: string, content: string): void {
    /* 显示全局信息函数
     * type:信息类型 success,error,warning
     * content:信息内容 string
     */
    this.messageService.create(type, content);
  }

  userLogOut(): void {
    /* 注销用户函数 */
    window.open('toHomePage', '_self'); // 在当前窗口跳转
  }
  showDeleteFolderConfirm(folderId: number): void {
    /* 删除文件夹确认对话框 */
    this.modalService.confirm({
      nzTitle: '您确定要删除这个文件夹？',
      nzContent: '<b style="color: red;">文件夹中的文件也将一起删除</b>',
      nzOkText: '删除',
      nzOkType: 'danger',
      nzOnOk: () => this.deleteFolder(folderId), // 确认操作，回调删除文件夹函数
      nzCancelText: '取消',
      nzOnCancel: () => {} /* console.log('删除对话框_取消') */
    });
  }

}
