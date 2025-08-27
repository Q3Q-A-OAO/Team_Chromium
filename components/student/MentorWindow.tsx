import React, { useEffect, useState } from 'react';
import Card from '../ui/Card';

type Emotion = 'idle' | 'think' | 'celebrate' | 'encourage' | 'oops';

interface MentorWindowProps {
  emotion: Emotion;
  intensity?: number;
  isLoading: boolean;
}

const MentorWindow: React.FC<MentorWindowProps> = ({ emotion, intensity = 0, isLoading }) => {
  const [isScaled, setIsScaled] = useState(false);

  useEffect(() => {
    if (emotion === 'celebrate' && intensity >= 0.7) {
      setIsScaled(true);
      const timer = setTimeout(() => setIsScaled(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [emotion, intensity]);

  const statusDotColor = isLoading ? 'bg-teal-400 animate-pulse' : 'bg-mint-400';

  // Graceful fallback for unknown emotions
  const currentEmotion = ['idle', 'think', 'celebrate', 'encourage', 'oops'].includes(emotion) ? emotion : 'idle';

  const emotionMap: Record<Emotion, React.ReactNode> = {
    idle: <img src="/assets/mentor/idle.png" alt="Idle Mentor" className="w-32 h-32 object-contain" />,
    think: <img src="/assets-mentor/think.png" alt="Thinking Mentor" className="w-32 h-32 object-contain" />,
    encourage: <img src="/assets/mentor/encourage.png" alt="Encouraging Mentor" className="w-32 h-32 object-contain" />,
    celebrate: (
      <div className="w-32 h-32 bg-yellow-100 border-2 border-dashed border-yellow-300 rounded-lg flex items-center justify-center text-center p-2">
        <p className="text-xs font-bold text-yellow-800">[Lottie Placeholder: celebrate.json]</p>
      </div>
    ),
    oops: <img src="/assets/mentor/oops.png" alt="Oops Mentor" className="w-32 h-32 object-contain" />,
  };
  
  const scaleClass = isScaled ? 'scale-110' : 'scale-100';

  return (
    <Card className="p-4 h-full flex flex-col items-center justify-center">
      <div className="w-full max-w-[280px] aspect-square bg-muted rounded-lg flex items-center justify-center shadow-inner overflow-hidden">
        <div className={`transition-transform duration-500 ease-in-out ${scaleClass}`} key={`${emotion}-${intensity}`}>
          {emotionMap[currentEmotion]}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <div className={`w-2.5 h-2.5 rounded-full transition-colors ${statusDotColor}`} />
        <p className="font-semibold text-sm text-text">MoneyQuest Mentor</p>
      </div>
    </Card>
  );
};

export default MentorWindow;