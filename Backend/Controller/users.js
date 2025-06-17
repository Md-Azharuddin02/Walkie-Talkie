// server/Controller/users.js
const UserModel = require("../Model/Users");

// ─── GET ALL USERS ───────────────────────────────────────────────────────────────
// GET /api/user
async function getUser(req, res) {
  const { _id: userId } = req.user;

  try {
    const user = await UserModel
      .findById(userId)
      .select('name email phoneNumber profileImage status') // only what you need
      .lean()       // returns a plain JS object, faster than a Mongoose doc
      .exec();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error('Error in getUser:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


// ─── ADD A USER (no file here) ────────────────────────────────────────────────────
async function addUser(req, res) {
  const user = req.body;
  try {
    const newUser = new UserModel(user);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to add user" });
  }
}

// ─── GET USER PROFILE (example, requiring `req.user.id` via some auth) ───────────
const getUserProfile = async (req, res) => {
  try {
    // Imagine you set req.user.id in some authentication middleware
    const user = await UserModel.findById(req.user.id).select(
      "-otpSecret -generatedAt"
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.json({
      success: true,
      user: {
        name: user.name,
        status: user.status,
        profileImage: user.profileImage,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

// ─── UPDATE PROFILE (name, about, + image upload) ────────────────────────────────
const updateProfile = async (req, res) => {
  // Because we used upload.single("image") above, Multer has populated:
  //   • req.file → file info (with .path, .originalname, .mimetype, etc.)
  //   • req.body → text fields ("name", "about")
  const { name, about } = req.body;
  const profileImagePath = req.file?.path; // e.g. "server/uploads/1629032893456.png"


  // TODO: save these into your MongoDB user document. For now, return them:
  return res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: { name, about, imagePath: profileImagePath },
  });
};

module.exports = {
  getUser,
  addUser,
  getUserProfile,
  updateProfile,
};
