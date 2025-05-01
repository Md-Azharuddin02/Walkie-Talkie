const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    phoneNumber: {type: String, required: true},
    name: {type: String, required: true},
    status: {type: String, required: true},
    lastActive: {type: Date, default: Date.now},
    friends: {type: Array, default: [
        {
            phoneNumber: String,
            name: String,
        }
    ]},
    createdAt: {type: Date, default: Date.now},
    otpSecret: { type: String }, // Stores the OTP secret
    generatedAt: { type: Date, default: Date.now, expires: '5m' },
    profileImage: { type: String }, // URL/path to the profile image
});

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;
