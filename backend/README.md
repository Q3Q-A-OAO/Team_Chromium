# Team Chromium Backend API

A Node.js/Express backend API for the Team Chromium financial literacy game, featuring an intelligent AI mentor powered by a simplified LangChain agent.

## 🚀 Features

- **AI Mentor Service**: Intelligent financial literacy guidance based on student context
- **Student Progress Tracking**: Monitor learning progress and achievements
- **Teacher Dashboard**: Analytics and student management tools
- **RESTful API**: Clean, documented endpoints for frontend integration
- **Python Integration**: Seamless communication with Python-based AI agent

## 🏗️ Architecture

```
Frontend (React) ←→ Backend (Node.js/Express) ←→ Python LangChain Agent
```

## 📁 Project Structure

```
backend/
├── server.js              # Main Express server
├── routes/                # API route handlers
│   ├── mentor.js         # AI mentor endpoints
│   ├── student.js        # Student data endpoints
│   └── teacher.js        # Teacher dashboard endpoints
├── services/              # Business logic
│   └── mentorService.js  # Mentor service with Python integration
├── python/                # Python AI agent
│   ├── mentor_agent.py   # LangChain-based mentor agent
│   └── requirements.txt   # Python dependencies
├── package.json           # Node.js dependencies
└── README.md             # This file
```

## 🛠️ Setup Instructions

### Prerequisites

- **Node.js** (v18 or higher)
- **Python 3.8+** with pip
- **npm** or **yarn**

### 1. Install Dependencies

```bash
# Install Node.js dependencies
npm install

# Install Python dependencies
cd python
pip install -r requirements.txt
cd ..
```

### 2. Environment Configuration

```bash
# Copy environment template
cp env.example .env

# Edit .env with your configuration
nano .env
```

**Required Environment Variables:**
- `PORT`: Backend server port (default: 3001)
- `FRONTEND_URL`: Frontend URL for CORS (default: http://localhost:5173)
- `PYTHON_PATH`: Python executable path (default: python3)

### 3. Start the Backend

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3001`

## 🔌 API Endpoints

### Health Check
- `GET /health` - Server status

### AI Mentor Service
- `GET /api/mentor/context/:studentId` - Get student context
- `POST /api/mentor/ask` - Ask the AI mentor a question
- `GET /api/mentor/conversations/:studentId` - Get conversation history
- `GET /api/mentor/insights/:studentId` - Get learning insights

### Student Data
- `GET /api/student/profile/:studentId` - Get student profile
- `GET /api/student/achievements/:studentId` - Get achievements
- `GET /api/student/journal/:studentId` - Get journal entries
- `POST /api/student/progress/:studentId` - Update progress

### Teacher Dashboard
- `GET /api/teacher/students` - List all students
- `GET /api/teacher/students/:studentId` - Get detailed student info
- `GET /api/teacher/dashboard` - Get dashboard analytics
- `GET /api/teacher/assignments` - Get assignments

## 🤖 AI Mentor Agent

The AI mentor uses a simplified LangChain approach for MVP:

### Features
- **Context-Aware Responses**: Knows student background, progress, and learning style
- **Personalized Guidance**: Adapts responses based on student strengths/weaknesses
- **Dynamic Content**: Generates plans, quizzes, tips, and explanations
- **Conversation Memory**: Maintains context across interactions

### Response Types
- **Plans**: Step-by-step strategies for achieving goals
- **Quizzes**: Interactive questions to test knowledge
- **Tips**: Practical advice and best practices
- **Progress**: Achievement tracking and recommendations
- **Explanations**: Clear concept explanations

### Example Usage

```javascript
// Ask the mentor a question
const response = await fetch('/api/mentor/ask', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    question: "How do I save money?",
    studentId: "1",
    episodeContext: "Saving for a Spaceship",
    tone: "Friendly"
  })
});

const mentorResponse = await response.json();
console.log(mentorResponse.answer);
```

## 🔄 Frontend Integration

### Update Frontend Mentor Service

Replace the mock `mentorService.ts` with real API calls:

```typescript
// services/mentorService.ts
export const askMentor = async (question: string, episodeContext: string, tone: string) => {
  const response = await fetch('/api/mentor/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      question,
      studentId: '1', // Get from user context
      episodeContext,
      tone
    })
  });
  
  return response.json();
};
```

### CORS Configuration

The backend is configured to accept requests from your React frontend. Update the `FRONTEND_URL` in `.env` if needed.

## 🚧 MVP Limitations

**Current Implementation:**
- ✅ Mock student data (hardcoded profiles)
- ✅ Simplified AI responses (no external AI services)
- ✅ Basic conversation context
- ✅ Response type detection

**Future Enhancements:**
- 🔄 Real database integration
- 🔄 Full LangChain with external AI providers
- 🔄 Advanced conversation memory
- 🔄 Dynamic content generation
- 🔄 Real-time progress tracking

## 🧪 Testing

### Test the Backend

```bash
# Test health endpoint
curl http://localhost:3001/health

# Test mentor endpoint
curl -X POST http://localhost:3001/api/mentor/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"How do I save money?","studentId":"1","episodeContext":"Saving for a Spaceship","tone":"Friendly"}'
```

### Test Python Agent

```bash
cd python
python mentor_agent.py '{"student":{"name":"Alex","age":12},"question":"How do I save money?","episode":{"title":"Saving for a Spaceship"}}'
```

## 🚀 Production Deployment

### Environment Variables
- Set `NODE_ENV=production`
- Configure proper `FRONTEND_URL`
- Add security headers and rate limiting
- Set up proper logging

### Python Agent
- Ensure Python environment is properly configured
- Consider containerization with Docker
- Add proper error handling and monitoring

## 🤝 Contributing

1. Follow the existing code structure
2. Add proper error handling
3. Include JSDoc comments for new functions
4. Test API endpoints before committing
5. Update this README for new features

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [LangChain Documentation](https://python.langchain.com/)
- [Python Shell Documentation](https://github.com/extrabacon/python-shell)
- [Team Chromium Frontend](../README.md)

## 🆘 Troubleshooting

### Common Issues

**Python Agent Not Working:**
- Check Python path in `.env`
- Ensure Python dependencies are installed
- Verify `mentor_agent.py` has execute permissions

**CORS Errors:**
- Verify `FRONTEND_URL` in `.env`
- Check that frontend is running on the correct port

**Port Already in Use:**
- Change `PORT` in `.env`
- Kill existing processes: `lsof -ti:3001 | xargs kill -9`

---

**Team Chromium Backend** - Making financial literacy education intelligent and engaging! 🎮📚💰
