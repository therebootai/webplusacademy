import mongoose from "mongoose";

let isConnected = false;

export const connectToDataBase = async () => {
  console.log("Attempting to connect to the database...");
  mongoose.set("strictQuery", true); // Ensures mongoose uses the new query parser

  if (isConnected) {
    console.log("DB connected already");
    return;
  }

  try {
    console.log("Connecting to the database...");
    await mongoose.connect(process.env.MONGO_URI as string);
    isConnected = true;
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Database connection failed");
  }
};
