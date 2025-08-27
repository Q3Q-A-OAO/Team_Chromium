<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# MoneyQuest - Educational Financial Literacy Game

This is an educational web application that helps students learn about finance through interactive gameplay and an AI-powered mentor system.

## 🏗️ Architecture

- **Frontend**: React + TypeScript + Vite (Port 5173)
- **Backend**: Node.js + Express.js (Port 3001)
- **AI Agent**: Python + Google Gemini API
- **Database**: Mock data (MVP version)

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- Python 3.8+ (for AI agent)
- Google Gemini API key

### 1. Frontend Setup
```bash
# Install frontend dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local and add your GEMINI_API_KEY
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Create Python virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # On macOS/Linux
# or
venv\Scripts\activate     # On Windows

# Install Python dependencies
pip install -r python/requirements.txt

# Set up Python environment variables
cp python/env.example python/.env
# Edit python/.env and add your GOOGLE_API_KEY
```

### 3. Running the Application

**IMPORTANT: You need TWO terminal windows/tabs to run both services simultaneously.**

#### Terminal 1 - Backend Server
```bash
cd Team_Chromium/backend
source venv/bin/activate  # Activate Python environment
npm run dev               # Start backend on port 3001
```

#### Terminal 2 - Frontend Development Server
```bash
cd Team_Chromium
npm run dev               # Start frontend on port 5173
```

### 4. Access the Application
- **Frontend**: http://localhost:5173/
- **Backend API**: http://localhost:3001/
- **AI Mentor**: Navigate to AI Mentor tab in the frontend

## 🔧 Environment Variables

### Frontend (.env.local)
```
GEMINI_API_KEY=your_gemini_api_key_here
```

### Backend Python (.env)
```
GOOGLE_API_KEY=your_google_api_key_here
GEMINI_MODEL_NAME=gemini-1.5-pro
```

## 📁 Project Structure

```
Team_Chromium/
├── app/                    # React frontend components
├── backend/               # Node.js backend server
│   ├── venv/             # Python virtual environment
│   ├── python/           # AI agent scripts
│   │   ├── mentor_agent.py
│   │   ├── system_prompt.txt
│   │   └── requirements.txt
│   ├── services/         # Backend services
│   └── server.js         # Main server file
├── services/              # Frontend services
└── README.md
```

## 🧠 AI Mentor Features

- **Dynamic Responses**: Powered by Google Gemini API
- **Conversation Memory**: Remembers chat history
- **Context Awareness**: Understands student progress and game episodes
- **Markdown Support**: Rich text formatting in responses
- **Personalized Guidance**: Tailored financial literacy advice

## 🐛 Troubleshooting

### Common Issues

1. **"ModuleNotFoundError: No module named 'google'"**
   - Ensure you're in the correct virtual environment
   - Run `pip install -r python/requirements.txt` again

2. **Backend won't start**
   - Check if port 3001 is already in use
   - Ensure you're in the backend directory
   - Verify virtual environment is activated

3. **Frontend can't connect to backend**
   - Ensure both services are running
   - Check that backend is on port 3001
   - Verify CORS settings

4. **AI Mentor not responding**
   - Check Google API key in python/.env
   - Verify Python virtual environment is active
   - Check backend logs for Python errors

### Reset Everything
```bash
# Stop all services
pkill -f "nodemon\|node server.js\|vite"

# Remove and recreate virtual environment
cd backend
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r python/requirements.txt
```

## 📚 API Endpoints

- `GET /api/health` - Health check
- `POST /api/mentor/ask` - Ask AI mentor a question
- `GET /api/mentor/context/:studentId` - Get student context
- `GET /api/student/profile/:studentId` - Get student profile
- `GET /api/student/achievements/:studentId` - Get student achievements


