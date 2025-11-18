#!/usr/bin/env node

// Setup script to help users configure the application
const fs = require('fs');
const path = require('path');

console.log('🔧 Virtual Assistant Setup Script');
console.log('==================================\n');

// Check if we're in the right directory
const backendDir = path.join(__dirname, 'backend');
const frontendDir = path.join(__dirname, 'frontend');

if (!fs.existsSync(backendDir) || !fs.existsSync(frontendDir)) {
  console.error('❌ Error: Please run this script from the root directory of the project.');
  console.error('The directory should contain both "backend" and "frontend" folders.');
  process.exit(1);
}

// Check if backend .env exists
const backendEnvPath = path.join(backendDir, '.env');
const backendEnvExamplePath = path.join(backendDir, '.env.example');

if (!fs.existsSync(backendEnvPath) && fs.existsSync(backendEnvExamplePath)) {
  console.log('📋 Creating backend .env file from .env.example...');
  fs.copyFileSync(backendEnvExamplePath, backendEnvPath);
  console.log('✅ Backend .env file created! Please update it with your credentials.\n');
} else if (!fs.existsSync(backendEnvPath)) {
  console.log('⚠️  No .env.example found in backend. Creating a basic .env file...');
  const basicEnv = `# Server Configuration
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
`;
  fs.writeFileSync(backendEnvPath, basicEnv);
  console.log('✅ Basic backend .env file created! Please update it with your credentials.\n');
}

// Check if frontend .env exists
const frontendEnvPath = path.join(frontendDir, '.env');

if (!fs.existsSync(frontendEnvPath)) {
  console.log('📋 Creating frontend .env file...');
  const frontendEnv = `VITE_SERVER_URL=http://localhost:5000\n`;
  fs.writeFileSync(frontendEnvPath, frontendEnv);
  console.log('✅ Frontend .env file created!\n');
}

console.log('✅ Setup completed successfully!');
console.log('\n📝 Next steps:');
console.log('1. Update backend/.env with your actual credentials');
console.log('2. Make sure MongoDB is running');
console.log('3. Run "npm install" in both backend and frontend directories');
console.log('4. Start the backend server: cd backend && npm run dev');
console.log('5. Start the frontend: cd frontend && npm run dev');
console.log('\n📖 Check the README.md file for detailed instructions.');