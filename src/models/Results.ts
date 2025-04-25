import mongoose, { Schema, Document, Model } from "mongoose";

export interface Result {
  resultId: string;
  classFor: string;
  result_file: {
    public_id: string;
    secure_url: string;
  };
  status: boolean;
  year: string;
}

export interface ResultDocument extends Document, Result {}

const resultSchema = new Schema<ResultDocument>(
  {
    resultId: {
      type: String,
      unique: true,
      required: true,
    },
    classFor: {
      type: String,
      required: true,
    },
    result_file: {
      type: Object,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    year: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Result: Model<ResultDocument> =
  mongoose.models.Result ||
  mongoose.model<ResultDocument>("Result", resultSchema);

export default Result;
