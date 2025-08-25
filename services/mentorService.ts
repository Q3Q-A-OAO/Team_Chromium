
// This service simulates calls to the backend AI Mentor API.
// In a real Next.js app, this would fetch from '/api/mentor'.
// In this SPA, we simulate the async operation and return a canned response.

interface MentorResponse {
  answer: string;
  checkQuestion: string;
}

export const askMentor = async (question: string, episodeContext: string): Promise<MentorResponse> => {
  console.log('Asking mentor:', { question, episodeContext });
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Canned response
  const response: MentorResponse = {
    answer: "That's a great question! When budgeting for a lemonade stand, it's crucial to list all your potential costs, like lemons, sugar, and cups. This helps you set a price that ensures you make a profit.",
    checkQuestion: "What is one 'variable cost' you might have when running your stand?"
  };
  
  return response;
};
