import fs from "fs/promises";
import path from "path";
import os from "os";
import { v4 as uuidv4 } from "uuid";

export async function parseCSV(csv_file: any) {
  const arrayBuffer = await csv_file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const tempDir = os.tmpdir();
  const uniqueFileName = uuidv4();

  const ext = csv_file.originalname
    ? path.extname(csv_file.originalname)
    : ".csv";

  const tempFilePath = path.join(tempDir, `${uniqueFileName}${ext}`);

  try {
    await fs.writeFile(tempFilePath, buffer);
    return tempFilePath;
  } catch (err) {
    console.error("Error writing the file to temp path:", err);
    throw new Error("Failed to write file");
  }
}
