
import React from 'react';
import type { Student, Badge, Episode, Attempt } from '../types';
import { BrainCircuit, Zap, Flame } from 'lucide-react';

export const badges: Badge[] = [
  { id: 'b1', name: 'Budgeting Basics', icon: <BrainCircuit size={16} />, type: 'concept' },
  { id: 'b2', name: 'Quick Learner', icon: <Zap size={16} />, type: 'effort' },
  { id: 'b3', name: '7-Day Streak', icon: <Flame size={16} />, type: 'streak' },
  { id: 'b4', name: 'Saving Pro', icon: <BrainCircuit size={16} />, type: 'concept' },
  { id: 'b5', name: 'Investment Intro', icon: <BrainCircuit size={16} />, type: 'concept' },
  { id: 'b6', name: 'Hard Worker', icon: <Zap size={16} />, type: 'effort' },
  { id: 'b7', name: '14-Day Streak', icon: <Flame size={16} />, type: 'streak' },
  { id: 'b8', name: 'Credit Score Genius', icon: <BrainCircuit size={16} />, type: 'concept' },
];

export const students: Student[] = [
  { id: 's1', name: 'Alex Johnson', avatarUrl: 'https://picsum.photos/seed/alex/100/100', streak: 12, lastActivity: '2 hours ago', badges: [badges[0], badges[1], badges[2]] },
  { id: 's2', name: 'Maria Garcia', avatarUrl: 'https://picsum.photos/seed/maria/100/100', streak: 5, lastActivity: '1 day ago', badges: [badges[3]] },
  { id: 's3', name: 'Chen Wei', avatarUrl: 'https://picsum.photos/seed/chen/100/100', streak: 21, lastActivity: '5 hours ago', badges: [badges[0], badges[4], badges[6]] },
  { id: 's4', name: 'Fatima Al-Fassi', avatarUrl: 'https://picsum.photos/seed/fatima/100/100', streak: 0, lastActivity: '1 week ago', badges: [] },
  { id: 's5', name: 'David Smith', avatarUrl: 'https://picsum.photos/seed/david/100/100', streak: 8, lastActivity: 'yesterday', badges: [badges[1], badges[5]] },
  { id: 's6', name: 'Yuki Tanaka', avatarUrl: 'https://picsum.photos/seed/yuki/100/100', streak: 3, lastActivity: '3 days ago', badges: [badges[7]] },
];

export const episodes: Episode[] = [
  { id: 'e1', title: 'The Lemonade Stand Challenge', concepts: ['Budgeting', 'Profit'], status: 'Completed' },
  { id: 'e2', title: 'Saving for a Spaceship', concepts: ['Saving', 'Goals'], status: 'In progress' },
  { id: 'e3', title: 'Credit Score Superheroes', concepts: ['Credit', 'Debt'], status: 'Not started' },
  { id: 'e4', title: 'The Stock Market Maze', concepts: ['Investing', 'Risk'], status: 'Not started' },
  { id: 'e5', title: 'Understanding Your Paycheck', concepts: ['Taxes', 'Income'], status: 'Failed' },
  { id: 'e6', title: 'The Art of the Deal', concepts: ['Negotiation', 'Value'], status: 'Not started' },
];

export const attempts: Attempt[] = [
    { id: 'a1', episodeTitle: 'The Lemonade Stand Challenge', date: '2024-07-20', summary: 'Successfully balanced budget and made a small profit.'},
    { id: 'a2', episodeTitle: 'Saving for a Spaceship', date: '2024-07-21', summary: 'Overspent on rocket fuel, need to adjust savings plan.'},
    { id: 'a3', episodeTitle: 'The Lemonade Stand Challenge', date: '2024-07-18', summary: 'Ran out of lemons early, learned about supply management.'},
];

export const sparklineData = [
  { name: 'Day 1', attempts: 2 },
  { name: 'Day 2', attempts: 3 },
  { name: 'Day 3', attempts: 1 },
  { name: 'Day 4', attempts: 4 },
  { name: 'Day 5', attempts: 3 },
  { name: 'Day 6', attempts: 5 },
  { name: 'Day 7', attempts: 2 },
];

export const heatmapData = [
    { concept: 'Budgeting', mastery: 90 },
    { concept: 'Saving', mastery: 75 },
    { concept: 'Investing', mastery: 40 },
    { concept: 'Credit', mastery: 60 },
    { concept: 'Taxes', mastery: 25 },
    { concept: 'Profit', mastery: 85 },
    { concept: 'Debt', mastery: 55 },
    { concept: 'Risk', mastery: 30 },
];
