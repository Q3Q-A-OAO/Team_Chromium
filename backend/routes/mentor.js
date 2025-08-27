import express from 'express';
import { askMentor, getMentorContext } from '../services/mentorService.js';

const router = express.Router();

// Get mentor context and student background
router.get('/context/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    const context = await getMentorContext(studentId);
    res.json(context);
  } catch (error) {
    console.error('Error getting mentor context:', error);
    res.status(500).json({ error: 'Failed to get mentor context' });
  }
});

// Ask the AI mentor a question
router.post('/ask', async (req, res) => {
  try {
    const { 
      question, 
      studentId, 
      episodeContext, 
      tone = 'Normal',
      conversationHistory = []
    } = req.body;

    if (!question || !studentId) {
      return res.status(400).json({ 
        error: 'Question and studentId are required' 
      });
    }

    console.log(`🎯 Student ${studentId} asking mentor: "${question}"`);
    console.log(`📚 Episode context: ${episodeContext}`);
    console.log(`🎭 Tone: ${tone}`);

    const response = await askMentor(
      question, 
      studentId, 
      episodeContext, 
      tone,
      conversationHistory
    );

    res.json(response);
  } catch (error) {
    console.error('Error asking mentor:', error);
    res.status(500).json({ 
      error: 'Failed to get mentor response',
      message: error.message 
    });
  }
});

// Get mentor conversation history
router.get('/conversations/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    const { limit = 50 } = req.query;
    
    // For MVP, return mock conversation history
    // In production, this would query a database
    const conversations = [
      {
        id: '1',
        timestamp: new Date().toISOString(),
        question: 'How do I save money?',
        answer: 'Start by setting aside 20% of your allowance...',
        episodeContext: 'Saving for a Spaceship',
        tone: 'Friendly'
      }
    ];

    res.json({ conversations: conversations.slice(0, limit) });
  } catch (error) {
    console.error('Error getting conversations:', error);
    res.status(500).json({ error: 'Failed to get conversations' });
  }
});

// Get mentor insights and recommendations
router.get('/insights/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    
    // For MVP, return mock insights
    // In production, this would analyze conversation history and progress
    const insights = {
      strengths: ['Budgeting', 'Goal Setting'],
      areasForImprovement: ['Understanding Interest Rates'],
      recommendedTopics: ['Compound Interest', 'Investment Basics'],
      nextSteps: 'Complete the "Compound Interest" episode to strengthen your knowledge'
    };

    res.json(insights);
  } catch (error) {
    console.error('Error getting insights:', error);
    res.status(500).json({ error: 'Failed to get insights' });
  }
});

export default router;
