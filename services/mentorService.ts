// This service simulates calls to the backend AI Mentor API.
// In a real Next.js app, this would fetch from '/api/mentor'.
// In this SPA, we simulate the async operation and return a canned response.

interface MentorResponse {
  answer: string;
  checkQuestion?: string;
  emotion?: 'idle' | 'think' | 'celebrate' | 'encourage' | 'oops';
}


const mentorResponses: Record<string, MentorResponse> = {
  plan: {
    answer: `Of course! Here is a simple plan to help you save for the spaceship toy.
---
{
  "card": {
    "type": "plan",
    "title": "Spaceship Toy Savings Plan",
    "steps": [
      "Set aside 20% of your weekly allowance immediately.",
      "Track every penny you spend for one week to find savings.",
      "Do one extra chore to earn a bonus.",
      "Review your progress at the end of the week."
    ]
  },
  "ui": {
    "emotion": "encourage",
    "chips": ["What is a 'variable cost'?", "How do I track spending?", "Can you make this plan simpler?"]
  }
}`
  },
  quiz: {
    answer: `Good idea, let's test your knowledge! Here is a quick question for you.
---
{
  "card": {
    "type": "quiz",
    "question": "If you buy a toy for £8 and sell it for £10, what is your profit margin?",
    "options": ["20%", "25%", "80%"],
    "correctOptionIndex": 0,
    "feedback": "Correct! The profit is £2. The profit margin is (Profit / Revenue) * 100, which is (£2 / £10) * 100 = 20%."
  },
  "ui": {
    "emotion": "think"
  }
}`
  },
  tip: {
    answer: `Here's a quick tip for you based on our conversation.
---
{
  "card": {
    "type": "tip",
    "text": "The 'Pay Yourself First' principle is powerful. Before you spend on anything else, put a portion of your money into savings.",
    "link": {
      "label": "Try this in Play →",
      "href": "/student/play"
    }
  },
  "ui": {
    "emotion": "celebrate",
    "intensity": 0.5
  }
}`
  },
  progress: {
    answer: `You've been busy! Here's a quick look at your progress this week.
---
{
  "card": {
    "type": "progress",
    "stats": {
      "Episodes this week": 5,
      "Time spent": "2h 15m",
      "Best badge": "Risk Ranger"
    }
  },
  "ui": {
    "emotion": "celebrate",
    "intensity": 0.8,
    "chips": ["What was my hardest question?", "Show my top concepts", "Give me another quiz"]
  }
}`
  },
  default: {
    answer: "That's a great question! When budgeting for a lemonade stand, it's crucial to list all your potential costs, like lemons, sugar, and cups. This helps you set a price that ensures you make a profit.",
    checkQuestion: "What is one 'variable cost' you might have when running your stand?",
    emotion: 'celebrate',
  }
};


export const askMentor = async (question: string, episodeContext: string, tone: string): Promise<MentorResponse> => {
  console.log('Asking mentor:', { question, episodeContext, tone });
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes('plan')) {
    return mentorResponses.plan;
  }
  if (lowerQuestion.includes('quiz')) {
    return mentorResponses.quiz;
  }
  if (lowerQuestion.includes('tip')) {
    return mentorResponses.tip;
  }
  if (lowerQuestion.includes('progress')) {
    return mentorResponses.progress;
  }
  
  return mentorResponses.default;
};