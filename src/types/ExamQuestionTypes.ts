import { Document } from "mongoose";

export interface ansOptionTypes {
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
}

export interface examQuestionTypes extends Document {
  _id: string;
  questionId?: string;
  questionName?: string;
  ansOption?: ansOptionTypes;
  correctAns?: string;
  class?: string;
  courseName?: string;
  subject?: string;
  qnsType?: string;
}
