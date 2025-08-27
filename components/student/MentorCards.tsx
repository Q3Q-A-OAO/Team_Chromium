
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Check, X, ArrowRight, ListChecks, Download, BookOpen } from 'lucide-react';

// --- TYPE DEFINITIONS ---

interface PlanCardPayload {
    type: 'plan';
    title: string;
    steps: string[];
}

interface QuizCardPayload {
    type: 'quiz';
    question: string;
    options: string[];
    correctOptionIndex: number;
    feedback: string;
}

interface TipCardPayload {
    type: 'tip';
    text: string;
    link: {
        label: string;
        href: string;
    };
}

interface ProgressCardPayload {
    type: 'progress';
    stats: Record<string, string | number>;
}

export type CardPayload = PlanCardPayload | QuizCardPayload | TipCardPayload | ProgressCardPayload;


// --- INDIVIDUAL CARD COMPONENTS ---

const PlanCard: React.FC<PlanCardPayload> = ({ title, steps }) => {
    const handleSave = () => {
        console.log("Plan saved:", { title, steps });
        alert("Plan saved to your journal! (simulated)");
    };

    const handleExport = () => {
        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            alert('Please allow popups to export the plan.');
            return;
        }

        const content = `
            <style>
                body { font-family: sans-serif; padding: 2rem; }
                h1 { font-size: 1.5rem; color: #191834; }
                ul { list-style-type: none; padding-left: 0; }
                li { background-color: #f7f9fc; border: 1px solid #eef2f7; border-radius: 8px; padding: 1rem; margin-bottom: 0.5rem; }
            </style>
            <h1>${title}</h1>
            <ul>
                ${steps.map(step => `<li>${step}</li>`).join('')}
            </ul>
        `;
        
        printWindow.document.write(`<html><head><title>${title}</title></head><body>${content}</body></html>`);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    return (
        <Card className="p-4 border border-blue-500/30">
            <h4 className="flex items-center gap-2 font-semibold text-text mb-2">
                <ListChecks size={18} className="text-blue-500" />
                {title}
            </h4>
            <ul className="space-y-2 mb-4">
                {steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-subtext">
                        <span className="flex-shrink-0 font-semibold text-blue-500 mt-0.5">{i + 1}.</span>
                        <span>{step}</span>
                    </li>
                ))}
            </ul>
            <div className="flex items-center gap-2">
                <Button onClick={handleSave} variant="primary" size="sm">Save Plan</Button>
                <Button onClick={handleExport} variant="outline" size="sm">
                    <Download size={14} className="mr-1.5" /> Export PDF
                </Button>
            </div>
        </Card>
    );
};

const QuizCard: React.FC<QuizCardPayload> = ({ question, options, correctOptionIndex, feedback }) => {
    const [selected, setSelected] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleCheck = () => {
        if (selected === null) return;
        setIsSubmitted(true);
    };

    const getOptionStyle = (index: number) => {
        if (!isSubmitted) {
            return selected === index
                ? 'ring-2 ring-blue-500 bg-blue-500/10'
                : 'ring-1 ring-muted hover:ring-blue-500';
        }
        if (index === correctOptionIndex) {
            return 'bg-mint-400/20 ring-2 ring-mint-400 text-text font-semibold';
        }
        if (index === selected && index !== correctOptionIndex) {
            return 'bg-red-500/10 ring-2 ring-red-500/50 text-subtext';
        }
        return 'ring-1 ring-muted opacity-60';
    };

    return (
        <Card className="p-4 border border-teal-400/30">
            <h4 className="font-semibold text-text mb-2">{question}</h4>
            <div className="space-y-2 mb-3">
                {options.map((option, i) => (
                    <button
                        key={i}
                        onClick={() => setSelected(i)}
                        disabled={isSubmitted}
                        className={`w-full text-left p-2 rounded-md text-sm transition-all ${getOptionStyle(i)}`}
                    >
                        {option}
                    </button>
                ))}
            </div>
            {!isSubmitted ? (
                <Button onClick={handleCheck} disabled={selected === null} className="w-full">Check Answer</Button>
            ) : (
                <div className="p-3 rounded-md bg-muted text-sm">
                    {selected === correctOptionIndex ? (
                        <p className="flex items-center gap-2 font-semibold text-mint-400"><Check size={16} /> Correct!</p>
                    ) : (
                        <p className="flex items-center gap-2 font-semibold text-red-500"><X size={16} /> Not quite.</p>
                    )}
                    <p className="text-subtext mt-1">{feedback}</p>
                </div>
            )}
        </Card>
    );
};


const TipCard: React.FC<TipCardPayload> = ({ text, link }) => {
    return (
        <Card className="p-4 bg-accent/30 border border-accent">
            <p className="text-sm text-text mb-2">{text}</p>
            <Link to={link.href} className="inline-flex items-center gap-1 text-sm font-semibold text-blue-800 hover:underline">
                {link.label} <ArrowRight size={14} />
            </Link>
        </Card>
    );
};

const ProgressCard: React.FC<ProgressCardPayload> = ({ stats }) => {
    return (
        <Card className="p-4 border border-mint-400/30">
             <h4 className="flex items-center gap-2 font-semibold text-text mb-3">
                <BookOpen size={18} className="text-mint-400" />
                Your Weekly Progress
            </h4>
            <div className="grid grid-cols-3 gap-2 text-center">
                {Object.entries(stats).map(([label, value]) => (
                    <div key={label} className="bg-muted p-2 rounded-md">
                        <p className="font-bold text-lg text-text">{value}</p>
                        <p className="text-xs text-subtext">{label}</p>
                    </div>
                ))}
            </div>
        </Card>
    );
};


// --- RENDERER COMPONENT ---

export const MentorCardRenderer: React.FC<{ card: CardPayload }> = ({ card }) => {
    switch (card.type) {
        case 'plan':
            return <PlanCard {...card} />;
        case 'quiz':
            return <QuizCard {...card} />;
        case 'tip':
            return <TipCard {...card} />;
        case 'progress':
            return <ProgressCard {...card} />;
        default:
            return null;
    }
};