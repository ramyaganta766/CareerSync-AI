import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    targetRole: { type: String, required: true },
    skillName: { type: String, required: true },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },
    recommendedResource: {
      title: { type: String, required: true },
      type: { type: String, default: "Video" }, // Video, Documentation, Project, Course
      url: { type: String, default: "" },
      duration: { type: String, default: "1-2 weeks" },
    },
    startDate: { type: Date, default: Date.now },
    targetDate: { type: Date },
    completed: { type: Boolean, default: false },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Roadmap", roadmapSchema);
