
import React, { useState, useEffect, useRef } from 'react';
import Button from '../../../components/ui/Button';
import { Send, Bot, Info, X, BrainCircuit, PartyPopper, ChevronDown } from 'lucide-react';
import { askMentor } from '../../../services/mentorService';
import Card from '../../../components/ui/Card';

type Emotion = 'idle' | 'think' | 'celebrate';
type Tone = 'Friendly' | 'Normal' | 'Formal';

const MentorWindow: React.FC<{ emotion: Emotion; isLoading: boolean }> = ({ emotion, isLoading }) => {
  const statusDotColor = isLoading ? 'bg-teal-400 animate-pulse' : 'bg-mint-400';

  const emotionMap: Record<Emotion, React.ReactNode> = {
    idle: <Bot size={64} className="text-subtext" />,
    think: <BrainCircuit size={64} className="text-blue-500 animate-pulse" />,
    celebrate: <PartyPopper size={64} className="text-mint-400" />,
  };

  return (
    <Card className="p-4 h-full flex flex-col items-center justify-center">
      <div className="w-full max-w-[280px] aspect-square bg-muted rounded-lg flex items-center justify-center shadow-inner overflow-hidden">
        <div className="transition-transform duration-500 ease-in-out" key={emotion}>
          {emotionMap[emotion]}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <div className={`w-2.5 h-2.5 rounded-full transition-colors ${statusDotColor}`} />
        <p className="font-semibold text-sm text-text">MoneyQuest Mentor</p>
      </div>
    </Card>
  );
};

const ContextDrawer: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
    return (
        <>
            <div 
                className={`fixed inset-0 bg-bg/70 backdrop-blur-sm z-30 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
                aria-hidden="true"
            />
            <div 
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-surface z-40 transform transition-transform duration-300 ease-in-out shadow-2xl rounded-l-lg
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}`
                }
                role="dialog"
                aria-modal="true"
                aria-labelledby="context-drawer-title"
            >
                <div className="p-6 flex flex-col h-full">
                    <header className="flex justify-between items-center mb-4">
                        <h2 id="context-drawer-title" className="h2">Episode Context</h2>
                        <Button onClick={onClose} variant="ghost" size="sm" className="!p-2">
                            <X size={20} />
                            <span className="sr-only">Close</span>
                        </Button>
                    </header>
                    <div className="flex-grow rounded-md bg-muted p-4">
                        <h3 className="font-semibold text-text mb-2">Current Episode: Saving for a Spaceship</h3>
                        <p className="small">You are trying to save $1000 for a new spaceship toy. You have a part-time job and must decide how much to save each week while covering your expenses.</p>
                    </div>
                </div>
            </div>
        </>
    );
};


const StudentMentor: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { role: 'mentor', content: 'Hello! How can I help you with your current episode?' }
  ]);
  const [emotion, setEmotion] = useState<Emotion>('idle');
  const [tone, setTone] = useState<Tone>('Normal');
  const [isContextDrawerOpen, setIsContextDrawerOpen] = useState(false);
  
  const emotionTimeoutRef = useRef<number | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const quickPrompts = [
    'What did I learn this week?',
    'Give me a 3-question quiz',
    'Show my mistakes',
    'Set a savings plan',
    'Explain APR again',
  ];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (emotionTimeoutRef.current) {
        clearTimeout(emotionTimeoutRef.current);
      }
    };
  }, []);
  
  const handleSend = async (prompt?: string) => {
    const messageToSend = prompt || question;
    if (!messageToSend.trim()) return;

    const textarea = textareaRef.current;
    if (!prompt) {
      setQuestion('');
      if (textarea) {
        textarea.style.height = 'auto'; // Reset height after sending
      }
    }
    
    setIsLoading(true);
    setEmotion('think');
    if (emotionTimeoutRef.current) clearTimeout(emotionTimeoutRef.current);
    
    const userMessage = { role: 'user', content: messageToSend };
    setChatHistory(prev => [...prev, userMessage]);

    const response = await askMentor(messageToSend, 'Saving for a Spaceship', tone);
    const mentorMessage = { role: 'mentor', content: response.answer };
    setChatHistory(prev => [...prev, mentorMessage]);
    setIsLoading(false);
    
    setEmotion(response.emotion || 'celebrate');
    emotionTimeoutRef.current = window.setTimeout(() => {
      setEmotion('idle');
    }, 4000);
  };

  const autosize = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    el.style.height = 'auto';
    const newHeight = Math.min(el.scrollHeight, 128); // Cap height at 128px
    el.style.height = newHeight + 'px';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 h-full">
        <MentorWindow emotion={emotion} isLoading={isLoading} />

        <section className="flex flex-col bg-surface rounded-lg shadow-soft ring-1 ring-[var(--ring)] overflow-hidden">
            <header className="p-4 border-b border-muted flex justify-between items-center flex-shrink-0">
                <h2 className="h2">AI Mentor</h2>
                <Button onClick={() => setIsContextDrawerOpen(true)} variant="ghost" size="sm" className="!p-2 flex items-center gap-1.5">
                    <Info size={16} />
                    <span className="text-xs font-semibold">Episode Context</span>
                </Button>
            </header>
            
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                {chatHistory.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                        {msg.role === 'mentor' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center text-white"><Bot size={16} /></div>}
                        <div className={`max-w-xl rounded-lg p-3 ${msg.role === 'user' ? 'bg-primary text-primary-ink' : 'bg-muted text-text'}`}>
                            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
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
                <div className="flex flex-wrap gap-2 mb-3">
                    {quickPrompts.map((prompt) => (
                        <Button
                            key={prompt}
                            variant="outline"
                            size="sm"
                            className="!rounded-full flex-shrink-0 whitespace-nowrap !px-3"
                            onClick={() => handleSend(prompt)}
                            disabled={isLoading}
                        >
                            {prompt}
                        </Button>
                    ))}
                </div>
                <div className="flex items-end gap-2">
                    <div className="relative">
                        <select
                            value={tone}
                            onChange={(e) => setTone(e.target.value as Tone)}
                            disabled={isLoading}
                            className="h-12 appearance-none rounded-full bg-muted py-3 pl-4 pr-9 text-sm font-medium text-subtext focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Select mentor tone"
                        >
                            <option>Friendly</option>
                            <option>Normal</option>
                            <option>Formal</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-subtext pointer-events-none" />
                    </div>
                    <textarea
                        ref={textareaRef}
                        id="mq-input"
                        rows={1}
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyPress={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
                        onInput={autosize}
                        placeholder="Ask the mentor a question…"
                        className="flex-1 resize-none rounded-xl border border-muted bg-muted px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isLoading}
                    />
                    <Button onClick={() => handleSend()} disabled={isLoading} className="!rounded-full h-12 w-12 flex-shrink-0" variant="accent">
                        <Send size={18} />
                    </Button>
                </div>
            </div>
        </section>
        <ContextDrawer isOpen={isContextDrawerOpen} onClose={() => setIsContextDrawerOpen(false)} />
    </div>
  );
};

export default StudentMentor;
