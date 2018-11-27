import { Component, forwardRef, Host, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzDropdownContextComponent, NzDropdownService, NzMenuItemDirective, NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Folder } from '../services/folder';
import { MoveFileModalComponent } from '../move-file-modal/move-file-modal.component';
import { InputModalComponent } from '../input-modal/input-modal.component';
import { SlideService } from '../services/slide.service';
import { FolderService } from '../services/folder.service';
import { User } from '../services/user';
import { Result } from '../services/result';
import { UserService } from '../services/user.service';
import { Slide } from '../services/slide';
import { Nf4AppComponent } from '../nf4-app.component';
import { AttendanceService } from '../services/attendance.service';
import { AttendanceListResponse } from '../services/attendance';

/* 模拟数据 -- start -- */
// import { DATA } from '../mockData';
/* 模拟数据 -- end -- */

@Component({
  selector: 'app-usercenter',
  templateUrl: './usercenter.component.html',
  styleUrls: ['./usercenter.component.css']
})
export class UsercenterComponent implements OnInit {
  // Module 标题
  title = 'userCenter';
  // 右键菜单控制变量
  private dropdown: NzDropdownContextComponent;

  // 当前登录的用户
  user: User;
  // 当前打开的文件夹
  folder: Folder;
  // 创建考勤id
  attendanceId: number;

  // 得到父组件，调用更新
  parentComponent: Nf4AppComponent;
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
    private attendanceService: AttendanceService,
    private messageService: NzMessageService,   // 全局消息服务-ant
    private modalService: NzModalService,        // 对话框服务-ant
    @Host() @Inject(forwardRef(() => Nf4AppComponent)) nf4AppComponent: Nf4AppComponent
  ) {
    this.parentComponent = nf4AppComponent;
    this.user = {
      username: '新用户',
      /* 用户初始头像 */
      /* 生产环境 */
      avator: 'http://www.qtu404.com/nf4slide/assets/avatar/default_avatar.png'
      /* 本地环境 */
      // avator: '../assets/img/avatar/default_avatar.png'
    };
    this.folder = {
      folderName: '根文件夹',
      folderId: 0,
      parent: 0,
      child: []
    };
    // 接收发射过来的数据
    this.folderService.change.subscribe((value: Slide[]) => {
      // 这里就可以调取接口，刷新用户中心的文件夹中slideVos数据
      this.folder.slideVos = value;
      this.folder.child = [];
    });
    /** Test Environment 测试环境__数据传输 **/
    // this.folder = DATA;
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
    /* 提示信息_删除文件id */
    /* 删除文件夹业务逻辑 */
    this.folderService.deleteFolder(folderId).subscribe((data: Result) => {
      if (data.code === 200) {
        this.getFolder(this.folder.folderId);
        /* 提示信息_删除成功 */
        this.showMessage('success', '文件夹删除成功');
      }
    });
  }

  /* 幻灯片右键菜单 */

  // 右键菜单_播放幻灯片
  slideMenuPlay(slideId: number): void {
    /* 播放幻灯片逻辑，直接播放幻灯片，无考勤和远程控制功能 */
    window.open('toPlayPage?slideId=' + slideId);
  }

  // 右键菜单_删除幻灯片
  slideMenuDelete(slideId: number): void {
    /* 显示删除确认对话框 */
    this.showDeleteSlideConfirm(slideId);
  }

  deleteSlide(slideId: number): void {
    /* 删除幻灯片函数 */
    /* 提示信息_删除幻灯片id */
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

  // 添加新的文件夹
  addNewFolder(): void {
    console.log('开始新建文件夹');
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
  addNewSlide(): void {
    console.log('创建新的幻灯片');
    this.slideService.addNewSlide(this.folder.folderId).subscribe(_ => {
      this.getFolder(this.folder.folderId);
      // 显示创建成功信息
      this.messageService.info('创建幻灯片成功');
    });
  }

  playWithSync(slideId: number): void {
    // 演讲点击事件
    this.showAttendanceConfirm(slideId);
  }

  // 显示是否进行考勤的弹出框
  showAttendanceConfirm(slideId: number): void {
    this.modalService.confirm({
      nzTitle: '您是否要在播放幻灯片时进行考勤？',
      nzContent: '',
      nzOkText: '确定',
      nzOkType: 'info',
      nzOnOk: () => {
        /* 确定按钮：打开 考勤 + 远程控制 功能 */
        window.open('toPlayPage?slideId=' + slideId + '&isAttendance=true&control=true');
      },
      nzCancelText: '取消',
      /* 取消按钮：打开 远程控制 功能 */
      nzOnCancel: () => window.open('toPlayPage?slideId=' + slideId + '&control=true')
    });
  }

  // 幻灯片移动
  slideMove(slide: Slide) {
    this.appMoveFileModal.showModal(slide, 2);
  }

  folderMove(folder: Folder): void {
    /*在log中输出，文件夹移动*/
    // 文件夾移动
    this.appMoveFileModal.showModal(folder, 1);
  }

  // 编辑文件夹名称
  eidtFolderName(folder: Folder): void {
    this.appInputModal.showModal(folder, 1);
  }

  // 编辑幻灯片名称
  eidtSlideName(slide: Slide): void {
    this.appInputModal.showModal(slide, 2);
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
          this.folder.slideVos = data;
          this.folder.child = [];
        });
      }
    }
  }

  // 按照名称搜索幻灯片
  searchSlideByName(slide: Slide[]) {
    this.folder.slideVos = slide;
    this.folder.child = [];
  }

  triggerToggle(): void {
    this.parentComponent.triggerToggle();
  }

  editSlide(slideId: number): void {
    /* 编辑幻灯片函数 */
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

  userLogOut(): void {
    /* 注销用户函数 */
    window.open('toHomePage', '_self'); // 在当前窗口跳转
  }

  importSlide() {
    /* 导入幻灯片跳转函数 */
    window.open('toUploadPage'); // 在当前窗口跳转
  }

  showDeleteSlideConfirm(slideId: number): void {
    /* 删除幻灯片确认对话框 */
    this.modalService.confirm({
      nzTitle: '您确定要删除这个幻灯片？',
      nzContent: '<b style="color: red;">删除文件将不可恢复</b>',
      nzOkText: '删除',
      nzOkType: 'danger',
      nzOnOk: () => this.deleteSlide(slideId), // 确认操作，回调删除幻灯片函数
      nzCancelText: '取消',
      nzOnCancel: () => console.log('删除对话框_取消')
    });
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
      nzOnCancel: () => console.log('删除对话框_取消')
    });

  }

}
