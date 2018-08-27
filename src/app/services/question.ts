import {Option} from './option';
import {Publish} from './publish';
export class Question {
  userId?: number;
  questionId?: number;
  originalAnswer?: number; // 正确答案
  description?: string;
  optionList?: Option[];
  publishList?: Publish[];
}
export class QuestionList {
  questionList?: Question[];
}
