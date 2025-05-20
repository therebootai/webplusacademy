import { generateCustomId } from "@/util/generateCustomId";
import mongoose, { Schema, Document, Model } from "mongoose";

export interface BatchesDocument extends Document {
  batch_id: string;
  batch_name: string;
  status: boolean;
  year: string;
  course: "ix" | "x" | "xi" | "xii" | "jee" | "neet";
  start_date?: Date;
  end_date?: Date;
}

const batchSchema = new Schema<BatchesDocument>(
  {
    batch_id: {
      type: String,
      unique: true,
    },
    batch_name: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    year: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
      enum: ["ix", "x", "xi", "xii", "jee", "neet"],
    },
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
    },
  },
  { timestamps: true }
);

batchSchema.pre("save", async function (next) {
  if (!this.batch_id) {
    try {
      this.batch_id = await generateCustomId(
        mongoose.model<BatchesDocument>("Batches"),
        "batch_id",
        "BATCH-"
      );
    } catch (error) {
      console.log(error);
    }
  }
  next();
});

const Batches: Model<BatchesDocument> =
  mongoose.models.Batches || mongoose.model("Batches", batchSchema);

export default Batches;
