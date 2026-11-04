import mongoose from "mongoose";

const skillComparisonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  current: { type: Number, default: 0 },
  required: { type: Number, default: 3 },
  gap: { type: Number, default: 0 },
  weight: { type: Number, default: 1 },
  status: {
    type: String,
    enum: ["Completed", "Needs Improvement", "High Priority"],
    default: "Needs Improvement",
  },
});

const skillGapSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    targetRole: { type: String, required: true },
    readinessScore: { type: Number, required: true },
    skills: [skillComparisonSchema],
  },
  { timestamps: true }
);

export default mongoose.model("SkillGap", skillGapSchema);
