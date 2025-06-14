"use server";
import { ansOptionTypes, examQuestionTypes } from "@/types/ExamQuestionTypes";
import mongoose, { Model, Schema } from "mongoose";

const ansOptionSchema = new Schema<ansOptionTypes>({
  optionA: { type: String },
  optionB: { type: String },
  optionC: { type: String },
  optionD: { type: String },
});

const examQuestionSchema = new Schema<examQuestionTypes>(
  {
    questionId: {
      type: String,
      required: true,
      unique: true,
    },
    questionName: {
      type: String,
      required: true,
    },
    ansOption: { type: ansOptionSchema, required: true },
    correctAns: {
      type: String,
    },
    class: {
      type: String,
    },
    courseName: {
      type: String,
    },
    subject: {
      type: String,
    },
    qnsType: {
      type: String,
      enum: ["Hard", "Medium", "Easy"],
    },
  },
  {
    timestamps: true,
  }
);

const ExamQuestion: Model<examQuestionTypes> =
  mongoose.models.ExamQuestion ||
  mongoose.model<examQuestionTypes>("ExamQuestion", examQuestionSchema);

export default ExamQuestion;
