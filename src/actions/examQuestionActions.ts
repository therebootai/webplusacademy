import { connectToDataBase } from "@/db/connection";
import ExamQuestion from "@/models/ExamQuestion";
import { examQuestionTypes } from "@/types/ExamQuestionTypes";
import { generateCustomId } from "@/util/generateCustomId";

export async function createExamQuestions(questionData: examQuestionTypes) {
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
    return {
      success: true,
      question: savedQuestion,
    };
  } catch (error: any) {
    return { success: false, error: error.message || "Unknown error" };
  }
}

export async function getExamQuestions(
  page: number,
  filters: {
    class?: string;
    courseName?: string;
    qnsType?: string;
  }
) {
  try {
    await connectToDataBase();

    const filterCriteria: any = {};

    if (filters.class) {
      filterCriteria.class = filters.class;
    }

    if (filters.courseName) {
      filterCriteria.courseName = filters.courseName;
    }

    if (filters.qnsType) {
      filterCriteria.qnsType = filters.qnsType;
    }

    const limit = 40;
    const skip = (page - 1) * limit;

    const totalQuestions = await ExamQuestion.countDocuments(filterCriteria);
    const questions = await ExamQuestion.find(filterCriteria)
      .skip(skip)
      .limit(limit);

    return {
      success: true,
      data: questions,
      total: totalQuestions,
      totalPages: Math.ceil(totalQuestions / limit),
      currentPage: page,
    };
  } catch (error: any) {
    return { success: false, error: error.message || "Unknown error" };
  }
}

export const updateExamQuestion = async (
  questionId: string,
  updateData: Partial<examQuestionTypes>
) => {
  try {
    await connectToDataBase();

    const updatedQuestion = await ExamQuestion.findOneAndUpdate(
      { questionId },
      { $set: updateData },
      { new: true }
    );

    if (!updatedQuestion) {
      throw new Error("Exam question not found");
    }

    return {
      success: true,
      data: updatedQuestion,
    };
  } catch (error: any) {
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

    return {
      success: true,
      message: "Exam question deleted successfully",
    };
  } catch (error: any) {
    return { success: false, error: error.message || "Unknown error" };
  }
};
