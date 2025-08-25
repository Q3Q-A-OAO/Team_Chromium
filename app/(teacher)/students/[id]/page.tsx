
import React from 'react';
import { useParams } from 'react-router-dom';
import { students } from '../../../../lib/mockData';
import Card from '../../../../components/ui/Card';

const TeacherStudentDetail: React.FC = () => {
  const { id } = useParams();
  const student = students.find(s => s.id === id);

  if (!student) {
    return <div>Student not found.</div>;
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <img src={student.avatarUrl} alt={student.name} className="w-16 h-16 rounded-full ring-2 ring-blue-500" />
        <h1 className="h1">{student.name}</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
              <h2 className="h2 mb-4">Activity Timeline</h2>
              <p className="text-subtext">Placeholder for student's attempt timeline and Q&A highlights.</p>
          </Card>
           <Card className="p-6">
              <h2 className="h2 mb-4">Mastery & Badges</h2>
              <p className="text-subtext">Placeholder for mastery per concept and all earned badges.</p>
          </Card>
      </div>
    </div>
  );
};

export default TeacherStudentDetail;
