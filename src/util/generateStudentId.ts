import { Model, Document } from "mongoose";

export async function generateStudentId<T extends Document>(
  Model: Model<T>,
  idField: string,
  prefix = "WAVE"
): Promise<string> {
  try {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yy = String(today.getFullYear()).slice(-2);
    const dateStr = `${dd}${mm}${yy}`;

    const idPrefix = `${prefix}/${dateStr}/`;

    const filter: any = {
      [idField]: { $regex: `^${idPrefix}\\d{4}$` },
    };

    const recordWithMaxId = await Model.findOne(filter, {
      [idField]: 1,
      _id: 0,
    })
      .sort({ [idField]: -1 })
      .lean();

    let maxCounter = 0;

    if (recordWithMaxId) {
      const idStr = (recordWithMaxId as any)[idField] as string;

      const parts = idStr.split("/");
      maxCounter = parseInt(parts[2], 10) || 0;
    }

    const newCounter = maxCounter + 1;
    const counterStr = String(newCounter).padStart(4, "0");

    return `${prefix}/${dateStr}/${counterStr}`;
  } catch (error) {
    console.error("Error generating student ID:", error);
    throw new Error("Unable to generate student ID");
  }
}
