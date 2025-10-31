// server/Controller/users.js
const { request } = require("express");
const UserModel = require("../Model/Users");

// ─── GET ALL USERS ───────────────────────────────────────────────────────────────
async function getUser(req, res) {
  const { _id: userId } = req.user;

  try {
    const user = await UserModel.findById(userId)
      .select("phoneNumber name profileImage aboutStatus socketId friendList")
      .populate("friendList", "phoneNumber name profileImage") // Populate friend details
      .lean()
      .exec();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error("Error in getUser:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// ─── ADD A NEW FRIEND  ────────────────────────────────────────────────────
async function searchNewFriend(req, res) {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ isAddable: false, error: "Phone number is required" });
  }

  try {
    // fetch fresh user from DB
    const user = await UserModel.findById(req.user._id);

    const friendToAdd = await UserModel.findOne({ phoneNumber });
    if (!friendToAdd) {
      return res.status(404).json({
        isAddable: false,
        error: "User with this phone number not found",
      });
    }

    if (friendToAdd._id.equals(user._id)) {
      return res.status(400).json({
        isAddable: false,
        error: "You cannot add yourself as a friend",
      });
    }

    const alreadyFriend = user.friendList.some(
      (friend) => friend.userId.toString() === friendToAdd._id.toString()
    );

    if (alreadyFriend) {
      return res.status(409).json({
        isFriend: true,
        msg: "This user is already your friend",
        friendId: friendToAdd.id,
        userName: friendToAdd.name,
        friendProfileImage: friendToAdd.profileImage,
      });
    }

    return res.status(200).json({
      isFriend: false,
      msg: "Add him as a friend.",
      userId: friendToAdd.id,
      userName: friendToAdd.name,
      userProfileImage: friendToAdd.profileImage,
    });
  } catch (error) {
    console.error("❌ Error in searchNewFriend:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}


async function addNewFriend(req, res) {
  try {
   const { phoneNumber } = req.body;
    const senderId = req.user._id;

    if (!phoneNumber) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    const [user, friendDetails] = await Promise.all([
      UserModel.findById(senderId),
      UserModel.findOne({phoneNumber} ),
    ]);

    console.log("Adding friend:", friendDetails);
    console.log("For user:", user);

    if (!user) return res.status(404).json({ message: "User not found" });
    if (!friendDetails) return res.status(404).json({ message: "Friend not found" });

    user.friendList.push({ userId: friendDetails._id });
    await user.save();

    return res.status(200).json({
      message: "Friend added successfully",
      friend: {
        id: friendDetails._id,
        name: friendDetails.name,
        phoneNumber: friendDetails.phoneNumber,
      },
    });
  } catch (error) {
    console.error("Error in addNewFriend:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}


// ─── GET ALL FRIENDS OF A USER ───────────────────────────────────────────────────
async function getAllFriendList(req, res) {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const user = await UserModel.findById(userId).populate("friendList.userId");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const friendsProfiles = user.friendList.map((friend) => friend.userId);

    return res.status(200).json({ friendList: friendsProfiles });
  } catch (error) {
    console.error("Error in getAllFriendList:", error);
    return res.status(500).json({ error: "Internal server error" });
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
const { uploadOnCloudinary } = require("../Service/cloudinary");
const updateProfile = async (req, res) => {
  const { _id: userId } = req.user;
  const { name, about } = req.body;
  const profileImagePath = req.file?.path;

  // Validate inputs
  if (!name && !about && !profileImagePath) {
    return res.status(400).json({
      success: false,
      error: "Name and aboutStatus are required",
    });
  }

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    user.name = name;
    user.aboutStatus = about;
    if (profileImagePath) {
      const cloudinaryResponse = await uploadOnCloudinary(
        profileImagePath,
        user.name
      );
      user.profileImage = cloudinaryResponse.autoCropUrl;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        name: user.name,
        aboutStatus: user.aboutStatus,
        profileImage: user.profileImage,
      },
    });
  } catch (err) {
    console.error("Profile update error:", err);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

module.exports = {
  getUser,
  searchNewFriend,
  addNewFriend,
  getUserProfile,
  updateProfile,
  getAllFriendList,
};
