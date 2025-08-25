import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/shared/Header';
import NavTabs from '../../components/shared/NavTabs';
import { Role } from '../../lib/roles';
import { Home, Trophy, Gamepad2, BookOpen, MessageSquare } from 'lucide-react';

const studentNavItems = [
  { path: '/student/dashboard', label: 'Dashboard', icon: <Home className="h-4 w-4" /> },
  { path: '/student/achievements', label: 'Achievements', icon: <Trophy className="h-4 w-4" /> },
  { path: '/student/play', label: 'Play', icon: <Gamepad2 className="h-4 w-4" /> },
  { path: '/student/journal', label: 'Journal', icon: <BookOpen className="h-4 w-4" /> },
  { path: '/student/mentor', label: 'AI Mentor', icon: <MessageSquare className="h-4 w-4" /> },
];

const StudentLayout: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header role={Role.STUDENT} />
      <NavTabs tabs={studentNavItems} />
      <main className="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;