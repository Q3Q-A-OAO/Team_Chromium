
import React from 'react';
import Card from '../../../components/ui/Card';

const TeacherSettings: React.FC = () => {
  return (
    <div>
      <h1 className="h1 mb-6">Settings</h1>
      <Card className="p-6 max-w-lg">
        <h2 className="h2 mb-4">Profile Information</h2>
        <div className="space-y-4">
            <div>
                <label className="small block mb-1">Name</label>
                <input type="text" defaultValue="Ms. Davison" className="w-full rounded-md bg-muted p-2 text-sm" />
            </div>
            <div>
                <label className="small block mb-1">Email</label>
                <input type="email" defaultValue="teacher@school.edu" className="w-full rounded-md bg-muted p-2 text-sm" />
            </div>
        </div>
      </Card>
    </div>
  );
};

export default TeacherSettings;
