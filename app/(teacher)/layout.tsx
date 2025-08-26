
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/shared/Header';
import NavTabs from '../../components/shared/NavTabs';
import { Role } from '../../lib/roles';
import { LayoutDashboard, Users, PencilRuler, Settings } from 'lucide-react';

const teacherNavItems = [
  { path: '/teacher/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
  { path: '/teacher/students', label: 'Students', icon: <Users className="h-4 w-4" /> },
  { path: '/teacher/assignments', label: 'Assignments', icon: <PencilRuler className="h-4 w-4" /> },
  { path: '/teacher/settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
];

const TeacherLayout: React.FC = () => {
  return (
    <div className="min-h-screen">
        <Header role={Role.TEACHER} />
        <NavTabs tabs={teacherNavItems} />
        <main className="mx-auto w-full max-w-[1400px] px-4 py-6 md:px-8 md:py-8">
          <Outlet />
        </main>
    </div>
  );
};

export default TeacherLayout;