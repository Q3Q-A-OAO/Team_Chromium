import React from 'react';
import BentoGrid from '../../../components/bento/BentoGrid';
import BentoCard from '../../../components/bento/BentoCard';
import StatPill from '../../../components/StatPill';
import Sparkline from '../../../components/charts/Sparkline';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import { sparklineData } from '../../../lib/mockData';
import { Book, Flame, Bot, Play, Repeat, Award, Target, BrainCircuit } from 'lucide-react';

const StudentDashboard: React.FC = () => {
  return (
    <div>
      <h1 className="h1 mb-6">Your Dashboard</h1>
      <BentoGrid>
        <BentoCard
          title="Last Episode Summary"
          icon={<Book size={24} />}
          className="md:col-span-3 lg:col-span-5"
          subtitle="Saving for a Spaceship"
          cta={<Button variant="primary">Resume</Button>}
        >
          <ul className="space-y-2 text-sm text-subtext list-disc list-inside">
            <li>Identified long-term saving goals.</li>
            <li>Encountered challenge with unexpected expenses.</li>
          </ul>
        </BentoCard>

        <BentoCard
          title="Progress"
          icon={<Flame size={24} />}
          className="md:col-span-3 lg:col-span-3"
        >
            <div className="flex items-center gap-4">
                <StatPill value="12" label="Day Streak" icon={<Flame size={20} />} />
                <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                        <span className="small">Next Badge</span>
                        <span className="text-xs font-bold text-mint-400">75%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-mint-400 h-2.5 rounded-full" style={{width: '75%'}}></div>
                    </div>
                </div>
            </div>
        </BentoCard>

         <BentoCard
          title="Profile"
          icon={<Award size={24} />}
          className="md:col-span-2 lg:col-span-4"
        >
            <div className="flex items-center gap-4">
                <img src="https://picsum.photos/seed/student_main/100/100" alt="Student Avatar" className="w-16 h-16 rounded-full ring-2 ring-blue-500"/>
                <div>
                    <h4 className="font-semibold text-text">Alex Johnson</h4>
                    <p className="small">Grade 8 / Northwood District</p>
                </div>
            </div>
        </BentoCard>
        
        <BentoCard
          title="Weekly Trend"
          subtitle="Attempts last 7 days"
          icon={<Target size={24} />}
          className="md:col-span-4 lg:col-span-5"
        >
          <Sparkline data={sparklineData} dataKey="attempts" />
        </BentoCard>

        <BentoCard
          title="Quick Actions"
          icon={<Play size={24} />}
          className="md:col-span-2 lg:col-span-3"
        >
            <div className="flex flex-col gap-2">
                <Button variant="outline" className="w-full text-left justify-start"><Play size={16} className="mr-2"/> Resume Episode</Button>
                <Button variant="outline" className="w-full text-left justify-start"><Repeat size={16} className="mr-2"/> Recap Quiz</Button>
                <Button variant="outline" className="w-full text-left justify-start"><Bot size={16} className="mr-2"/> Ask Mentor</Button>
            </div>
        </BentoCard>
        
        <BentoCard
          title="Recommended Concepts"
          icon={<BrainCircuit size={24} />}
          className="md:col-span-6 lg:col-span-4"
        >
            <div className="flex flex-wrap gap-2">
                <Badge variant="teal">Investing</Badge>
                <Badge variant="teal">Risk Assessment</Badge>
                <Badge variant="blue">Credit Score</Badge>
                <Badge variant="blue">Compound Interest</Badge>
            </div>
        </BentoCard>
      </BentoGrid>
    </div>
  );
};

export default StudentDashboard;