import mongoose from "mongoose";

const skillItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: Number, default: 1, min: 1, max: 5 }, // 1 to 5 scale
});

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    college: { type: String, default: "" },
    degree: { type: String, default: "" },
    branch: { type: String, default: "" },
    graduationYear: { type: Number },
    targetRole: { type: String, default: "Full Stack Developer" },
    skills: [skillItemSchema],
    softSkills: [{ type: String }],
    projects: [
      {
        title: String,
        description: String,
        technologies: [String],
        link: String,
      },
    ],
    certifications: [
      {
        title: String,
        issuer: String,
        issueDate: String,
      },
    ],
    careerInterests: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
