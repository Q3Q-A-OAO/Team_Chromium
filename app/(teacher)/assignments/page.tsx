import React from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

const TeacherAssignments: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="h1">Assignments</h1>
        <Button variant="primary">Create New Assignment</Button>
      </div>
      <Card className="p-6">
        <p className="text-subtext">This is where teachers will be able to assign episodes to students, set due dates, and monitor completion. The assignment list and creation form will be built here.</p>
      </Card>
    </div>
  );
};

export default TeacherAssignments;