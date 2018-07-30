import {Component, forwardRef, Host, Inject, OnInit} from '@angular/core';
import {Folder} from '../services/folder';
import {Slide} from '../services/slide';
import {UserCenterComponent} from '../usercenter.component';
import {NzMessageService} from 'ng-zorro-antd';
import {FolderService} from '../services/folder.service';
import {SlideService} from '../services/slide.service';

@Component({
  selector: 'app-input-modal',
  templateUrl: './input-modal.component.html',
  styleUrls: ['./input-modal.component.css']
})
export class InputModalComponent implements OnInit {
  isVisible = false;
  title: '请输入名称';
  // 修改的值
  value: String;
  // 选择修改的文件夹
  folder: Folder;
  // 选择修改的幻灯片
  slide: Slide;
  // 1是slide 2是folder
  type: number;
  // 得到父组件，调用更新
  parentComponent: UserCenterComponent;

  constructor(
    private slideService: SlideService,
    private folderService: FolderService,
    private messageService: NzMessageService,
    @Host() @Inject(forwardRef(() => UserCenterComponent)) userCenterComponent: UserCenterComponent
  ) {
    this.parentComponent = userCenterComponent;
  }

  ngOnInit() {
  }

  showModal(obj, type: number): void {
    /* 显示 Modal 函数 */
    this.type = type;
    if (this.type === 2) {
      this.slide = obj;
      this.value = this.slide.name;
    }
    if (this.type === 1) {
      this.folder = obj;
      this.value = this.folder.folderName;
    }
    this.isVisible = true;
  }

  handleOk(): void {
    /* 点击确定按钮响应函数 */
    if (this.value === '') {
      this.messageService.create('error', `别玩蛇`);
      return;
    }
    this.isVisible = false;
    if (this.type === 2) {
      this.slideService.modifySlideInfo({
        name: this.value,
        slideId: this.slide.slideId,
        folderId: this.slide.folderId
      }).subscribe(_ => {
        this.parentComponent.getFolder(this.slide.folderId);
      });
    } else if (this.type === 1) { // 如果是文件夹
      this.folderService.modify({
        folderId: this.folder.folderId,
        folderName: this.value,
        parent: this.folder.parent
      }).subscribe(_ => {
        this.parentComponent.getFolder(this.folder.parent);
      });
    }
  }

  handleCancel(): void {
    /* 点击取消响应函数 */
    this.isVisible = false;
  }

}
