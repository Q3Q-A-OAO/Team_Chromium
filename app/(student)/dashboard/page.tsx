import React from 'react';
import ProfileSection from '../../../components/student/ProfileSection';
import ProgressSummary from '../../../components/student/ProgressSummary';
import JournalPreview from '../../../components/student/JournalPreview';

const StudentDashboard: React.FC = () => {
  return (
    // This grid establishes the main two-column layout and its height.
    // On large screens, it fills the viewport vertically, accounting for the header, tabs, and top page padding.
    // The bottom padding from the main layout provides the bottom gutter automatically.
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(340px,_38%)_1fr] lg:gap-6 lg:h-[calc(100dvh-128px-16px)]">
      
      {/* Left Column: Profile. Will stretch to fill its grid area height. */}
      <div>
        <ProfileSection />
      </div>

      {/* Right Column: Stacked Progress & Journal. This column also stretches. */}
      {/* Its internal grid divides the available space between Progress and Journal. */}
      <div className="grid lg:grid-rows-[minmax(360px,_0.6fr)_minmax(240px,_0.4fr)] gap-6">
        <ProgressSummary />
        <JournalPreview />
      </div>

    </div>
  );
};

export default StudentDashboard;