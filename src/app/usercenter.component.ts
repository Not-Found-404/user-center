import {Component, OnInit, TemplateRef} from '@angular/core';
import {NzMenuItemDirective, NzDropdownContextComponent, NzDropdownService, NzModalService} from '../../node_modules/ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd';
import {User} from './services/user';
import {Folder} from './services/folder';
import {UserService} from './services/user.service';
import {SlideService} from './services/slide.service';
import {FolderService} from './services/folder.service';
import {log} from 'util';

/** Test Environment 测试环境__数据传输 **/
import {DATA} from './mockData';

/** Test Environment end 测试环境__数据传输-结束 **/

@Component({
  selector: 'app-user-center',
  templateUrl: './usercenter.component.html',
  styleUrls: ['./usercenter.component.css']
})
export class UserCenterComponent implements OnInit {
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

  constructor(private nzDropdownService: NzDropdownService,
              private userService: UserService,
              private slideService: SlideService,
              private folderService: FolderService,
              private messageService: NzMessageService,   // 全局消息服务-ant
              private modalService: NzModalService        // 对话框服务-ant
              ) {
    this.user = {
      username: '用户',
      avator: '../assets/img/avatar/avator_1.png'
    };
    this.folder = {
      folderName: '',
      folderId: null,
      parent: null,
      child: [],
      slideVos: []
    };

    /** Test Environment 测试环境__数据传输 **/
    this.folder = DATA;
    /** Test Environment end 测试环境__数据传输-结束 **/
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
    /* 删除文件夹业务逻辑 */
    log('删除文件夹ID:' + folderId.toString());

    /* 提示信息_删除成功 */
    this.showMessage('success', '文件夹删除成功');
  }

  /* 幻灯片右键菜单 */

  // 右键菜单_播放幻灯片
  slideMenuPlay(slideId: number): void {
    /* 播放幻灯片逻辑 */

    log('播放幻灯片ID:' + slideId.toString());
  }

  // 右键菜单_删除幻灯片
  slideMenuDelete(slideId: number): void {
    /* 显示删除确认对话框 */
    this.showDeleteSlideConfirm(slideId);
  }

  deleteSlide(slideId: number): void {
    /* 删除幻灯片函数 */
    /* 提示信息_删除幻灯片id */
    log('删除幻灯片ID:' + slideId.toString());
    /* 删除幻灯片业务逻辑 */

    /* 提示信息_删除成功 */
    this.showMessage('success', '幻灯片删除成功');
  }

  /* **** 右键菜单-end **** */

  // 得当前用户的信息
  getLoginUser() {
    this.userService.getLoginUser().subscribe((data: User) => {
      if (data != null) {
        this.user = data;
        this.getFolder(this.user.folderId);
      }
    });
  }

  // 根据id值打开文件夹
  getFolder(folderId: number) {
    if (folderId != null) {
      this.folderService.getFolder(folderId).subscribe((data: Folder) => {
        this.folder = data;
      });
    }
  }

  // 添加新的文件夹
  addNewFolder() {
    this.folderService.save({
      parent: this.folder.folderId,
      folderName: '新建文件夹',
      folderId: null,
      child: null,
      slideVos: null
    }).subscribe(_ => {
      this.getFolder(this.folder.folderId);
      // 显示创建成功信息
      this.messageService.info('创建文件夹成功');
    });
  }

  // 添加新的幻灯片
  addNewSlide() {
    this.slideService.addNewSlide(this.folder.folderId).subscribe(_ => {
      this.getFolder(this.folder.folderId);
      // 显示创建成功信息
      this.messageService.info('创建幻灯片成功');
    });
  }

  ngOnInit() {
    this.getLoginUser();
  }

  triggerToggle(): void {
    /* 侧边栏切换函数 */
    if (this.isCollapsed) {
      this.isCollapsed = false;
    } else {
      this.isCollapsed = true;
    }
  }

  editSlide(slideId: number): void {
    /* 编辑幻灯片函数 */
    log('编辑幻灯片id:' + slideId.toString());
    let isMobileDevice = false;  // 判断设备是否为移动设备
    // 获取浏览器UA信息，判断设备类型
    const userAgent = navigator.userAgent;
    isMobileDevice = /^.*android.*$/ui.test(userAgent); // Android 设备
    isMobileDevice = /^.*iPhone.*$/ui.test(userAgent);  // iPhone 设备
    isMobileDevice = /^.*iPad.*$/ui.test(userAgent);    // iPad 设备
    isMobileDevice = /^.*Mobile.*$/ui.test(userAgent);  // 移动设备
    if (isMobileDevice) {
      /* 移动设备，弹出提示 */
      this.showMessage('warning', '为了良好体验，目前只支持桌面端编辑');
    } else {
      /* 桌面端进行跳转 */
      window.open('toSlideEditPage?slideId=' + slideId.toString());
    }
  }

  showMessage(type: string, content: string): void {
    /* 显示全局信息函数
     * type:信息类型 success,error,warning
     * content:信息内容 string
     */
    this.messageService.create(type, content);
  }

  showDeleteSlideConfirm(slideId: number): void {
    /* 删除幻灯片确认对话框 */
    this.modalService.confirm({
      nzTitle     : '您确定要删除这个幻灯片？',
      nzContent   : '<b style="color: red;">删除文件将不可恢复</b>',
      nzOkText    : '删除',
      nzOkType    : 'danger',
      nzOnOk      : () => this.deleteSlide(slideId), // 确认操作，回调删除幻灯片函数
      nzCancelText: '取消',
      nzOnCancel  : () => console.log('删除对话框_取消')
    });
  }

  showDeleteFolderConfirm(folderId: number): void {
    /* 删除文件夹确认对话框 */
    this.modalService.confirm({
      nzTitle     : '您确定要删除这个文件夹？',
      nzContent   : '<b style="color: red;">文件夹中的文件也将一起删除</b>',
      nzOkText    : '删除',
      nzOkType    : 'danger',
      nzOnOk      : () => this.deleteFolder(folderId), // 确认操作，回调删除文件夹函数
      nzCancelText: '取消',
      nzOnCancel  : () => console.log('删除对话框_取消')
    });
  }

}
