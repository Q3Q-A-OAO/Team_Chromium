import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { Send, Bot } from 'lucide-react';
import { askMentor } from '../../../services/mentorService';
import Card from '../../../components/ui/Card';

const StudentMentor: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { role: 'mentor', content: 'Hello! How can I help you with your current episode?' }
  ]);
  
  const handleSend = async () => {
    if (!question.trim()) return;
    const currentQuestion = question;
    setQuestion('');
    setIsLoading(true);
    
    const userMessage = { role: 'user', content: currentQuestion };
    setChatHistory(prev => [...prev, userMessage]);

    const response = await askMentor(currentQuestion, 'Saving for a Spaceship');
    const mentorMessage = { role: 'mentor', content: response.answer };
    setChatHistory(prev => [...prev, mentorMessage]);
    setIsLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        <Card className="lg:col-span-1 p-4 flex flex-col">
            <h2 className="h2 mb-4">Context</h2>
            <div className="rounded-md bg-muted p-4 flex-grow">
                <h3 className="font-semibold text-text mb-2">Current Episode: Saving for a Spaceship</h3>
                <p className="small">You are trying to save $1000 for a new spaceship toy. You have a part-time job and must decide how much to save each week while covering your expenses.</p>
            </div>
        </Card>
        <div className="lg:col-span-2 flex flex-col h-full bg-surface rounded-lg shadow-soft ring-1 ring-[var(--ring)]">
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
                {chatHistory.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                        {msg.role === 'mentor' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center text-white"><Bot size={16} /></div>}
                        <div className={`max-w-xl rounded-lg p-3 ${msg.role === 'user' ? 'bg-primary text-primary-ink' : 'bg-muted text-text'}`}>
                            <p className="text-sm">{msg.content}</p>
                        </div>
                    </div>
                ))}
                 {isLoading && (
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center text-white"><Bot size={16} /></div>
                        <div className="max-w-xl rounded-lg p-3 bg-muted text-text">
                            <span className="animate-pulse">...</span>
                        </div>
                    </div>
                )}
            </div>
            <div className="p-4 border-t border-muted">
                <div className="relative">
                    <input 
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                        placeholder="Ask the mentor a question..."
                        className="w-full rounded-full bg-muted py-3 pl-4 pr-14 text-sm"
                        disabled={isLoading}
                    />
                    <Button onClick={handleSend} disabled={isLoading} className="absolute right-1.5 top-1/2 -translate-y-1/2 !p-2 h-auto" variant="accent">
                        <Send size={16} />
                    </Button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default StudentMentor;