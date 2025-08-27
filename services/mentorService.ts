// This service connects to the Team Chromium Backend AI Mentor API.
// It communicates with the Python LangChain agent for intelligent responses.

interface MentorResponse {
  answer: string;
  emotion?: 'idle' | 'think' | 'celebrate' | 'encourage' | 'oops';
  card?: any;
  ui?: {
    emotion?: string;
    chips?: string[];
    intensity?: number;
  };
}

// Backend API configuration
const BACKEND_URL = 'http://localhost:3001';
const API_BASE = `${BACKEND_URL}/api/mentor`;

/**
 * Ask the AI mentor a question using the backend API
 */
export const askMentor = async (question: string, episodeContext: string, tone: string, conversationHistory: any[] = []): Promise<MentorResponse> => {
  console.log('🤖 Asking AI Mentor:', { question, episodeContext, tone, conversationHistory });
  
  try {
    // Call the backend API
    const response = await fetch(`${API_BASE}/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        studentId: '1', // For MVP, using hardcoded student ID
        episodeContext,
        tone,
        conversationHistory: conversationHistory
      }),
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ AI Mentor response:', data);
    
    return {
      answer: data.answer || 'I apologize, but I received an empty response.',
      emotion: data.emotion || 'idle',
      card: data.card || null,
      ui: data.ui || {
        emotion: 'idle',
        chips: ['Ask another question', 'Need help?', 'What else?']
      }
    };

  } catch (error) {
    console.error('❌ Error connecting to AI Mentor:', error);
    
    // Fallback to a helpful error message
    return {
      answer: `I'm having trouble connecting to my brain right now! 😅 

This usually means the backend server isn't running. Please make sure:
1. The backend server is started (npm run dev in backend folder)
2. It's running on port 3001
3. The Python agent is working

For now, try asking me about:
• Creating a savings plan
• Taking a quiz
• Getting financial tips
• Checking your progress`,
      emotion: 'encourage',
      card: null,
      ui: {
        emotion: 'encourage',
        chips: ['Try again', 'Check backend status', 'Need help?']
      }
    };
  }
};

/**
 * Get mentor context for a student
 */
export const getMentorContext = async (studentId: string) => {
  try {
    const response = await fetch(`${API_BASE}/context/${studentId}`);
    
    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting mentor context:', error);
    return null;
  }
};

/**
 * Get conversation history
 */
export const getConversationHistory = async (studentId: string, limit: number = 50) => {
  try {
    const response = await fetch(`${API_BASE}/conversations/${studentId}?limit=${limit}`);
    
    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting conversation history:', error);
    return { conversations: [] };
  }
};

/**
 * Get mentor insights and recommendations
 */
export const getMentorInsights = async (studentId: string) => {
  try {
    const response = await fetch(`${API_BASE}/insights/${studentId}`);
    
    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting mentor insights:', error);
    return null;
  }
};