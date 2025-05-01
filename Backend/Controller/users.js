const UserModel = require('../Model/Users');

async function getUsers(req, res){
   try{
    const users = await UserModel.find({});
    res.status(200).json(users);
   }
   catch(error){
    res.status(500).json({error: 'Failed to get users'});
   }
}

async function addUser(req, res){
    const user = req.body;
    try{
        const newUser = new UserModel(user);
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch(error){
        res.status(500).json({error: 'Failed to add user'});
    }
}

// Get user profile
const getUserProfile = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).select('-otpSecret -generatedAt');
        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }

        res.json({
            success: true,
            user: {
                name: user.name,
                status: user.status,
                profileImage: user.profileImage,
                phoneNumber: user.phoneNumber
            }
        });
    } catch (error) {
        console.error('Error in getUserProfile:', error);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
};

// Update user profile
const updateProfile = async (req, res) => {
    try {
        const { name, status } = req.body;
        const profileImage = req.file?.path; // If using multer for file upload

        const updateData = {
            ...(name && { name }),
            ...(status && { status }),
            ...(profileImage && { profileImage })
        };

        const user = await UserModel.findByIdAndUpdate(
            req.user.id,
            updateData,
            { new: true }
        ).select('-otpSecret -generatedAt');

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }

        res.json({
            success: true,
            user: {
                name: user.name,
                status: user.status,
                profileImage: user.profileImage,
                phoneNumber: user.phoneNumber
            }
        });
    } catch (error) {
        console.error('Error in updateProfile:', error);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
};

module.exports = {getUsers, addUser, getUserProfile, updateProfile};
