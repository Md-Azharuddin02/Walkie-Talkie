const express = require('express');
const router = express.Router();

// GET all users
router.get('/', (req, res) => {
  res.json({ message: 'List of users' });
});


router.post('/', (req, res) => {
  res.status(201).json({ message: 'User created', data: req.body });
});

module.exports = router;