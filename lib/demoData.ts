
import type { Badge } from '../types';

export const demoStudent = { 
  name:'Alex Johnson', 
  year:'Year 9', 
  school:'Northwood High', 
  district:'Northwood', 
  id:'STU-001',
  house: '9B – Oak',
  topConcept: 'Inflation & Value',
  lastBadge: 'Inflation Explorer',
  weeklyGoal: {
    target: 3,
    completed: 2,
  },
  moneySaved: 125.50,
  rank: 12,
  socialActivity: {
      peerName: 'Maria',
      activity: 'The Stock Market Maze',
  },
};

export const demoPrefs = { 
  reading:'Normal', 
  difficulty:'Auto', 
  style:'Quests', 
  language:'English', 
  avatarUrl: 'https://picsum.photos/seed/student_main/144/144'
};

export const progressSummaryData = {
    currentStreak: 12,
    longestStreak: 21,
};

export const dailyActivity: DailyActivity[] = Array.from({ length: 35 }, (_, i) => {
    const day = i - 7; // Start from a week ago
    const date = new Date();
    date.setDate(date.getDate() + day);
    const dateString = date.toISOString().split('T')[0];

    const shouldHaveActivity = Math.random() > 0.4;
    if (!shouldHaveActivity) {
        return { date: dateString, attempts: 0, pass: 0, fail: 0, time: 0, concepts: {}, details: [] };
    }

    const attempts = Math.floor(Math.random() * 5) + 1;
    const pass = Math.floor(Math.random() * (attempts + 1));
    const fail = attempts - pass;
    const time = attempts * (Math.floor(Math.random() * 10) + 5);

    const concepts = {
        'Budgeting': Math.random() > 0.5 ? Math.floor(Math.random() * 3) : 0,
        'Inflation': Math.random() > 0.5 ? Math.floor(Math.random() * 3) : 0,
        'Saving': Math.random() > 0.5 ? Math.floor(Math.random() * 3) : 0,
    };

    const details = Array.from({ length: attempts }, () => {
        const isFail = Math.random() > 0.4;
        const reasons = [
            'Forgot to account for taxes.',
            'Miscalculated profit margins.',
            'Overlooked variable costs.',
            'Ran out of stock too early.',
        ];
        return {
            episode: ['The Lemonade Stand Challenge', 'Saving for a Spaceship', 'Credit Score Superheroes'][Math.floor(Math.random() * 3)],
            result: isFail ? 'Fail' : 'Pass',
            time: Math.floor(Math.random() * 10) + 5,
            concepts: ['Budgeting', 'Profit', 'Saving'].slice(0, Math.floor(Math.random() * 2) + 1),
            reason: isFail && Math.random() > 0.7 ? reasons[Math.floor(Math.random() * reasons.length)] : undefined,
        };
    });

    return { date: dateString, attempts, pass, fail, time, concepts, details };
}).filter(Boolean) as DailyActivity[];


export interface DailyActivity {
  date: string; // YYYY-MM-DD
  attempts: number;
  pass: number;
  fail: number;
  time: number; // minutes
  concepts: Record<string, number>;
  details: {
    episode: string;
    result: 'Pass' | 'Fail' | 'In progress';
    time: number;
    concepts: string[];
    reason?: string;
  }[];
}


export const demoBadgesWeek: Pick<Badge, 'id' | 'name'>[] = [
  {id:'inflation-explorer', name:'Inflation Explorer'}
];

export const demoBadgesMonth: { id: string; name: string; earnedDate: string; }[] = [
  {id:'inflation-explorer', name:'Inflation Explorer', earnedDate: '2025-08-12'},
  {id:'savvy-saver', name:'Savvy Saver', earnedDate: '2025-08-19'},
  {id:'budget-boss', name:'Budget Boss', earnedDate: '2025-08-05'},
  {id:'quick-learner', name:'Quick Learner', earnedDate: '2025-08-22'},
  {id:'data-diver', name:'Data Diver', earnedDate: '2025-08-15'},
];

export const demoJournalTop3 = [
  { id:'a1', episode:'The Lemonade Stand Challenge', result:'Pass', summary:'Successfully balanced budget and made a small profit.', ts:'Today 16:02' },
  { id:'a2', episode:'Saving for a Spaceship', result:'Fail', summary:'Failed this attempt by overspending on rocket fuel. Next time, I need to adjust my savings plan first.', ts:'Today 15:10' },
  { id:'a3', episode:'The Lemonade Stand Challenge', result:'Fail', summary:'Failed because I ran out of lemons too early. This taught me a lesson about supply management.', ts:'Yesterday' },
];

export const demoClassActivity = [
    { id: 'ca1', peerName: 'Maria', avatarUrl: 'https://picsum.photos/seed/maria/40/40', text: 'is learning "The Stock Market Maze"', link: '/student/play' },
    { id: 'ca2', peerName: 'Sam', avatarUrl: 'https://picsum.photos/seed/sam/40/40', text: 'just earned "Budget Boss"', link: '/student/achievements' },
    { id: 'ca3', peerName: 'Ava', avatarUrl: 'https://picsum.photos/seed/ava/40/40', text: 'continued a 10-day streak', link: '/student/dashboard' },
];