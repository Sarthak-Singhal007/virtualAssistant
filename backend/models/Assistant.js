const mongoose = require('mongoose');

const assistantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide an assistant name']
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/150'
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    description: {
      type: String,
      default: 'My custom AI assistant'
    },
    conversationHistory: [{
      role: {
        type: String,
        enum: ['user', 'assistant'],
        required: true
      },
      content: {
        type: String,
        required: true
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }],
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Assistant', assistantSchema);
