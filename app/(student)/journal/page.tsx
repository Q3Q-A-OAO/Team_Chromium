import React, { useRef, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { attempts } from '../../../lib/mockData';
import Card from '../../../components/ui/Card';
import { ArrowLeft } from 'lucide-react';

const StudentJournal: React.FC = () => {
  const [searchParams] = useSearchParams();
  const entryId = searchParams.get('entry');
  const entryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    // Let the page render before scrolling
    setTimeout(() => {
        if (entryId && entryRefs.current[entryId]) {
            entryRefs.current[entryId]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 100);
  }, [entryId]);

  return (
    <div>
       <Link to="/student/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-subtext hover:text-text mb-4">
        <ArrowLeft size={16} />
        Back to Overview
      </Link>
      <h1 className="h1 mb-6">My Journal</h1>
      <Card className="p-6">
        <h2 className="h2 mb-4">Attempt History</h2>
        <div className="space-y-4">
          {attempts.map(attempt => (
            <div 
              key={attempt.id} 
              ref={el => { entryRefs.current[attempt.id] = el; }}
              className={`rounded-md bg-muted p-4 transition-all duration-300 ${entryId === attempt.id ? 'ring-2 ring-blue-500' : ''}`}
              id={`entry-${attempt.id}`}
            >
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