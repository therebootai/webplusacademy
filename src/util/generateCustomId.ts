import { Model, Document } from "mongoose";

export async function generateCustomId<T extends Document>(
  Model: Model<T>,
  idField: string,
  prefix: string
): Promise<string> {
  try {
    const records = await Model.find({}, { [idField]: 1, _id: 0 }).sort({
      [idField]: 1,
    });

    const ids = records
      .map((record) => {
        if (idField in record) {
          return parseInt(
            (record[idField as keyof T] as string).replace(prefix, ""),
            10
          );
        }
        return null;
      })
      .filter((id) => id !== null);

    let newId = 1;
    for (let i = 0; i < ids.length; i++) {
      if (newId < ids[i]) {
        break;
      }
      newId++;
    }

    return `${prefix}${String(newId).padStart(4, "0")}`;
  } catch (error) {
    console.error("Error generating custom ID:", error);
    throw new Error("Unable to generate custom ID");
  }
}
