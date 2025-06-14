"use server";
import { connectToDataBase } from "@/db/connection";
import ExamQuestion from "@/models/ExamQuestion";
import { examQuestionTypes } from "@/types/ExamQuestionTypes";
import { generateCustomId } from "@/util/generateCustomId";
import fs from "fs";
import path from "path";
import { parse } from "fast-csv";
import { parseCSV } from "@/util/parseCSV";
import { revalidatePath } from "next/cache";

export async function createExamQuestions(questionData: any) {
  try {
    await connectToDataBase();

    const questionId = await generateCustomId(
      ExamQuestion,
      "questionId",
      "QUESTION-"
    );
    if (!questionId) {
      throw new Error("Failed to generate question ID");
    }
    questionData.questionId = questionId;

    const newQuestion = new ExamQuestion(questionData);
    const savedQuestion = await newQuestion.save();
    revalidatePath("/admin/exam/add-questions");
    return {
      success: true,
      question: JSON.parse(JSON.stringify(savedQuestion)),
    };
  } catch (error: any) {
    return { success: false, error: error.message || "Unknown error" };
  }
}

export async function getExamQuestions({
  page = 1,
  limit = 10,
  className,
  courseName,
  qnsType,
}: {
  page?: number;
  limit?: number;
  className?: string;
  courseName?: string;
  qnsType?: string;
} = {}) {
  try {
    await connectToDataBase();

    const filter: any = {};

    if (className) {
      filter.className = className;
    }

    if (courseName) {
      filter.courseName = courseName;
    }

    if (qnsType) {
      filter.qnsType = qnsType;
    }

    const pageNumber = Number(page);
    const pageSize = Number(limit);
    const skip = (pageNumber - 1) * pageSize;

    const totalCount = await ExamQuestion.countDocuments(filter);

    const questions = await ExamQuestion.find(filter)
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(questions)),
      pagination: {
        totalCount,
        currentPage: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    };
  } catch (error: any) {
    console.error("Error fetching questions:", error);
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

export const updateExamQuestion = async (
  questionId: string,
  updateData: any
) => {
  try {
    await connectToDataBase();

    const updatedQuestion = await ExamQuestion.findOneAndUpdate(
      { questionId },
      { $set: updateData },
      { new: true }
    ).lean();

    if (!updatedQuestion) {
      throw new Error("Exam question not found");
    }
    revalidatePath("/admin/exam/add-questions");
    return {
      success: true,
      data: JSON.parse(JSON.stringify(updatedQuestion)),
    };
  } catch (error: any) {
    console.error("Error during update:", error);
    return { success: false, error: error.message || "Unknown error" };
  }
};

export const deleteExamQuestion = async (questionId: string) => {
  try {
    await connectToDataBase();

    const deletedQuestion = await ExamQuestion.findOneAndDelete({
      questionId,
    });

    if (!deletedQuestion) {
      throw new Error("Exam question not found");
    }
    revalidatePath("/admin/exam/add-questions");
    return {
      success: true,
      message: "Exam question deleted successfully",
    };
  } catch (error: any) {
    return { success: false, error: error.message || "Unknown error" };
  }
};

export async function createExamQuestionsFromCSV(formData: any) {
  try {
    await connectToDataBase();

    const csvFile = formData.get("file");
    const classValue = formData.get("class");
    const courseName = formData.get("courseName");
    const subject = formData.get("subject");
    const qnsType = formData.get("qnsType");

    if (!csvFile) {
      throw new Error("CSV file is missing");
    }

    const tempFilePath = await parseCSV(csvFile);

    const questionsData = await readCSVFile(tempFilePath);

    if (!fs.existsSync(tempFilePath)) {
      console.error("CSV file does not exist.");
      return { success: false, error: "CSV file does not exist" };
    }

    const questionsToSave = [];

    const latestRecord = await ExamQuestion.findOne({}, { questionId: 1 })
      .sort({ questionId: -1 })
      .lean();

    let lastNumber = latestRecord
      ? parseInt(
          (latestRecord.questionId as string).replace("QUESTION-", ""),
          10
        )
      : 0;

    for (let question of questionsData) {
      const questionId = await generateCustomId(
        ExamQuestion,
        "questionId",
        "QUESTION-",
        ++lastNumber
      );
      if (!questionId) {
        throw new Error("Failed to generate question ID");
      }

      const newQuestionData = {
        questionId,
        questionName: question.questionName,
        ansOption: {
          optionA: question.ansOptionA,
          optionB: question.ansOptionB,
          optionC: question.ansOptionC,
          optionD: question.ansOptionD,
        },
        correctAns: question.correctAns,
        class: classValue || "Default Class",
        courseName: courseName || "Default Course",
        subject: subject || "Default Subject",
        qnsType: qnsType || "Easy",
      };

      questionsToSave.push(newQuestionData);
    }

    const savedQuestions = await ExamQuestion.insertMany(questionsToSave);
    revalidatePath("/admin/exam/add-questions");
    return {
      success: true,
      message: `${savedQuestions.length} questions added successfully`,
      data: JSON.parse(JSON.stringify(savedQuestions)),
    };
  } catch (error: any) {
    console.error("Error creating questions from CSV:", error);
    return { success: false, error: error.message || "Unknown error" };
  }
}

const readCSVFile = async (filePath: string) => {
  const results: any[] = [];

  if (!fs.existsSync(filePath)) {
    console.error("CSV file does not exist.");
    return [];
  }

  const fileStream = fs.createReadStream(filePath);

  await new Promise((resolve, reject) => {
    fileStream
      .pipe(parse({ headers: true, skipEmptyLines: true } as any))
      .on("data", (row) => {
        results.push({
          questionName: row["questionName"],
          ansOptionA: row["ansOptionA"],
          ansOptionB: row["ansOptionB"],
          ansOptionC: row["ansOptionC"],
          ansOptionD: row["ansOptionD"],
          correctAns: row["correctAns"],
        });
      })
      .on("end", resolve)
      .on("error", reject);
  });

  return results;
};
