import mongoose, { Document } from "mongoose";

export interface EmiType {
  installmentNumber?: number;
  amount?: number;
  dueDate?: Date;
  scholarship?: string;
}

export interface CourseFeesType {
  totalAmount?: number;
  emis: EmiType[];
}

export interface HostelFeeMonthType {
  month: string;
  year: number;
  amount: number;
  scholarship: string;
}

export interface HostelFeesType {
  monthlyAmount: number;
  monthsDue: HostelFeeMonthType[];
}

export interface StudentDataType {
  currentBatch: mongoose.Types.ObjectId;
  currentCourse: mongoose.Types.ObjectId;
  currentClass?: string;
  currentYear?: string;
  bookFees?: string;
  hostelFees?: HostelFeesType;
}

export interface IStudentType extends Document {
  student_id: string;
  studentName: string;
  mobileNumber: string;
  dateOfBirth: string;
  gurdianName: string;
  gurdianMobileNumber: string;
  gender: string;
  selectedCourse: mongoose.Types.ObjectId;
  selectedBatch: mongoose.Types.ObjectId;
  address: string;
  pinCode: string;
  city: string;
  caste: string;
  class10SchoolName?: string;
  class10PassYear?: string;
  class12SchoolName?: string;
  class12PassYear?: string;
  courseFees: CourseFeesType;
  studentData: StudentDataType[];
}
