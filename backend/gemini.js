const axios = require('axios');

const callGeminiAPI = async (command, assistantName) => {
  try {
    const response = await axios.post(
      process.env.GEMINI_API_URL,
      {
        contents: [{
          parts: [{
            text: `You are ${assistantName}, a helpful AI assistant. Respond to this command: ${command}`
          }]
        }]
      }
    );

    return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
};

module.exports = { callGeminiAPI };
