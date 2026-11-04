import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileName: { type: String, required: true },
    filePath: { type: String, required: true },
    extractedText: { type: String, default: "" },
    extractedSkills: [{ type: String }],
    targetRole: { type: String, default: "" },
    analysis: {
      matchScore: { type: Number, default: 0 },
      matchedSkills: [{ type: String }],
      missingSkills: [{ type: String }],
      feedback: [{ type: String }],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);
