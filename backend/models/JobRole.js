import mongoose from "mongoose";

const jobSkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  requiredLevel: { type: Number, default: 3, min: 1, max: 5 },
  weight: { type: Number, default: 1 },
});

const jobRoleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    category: { type: String, default: "Engineering" },
    averageSalary: { type: String, default: "" },
    skills: [jobSkillSchema],
  },
  { timestamps: true }
);

export default mongoose.model("JobRole", jobRoleSchema);
