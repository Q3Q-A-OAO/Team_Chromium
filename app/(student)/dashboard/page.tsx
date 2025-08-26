import React from 'react';
import ProfileSection from '../../../components/student/ProfileSection';
import ProgressSummary from '../../../components/student/ProgressSummary';
import JournalPreview from '../../../components/student/JournalPreview';

const StudentDashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
      {/* Left Column */}
      <div className="lg:col-span-1">
        <ProfileSection />
      </div>

      {/* Right Column */}
      <div className="lg:col-span-2 space-y-6 md:space-y-8">
        <ProgressSummary />
        <JournalPreview />
      </div>
    </div>
  );
};

export default StudentDashboard;