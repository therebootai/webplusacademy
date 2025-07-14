"use server";
import { connectToDataBase } from "@/db/connection";
import ExamQuestion from "@/models/ExamQuestion";
import ExamSet from "@/models/ExamSet";
import { deleteFile, uploadFile } from "@/util/cloudinary";
import { parseImage } from "@/util/parseImage";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";

const randomizeArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const generateQuestions = async (
  classNames: string[],
  courseNames: string[],
  subjects: string[],
  questionData: {
    subject: string;
    questions: { type: string; number: number }[];
    chapters: string[];
  }[],
  chapters?: string[]
) => {
  try {
    if (!Array.isArray(questionData)) {
      throw new Error("questionData must be an array");
    }

    let totalRequestedQuestions = 0;

    questionData.forEach((item) => {
      item.questions.forEach((q) => {
        totalRequestedQuestions += q.number;
      });
    });

    await connectToDataBase();

    const filters: any = {
      class: { $in: classNames },
      courseName: { $in: courseNames },
      subject: { $in: subjects },
      qnsType: {
        $in: questionData.flatMap((item) => item.questions.map((q) => q.type)),
      },
    };

    if (chapters && chapters.length > 0) {
      filters.chapter = { $in: chapters };
    }

    const questions = await ExamQuestion.find(filters).lean();

    if (questions.length === 0) {
      throw new Error("No questions found matching the filters");
    }

    const selectedQuestions: any[] = [];

    for (const item of questionData) {
      for (const { type, number } of item.questions) {
        const filteredQuestions = questions.filter((q) => q.qnsType === type);

        if (filteredQuestions.length < number) {
          throw new Error(`Not enough questions found for ${type}`);
        }

        const randomizedQuestions = randomizeArray(filteredQuestions).slice(
          0,
          number
        );
        selectedQuestions.push(...randomizedQuestions);
      }
    }

    return {
      success: true,
      message: "Questions generated successfully",
      questions: JSON.parse(JSON.stringify(selectedQuestions)),
    };
  } catch (error: any) {
    console.error("Error generating questions:", error);
    return { success: false, error: error.message || "Unknown error" };
  }
};

export const createExamSet = async (
  examSetName: string,
  batch: string,
  questions: string[],
  questionPdf?: { public_id: string; secure_url: string },
  receiptFile?: File
) => {
  try {
    await connectToDataBase();

    if (receiptFile && receiptFile.size > 0) {
      const receiptFilePath = await parseImage(receiptFile);
      const result = await uploadFile(receiptFilePath, receiptFile.type);

      if (result instanceof Error) {
        throw new Error("Failed to upload receipt to Cloudinary");
      }

      questionPdf = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };

      await fs.unlink(receiptFilePath);
    }

    const newExamSet = new ExamSet({
      examSetName,
      batch,
      questions,
      questionPdf,
    });

    const savedExamSet = await newExamSet.save();
    revalidatePath("/admin/exam/ganerate-questions");

    return {
      success: true,
      message: "Exam set created successfully",
      examSet: JSON.parse(JSON.stringify(savedExamSet)),
    };
  } catch (error: any) {
    console.error("Error creating exam set:", error);
    return { success: false, error: error.message || "Unknown error" };
  }
};

export async function getExamSets({
  page = 1,
  limit = 10,
  batchName,
  examSetName,
}: {
  page?: number;
  limit?: number;
  batchName?: string;
  examSetName?: string;
} = {}) {
  try {
    await connectToDataBase();

    const filter: any = {};

    if (batchName) {
      filter.batch = batchName;
    }

    if (examSetName) {
      filter.examSetName = { $regex: examSetName, $options: "i" };
    }

    const pageNumber = Number(page);
    const pageSize = Number(limit);
    const skip = (pageNumber - 1) * pageSize;

    const totalCount = await ExamSet.countDocuments(filter);

    const examSets = await ExamSet.find(filter)
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .populate("batch")
      .populate("questions")
      .lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(examSets)),
      pagination: {
        totalCount,
        currentPage: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    };
  } catch (error: any) {
    console.error("Error fetching exam sets:", error);
    return {
      success: false,
      data: [],
      pagination: {
        totalCount: 0,
        currentPage: 1,
        limit: 10,
        totalPages: 0,
      },
      error: error.message || "Unknown error",
    };
  }
}

export const updateExamSets = async ({
  examSetId,
  examSetName,
  batch,
  questions,
  receiptFile,
}: {
  examSetId: string;
  examSetName?: string;
  batch?: string;
  questions?: string[];
  receiptFile?: File;
}) => {
  try {
    await connectToDataBase();

    const updateData: any = {};

    if (examSetName) updateData.examSetName = examSetName;
    if (batch) updateData.batch = batch;
    if (questions) updateData.questions = questions;

    if (receiptFile && receiptFile.size > 0) {
      const receiptFilePath = await parseImage(receiptFile);
      const result = await uploadFile(receiptFilePath, receiptFile.type);

      if (result instanceof Error) {
        throw new Error("Failed to upload receipt to Cloudinary");
      }

      updateData.questionPdf = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };

      await fs.unlink(receiptFilePath);
    }

    const updatedExamSet = await ExamSet.findByIdAndUpdate(
      examSetId,
      { $set: updateData },
      { new: true }
    ).lean();

    if (!updatedExamSet) {
      throw new Error("Exam set not found");
    }

    return {
      success: true,
      message: "Exam set updated successfully",
      examSet: JSON.parse(JSON.stringify(updatedExamSet)),
    };
  } catch (error: any) {
    console.error("Error updating exam set:", error);
    return { success: false, error: error.message || "Unknown error" };
  }
};

export async function deleteExamSet(examsetId: string) {
  try {
    await connectToDataBase();

    const examSetToDelete = await ExamSet.findOne({ _id: examsetId });

    if (!examSetToDelete) {
      return { success: false, message: "Exam Set not found" };
    }

    if (examSetToDelete.questionPdf?.public_id) {
      const fileDeletionResult = await deleteFile(
        examSetToDelete.questionPdf.public_id
      );
      if (fileDeletionResult instanceof Error) {
        console.error(
          "Failed to delete PDF from Cloudinary:",
          fileDeletionResult.message
        );
      } else {
        console.log("PDF file deleted successfully from Cloudinary");
      }
    }

    const deletedExamSet = await ExamSet.findOneAndDelete({ _id: examsetId });

    if (!deletedExamSet) {
      return { success: false, message: "Exam Set not found" };
    }

    return { success: true, message: "Exam Set deleted successfully" };
  } catch (error: any) {
    console.error("Error deleting Exam Set:", error);
    return { success: false, message: error.message || "Unknown error" };
  }
}
