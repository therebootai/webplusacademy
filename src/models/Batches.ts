import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { CourseDocument } from "./Courses";
import { AttendanceDocument } from "./Attendance";
import { generateId } from "@/util/generateId";

export interface BatchesDocument extends Document {
  batch_id: string;
  batch_name: string;
  status: boolean;
  year: string;
  course: string | Types.ObjectId | CourseDocument;
  attendance_list: string[] | Types.ObjectId[] | AttendanceDocument[];
  start_date?: Date;
  end_date?: Date;
}

const batchSchema = new Schema<BatchesDocument>(
  {
    batch_id: {
      type: String,
      unique: true,
    },
    batch_name: {
      type: String,
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
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Courses",
      required: true,
    },
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
    },
    attendance_list: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Attendances",
      default: [],
    },
  },
  { timestamps: true }
);

batchSchema.pre("save", async function (next) {
  if (!this.batch_id) {
    try {
      this.batch_id = await generateId(
        mongoose.model<BatchesDocument>("Batches"),
        "batch_id",
        "BATCH-"
      );
    } catch (error) {
      console.log(error);
    }
  }
  next();
});

const Batches: Model<BatchesDocument> =
  mongoose.models.Batches || mongoose.model("Batches", batchSchema);

export default Batches;
