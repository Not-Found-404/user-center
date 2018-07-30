import {Component, forwardRef, Host, Inject, OnInit, ViewChild} from '@angular/core';
import {FileTreeComponent} from '../file-tree/file-tree.component';
import {Folder} from '../services/folder';
import {Slide} from '../services/slide';
import {UserCenterComponent} from '../usercenter.component';
import {NzMessageService, NzTreeNode, NzTreeNodeOptions} from 'ng-zorro-antd';
import {SlideService} from '../services/slide.service';
import {FolderService} from '../services/folder.service';
import {TreeNode} from '../services/TreeNode';

@Component({
  selector: 'app-move-file-modal',
  templateUrl: './move-file-modal.component.html',
  styleUrls: ['./move-file-modal.component.css']
})
export class MoveFileModalComponent implements OnInit {

  isVisible = false;
  title = '选择文件';
  @ViewChild('fileTree')
  fileTree: FileTreeComponent;
  folder: Folder;
  slide: Slide;
  // 1是slide 2是folder
  type: number;
  folderId: number;
  parent: UserCenterComponent;
  nodes = [
    new NzTreeNode({
      title: '安卓',
      key: '1001',
      author: 'DingXing',
      children: [
        {
          title: 'Tween动画',
          key: '10011',
          children: null
        },
        {
          title: 'Frame动画',
          key: '10012',
          children: null
        }
      ]
    }), new NzTreeNode({
      title: 'JavaEE',
      key: '1002',
      author: 'DingXing',
      children: [
        {
          title: 'SpringMVC',
          key: '10021',
          children: null
        },
        {
          title: 'SpringIoC',
          key: '10022',
          children: null
        }
      ]
    })
  ];

  constructor(
    private slideService: SlideService,
    private folderService: FolderService,
    private messageService: NzMessageService,
    @Host() @Inject(forwardRef(() => UserCenterComponent)) userCenterComponent: UserCenterComponent
  ) {
    this.parent = userCenterComponent;
  }

  ngOnInit() {
  }

  showModal(obj, type: number): void {
    this.type = type;
    if (this.type === 2) {
      this.slide = obj;
    }
    if (this.type === 1) {
      this.folder = obj;
    }
    this.isVisible = true;
    this.folderService.getRootFolder().subscribe((data: TreeNode) => {
      this.nodes = [this.createNzTreeNode(data)];
      this.fileTree.setNodes(this.nodes);
    });
  }

  handleOk(): void {
    this.folderId = Number(this.folderService.activedNode.key);
    if (this.folderService.activedNode == null) {
      return;
    }
    this.isVisible = false;
    // 如果是幻灯片的移动
    if (this.type === 2) {
      this.slideService.modifySlideInfo({
        name: this.slide.name,
        slideId: this.slide.slideId,
        folderId: this.folderId
      }).subscribe(_ => {
        this.parent.getFolder(this.folderId);
      });
    } else if (this.type === 1) { // 如果是文件夹的移动
      // 自己移动到自己
      if (this.folder.folderId === this.folderId) {
        this.messageService.create('error', `别玩蛇`);
        return;
      } else {
        this.folderService.modify({
          folderId: this.folder.folderId,
          folderName: this.folder.folderName,
          parent: this.folderId
        }).subscribe(_ => {
          this.parent.getFolder(this.folderId);
        });
      }
    }

  }

  handleCancel(): void {
    this.isVisible = false;
  }

  createNzTreeNode(data: TreeNode): NzTreeNode {
    return new NzTreeNode({
      title: data.title,
      key: data.key,
      children: this.getChild(data)
    });
  }

  getChild(data: TreeNode): NzTreeNodeOptions[] {
    if (data == null || data.children == null || data.children.length === 0) {
      return null;
    }
    const temp: NzTreeNodeOptions[] = [];
    data.children.forEach(value => {
      temp.push({
        title: value.title,
        key: value.key,
        children: this.getChild(value)
      });
    });
    return temp;
  }

}
