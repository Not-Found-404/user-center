import {Component, OnInit, HostListener} from '@angular/core';
import {NzDropdownService, NzFormatEmitEvent, NzTreeNode, NzDropdownContextComponent} from 'ng-zorro-antd';
import {FolderService} from '../services/folder.service';

@Component({
  selector: 'app-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.css']
})
export class FileTreeComponent implements OnInit {
  // dropdown: NzDropdownContextComponent;
  // can active only one node
  activedNode: NzTreeNode;
  dragNodeElement;
  nodes: NzTreeNode[];

  constructor(
    private nzDropdownService: NzDropdownService,   // 下拉菜单
    private folderService: FolderService
  ) {
  }

  ngOnInit() {
  }

  @HostListener('mouseleave', ['$event'])
  mouseLeave(event: MouseEvent): void {
    event.preventDefault();
    if (this.dragNodeElement && this.dragNodeElement.className.indexOf('is-dragging') > -1) {
      this.dragNodeElement.className = this.dragNodeElement.className.replace(' is-dragging', '');
    }
  }

  @HostListener('mousedown', ['$event'])
  mouseDown(): void {
    if (this.dragNodeElement && this.dragNodeElement.className.indexOf('is-dragging') > -1) {
      this.dragNodeElement.className = this.dragNodeElement.className.replace(' is-dragging', '');
    }
  }

  // 选中节点
  activeNode(data: NzFormatEmitEvent): void {
    if (this.activedNode) {
      this.activedNode = null;
    }
    data.node.isSelected = true;
    this.activedNode = data.node;
    this.folderService.setActivedNode(this.activedNode);
  }

  setNodes(nodes: NzTreeNode[]): void {
    this.nodes = nodes;
  }

}
