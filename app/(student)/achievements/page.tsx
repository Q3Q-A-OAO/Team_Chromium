
import React from 'react';
import { badges } from '../../../lib/mockData';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';

const StudentAchievements: React.FC = () => {
  return (
    <div>
      <h1 className="h1 mb-6">Achievements</h1>
      <Card className="p-6">
        <h2 className="h2 mb-4">Your Badges</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {badges.map(badge => (
            <div key={badge.id} className="flex flex-col items-center justify-center gap-2 rounded-md bg-muted p-4 text-center">
              <div className="text-mint-400">{badge.icon}</div>
              <span className="font-semibold text-text">{badge.name}</span>
              <Badge variant={badge.type === 'concept' ? 'blue' : badge.type === 'effort' ? 'teal' : 'mint'} className="capitalize">{badge.type}</Badge>
            </div>
          ))}
        </div>
      </Card>
      {/* Add streak history component here later */}
    </div>
  );
};

export default StudentAchievements;
