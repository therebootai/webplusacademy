import mongoose, { Schema, Document, Model } from "mongoose";
import { BatchesDocument } from "./Batches";
import { Types } from "mongoose";
import { generateId } from "@/util/generateId";

export interface CourseDocument extends Document {
  course_id: string;
  course_name: string;
  status: boolean;
  batches: string[] | Types.ObjectId[] | BatchesDocument[];
  course_class?: string;
}

const courseSchema = new Schema<CourseDocument>(
  {
    course_id: {
      type: String,
      unique: true,
    },
    course_name: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    batches: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Batches",
      default: [],
    },
    course_class: {
      type: String,
    },
  },
  { timestamps: true }
);

courseSchema.pre("save", async function (next) {
  if (!this.course_id) {
    try {
      this.course_id = await generateId(
        mongoose.model("Courses"),
        "course_id",
        "course_id"
      );
    } catch (error) {
      console.log(error);
    }
  }
  next();
});

const Courses: Model<CourseDocument> =
  mongoose.models.Courses ||
  mongoose.model<CourseDocument>("Courses", courseSchema);

export default Courses;
