const express = require('express');
const router = express.Router();
const Assistant = require('../models/Assistant');
const authMiddleware = require('../middlewares/auth');

// Get all assistants for a user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const assistants = await Assistant.find({ creator: req.userId });
    res.json(assistants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new assistant
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { name, image, description } = req.body;

    const assistant = new Assistant({
      name,
      image,
      description,
      creator: req.userId
    });

    await assistant.save();
    res.status(201).json({ success: true, assistant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get assistant by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const assistant = await Assistant.findById(req.params.id);
    
    if (!assistant) {
      return res.status(404).json({ error: 'Assistant not found' });
    }

    res.json(assistant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
