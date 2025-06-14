"use server";
import { Model, Document } from "mongoose";

export async function generateCustomId<T extends Document>(
  Model: Model<T>,
  idField: string,
  prefix: string
): Promise<string> {
  try {
    if (!(Model && typeof Model.find === "function")) {
      throw new Error("Invalid Mongoose Model");
    }

    const records = await Model.find({}, { [idField]: 1, _id: 0 }).sort({
      [idField]: 1,
    });

    if (records.length === 0) {
      return `${prefix}0001`;
    }

    const ids = records
      .map((record) => {
        const castedRecord = record as Record<string, any>;

        if (castedRecord && idField in castedRecord && castedRecord[idField]) {
          const id = castedRecord[idField] as string;
          return parseInt(id.replace(prefix, ""), 10);
        }
        return null;
      })
      .filter((id) => id !== null);

    if (ids.length === 0) {
      return `${prefix}0001`;
    }
    let newId = 1;
    for (let i = 0; i < ids.length; i++) {
      if (newId < ids[i]) {
        break;
      }
      newId++;
    }

    return `${prefix}${String(newId).padStart(4, "0")}`;
  } catch (error: any) {
    console.error("Error generating custom ID:", error);
    throw new Error(`Unable to generate custom ID: ${error.message || error}`);
  }
}
