const axios = require('axios');

const callGeminiAPI = async (command, assistantName) => {
  try {
    const prompt = `You are ${assistantName}, a helpful AI assistant. Respond to this command: "${command}". 
You must respond strictly in JSON format with the following fields:
{
  "type": "youtube-play" | "app-open" | "search" | "joke" | "text",
  "userInput": "extracted search query or command subject",
  "response": "your conversational response"
}
Do not include markdown formatting like \`\`\`json.`;

    const response = await axios.post(
      process.env.GEMINI_API_URL,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      }
    );

    let responseText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    try {
      responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(responseText);
      return {
        type: parsed.type || 'text',
        userInput: parsed.userInput || command,
        response: parsed.response || responseText
      };
    } catch (e) {
      return {
        type: 'text',
        userInput: command,
        response: responseText || 'No response'
      };
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
};

module.exports = { callGeminiAPI };
