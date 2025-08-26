import React, { useState, useEffect } from 'react';

// TODO: replace sticker placeholders with final mascot art pack (neutral style).
// These are simple SVG placeholders. In a real app, these could be Lottie animations.

const IdleMascot = () => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M 20,70 C 20,30 80,30 80,70 C 100,70 100,90 80,90 L 20,90 C 0,90 0,70 20,70 Z" fill="#61bdaf" stroke="#FFF" strokeWidth="2" />
        <circle cx="35" cy="55" r="4" fill="#191834" />
        <circle cx="65" cy="55" r="4" fill="#191834" />
        <path d="M 45 70 Q 50 75 55 70" stroke="#191834" strokeWidth="2" fill="none" />
    </svg>
);

const CelebrateMascot = () => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="motion-safe:animate-bounce">
        <path d="M 20,70 C 20,30 80,30 80,70 C 100,70 100,90 80,90 L 20,90 C 0,90 0,70 20,70 Z" fill="#D7FF7A" stroke="#FFF" strokeWidth="2" />
        <path d="M 30,55 L 40,50 L 30,45 Z" fill="#191834" />
        <path d="M 70,55 L 60,50 L 70,45 Z" fill="#191834" />
        <path d="M 40 75 Q 50 65 60 75" stroke="#191834" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {/* Confetti */}
        <circle cx="10" cy="20" r="3" fill="#338aca" />
        <rect x="85" y="30" width="6" height="6" transform="rotate(45 85 30)" fill="#26b7cd" />
        <circle cx="25" cy="8" r="3" fill="#61bdaf" />
        <rect x="70" y="80" width="6" height="6" transform="rotate(15 70 80)" fill="#338aca" />
    </svg>
);

const EncourageMascot = () => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M 20,70 C 20,30 80,30 80,70 C 100,70 100,90 80,90 L 20,90 C 0,90 0,70 20,70 Z" fill="#a9d2f5" stroke="#FFF" strokeWidth="2" />
        <circle cx="35" cy="55" r="4" fill="#191834" />
        <path d="M 60,60 C 65,50 70,55 60,60" fill="#191834" />
        <path d="M 45 70 Q 50 75 55 70" stroke="#191834" strokeWidth="2" fill="none" />
    </svg>
);

const StreakMascot = () => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="motion-safe:animate-pulse">
        <path d="M 20,70 C 20,30 80,30 80,70 C 100,70 100,90 80,90 L 20,90 C 0,90 0,70 20,70 Z" fill="#26b7cd" stroke="#FFF" strokeWidth="2" />
        <path d="M 30,55 L 40,50 L 30,45 Z" fill="#191834" />
        <path d="M 70,55 L 60,50 L 70,45 Z" fill="#191834" />
        <path d="M 40 75 Q 50 65 60 75" stroke="#191834" strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
);

type MascotState = 'default' | 'celebrate' | 'streak' | 'encourage' | 'rankUp';

interface MascotStickerProps {
  initialState?: MascotState;
  className?: string;
}

const MascotSticker: React.FC<MascotStickerProps> = ({ initialState = 'default', className }) => {
    const [state, setState] = useState(initialState);
    
    useEffect(() => {
        setState(initialState);
        if (['celebrate', 'streak', 'encourage', 'rankUp'].includes(initialState)) {
            const timer = setTimeout(() => {
                setState('default');
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [initialState]);
    
    const renderMascot = () => {
        switch (state) {
            case 'celebrate': return <CelebrateMascot />;
            case 'encourage': return <EncourageMascot />;
            case 'streak': return <StreakMascot />;
            // TODO: add rankUp animation
            default: return <IdleMascot />;
        }
    };
    
    return (
        <div 
            className={`w-24 h-24 md:w-32 md:h-32 pointer-events-none motion-safe:transition-transform motion-safe:duration-500 ${state !== 'default' ? 'motion-safe:scale-110' : ''} ${className}`} 
            aria-hidden="true"
        >
            <div className="motion-reduce:hidden">
                {renderMascot()}
            </div>
             <div className="hidden motion-reduce:block">
                <IdleMascot />
            </div>
        </div>
    );
};

export default MascotSticker;
