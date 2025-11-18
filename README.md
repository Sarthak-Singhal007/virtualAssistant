# 🎙️ Voice-Enabled Virtual Assistant (MERN + Gemini)

## 💻 GitHub Repository  
**Code:** [https://github.com/CodePandaAkhilesh/virtualAssistant](https://github.com/CodePandaAkhilesh/virtualAssistant)  
**Live Demo:** https://virtualassistant-03vg.onrender.com

---

## 🚀 Project Overview

This is a voice-enabled virtual assistant application built with the MERN stack (MongoDB, Express.js, React, Node.js) and integrated with Google Gemini AI. Users can create personalized AI assistants with custom names and images, and interact with them using voice commands.

### Key Features
✅ **Custom Persona** – Create assistants with custom names and images  
✅ **Voice Interaction** – Speak naturally to your assistant  
✅ **Multi-Functionality** – Search, app opening, jokes, singing, and more  
✅ **Smart Responses** – AI-powered responses in structured JSON format  
✅ **Persistent History** – Remembers your previous interactions  

---

## 🛠️ Tech Stack  
| Layer        | Technology |
|--------------|------------|
| Frontend     | React.js (voice input + JSON handling) |
| Backend API  | Express.js (Node.js) |
| Database     | MongoDB with Mongoose |
| Authentication | JWT (JSON Web Tokens) |
| AI/ML        | Google Gemini (gemini-2.5-flash) |
| Image Storage | Cloudinary |
| HTTP Client  | Axios |
| Styling      | Tailwind CSS |
| Deployment   | Vercel (Frontend), Render (Backend) |

---

## ⚙️ Installation & Setup  

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Google Gemini API key
- Cloudinary account (for image uploads)

### Automated Setup (Recommended)
```bash
# Run the setup script from the root directory
node setup.js
```

This will:
- Create .env files for both frontend and backend
- Provide instructions for next steps

### Manual Setup

#### Backend Setup
```bash
# 1️⃣ Navigate to backend directory
cd backend

# 2️⃣ Install dependencies
npm install

# 3️⃣ Create .env file with your configuration
# Copy .env.example to .env and fill in your values
cp .env.example .env  # or copy the file manually on Windows

# 4️⃣ Update .env with your credentials:
# - MONGODB_URL: Your MongoDB connection string
# - JWT_SECRET: A secure secret key for JWT tokens
# - CLOUDINARY_*: Your Cloudinary credentials
# - GEMINI_API_URL: Your Gemini API key

# 5️⃣ Start the backend server
npm run dev
```

#### Frontend Setup
```bash
# 1️⃣ Navigate to frontend directory (in a new terminal)
cd frontend

# 2️⃣ Install dependencies
npm install

# 3️⃣ Create .env file with your backend URL
# Create a .env file with:
# VITE_SERVER_URL=http://localhost:5000

# 4️⃣ Start the frontend development server
npm run dev
```

### Environment Variables

#### Backend (.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URL=mongodb://localhost:27017/virtualassistant

# JWT Configuration
JWT_SECRET=your_super_secret_key_here_change_it

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Gemini API Configuration
GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=your_gemini_api_key

# Frontend URL for CORS
FRONTEND_URL=http://localhost:5173
```

#### Frontend (.env)
```env
VITE_SERVER_URL=http://localhost:5000
```

---

## 📂 Project Structure
```
.
root
│── backend/ # Express + MongoDB + Gemini API
│ ├── config/ # Database, Cloudinary, token setup
│ ├── controllers/ # Route handlers (auth, user)
│ ├── middlewares/ # Auth & multer middlewares
│ ├── models/ # Mongoose models
│ ├── routes/ # Express routes
│ ├── public/ # Static files
│ ├── gemini.js # Gemini AI integration
│ ├── index.js # Server entry point
│ └── .env # Environment variables
│
│── frontend/ # React + Vite frontend
│ ├── src/
│ │ ├── assets/ # Images, icons
│ │ ├── components/ # Reusable UI components
│ │ ├── context/ # React Context (global state)
│ │ ├── pages/ # Page components (Home, Auth, Customize, etc.)
│ │ ├── App.jsx # Root React component
│ │ ├── main.jsx # Entry point
│ │ └── index.css # Global styles
│ ├── public/ # Static assets
│ └── vite.config.js # Vite config
│
└── README.md
```

---

## 🎯 How to Use

1. **Sign Up / Sign In** - Create an account or log in
2. **Customize Your Assistant** - Choose an image and name for your assistant
3. **Start Talking** - Click "Start Listening" and speak to your assistant
4. **Try Commands** - Ask questions, request searches, or entertainment

### Example Voice Commands
- "Hey [Assistant Name], what's the time?"
- "Hey [Assistant Name], play Despacito on YouTube"
- "Hey [Assistant Name], tell me a joke"
- "Hey [Assistant Name], search for pizza recipes"

---

## 📡 API Usage

```
Request:
POST /api/user/asktoassistant
Content-Type: application/json

{
  "command": "play despacito on youtube",
  "assistantName": "Jarvis",
  "userName": "Akhilesh"
}

```

```
Response:
{
  "success": true,
  "data": {
    "type": "youtube-play",
    "userInput": "despacito",
    "response": "Sure, playing Despacito now."
  }
}
```

---

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Make sure FRONTEND_URL in backend .env matches your frontend URL
   - Check browser console for specific error messages

2. **Authentication Issues**
   - Verify JWT_SECRET is set correctly in backend .env
   - Check that cookies are being sent with requests

3. **Voice Recognition Not Working**
   - Ensure you're using a supported browser (Chrome, Edge, Safari)
   - Check that your microphone permissions are granted
   - Try speaking more clearly or adjusting microphone settings

4. **Image Upload Issues**
   - Verify Cloudinary credentials in backend .env
   - Check internet connection and Cloudinary account status

---

## 🏆 Unique Features

```
Personalized → Custom name & creator attribution

Actionable Output → JSON allows frontend/mobile automation

Entertainment + Utility → Mix of fun (jokes, songs) and practical tasks

Lightweight & Deployable → Runs on MERN + Gemini (serverless friendly)
```

---

## 🔮 Future Enhancements

```
🎤 Continuous Speech Recognition (real-time conversation)

🌦️ Live Weather API integration

🎶 Spotify/YouTube API for direct song playback

🧠 Memory & Personalization (remembers user queries)

📱 Cross-platform App (React Native)
```

---

## 📈 Potential Use-Cases

```
🏠 Smart Home Assistant (lights, music, reminders)

📱 App Launcher (open WhatsApp, Instagram, Calculator)

🌍 Info Assistant (facts, current events, weather)

🎵 Entertainment (play songs, jokes, sing)

🤝 Custom AI Agent for businesses with branded persona
```

---

## 📞 Contact

Akhilesh Verma – 📧 av14021999@gmail.com