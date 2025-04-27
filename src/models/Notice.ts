import mongoose, { Schema, Document, Model } from "mongoose";

interface Notice {
  noticeId: string;
  title: string;
  notice_file?: {
    public_id: string;
    secure_url: string;
  };
  status: boolean;
}

export interface NoticeDocument extends Document, Notice {}

const noticeSchema = new Schema<NoticeDocument>(
  {
    noticeId: {
      type: String,
      unique: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    notice_file: {
      type: Object,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

const Notice: Model<NoticeDocument> =
  mongoose.models.Notice ||
  mongoose.model<NoticeDocument>("Notice", noticeSchema);

export default Notice;
