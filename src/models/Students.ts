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

const emiSchema = new Schema<EmiType>(
  {
    installmentNumber: {
      type: Number,
    },
    amount: {
      type: Number,
    },
    due: {
      type: String,
    },
    paid: {
      type: String,
    },
    uploadReceipt: {
      public_id: { type: String },
      secure_url: { type: String },
    },
    remarks: {
      type: String,
    },
    scholarship: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const courseFeesSchema = new Schema<CourseFeesType>({
  totalAmount: {
    type: Number,
  },
  emis: [emiSchema],
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
  currentYear: {
    type: String,
  },
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
  due: { type: String },
  uploadReceipt: {
    public_id: { type: String },
    secure_url: { type: String },
  },
  remarks: {
    type: String,
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
  },
  currentCourse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
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

const studentSchema = new Schema<IStudentType>(
  {
    student_id: {
      type: String,
      required: true,
      unique: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    dateOfAdmission: {
      type: Date,
      require: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
    },
    dateOfBirth: {
      type: String,
    },
    gurdianName: {
      type: String,
    },
    gurdianMobileNumber: {
      type: String,
    },
    gender: {
      type: String,
    },

    address: {
      type: String,
    },
    pinCode: {
      type: String,
    },
    city: {
      type: String,
    },
    caste: {
      type: String,
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

    courseFees: [courseFeesSchema],

    studentData: [studentDataSchema],
  },
  { timestamps: true }
);

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
