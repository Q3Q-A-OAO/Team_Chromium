
import React from 'react';
import type { Student } from '../types';
import Card from './ui/Card';
import Badge from './ui/Badge';

const StudentCard: React.FC<{ student: Student }> = ({ student }) => {
  return (
    <Card className="p-4 flex flex-col items-center text-center">
      <img src={student.avatarUrl} alt={student.name} className="w-20 h-20 rounded-full mb-3 ring-2 ring-blue500" />
      <h4 className="font-semibold text-text">{student.name}</h4>
      <div className="flex flex-wrap justify-center gap-2 mt-3">
        {student.badges.slice(0, 3).map(badge => (
          <Badge key={badge.id} variant="blue" icon={badge.icon}>{badge.name}</Badge>
        ))}
      </div>
    </Card>
  );
};

export default StudentCard;
