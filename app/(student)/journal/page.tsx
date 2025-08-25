
import React from 'react';
import { attempts } from '../../../lib/mockData';
import Card from '../../../components/ui/Card';

const StudentJournal: React.FC = () => {
  return (
    <div>
      <h1 className="h1 mb-6">My Journal</h1>
      <Card className="p-6">
        <h2 className="h2 mb-4">Attempt History</h2>
        <div className="space-y-4">
          {attempts.map(attempt => (
            <div key={attempt.id} className="rounded-md bg-muted p-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-text">{attempt.episodeTitle}</h3>
                <span className="small">{attempt.date}</span>
              </div>
              <p className="text-subtext mt-2">{attempt.summary}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default StudentJournal;
