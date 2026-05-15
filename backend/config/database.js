const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URL || 'mongodb://localhost:27017/virtualassistant',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    console.log('✅ MongoDB connected');
    return conn;
  } catch (error) {
    console.error('❌ Database connection error:', error);
    throw error;
  }
};

module.exports = connectDB;
