import React from 'react';
import BentoGrid from '../../../components/bento/BentoGrid';
import BentoCard from '../../../components/bento/BentoCard';
import Heatmap from '../../../components/charts/Heatmap';
import { heatmapData } from '../../../lib/mockData';
import { Download } from 'lucide-react';
import Button from '../../../components/ui/Button';

const TeacherDashboard: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="h1">Class Dashboard</h1>
        <div className="flex gap-2">
            <Button variant="outline"><Download size={16} className="mr-2" /> Export CSV</Button>
            <Button variant="outline"><Download size={16} className="mr-2" /> Export PDF</Button>
        </div>
      </div>
      <BentoGrid>
        <BentoCard
          title="Concept Mastery Heatmap"
          className="md:col-span-6 lg:col-span-8"
        >
          <Heatmap data={heatmapData} />
        </BentoCard>

        <BentoCard
          title="Completion Funnel"
          className="md:col-span-6 lg:col-span-4"
        >
            <div className="space-y-4">
                <div className="flex items-center">
                    <span className="w-28 small">Started</span>
                    <div className="w-full bg-muted rounded-full h-4"><div className="bg-blue-500 h-4 rounded-full" style={{width: '95%'}}></div></div>
                    <span className="ml-2 font-semibold">95%</span>
                </div>
                 <div className="flex items-center">
                    <span className="w-28 small">In Progress</span>
                    <div className="w-full bg-muted rounded-full h-4"><div className="bg-teal-400 h-4 rounded-full" style={{width: '60%'}}></div></div>
                    <span className="ml-2 font-semibold">60%</span>
                </div>
                 <div className="flex items-center">
                    <span className="w-28 small">Completed</span>
                    <div className="w-full bg-muted rounded-full h-4"><div className="bg-mint-400 h-4 rounded-full" style={{width: '45%'}}></div></div>
                    <span className="ml-2 font-semibold">45%</span>
                </div>
            </div>
        </BentoCard>

        <BentoCard
          title="Top 3 Misconceptions"
          className="md:col-span-6 lg:col-span-12"
        >
          <ol className="list-decimal list-inside space-y-2 text-subtext">
            <li>Differentiating between 'revenue' and 'profit'.</li>
            <li>Calculating compound interest over multiple periods.</li>
            <li>Understanding the impact of credit utilization on scores.</li>
          </ol>
        </BentoCard>
      </BentoGrid>
    </div>
  );
};

export default TeacherDashboard;