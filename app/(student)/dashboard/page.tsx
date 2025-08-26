
import React from 'react';
import ProfileSection from '../../../components/student/ProfileSection';
import ProgressSummary from '../../../components/student/ProgressSummary';
import JournalPreview from '../../../components/student/JournalPreview';

const StudentDashboard: React.FC = () => {
  return (
    // This grid establishes the main two-column layout for desktops.
    // It collapses to a single column on smaller screens (<1024px).
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(340px,_38%)_1fr] lg:gap-6">
      
      {/* Left Column: Profile */}
      {/* The height is constrained on large screens to align with the right column's bottom edge. */}
      <div className="lg:h-[calc(100dvh-128px-16px)]">
        <ProfileSection />
      </div>

      {/* Right Column: Stacked Progress & Journal */}
      {/* This column fills the viewport height and contains its own 2-row grid. */}
      <div className="lg:h-[calc(100dvh-128px-16px)] grid lg:grid-rows-[minmax(360px,_0.6fr)_minmax(240px,_0.4fr)] gap-6 lg:pb-4">
        <ProgressSummary />
        <JournalPreview />
      </div>

    </div>
  );
};

export default StudentDashboard;
