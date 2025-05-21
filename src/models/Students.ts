import {
  CourseFeesType,
  EmiType,
  HostelFeeMonthType,
  HostelFeesType,
  IStudentType,
  StudentDataType,
} from "@/types/StudentType";
import { generateCustomId } from "@/util/generateCustomId";
import mongoose, { Model, Schema } from "mongoose";

const emiSchema = new Schema<EmiType>({
  installmentNumber: {
    type: Number,
  },
  amount: {
    type: Number,
  },
  dueDate: {
    type: Date,
  },
  scholarship: {
    type: String,
  },
});

const courseFeesSchema = new Schema<CourseFeesType>({
  totalAmount: {
    type: Number,
  },
  emis: [emiSchema],
});

const hostelFeeMonthSchema = new Schema<HostelFeeMonthType>({
  month: {
    type: String,
  },
  year: {
    type: Number,
  },
  amount: {
    type: Number,
  },
  scholarship: {
    type: String,
  },
});

const hostelFeesSchema = new Schema<HostelFeesType>({
  monthlyAmount: {
    type: Number,
  },
  monthsDue: [hostelFeeMonthSchema],
});

const studentDataSchema = new Schema<StudentDataType>({
  currentBatch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batches",
    required: true,
  },
  currentCourse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  currentClass: {
    type: String,
  },
  currentYear: {
    type: String,
  },

  bookFees: {
    type: String,
  },
  hostelFees: hostelFeesSchema,
});

const studentSchema = new Schema<IStudentType>({
  student_id: {
    type: String,
    required: true,
    unique: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  gurdianName: {
    type: String,
    required: true,
  },
  gurdianMobileNumber: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
  pinCode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  caste: {
    type: String,
    required: true,
  },
  class10SchoolName: {
    type: String,
  },
  class10PassYear: {
    type: String,
  },
  class12SchoolName: {
    type: String,
  },
  class12PassYear: {
    type: String,
  },
  courseFees: courseFeesSchema,

  studentData: [studentDataSchema],
});

studentSchema.pre<IStudentType>("save", async function (next) {
  if (!this.student_id) {
    try {
      this.student_id = await generateCustomId(
        mongoose.model("Students"),
        "student_id",
        "STUDENTS-"
      );
    } catch (error) {
      console.log(error);
    }
  }
  next();
});

const Students: Model<IStudentType> =
  mongoose.models.Students ||
  mongoose.model<IStudentType>("Students", studentSchema);

export default Students;
