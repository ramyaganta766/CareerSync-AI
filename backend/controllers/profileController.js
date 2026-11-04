import Profile from "../models/Profile.js";
import User from "../models/User.js";

// @desc    Get current user profile
// @route   GET /api/profile/me
// @access  Private
export const getMyProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id }).populate("user", "name email role");

    if (!profile) {
      // Auto-create initial profile for the student if not yet created
      profile = await Profile.create({
        user: req.user._id,
        targetRole: "Full Stack Developer",
        skills: [
          { name: "JavaScript", level: 3 },
          { name: "React", level: 2 },
          { name: "Node.js", level: 2 },
        ],
      });
      profile = await profile.populate("user", "name email role");
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create or update profile
// @route   POST /api/profile or PUT /api/profile/me
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const {
      college,
      degree,
      branch,
      graduationYear,
      targetRole,
      skills,
      softSkills,
      projects,
      certifications,
      careerInterests,
    } = req.body;

    const profileFields = {
      user: req.user._id,
      college,
      degree,
      branch,
      graduationYear,
      targetRole,
      skills,
      softSkills,
      projects,
      certifications,
      careerInterests,
    };

    // Remove undefined values
    Object.keys(profileFields).forEach(
      (key) => profileFields[key] === undefined && delete profileFields[key]
    );

    let profile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $set: profileFields },
      { new: true, upsert: true }
    ).populate("user", "name email role");

    res.json({ message: "Profile updated successfully", profile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
