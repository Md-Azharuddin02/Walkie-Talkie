const express = require('express');
const router = express.Router();
const {getMessages, sendMessage} = require('../Controller/messages');
const {getUsers, addUser,} = require('../Controller/users');
const {handleGetOtp, handleVerifyOtp} = require('../Auth/OTP_Validation')


// GET all users

router.get('/messages', getMessages);
router.post('/messages', sendMessage);

router.get('/users', getUsers);
router.post('/users', addUser);

router.post('/auth/send-otp', handleGetOtp)
router.post('/verify-otp', handleVerifyOtp)




module.exports = router;

