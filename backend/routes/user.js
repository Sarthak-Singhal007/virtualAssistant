const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Assistant = require('../models/Assistant');
const authMiddleware = require('../middlewares/auth');
const axios = require('axios');
const { callGeminiAPI } = require('../gemini');

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('assistants');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ask assistant (main endpoint for voice commands)
router.post('/asktoassistant', authMiddleware, async (req, res) => {
  try {
    const { command, assistantName, assistantId } = req.body;

    if (!command || !assistantId) {
      return res.status(400).json({ error: 'Command and assistantId are required' });
    }

    const assistant = await Assistant.findById(assistantId);
    
    if (!assistant) {
      return res.status(404).json({ error: 'Assistant not found' });
    }

    if (assistant.creator.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Call Gemini API
    try {
      const geminiResult = await callGeminiAPI(command, assistantName);

      // Save to conversation history
      assistant.conversationHistory.push({
        role: 'user',
        content: command
      });

      assistant.conversationHistory.push({
        role: 'assistant',
        content: geminiResult.response
      });

      await assistant.save();

      res.json({
        success: true,
        data: {
          ...geminiResult,
          assistantName: assistantName
        }
      });
    } catch (geminiError) {
      console.error('Gemini API error:', geminiError);
      res.status(500).json({ error: 'Failed to get response from AI' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
