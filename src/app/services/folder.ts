import {Slide} from './slide';

export class Folder {
  folderName?: String;
  folderId?: number;
  parent?: number;
  child?: Folder[];
  slideVos?: Slide[];
}
