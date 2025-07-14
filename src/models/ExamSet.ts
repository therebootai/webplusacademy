import mongoose from "mongoose";

const ExamSetSchema = new mongoose.Schema({
  examSetName: {
    type: String,
    required: true,
  },
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batches",
    required: true,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExamQuestion",
      required: true,
    },
  ],
  questionPdf: {
    public_id: { type: String },
    secure_url: { type: String },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ExamSet =
  mongoose.models?.ExamSet || mongoose.model("ExamSet", ExamSetSchema);
export default ExamSet;
