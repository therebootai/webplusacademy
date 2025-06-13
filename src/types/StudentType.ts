import { AttendanceDocument } from "@/models/Attendance";
import { BatchesDocument } from "@/models/Batches";
import { CourseDocument } from "@/models/Courses";
import mongoose, { Document } from "mongoose";

export interface EmiType {
  _id?: string;
  installmentNumber?: number;
  amount?: number;
  due?: string;
  scholarship?: string;
  uploadReceipt: {
    public_id: { type: String };
    secure_url: { type: String };
  };
  remarks: {
    type: String;
  };
  paid?: string;
}

export interface CourseFeesType {
  totalAmount?: number;
  _id?: string;
  emis: EmiType[];
  currentBatch: mongoose.Types.ObjectId | BatchesDocument[];
  currentCourse: mongoose.Types.ObjectId | CourseDocument;
  currentYear?: string;
  scholarship?: boolean;
}

export interface HostelFeeMonthType {
  month: string;
  year: number;
  amount: number;
  due: string;
  uploadReceipt: {
    public_id: string;
    secure_url: string;
  };
  remarks: string;
  scholarship: string;
}

export interface HostelFeesType {
  monthlyAmount: number;
  scholarship?: boolean;
  monthsDue: HostelFeeMonthType[];
}

export interface StudentDataType {
  _id?: string;
  currentBatch: mongoose.Types.ObjectId | BatchesDocument[];
  currentCourse: mongoose.Types.ObjectId | CourseDocument;
  currentClass?: string;
  currentYear?: string;
  bookFees?: string;
  scholarship?: boolean;
  hostelFees?: HostelFeesType;
}

export interface IStudentType extends Document {
  student_id: string;
  studentName: string;
  mobileNumber: string;
  dateOfAdmission: string;
  dateOfBirth?: string;
  gurdianName?: string;
  gurdianMobileNumber?: string;
  gender: string;
  selectedCourse: mongoose.Types.ObjectId;
  selectedBatch: mongoose.Types.ObjectId;
  address?: string;
  pinCode: string;
  city?: string;
  caste?: string;
  class10SchoolName?: string;
  class10PassYear?: string;
  class12SchoolName?: string;
  class12PassYear?: string;
  scholarship: boolean;
  password: string;
  attendance_id: mongoose.Types.ObjectId[] | AttendanceDocument[];
  courseFees: CourseFeesType[];
  studentData: StudentDataType[];
  createdAt?: string;
  updatedAt?: string;
  matchPassword(enteredPassword: string): Promise<boolean>;
}
