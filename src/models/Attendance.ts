import { generateCustomId } from "@/util/generateCustomId";
import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface AttendanceDocument extends Document {
  attendance_id: string;
  batch_id: Types.ObjectId;
  student_id: Types.ObjectId;
  attendance_date: Date;
  attttendance_month: string;
  attttendance_year: string;
  batch_subject: string;
}

const attendanceSchema = new Schema<AttendanceDocument>(
  {
    attendance_id: {
      type: String,
      unique: true,
    },
    batch_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batches",
      required: true,
    },
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Students",
      required: true,
    },
    attendance_date: {
      type: Date,
      required: true,
    },
    attttendance_month: {
      type: String,
      required: true,
    },
    attttendance_year: {
      type: String,
      required: true,
    },
    batch_subject: {
      type: String,
    },
  },
  { timestamps: true }
);

attendanceSchema.pre("save", async function (next) {
  if (!this.attendance_id) {
    try {
      this.attendance_id = await generateCustomId(
        mongoose.model<AttendanceDocument>("Attendance"),
        "attendance_id",
        "Attendance_ID-"
      );
    } catch (error) {
      console.log(error);
    }
  }
  next();
});

const Attendance: Model<AttendanceDocument> =
  mongoose.models.Attendance ||
  mongoose.model<AttendanceDocument>("Attendance", attendanceSchema);

export default Attendance;
