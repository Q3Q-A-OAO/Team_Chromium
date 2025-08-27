import { PythonShell } from 'python-shell';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Mock student data for MVP
const studentProfiles = {
  '1': {
    name: 'Alex Johnson',
    age: 12,
    grade: '6th',
    learningStyle: 'visual',
    strengths: ['Budgeting', 'Goal Setting', 'Problem Solving'],
    weaknesses: ['Understanding Interest Rates', 'Long-term Planning'],
    completedEpisodes: [
      'Saving for a Spaceship',
      'Lemonade Stand Economics',
      'Budget Basics'
    ],
    currentEpisode: 'Compound Interest Adventure',
    badges: ['Budget Master', 'Weekly Warrior', 'First Steps'],
    streak: 7,
    lastActivity: '2024-01-20T15:30:00Z'
  },
  '2': {
    name: 'Sam Wilson',
    age: 11,
    grade: '5th',
    learningStyle: 'hands-on',
    strengths: ['Practical Application', 'Creative Thinking'],
    weaknesses: ['Abstract Concepts', 'Mathematical Calculations'],
    completedEpisodes: [
      'Budget Basics',
      'First Steps to Saving'
    ],
    currentEpisode: 'Saving for a Spaceship',
    badges: ['First Steps'],
    streak: 3,
    lastActivity: '2024-01-19T10:15:00Z'
  }
};

// Mock episode data for context
const episodeData = {
  'Saving for a Spaceship': {
    concepts: ['Budgeting', 'Goal Setting', 'Delayed Gratification', 'Savings Plans'],
    difficulty: 'intermediate',
    targetAge: '10-13',
    learningObjectives: [
      'Understand the difference between needs and wants',
      'Create a realistic savings plan',
      'Calculate how long it takes to reach a goal'
    ]
  },
  'Lemonade Stand Economics': {
    concepts: ['Cost Analysis', 'Pricing Strategy', 'Profit Margins', 'Variable Costs'],
    difficulty: 'intermediate',
    targetAge: '10-13',
    learningObjectives: [
      'Identify fixed vs variable costs',
      'Calculate profit margins',
      'Set competitive prices'
    ]
  },
  'Compound Interest Adventure': {
    concepts: ['Interest Rates', 'Compound Growth', 'Long-term Investing', 'Patience'],
    difficulty: 'advanced',
    targetAge: '11-14',
    learningObjectives: [
      'Understand how compound interest works',
      'See the power of long-term saving',
      'Calculate future value of investments'
    ]
  }
};

/**
 * Get mentor context for a specific student
 */
export const getMentorContext = async (studentId) => {
  const student = studentProfiles[studentId];
  if (!student) {
    throw new Error(`Student ${studentId} not found`);
  }

  const currentEpisode = episodeData[student.currentEpisode];
  
  return {
    student,
    currentEpisode,
    learningContext: {
      completedConcepts: student.completedEpisodes.flatMap(ep => episodeData[ep]?.concepts || []),
      currentConcepts: currentEpisode?.concepts || [],
      nextConcepts: ['Investment Basics', 'Risk Management', 'Diversification'],
      learningGaps: student.weaknesses.filter(w => 
        !student.completedEpisodes.flatMap(ep => episodeData[ep]?.concepts || []).includes(w)
      )
    }
  };
};

/**
 * Ask the AI mentor a question using the Python LangChain agent
 */
export const askMentor = async (question, studentId, episodeContext, tone, conversationHistory = []) => {
  try {
    const student = studentProfiles[studentId];
    if (!student) {
      throw new Error(`Student ${studentId} not found`);
    }

    const currentEpisode = episodeData[episodeContext] || episodeData[student.currentEpisode];
    
    // Prepare the context for the LangChain agent
    const agentContext = {
      student: {
        name: student.name,
        age: student.age,
        grade: student.grade,
        learningStyle: student.learningStyle,
        strengths: student.strengths,
        weaknesses: student.weaknesses,
        completedEpisodes: student.completedEpisodes,
        currentEpisode: student.currentEpisode,
        badges: student.badges,
        streak: student.streak
      },
      episode: currentEpisode,
      question,
      tone,
      conversationHistory: conversationHistory.slice(-5), // Last 5 messages for context
      timestamp: new Date().toISOString()
    };

    console.log('🤖 Sending to LangChain agent:', {
      student: student.name,
      question: question.substring(0, 100) + '...',
      episode: episodeContext,
      tone
    });

    // Call the Python LangChain agent
    const response = await callLangChainAgent(agentContext);
    
    return response;
  } catch (error) {
    console.error('Error in askMentor:', error);
    
    // Fallback response if LangChain fails
    return {
      answer: `I'm having trouble connecting right now, but I can help you with ${episodeContext || 'your current episode'}! What would you like to know?`,
      emotion: 'encourage',
      card: null,
      ui: {
        emotion: 'encourage',
        chips: ['Try asking again', 'What episode are you working on?', 'Need help with a specific concept?']
      }
    };
  }
};

/**
 * Call the Python LangChain agent
 */
async function callLangChainAgent(context) {
  return new Promise((resolve, reject) => {
    const scriptPath = join(__dirname, '..', 'python');
    const fullScriptPath = join(scriptPath, 'mentor_agent.py');
    
    console.log('🔍 Debug Python paths:');
    console.log('  __dirname:', __dirname);
    console.log('  scriptPath:', scriptPath);
    console.log('  fullScriptPath:', fullScriptPath);
    console.log('  File exists:', existsSync(fullScriptPath));
    
    const options = {
      mode: 'json',
      pythonPath: join(__dirname, '..', 'venv', 'bin', 'python'), // Use local virtual environment Python
      pythonOptions: ['-u'], // Unbuffered output
      scriptPath: scriptPath,
      args: [JSON.stringify(context)]
    };

    const pyshell = new PythonShell('mentor_agent.py', options);
    
    let result = '';
    
    pyshell.on('message', function (message) {
      try {
        const parsed = JSON.parse(message);
        result = parsed;
      } catch (e) {
        console.warn('Failed to parse Python response:', message);
        result = message;
      }
    });

    pyshell.end(function (err) {
      if (err) {
        console.error('Python script error:', err);
        reject(err);
      } else {
        // Ensure we have a valid response structure
        if (typeof result === 'string') {
          result = {
            answer: result,
            emotion: 'idle',
            card: null,
            ui: {
              emotion: 'idle',
              chips: ['Ask another question', 'Need help?', 'What else?']
            }
          };
        }
        
        resolve(result);
      }
    });
  });
}

/**
 * Generate a quiz question based on student progress
 */
export const generateQuiz = async (studentId, episodeContext) => {
  const student = studentProfiles[studentId];
  const episode = episodeData[episodeContext];
  
  if (!student || !episode) {
    throw new Error('Student or episode not found');
  }

  // For MVP, return a pre-generated quiz
  // In production, this would use LangChain to generate dynamic questions
  const quiz = {
    question: `Based on what you learned in ${episodeContext}, what is the most important first step when starting to save money?`,
    options: [
      'Spend all your money first',
      'Set a clear savings goal',
      'Wait until you have a lot of money',
      'Ask your parents for money'
    ],
    correctOptionIndex: 1,
    explanation: 'Setting a clear goal helps you stay motivated and track your progress!',
    difficulty: episode.difficulty,
    concepts: episode.concepts
  };

  return quiz;
};
