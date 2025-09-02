import {
  CourseFeesType,
  HostelFeeMonthType,
  HostelFeesType,
  IStudentType,
  StudentDataType,
} from "@/types/StudentType";
import { generateCustomId } from "@/util/generateCustomId";
import mongoose, { Model, QueryWithHelpers, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export type PaymentType = {
  paymentName: string;
  amount: number;
  scholarship?: number;
  paid?: number;
  remarks?: string;
};

export type EmiType = {
  installmentNumber: number;
  payments: PaymentType[];
  totalPaid?: number;
  totalDue?: number;
};

const paymentSchema = new Schema<PaymentType>({
  paymentName: { type: String, required: true },
  amount: { type: Number, required: true },
  scholarship: { type: Number },
  paid: { type: Number },
  remarks: { type: String },
});

const emiSchema = new Schema<EmiType>(
  {
    installmentNumber: { type: Number, required: true },
    payments: [paymentSchema],
    totalPaid: { type: Number },
    totalDue: { type: Number },
  },
  { timestamps: true }
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
  attendance_id: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Attendance",
    default: [],
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
      type: String,
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
    password: {
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

  if (this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
      console.log(err);
    }
  }
  next();
});

studentSchema.pre<QueryWithHelpers<IStudentType, IStudentType>>(
  "findOneAndUpdate",
  async function (next) {
    // Access the update operations being applied
    const update = this.getUpdate();

    // Ensure 'update' is an object and contains 'password'
    // 'update' can be null or undefined if no updates are specified,
    // or it could be a raw BSON update object.
    if (update && typeof update === "object" && "password" in update) {
      try {
        const salt = await bcrypt.genSalt(10);
        // Hash the new password from the update object
        // Cast `update` to ensure TypeScript knows it has a password property.
        // It's safer to check the type more thoroughly, or use type assertions carefully.
        const passwordToHash = (update as { password?: string }).password;

        if (passwordToHash) {
          // Only hash if passwordToHash is not undefined
          (update as { password: string }).password = await bcrypt.hash(
            passwordToHash,
            salt
          );
          // Set the modified update back to the query
          this.setUpdate(update);
        }
      } catch (err: any) {
        console.error("Error hashing password during findOneAndUpdate:", err);
        // Pass the error to the next middleware or save operation
        return next(err);
      }
    }
    next();
  }
);

studentSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return bcrypt.compare(enteredPassword, this.password);
};

const Students: Model<IStudentType> =
  mongoose.models.Students ||
  mongoose.model<IStudentType>("Students", studentSchema);

export default Students;
