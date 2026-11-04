import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true }, // Index 0-3
  explanation: { type: String, default: "" },
});

const assessmentSchema = new mongoose.Schema(
  {
    skill: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    durationMinutes: { type: Number, default: 15 },
    questions: [questionSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Assessment", assessmentSchema);
