const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// @route   POST /api/ai/ask
// @desc    Ask a question to the AI chatbot
// @access  Public
router.post('/ask', aiController.askQuestion);

module.exports = router;
