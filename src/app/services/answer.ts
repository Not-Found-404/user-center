import {Publish} from './publish';

export class Answer {
  answerId?: number;
  publishId?: number;
  ipAddress?: string;
  respondentInfo?: string;
  time?: Date;
  publish?: Publish;
}
